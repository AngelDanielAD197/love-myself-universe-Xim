// --- REFERENCIAS AL DOM Y ESCENA PRINCIPAL ---
const canvas = document.getElementById('spaceCanvas');
const rightPanel = document.getElementById('detailPanel');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 100);

const defaultCameraPos = new THREE.Vector3(0, 5.0, 8.0);
const defaultTarget = new THREE.Vector3(0, 0, 0);

const targetCameraPos = defaultCameraPos.clone();
const targetControlsTarget = defaultTarget.clone();
let isTravelling = false;
let warpFactor = 0.0; 

// --- PARALLAX MOUSE VARS ---
const mouseParallax = { x: 0, y: 0, targetX: 0, targetY: 0 };

camera.position.copy(defaultCameraPos);

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor('#010005', 1);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxDistance = 15;
controls.minDistance = 0.4;
controls.addEventListener('start', () => { isTravelling = false; });

// --- POST-PROCESAMIENTO ---
const renderScene = new THREE.RenderPass(scene, camera);
const bloomPass = new THREE.UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight), 
    0.40,  
    0.35,  
    0.20
);

const composer = new THREE.EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

function createParticleTexture() {
    const canvasTex = document.createElement('canvas');
    canvasTex.width = 32;
    canvasTex.height = 32;
    const ctx = canvasTex.getContext('2d');
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(255,255,255,0.7)');
    gradient.addColorStop(0.6, 'rgba(255,255,255,0.15)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(canvasTex);
}
const particleTexture = createParticleTexture();

// --- FONDO CINEMATOGRÁFICO DE ESTRELLAS LEJANAS ---
const starCount = 2000;
const starGeo = new THREE.BufferGeometry();
const starPositions = new Float32Array(starCount * 3);
const starColors = new Float32Array(starCount * 3);
const starBaseColors = new Float32Array(starCount * 3);
const starPhases = new Float32Array(starCount);

const palette = [
    new THREE.Color('#ffffff'),
    new THREE.Color('#aeeeff'),
    new THREE.Color('#ffd175'),
    new THREE.Color('#e2bbfd')
];

for (let i = 0; i < starCount; i++) {
    const r = 8 + Math.random() * 14;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    starPositions[i * 3 + 2] = r * Math.cos(phi);

    const col = palette[Math.floor(Math.random() * palette.length)];
    starColors[i * 3] = col.r;
    starColors[i * 3 + 1] = col.g;
    starColors[i * 3 + 2] = col.b;

    starBaseColors[i * 3] = col.r;
    starBaseColors[i * 3 + 1] = col.g;
    starBaseColors[i * 3 + 2] = col.b;

    starPhases[i] = Math.random() * Math.PI * 2;
}

starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

const starShaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
        uWarp: { value: 0.0 },
        uTexture: { value: particleTexture }
    },
    vertexShader: `
        uniform float uWarp;
        uniform float uTime;
        varying vec3 vColor;
        
        void main() {
            vColor = color;
            vec3 pos = position;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            
            float size = 0.18 * (300.0 / -mvPosition.z);
            gl_PointSize = size * (1.0 + uWarp * 3.5);
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
    fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uWarp;
        varying vec3 vColor;
        
        void main() {
            vec2 uv = gl_PointCoord;
            uv.y = (uv.y - 0.5) * (1.0 + uWarp * 4.0) + 0.5;
            if (uv.y < 0.0 || uv.y > 1.0) discard;
            
            vec4 texColor = texture2D(uTexture, uv);
            gl_FragColor = vec4(vColor, texColor.a * 0.9);
        }
    `,
    transparent: true,
    depthWrite: false,
    vertexColors: true,
    blending: THREE.AdditiveBlending
});

const starField = new THREE.Points(starGeo, starShaderMaterial);
scene.add(starField);

// --- DATOS DE SEMESTRES Y NAVEGACIÓN ---
const coreNodesData = [
    { id: 0, name: "Semestre I", pos: new THREE.Vector3(-1.50, 0.10, 1.20), color: '#00f2fe' },
    { id: 1, name: "Semestre II", pos: new THREE.Vector3(1.80, -0.10, -1.40), color: '#ff0070' },
    { id: 2, name: "Semestre III", pos: new THREE.Vector3(0.30, 0.20, -2.10), color: '#9632ff' },
    { id: 3, name: "Semestre IV", pos: new THREE.Vector3(-0.80, -0.15, -0.90), color: '#00fa9a' },
    { id: 4, name: "Semestre V", pos: new THREE.Vector3(1.30, 0.30, 1.70), color: '#ffffff' },
    { id: 5, name: "Semestre VI", pos: new THREE.Vector3(-2.40, -0.25, -1.80), color: '#ffaa00' }
];

// ESTRUCTURA DINÁMICA DE CARTAS POR SEMESTRE
const nodeCardsData = {
    0: [
        {
            tabLabel: "Prólogo",
            title: "PRÓLOGO: A NEW PERSPECTIVE",
            image: "img/Caminos.jpeg",
            desc: "Después de responder la pregunta ¿Quién soy?, surgió una nueva inquietud: ¿Qué ocurre después de encontrarse a uno mismo? Inspirado por el fenómeno astronómico del parallax, este prólogo marca el inicio de una nueva etapa donde la universidad, la ciencia, la filosofía y la experiencia transforman la forma de mirar la realidad.",
            url: "cartas/Intro.html"
        },
        {
            tabLabel: "Carta 1",
            title: "CARTA 1: LA DISTANCIA ENTRE DOS MUNDOS",
            image: "img/FES.jpeg",
            desc: "El primer paso hacia un nuevo universo rara vez comienza con certezas. Entre despedidas, mudanzas y el vértigo de abandonar el hogar, descubriré que la universidad no solo representa un nuevo espacio para aprender, sino también un nuevo sistema desde el cual comenzar a observar mi propia vida. Porque a veces la distancia más difícil de recorrer no se mide en kilómetros, sino en la diferencia entre quien éramos y quien estamos a punto de convertirnos.",
            url: "cartas/C1.html"
        },
        {
            tabLabel: "Carta 2",
            title: "CARTA 2: HIPOTESIS DEL CONTACTO",
            image: "img/FES2.jpeg",
            desc: "La soledad puede sentirse inmensa cuando todo a nuestro alrededor es desconocido. Sin embargo, la psicología sugiere que basta un primer encuentro para comenzar a derribar los muros que construimos entre nosotros y los demás. En esta carta descubriré cómo una conversación aparentemente sencilla puede convertirse en el inicio de una transformación mucho más profunda.",
            url: "cartas/C2.html"
        },
        {
            tabLabel: "Carta 3",
            title: "CARTA 3: MÁS ALLÁ DEL HORIZONTE",
            image: "img/AOT.jpeg",
            desc: "Admirar a quienes parecen estar varios pasos delante de nosotros puede convertirse tanto en una fuente de inspiración como en el origen de nuestras mayores inseguridades. Frente a un grupo de compañeros extraordinarios y los primeros fracasos académicos, comenzaré a preguntarme si realmente pertenezco a ese lugar. Una carta sobre el miedo a no ser suficiente y la difícil diferencia entre compararse con los demás y aprender de ellos.",
            url: "cartas/C3.html"
        },
        {
            tabLabel: "Carta 4",
            title: "CARTA 4: RESONANCIA A PRUEBA DE BALAS",
            image: "img/BTS2.jpeg",
            desc: "Hay historias que aparecen en el momento exacto en que más las necesitamos, aunque solo lo comprendamos años después. En medio de la incertidumbre, los exámenes y la posibilidad de abandonar la universidad, un documental despertará una curiosidad inesperada que terminará abriendo la puerta hacia un universo capaz de acompañarme durante los años más importantes de mi vida.",
            url: "cartas/C4.html"
        },
        {
            tabLabel: "Carta 5",
            title: "CARTA 5: LA TEORIA DE LOS ESPEJOS",
            image: "img/SPI.jpeg",
            desc: "No todas las personas que conocemos permanecen en nuestra historia, pero todas dejan una huella en la forma en que entendemos el mundo. Entre amistades que se desvanecen, conversaciones que inspiran y compañeros cuya pasión por aprender transforma mi manera de mirar el conocimiento, descubriré que una de las decisiones más importantes de la vida consiste en elegir junto a quién queremos crecer.",
            url: "cartas/C5.html"
        },
        {
            tabLabel: "Carta 6",
            title: "CARTA 6: HACIA UN NUEVO COMIENZO",
            image: "img/F1.jpg",
            desc: "El aprendizaje no siempre se refleja en una calificación. A veces se esconde en las conversaciones que transforman nuestras ideas, en las personas que desafían nuestros prejuicios y en las decisiones que nos obligan a crecer. Mientras el primer semestre llega a su fin, descubriré que pertenecer nunca dependió de demostrar que era suficiente, sino de elegir permanecer incluso cuando las dudas parecían más grandes que las certezas. Una carta sobre la curiosidad, la perseverancia y el instante en que comprendí que el universo seguía siendo el mismo, pero quien lo observaba ya no.",
            url: "cartas/C6.html"
        }
    ],
    1: [
        {
            tabLabel: "EN DESARROLLO",
            title: "EN DESARROLLO",
            image: "img/prox.png",
            desc: "EN DESARROLLO",
            url: "carta2.html"
        }
      ],
    2: [
        {
            tabLabel: "Inflexión",
            title: "EN DESARROLLO",
            image: "img/prox.png",
            desc: "EN DESARROLLO",
            url: "carta3.html"
        }
     ],
    3: [
        {
            tabLabel: "EN DESARROLLO",
            title: "EN DESARROLLO",
            image: "img/prox.png",
            desc: "EN DESARROLLO",
            url: "carta4.html"
        }
       ],
    4: [
        {
            tabLabel: "EN DESARROLLO",
            title: "EN DESARROLLO",
            image: "img/prox.png",
            desc: "EN DESARROLLO",
            url: "carta5.html"
        }
      ],
    5: [
        {
            tabLabel: "EN DESARROLLO",
            title: "EN DESARROLLO",
            image: "img/prox.png",
            desc: " EN DESARROLLO",
            url: "carta6.html"
        }
        ]
};

let activeSemesterIndex = 0;
let activeCardTab = 0;

const nodePositions = [];
coreNodesData.forEach(node => { nodePositions.push(node.pos.x, node.pos.y, node.pos.z); });

// --- SISTEMA DE GALAXY CON BRAZOS EN CONTRASTE DE COLOR ---
const particleCount = 250000;
const galaxyGeometry = new THREE.BufferGeometry();
const rawPositions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);
const radiusFactors = new Float32Array(particleCount);

const themes = {
    'cyberpunk': { core: '#ff0077', edge: '#00f2fe' },
    'hyperion':  { core: '#ffe600', edge: '#9d00ff' },
    'nebula':    { core: '#00ffaa', edge: '#ff00aa' },
    'eclipse':   { core: '#ff2200', edge: '#0022ff' }
};

let currentTheme = themes['cyberpunk'];
let colorCore = new THREE.Color(currentTheme.core);
let colorEdge = new THREE.Color(currentTheme.edge);
const tempColor = new THREE.Color(); // Variable auxiliar reutilizable

for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const r = Math.random() * 6.5;
    radiusFactors[i] = r / 6.5;
    
    const spin = r * 1.5;
    const branch = ((i % 3) * 2 * Math.PI) / 3;

    const rx = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.50 * r;
    const ry = Math.pow(Math.random(), 4) * (Math.random() < 0.5 ? 1 : -1) * 0.10 * r;
    const rz = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.40 * r;

    rawPositions[i3] = Math.cos(branch + spin) * r + rx;
    rawPositions[i3 + 1] = ry;
    rawPositions[i3 + 2] = Math.sin(branch + spin) * r + rz;

    tempColor.copy(colorCore).lerp(colorEdge, Math.pow(radiusFactors[i], 0.85));
    colors[i3] = tempColor.r;
    colors[i3 + 1] = tempColor.g;
    colors[i3 + 2] = tempColor.b;
}

galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(rawPositions, 3));
galaxyGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const galaxyVertexShader = `
    uniform vec3 uNodePositions[6];
    uniform float uTime;
    uniform float uWarp;
    varying vec3 vColor;
    varying float vTime;
    
    void main() {
        vec3 transformed = position;
        vTime = uTime;
        
        float angle = uTime * 0.025;
        float s = sin(angle); float c = cos(angle);
        vec3 rotated;
        rotated.x = transformed.x * c - transformed.z * s;
        rotated.y = transformed.y;
        rotated.z = transformed.x * s + transformed.z * c;
        transformed = rotated;

        vec3 finalColor = color;
        float sizeFactor = 1.0;

        for(int i = 0; i < 6; i++) {
            vec3 nodePos = uNodePositions[i];
            vec3 toNode = transformed - nodePos;
            float dist = length(toNode);
            
            if (dist < 0.70) {
                float influence = smoothstep(0.70, 0.02, dist);
                transformed -= normalize(toNode) * (influence * 0.15);
                
                float twist = influence * 1.2;
                float ts = sin(twist); float tc = cos(twist);
                vec3 local = transformed - nodePos;
                vec3 twisted;
                twisted.x = local.x * tc - local.z * ts;
                twisted.y = local.y;
                twisted.z = local.x * ts + local.z * tc;
                transformed = twisted + nodePos;

                finalColor = mix(finalColor, vec3(1.0, 1.0, 1.0), influence * 0.3);
                sizeFactor += influence * 1.2;
            }
        }
        
        vColor = finalColor;
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = (0.009 * sizeFactor * (300.0 / -mvPosition.z)) * (1.0 + uWarp * 1.8);
    }
`;

const galaxyFragmentShader = `
    varying vec3 vColor;
    varying float vTime;
    void main() {
        if (length(gl_PointCoord - vec2(0.5)) > 0.5) discard;
        float wave = sin(vTime * 2.5 + vColor.r * 10.0 + vColor.b * 20.0);
        float twinkle = 0.75 + 0.25 * wave;
        gl_FragColor = vec4(vColor, twinkle * 0.85);
    }
`;

const galaxyMaterial = new THREE.ShaderMaterial({
    vertexShader: galaxyVertexShader,
    fragmentShader: galaxyFragmentShader,
    uniforms: { 
        uNodePositions: { value: nodePositions }, 
        uTime: { value: 0 },
        uWarp: { value: 0.0 }
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
});

const galaxyMesh = new THREE.Points(galaxyGeometry, galaxyMaterial);
scene.add(galaxyMesh);

function setGalaxyTheme(themeKey) {
    document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
    const targetBtn = document.getElementById(`theme-${themeKey}`);
    if (targetBtn) targetBtn.classList.add('active');

    const theme = themes[themeKey];
    if (!theme) return;

    colorCore.set(theme.core);
    colorEdge.set(theme.edge);

    const colorsArr = galaxyGeometry.attributes.color.array;
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        tempColor.copy(colorCore).lerp(colorEdge, Math.pow(radiusFactors[i], 0.85));

        colorsArr[i3]     = tempColor.r;
        colorsArr[i3 + 1] = tempColor.g;
        colorsArr[i3 + 2] = tempColor.b;
    }
    galaxyGeometry.attributes.color.needsUpdate = true;
}

// --- NUBES DE POLVO DE FONDO ---
const nebulaCount = 400;
const nebulaGeometry = new THREE.BufferGeometry();
const nebulaPositions = new Float32Array(nebulaCount * 3);
const nebulaColors = new Float32Array(nebulaCount * 3);

for (let i = 0; i < nebulaCount; i++) {
    const i3 = i * 3;
    const r = Math.random() * 7.0; 
    const angle = Math.random() * Math.PI * 2;
    nebulaPositions[i3] = Math.cos(angle) * r;
    nebulaPositions[i3 + 1] = (Math.random() - 0.5) * 0.4; 
    nebulaPositions[i3 + 2] = Math.sin(angle) * r;
    
    nebulaColors[i3] = 0.05; nebulaColors[i3+1] = 0.01; nebulaColors[i3+2] = 0.1;
}
nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));
nebulaGeometry.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));

const nebulaMaterial = new THREE.PointsMaterial({
    size: 0.5, 
    map: particleTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.03, 
    blending: THREE.AdditiveBlending,
    depthWrite: false
});
const nebulaMesh = new THREE.Points(nebulaGeometry, nebulaMaterial);
scene.add(nebulaMesh);

// --- AGUJEROS NEGROS (SECTORES / SEMESTRES) ---
const clickTargets = [];
const bhAnimateCallbacks = [];

coreNodesData.forEach((node) => {
    const bhGroup = new THREE.Group();
    bhGroup.position.copy(node.pos);

    const coreGeo = new THREE.SphereGeometry(0.045, 32, 32); 
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    bhGroup.add(coreMesh);

    const pCount = 3500; 
    const bhGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(pCount * 3);
    const pColors = new Float32Array(pCount * 3);

    const baseRadii = []; const baseSpeeds = []; const basePhases = [];
    const colWhite = new THREE.Color('#ffffff');
    const colTarget = new THREE.Color(node.color);

    const minRadius = 0.06;
    const maxRadius = 0.32;

    for (let i = 0; i < pCount; i++) {
        let r = minRadius + (Math.pow(Math.random(), 1.5) * (maxRadius - minRadius));
        baseRadii.push(r);
        baseSpeeds.push(0.7 / Math.sqrt(r)); 
        basePhases.push(Math.random() * Math.PI * 2);

        let interpolation = (r - minRadius) / (maxRadius - minRadius);
        tempColor.copy(colWhite).lerp(colTarget, interpolation * 0.9);

        positions[i*3] = Math.cos(basePhases[i]) * r;
        positions[i*3+1] = (Math.random() - 0.5) * 0.008;
        positions[i*3+2] = Math.sin(basePhases[i]) * r;

        pColors[i*3] = tempColor.r; pColors[i*3+1] = tempColor.g; pColors[i*3+2] = tempColor.b;
    }

    bhGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    bhGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const bhMat = new THREE.PointsMaterial({
        size: 0.018, 
        map: particleTexture,
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.9
    });

    const bhPoints = new THREE.Points(bhGeo, bhMat);
    bhGroup.add(bhPoints);

    bhGroup.rotation.set(0.2, 0.05, 0.0);
    scene.add(bhGroup);

    bhAnimateCallbacks.push((time) => {
        const posArr = bhGeo.attributes.position.array;
        for (let i = 0; i < pCount; i++) {
            let angle = time * baseSpeeds[i] + basePhases[i];
            let r = baseRadii[i];
            
            posArr[i * 3] = Math.cos(angle) * r;
            posArr[i * 3 + 1] = Math.sin(angle * 2.0 + time) * 0.003; 
            posArr[i * 3 + 2] = Math.sin(angle) * r;
        }
        bhGeo.attributes.position.needsUpdate = true;
    });

    const interactGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const interactMat = new THREE.MeshBasicMaterial({ visible: false });
    const interactMesh = new THREE.Mesh(interactGeo, interactMat);
    interactMesh.position.copy(node.pos);
    interactMesh.userData = node;
    scene.add(interactMesh);
    clickTargets.push(interactMesh);
});

// --- MANEJADORES DE CÁMARA E INTERFAZ UI ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function updateUIHighlight(activeId) {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if (activeId === 'global') {
        const btnGlobal = document.getElementById('btn-global');
        if (btnGlobal) btnGlobal.classList.add('active');
    } else {
        const targetBtn = document.getElementById(`btn-node-${activeId}`);
        if (targetBtn) targetBtn.classList.add('active');
    }
}

// --- FUNCIÓN DE DESPLAZAMIENTO DEL CARRUSEL CON FLECHAS ---
function scrollTabs(direction) {
    const container = document.getElementById('cardTabsContainer');
    if (!container) return;
    
    const scrollAmount = 110;
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

// --- CAMBIAR DE CARTA SELECCIONADA EN EL PANEL DERECHO ---
function switchCardTab(cardIndex) {
    activeCardTab = cardIndex;
    const cards = nodeCardsData[activeSemesterIndex] || nodeCardsData[0];
    const card = cards[cardIndex] || cards[0];

    const cardTitleElem = document.getElementById('cardDynamicTitle');
    const imageElem = document.getElementById('nodeImage');
    const descElem = document.getElementById('nodeDesc');
    const linkElem = document.getElementById('nodeLink');

    if (cardTitleElem) cardTitleElem.innerText = card.title;
    if (imageElem) imageElem.src = card.image;
    if (descElem) descElem.innerText = card.desc;
    if (linkElem) linkElem.href = card.url;

    // Actualizar clase 'active' en la pestaña correspondiente
    const tabsContainer = document.getElementById('cardTabsContainer');
    if (tabsContainer) {
        Array.from(tabsContainer.children).forEach((tabBtn, i) => {
            if (i === cardIndex) {
                tabBtn.classList.add('active');
            } else {
                tabBtn.classList.remove('active');
            }
        });
    }
}

// --- GENERAR DINÁMICAMENTE PESTAÑAS SEGÚN CANTIDAD DE CARTAS ---
function populateRightPanel(nodeData) {
    activeSemesterIndex = nodeData.id;
    
    const nodeTitleElem = document.getElementById('nodeTitle');
    if (nodeTitleElem) nodeTitleElem.innerText = nodeData.name;

    const cards = nodeCardsData[activeSemesterIndex] || [];
    const tabsContainer = document.getElementById('cardTabsContainer');

    if (tabsContainer) {
        tabsContainer.innerHTML = '';

        cards.forEach((card, index) => {
            const btn = document.createElement('button');
            btn.className = `card-tab-btn ${index === 0 ? 'active' : ''}`;
            btn.id = `cardTab-${index}`;
            btn.onclick = () => switchCardTab(index);

            const numFormatted = String(index + 1).padStart(2, '0');
            const labelText = card.tabLabel || (index === 0 ? 'Prólogo' : `Carta ${index}`);

            btn.innerHTML = `
                <span class="tab-number">${numFormatted}</span>
                <span class="tab-name">${labelText}</span>
            `;
            tabsContainer.appendChild(btn);
        });
    }

    switchCardTab(0);

    if (rightPanel) rightPanel.classList.add('active');
}

function selectNodeIndex(index) {
    const data = coreNodesData[index];
    if (!data) return;

    populateRightPanel(data);
    updateUIHighlight(index);

    targetControlsTarget.copy(data.pos);
    targetCameraPos.set(data.pos.x, data.pos.y + 0.30, data.pos.z + 0.85); 
    isTravelling = true;
}

function resetToGlobalView() {
    if (rightPanel) rightPanel.classList.remove('active');
    updateUIHighlight('global');
    targetControlsTarget.copy(defaultTarget);
    targetCameraPos.copy(defaultCameraPos);
    isTravelling = true;
}

// --- PARALLAX MOUSE EVENT ---
window.addEventListener('mousemove', (event) => {
    mouseParallax.targetX = (event.clientX / window.innerWidth - 0.5) * 0.4;
    mouseParallax.targetY = (event.clientY / window.innerHeight - 0.5) * 0.4;
});

window.addEventListener('click', (event) => {
    if (event.clientY < 60 && event.clientX > window.innerWidth / 2 - 200 && event.clientX < window.innerWidth / 2 + 200) return;
    if (event.clientX < 325 || event.clientX > window.innerWidth - 355) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(clickTargets);

    if (intersects.length > 0) {
        const data = intersects[0].object.userData;
        selectNodeIndex(data.id);
    }
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});

// --- CONTROL DE AUDIO LOCAL ---
let currentAudio = null;

const tracks = {
    'music1': new Audio('audio/aot.mp3'),
    'music2': new Audio('audio/interstellar.mp3')
};

function toggleMusic(trackId) {
    const btn1 = document.getElementById('music1');
    const btn2 = document.getElementById('music2');
    const targetTrack = tracks[trackId];

    if (currentAudio === targetTrack) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
        if (btn1) btn1.classList.remove('playing');
        if (btn2) btn2.classList.remove('playing');
        return;
    }

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    if (btn1) btn1.classList.remove('playing');
    if (btn2) btn2.classList.remove('playing');
    
    const activeBtn = document.getElementById(trackId);
    if (activeBtn) activeBtn.classList.add('playing');

    currentAudio = targetTrack;
    currentAudio.loop = true;
    currentAudio.volume = 0.3;

    currentAudio.play().catch(error => {
        console.error("Error al reproducir el audio local:", error);
        if (btn1) btn1.classList.remove('playing');
        if (btn2) btn2.classList.remove('playing');
        currentAudio = null;
    });
}

// --- EXPOSICIÓN AL ÁMBITO GLOBAL PARA INTERACCIÓN HTML ---
window.setGalaxyTheme = setGalaxyTheme;
window.scrollTabs = scrollTabs;
window.switchCardTab = switchCardTab;
window.selectNodeIndex = selectNodeIndex;
window.resetToGlobalView = resetToGlobalView;
window.toggleMusic = toggleMusic;

// --- BUCLE PRINCIPAL ---
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    mouseParallax.x += (mouseParallax.targetX - mouseParallax.x) * 0.05;
    mouseParallax.y += (mouseParallax.targetY - mouseParallax.y) * 0.05;

    starField.position.x = mouseParallax.x * 0.8;
    starField.position.y = -mouseParallax.y * 0.8;
    nebulaMesh.position.x = mouseParallax.x * 0.4;
    nebulaMesh.position.y = -mouseParallax.y * 0.4;

    galaxyMaterial.uniforms.uTime.value = elapsedTime;
    galaxyMaterial.uniforms.uWarp.value = warpFactor;
    starShaderMaterial.uniforms.uTime.value = elapsedTime;
    starShaderMaterial.uniforms.uWarp.value = warpFactor;

    bhAnimateCallbacks.forEach(callback => callback(elapsedTime));

    nebulaMesh.rotation.y = elapsedTime * 0.001;
    starField.rotation.y = elapsedTime * 0.0003;

    if (isTravelling) {
        camera.position.lerp(targetCameraPos, 0.05);
        controls.target.lerp(targetControlsTarget, 0.05);
        if (camera.position.distanceTo(targetCameraPos) < 0.005) {
            isTravelling = false;
        }
    }
    
    controls.update();
    composer.render();
}

animate();