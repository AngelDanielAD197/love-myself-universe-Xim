// ==========================================================================
// 1. BASE DE DATOS LOCAL (CON RUTAS Y SPOTIFY IDS INTEGRADOS)
// ==========================================================================
const universoCartas = {
    //-- LOVE MYSELF: THE UNIVERSE OF THE SOUL ---
    'intro1': {
        titulo: "Intro: Serendipity",
        canciones: "Serendipity (Jimin)",
        spotifyId: "61RvEx7GLYRHQhG7ldjJo1",
        rutaHTML: "universo-del-alma/intro-serendipity.html",
        texto: "<p><strong>Love Myself: The Universe of the Soul</strong></p><p>Se le conoce como 'Serendipia' a el hallazgo afortunado, valioso o inesperado que se produce de una forma accidental, pero que es muy significativo.</p>"
    },
    'carta-1': {
        titulo: "Carta 1: El Inicio de un Viaje",
        canciones: "Inner Child (V)",
        spotifyId: "25MHcbjvSdcfTiFgbKJiZF",
        rutaHTML: "universo-del-alma/carta1-inicio.html",
        texto: "<p><strong>Love Myself: The Universe of the Soul</strong></p><p>'Amnesia Infantil', en la psicologia cognitiva es un fenomeno que se debe a la maduración biologica del cerebro, donde no recordamos nuestros primeros años de vida.</p>"
    },
    'carta-2': {
        titulo: "Carta 2: Ecos de una infancia herida",
        canciones: "Whalien 52 (BTS)",
        spotifyId: "2HMVg8AqrijDGKu0U5bVNH",
        rutaHTML: "universo-del-alma/carta2-ecos.html",
        texto: "<p><strong>Love Myself: The Universe of the Soul</strong></p><p>Paul Ekman teoriza que existen seis emociones básicas: alegría, tristeza, miedo, ira, sorpresa y asco. Estas emociones aparecen desde el nacimiento, pero a medida que crecemos y nos volvemos más conscientes de nosotros mismos, empezamos a experimentar emociones más complejas.</p>"
    },
    'carta-3': {
        titulo: "Carta 3: Descubrir la Luz",
        canciones: "Run (BTS)",
        spotifyId: "3G1aAxWS2Nd17FQs4PWV6X",
        rutaHTML: "universo-del-alma/carta3-luz.html",
        texto: "<p><strong>Love Myself: The Universe of the Soul</strong></p><p>'Aprender', una forma de ver que nuestra verdadera esencia no se encuentra en la quietud de lo que ya somos, sino en el movimiento hacia lo que aún no hemos explorado.</p>"
    },
    'Outro-stay': {
        titulo: "Outro: Stay",
        canciones: "Stay (BTS)",
        spotifyId: "0TdWVbcerMAcvljXrl9gpG",
        rutaHTML: "universo-del-alma/outro-stay.html",
        texto: "<p><strong>Love Myself: The Universe of the Soul</strong></p><p>¿Por qué este proyecto? y qué mensaje tengo para ti.</p>"
    },

    // --- LOVE MYSELF: SHADOW SELVES AND TEARS ---
    'like-crazy': {
        titulo: "Intro: Like Crazy",
        canciones: "Like Crazy (Jimin)",
        spotifyId: "3Ua0m0YmEjrMi9XErKcNiR",
        rutaHTML: "sombras-y-lagrimas/intro-likecrazy.html",
        texto: "<p><strong>Love Myself: Shadows, Selves & Tears</strong></p><p>Aquí comienza el viaje hacia el interior. El encuentro con la sombra, el aislamiento y el peso de las primeras máscaras inconscientes que construimos para encajar en el mundo social.</p>"
    },
    'carta-4': {
        titulo: "Carta 4: El inicio de la máscara",
        canciones: "Fake Love / Lie (BTS)",
        spotifyId: "6m1TWFMeon7ai9XLOzdbiR",
        rutaHTML: "sombras-y-lagrimas/carta4-mascara.html",
        texto: "<p>El colapso de identidad social ocurre cuando la máscara se vuelve demasiado pesada frente a lo que realmente nos importa. Jung define la Persona como la actitud para adaptarnos externamente.</p>"
    },
    'carta-5': {
        titulo: "Carta 5: Sombras y silencio",
        canciones: "Tear / Let you down",
        spotifyId: "27yKZtF7WLdmlLoW8qMssq",
        rutaHTML: "sombras-y-lagrimas/carta5-sombras.html",
        texto: "<p>Un descenso profundo hacia la Sombra junguiana. El aislamiento y los sesgos familiares toman protagonismo, convirtiendo el silencio en el único refugio frente a las contradicciones del entorno.</p>"
    },
    'carta-6': {
        titulo: "Carta 6: Fragmentos de un nuevo comienzo",
        canciones: "Life Goes On / We are / Lost",
        spotifyId: "5FVbvttjEvQ8r2BgUcJgNg",
        rutaHTML: "sombras-y-lagrimas/carta6-fragmentos.html",
        texto: "<p>Los primeros quiebres de la máscara. A través de la desorientación, se empiezan a vislumbrar pequeños fragmentos de autenticidad que preparan el terreno para las eras futuras.</p>"
    },
    'save-me': {
        titulo: "Outro: Save Me",
        canciones: "Save Me (BTS)",
        spotifyId: "7bxGcILuAjkZzaveU28ZJS",
        rutaHTML: "sombras-y-lagrimas/outro-saveme.html",
        texto: "<p>El cierre de la etapa de Secundaria. Un grito de auxilio consciente que marca el fin del encierro emocional y la transición inminente hacia el mundo exterior.</p>"
    },

    // --- LOVE MYSELF: THE MOST BEAUTIFUL MOMENT OF MY LIFE PT1 ---
    'tbmil-intro': {
        titulo: "Intro: The most beautiful moment of my life",
        canciones: "Intro: TBMIL (BTS)",
        spotifyId: "7HhZAKSvFWz4bT5jsZLPeq",
        rutaHTML: "momento-bello/intro-beautiful.html",
        texto: "<p><strong>Love Myself: The Most Beautiful Moment of my Life PT1</strong></p><p>Aunque me perdí entre las sombras, descubrí que incluso en la oscuridad, mi alma aún brillaba.</p>"
    },
    'carta-7': {
        titulo: "Carta 7: El inicio de una serendipia",
        canciones: "Don't Leave Me / DNA (BTS)",
        spotifyId: "3zIG0WuI5RoJsFYnErkFDU",
        rutaHTML: "momento-bello/carta7-serendipia.html",
        texto: "<p>El regreso a las aulas presenciales y el fin del encierro de la pandemia. Deshacerse de capas viejas para permitir el nacimiento de un instante que cambiaría el rumbo de las interacciones.</p>"
    },
    'carta-8': {
        titulo: "Carta 8: Un sueño en vida",
        canciones: "Begin (Jungkook) / Jane Doe",
        spotifyId: "0bGJHUPR6ems9tzIljlPFR",
        rutaHTML: "momento-bello/carta8-sueno.html",
        texto: "<p>El flujo constante de la rutina de preparatoria transformándose a través de pequeños instantes compartidos que se sienten vivos y llenos de significado.</p>"
    },

    // --- LOVE MYSELF: THE MOST BEAUTIFUL MOMENT OF MY LIFE PT2  ---
    'Interlude': {
        titulo: "Interlude: Black Swan Orchestral",
        canciones: "Black Swan Orchestral (BTS)",
        spotifyId: "6wH3AP7b01vpzKYRJhreMy",
        rutaHTML: "momento-bello/interludio-beautiful.html",
        texto: "<p>¿Qué es la Felicidad? Los fuegos artificiales aparecen en la oscuridad, detonan en colores e iluminan la noche para luego desvanecerse. La rutina es el telón de fondo necesario para que esos momentos brillen.</p>"
    },
    'carta-9': {
        titulo: "Carta 9: El amor e inicio de una redefinición",
        canciones: "LMLY (Jackson Wang) / Start a War / Glassy Sky",
        spotifyId: "3kPoV6L9vXpbxoM4Ux0KnX",
        rutaHTML: "momento-bello/carta9-amor.html",
        texto: "<p>El conflicto con el propio ser. Querer que Julia conociera mi verdadero yo y chocar con una duda inquietante: excavando más profundo, me pregunté si siquiera podría definir quién soy en realidad.</p>"
    },
    'carta-10': {
        titulo: "Carta 10: Crisis de Identidad",
        canciones: "Starlight (Jennie) / A Child of Evil (Ai Higuchi)",
        spotifyId: "0hwev90tfswBoZmgKnJ9F8",
        rutaHTML: "momento-bello/carta10-espejo.html",
        texto: "<p>El enfrentamiento directo entre la Persona (máscaras) y la Sombra. El impacto por el fallecimiento de Osvaldo abre una reflexión profunda: <em>'Si mi vida terminara en este instante, ¿estaría satisfecho?'</em></p>"
    },

    // --- LOVE MYSELF: THE MOST BEAUTIFUL MOMENT OF MY LIFE FOREVER ---
    'Interlude-II': {
        titulo: "Interlude II: Famous Last Words",
        canciones: "Famous Last Words (DPR IAN)",
        spotifyId: "6wlAUkgJjEH1xLblEeiko2",
        rutaHTML: "momento-bello/interludio-famous.html",
        texto: "<p>¿Qué hay más allá de la conciencia? Al dormir, la mente se muestra sin máscaras. El inconsciente se comunica con metáforas en el Mundo Onírico. Bienvenidos a la culminación de la Preparatoria.</p>"
    },
    'carta-11': {
        titulo: "Carta 11: Romper con los sesgos",
        canciones: "Welcome To The Other Side / Bad Cold / Violet Crazy (DPR IAN)",
        spotifyId: "2ZR0hXJR1pvpb6loEYirHX",
        rutaHTML: "momento-bello/carta11-sesgos.html",
        texto: "<p>Julio de 2023. La experiencia neón en la capilla con Paloma y el punto de inflexión matemático con el profesor Gabino. El día en que el Flow de Csíkszentmihályi se hizo presente y decidí firmar con mi primer nombre: <strong>Ángel</strong>.</p>"
    },
    'carta-12': {
        titulo: "Carta 12: El desafío de soñar...",
        canciones: "So Far Away (Suga) / Dreamer (TXT) / On my own",
        spotifyId: "2FviiM1DSKfJSRxMV5TD9w",
        rutaHTML: "momento-bello/carta12-sonar.html",
        texto: "<p>En casa las cosas se rompían. Mi corazón estaba quebrado, pero entendí que soñar es atreverse a caminar aun cuando la niebla no se disipa.</p>"
    },
    'last-letter': {
        titulo: "Carta Final: Más allá del Horizonte",
        canciones: "ON / Answer: Love Myself / IDOL (BTS)",
        spotifyId: "0fZRNhPJ4AGmwY7rkpdbqK",
        rutaHTML: "momento-bello/carta-final.html",
        texto: "<p>Inspirado en <em>Demian</em> de Hermann Hesse. Crecer no es adaptarse, sino romper el cascarón del mundo que otros construyeron. Mi primer acto de individuación auténtico es amarme cuando dudo.</p>"
    },
    'wings-outro': {
        titulo: "Outro Final: WINGS",
        canciones: "Interlude: Wings (BTS)",
        spotifyId: "7kyUapJyppdjzoAWB6XS14",
        rutaHTML: "momento-bello/outro-wings.html",
        texto: "<p>Mensaje de cierre para ti tras meses de redacción y meditación. Un registro de gratitud a mi yo del pasado que resistió sin saber por qué. <em>'Sigue adelante, incluso cuando tengas miedo.'</em></p>"
    },

    // --- UNIVERSIDAD (PORTAL AL NUEVO PROYECTO) ---
    'rumbos-univ': {
        titulo: "PARALLAX: Beyond The Self",
        canciones: "Another Dimension",
        spotifyId: "0qiYnY0y5P9gqq6THGzhaI",
        rutaHTML: "./Universidad/menu.html",
        texto: "<p><strong>🌀 PORTAL DIMENSIONAL: FES Acatlán</strong></p><p>La inmersión total en las Matemáticas Aplicadas, la Computación, la Inteligencia Artificial y el reencuentro con la propia esencia desde la perspectiva de la adultez temprana.</p><p><em>Haz clic en el botón de abajo para cruzar al siguiente universo.</em></p>"
    }
};

// ==========================================================================
// 2. MAPEO TOTAL DE NODOS
// ==========================================================================
const nodos = new vis.DataSet([
    { id: 'era-soul', label: 'Era 1: The Universe\nof the Soul', group: 'eras', size: 24 },
    { id: 'era-shadows', label: 'Era 2: Shadows,\nSelves & Tears', group: 'eras', size: 24 },
    { id: 'era-tbmil-pt1', label: 'Era 3: TBMIL\nParte 1', group: 'eras', size: 24 },
    { id: 'era-tbmil-pt2', label: 'Era 4: TBMIL\nParte 2', group: 'eras', size: 24 },
    { id: 'era-tbmil-forever', label: 'Era 5: TBMIL\nForever', group: 'eras', size: 24 },

    { id: 'intro1', label: 'Intro: Serendipity', group: 'soul' },
    { id: 'carta-1', label: 'C1: El Inicio', group: 'soul' },
    { id: 'carta-2', label: 'C2: Ecos', group: 'soul' },
    { id: 'carta-3', label: 'C3: Descubrir la Luz', group: 'soul' },
    { id: 'Outro-stay', label: 'Outro: Stay', group: 'soul' },

    { id: 'like-crazy', label: 'Intro: Like Crazy', group: 'shadows' },
    { id: 'carta-4', label: 'C4: La Máscara', group: 'shadows' },
    { id: 'carta-5', label: 'C5: Sombras', group: 'shadows' },
    { id: 'carta-6', label: 'C6: Fragmentos', group: 'shadows' },
    { id: 'save-me', label: 'Outro: Save Me', group: 'shadows' },
    
    { id: 'tbmil-intro', label: 'Intro: TBMIL PT1', group: 'tbmil1' },
    { id: 'carta-7', label: 'C7: Serendipia', group: 'tbmil1' },
    { id: 'carta-8', label: 'C8: Un Sueño', group: 'tbmil1' },

    { id: 'Interlude', label: 'Interlude: Black Swan', group: 'tbmil2' },
    { id: 'carta-9', label: 'C9: Redefinición', group: 'tbmil2' },
    { id: 'carta-10', label: 'C10: Crisis (Espejo)', group: 'tbmil2' },

    { id: 'Interlude-II', label: 'Interlude II: Onírico', group: 'forever' },
    { id: 'carta-11', label: 'C11: Sesgos (Ángel)', group: 'forever' },
    { id: 'carta-12', label: 'C12: Soñar', group: 'forever' },
    { id: 'last-letter', label: 'Carta Final: Demian', group: 'forever' },
    { id: 'wings-outro', label: 'Outro: WINGS', group: 'forever' },

    // NODO ESPECIAL: PORTAL DIMENSIONAL
    { 
        id: 'rumbos-univ', 
        label: '\n\n🌀 PORTAL\nNuevos Rumbos\n(FES Acatlán)', 
        group: 'wormhole', 
        size: 30,
        font: { color: '#00f5d4', size: 12, face: 'Comfortaa', bold: true }
    }
]);

const enlaces = new vis.DataSet([
    { from: 'era-soul', to: 'intro1' },
    { from: 'intro1', to: 'carta-1' },
    { from: 'carta-1', to: 'carta-2' },
    { from: 'carta-2', to: 'carta-3' },
    { from: 'carta-3', to: 'Outro-stay' },
    { from: 'Outro-stay', to: 'era-shadows', dashes: true },
    { from: 'era-shadows', to: 'like-crazy' },
    { from: 'like-crazy', to: 'carta-4' },
    { from: 'carta-4', to: 'carta-5' },
    { from: 'carta-5', to: 'carta-6' },
    { from: 'carta-6', to: 'save-me' },
    { from: 'save-me', to: 'era-tbmil-pt1', dashes: true },
    { from: 'era-tbmil-pt1', to: 'tbmil-intro' },
    { from: 'tbmil-intro', to: 'carta-7' },
    { from: 'carta-7', to: 'carta-8' },
    { from: 'carta-8', to: 'era-tbmil-pt2', dashes: true },
    { from: 'era-tbmil-pt2', to: 'Interlude' },
    { from: 'Interlude', to: 'carta-9' },
    { from: 'carta-9', to: 'carta-10' },
    { from: 'carta-10', to: 'era-tbmil-forever', dashes: true },
    { from: 'era-tbmil-forever', to: 'Interlude-II' },
    { from: 'Interlude-II', to: 'carta-11' },
    { from: 'carta-11', to: 'carta-12' },
    { from: 'carta-12', to: 'last-letter' },
    { from: 'last-letter', to: 'wings-outro' },
    
    // ENLACE LUMINOSO DE HAZ GRAVITACIONAL
    { 
        from: 'wings-outro', 
        to: 'rumbos-univ', 
        dashes: [6, 3], 
        width: 3, 
        color: { color: '#ff007f', highlight: '#00f5d4' } 
    }
]);

// ==========================================================================
// 3. CONFIGURACIÓN VISUAL
// ==========================================================================
const contenedor = document.getElementById('grafo-interactivo');
const datos = { nodes: nodos, edges: enlaces };

const opciones = {
    nodes: {
        shape: 'dot',
        size: 16,
        font: { color: '#ffffff', size: 11, face: 'Comfortaa' },
        borderWidth: 2,
        shadow: { enabled: true, color: 'rgba(0,0,0,0.4)', size: 3 }
    },
    edges: {
        color: { color: 'rgba(255, 255, 255, 0.15)', hover: '#a393eb', highlight: '#48cae4' },
        width: 1.5,
        smooth: { type: 'continuous', roundness: 0.4 }
    },
    groups: {
        eras: { color: { background: '#241f3e', border: '#7209b7' }, size: 22 },
        soul: { color: { background: '#1c3144', border: '#007bc4' } },
        shadows: { color: { background: '#2b2d42', border: '#8d99ae' } },
        tbmil1: { color: { background: '#641220', border: '#e01e37' } },
        tbmil2: { color: { background: '#3c096c', border: '#9d4edd' } },
        forever: { color: { background: '#134647', border: '#48cae4' } },
        wormhole: { 
            shape: 'dot',
            color: { 
                background: 'rgba(0,0,0,0)', // Fondo transparente para evitar la mancha negra al hacer zoom out
                border: 'rgba(0,0,0,0)',
                highlight: { background: 'rgba(0,0,0,0)', border: 'rgba(0,0,0,0)' }
            },
            borderWidth: 0,
            shadow: { enabled: false }
        }
    },
    interaction: { hover: true, dragNodes: true },
    physics: {
        solver: 'forceAtlas2Based',
        forceAtlas2Based: { gravitationalConstant: -140, centralGravity: 0.025, springLength: 80, springConstant: 0.06, damping: 0.5 },
        stabilization: { iterations: 150 }
    }
};

const redGrafos = new vis.Network(contenedor, datos, opciones);
window.network = redGrafos;

// ==========================================================================
// ANIMACIÓN CANVAS EN TIEMPO REAL: VÓRTICE / AGUJERO DE GUSANO FLUIDO
// ==========================================================================
let anguloGiro = 0;

const particulasPortal = Array.from({ length: 18 }, () => ({
    distancia: 12 + Math.random() * 30,
    angulo: Math.random() * Math.PI * 2,
    velocidad: 0.02 + Math.random() * 0.03,
    tamano: 1 + Math.random() * 2.5
}));

redGrafos.on("beforeDrawing", function (ctx) {
    const posNodo = redGrafos.getPositions(['rumbos-univ'])['rumbos-univ'];
    if (!posNodo) return;

    const x = posNodo.x;
    const y = posNodo.y;
    anguloGiro += 0.025;

    ctx.save();

    // 1. Resplandor exterior expansivo
    const pulso = Math.sin(anguloGiro * 2) * 5;
    const gradienteExterior = ctx.createRadialGradient(x, y, 2, x, y, 45 + pulso);
    gradienteExterior.addColorStop(0, 'rgba(0, 245, 212, 0.9)');
    gradienteExterior.addColorStop(0.3, 'rgba(114, 9, 183, 0.6)');
    gradienteExterior.addColorStop(0.7, 'rgba(255, 0, 127, 0.3)');
    gradienteExterior.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.beginPath();
    ctx.arc(x, y, 50 + pulso, 0, Math.PI * 2);
    ctx.fillStyle = gradienteExterior;
    ctx.fill();

    // 2. Anillos espirales en rotación opuesta
    const dibujaEspiral = (radio, color, sentido, lineDash) => {
        ctx.beginPath();
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = color;
        ctx.setLineDash(lineDash);
        ctx.arc(x, y, radio, sentido * anguloGiro, sentido * anguloGiro + Math.PI * 2);
        ctx.stroke();
    };

    dibujaEspiral(30, 'rgba(0, 245, 212, 0.8)', 1, [12, 8]);
    dibujaEspiral(22, 'rgba(255, 0, 127, 0.75)', -1.3, [8, 6]);
    dibujaEspiral(14, 'rgba(114, 9, 183, 0.9)', 1.8, [4, 4]);

    // 3. Partículas orbitando hacia el centro
    particulasPortal.forEach(p => {
        p.angulo += p.velocidad;
        p.distancia -= 0.15;
        if (p.distancia < 4) p.distancia = 35;

        const px = x + Math.cos(p.angulo) * p.distancia;
        const py = y + Math.sin(p.angulo) * p.distancia;

        ctx.beginPath();
        ctx.arc(px, py, p.tamano, 0, Math.PI * 2);
        ctx.fillStyle = p.distancia > 18 ? 'rgba(0, 245, 212, 0.9)' : 'rgba(255, 0, 127, 0.9)';
        ctx.fill();
    });

    // 4. Centro del portal traslúcido y brillante (Sin parche negro sólido)
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(13, 2, 33, 0.85)';
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#00f5d4';
    ctx.stroke();

    ctx.restore();
});

// Renderizado continuo
function animarPortal() {
    redGrafos.redraw();
    requestAnimationFrame(animarPortal);
}
animarPortal();

// ==========================================================================
// 4. LÓGICA DE INTERACCIÓN Y NAVEGACIÓN
// ==========================================================================
redGrafos.on("click", function (params) {
    if (params.nodes.length > 0) {
        const idNodo = params.nodes[0];
        const carta = universoCartas[idNodo];

        if (carta) {
            document.getElementById('carta-titulo').innerText = carta.titulo;

            document.getElementById('carta-contenido').innerHTML = `
                ${carta.texto}
                <div style="margin-top: 25px; text-align: center;">
                    <a href="${carta.rutaHTML}" class="btn-leer-carta">
                        Leer documento completo ➔
                    </a>
                </div>
            `;

            actualizarReproductorSpotify(carta.spotifyId);
        }
    }
});

redGrafos.on("dragEnd", function (params) {
    redGrafos.storePositions();
});

// ==========================================================================
// 5. CONTROLADOR INTERACTIVO DE FILTROS POR ERAS
// ==========================================================================
function filtrarYEnfocarEra(eraSeleccionada) {
    const todosLosNodos = nodos.get();
    const actualizaciones = [];
    const nodosAEnfocar = [];

    todosLosNodos.forEach(nodo => {
        if (eraSeleccionada === 'todos') {
            actualizaciones.push({ id: nodo.id, opacity: 1.0 });
        } else {
            const perteneceAEra = (nodo.group === eraSeleccionada);
            if (perteneceAEra) {
                actualizaciones.push({ id: nodo.id, opacity: 1.0 });
                nodosAEnfocar.push(nodo.id);
            } else {
                actualizaciones.push({ id: nodo.id, opacity: 0.10 });
            }
        }
    });

    nodos.update(actualizaciones);

    if (eraSeleccionada === 'todos') {
        redGrafos.fit({ animation: { duration: 1000, easingFunction: 'easeInOutQuad' } });
    } else if (nodosAEnfocar.length > 0) {
        redGrafos.fit({
            nodes: nodosAEnfocar,
            margin: 50, 
            animation: { duration: 1000, easingFunction: 'easeInOutQuad' }
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const botonesFiltro = document.querySelectorAll('.filtro-era');
    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            botonesFiltro.forEach(b => b.classList.remove('active'));
            boton.classList.add('active');
            const era = boton.getAttribute('data-era');
            filtrarYEnfocarEra(era);
        });
    });
});

// ==========================================================================
// 6. TERMINAL INTERACTIVA VINCULADA A LA BASE DE DATOS
// ==========================================================================
document.getElementById('terminal-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        let inputTexto = this.value.trim();
        procesarComando(inputTexto);
        this.value = '';
    }
});

function procesarComando(comandoCompleto) {
    if (!comandoCompleto) return;

    let partes = comandoCompleto.split(' ');
    let accion = partes[0].toLowerCase();
    let argumento = partes.slice(1).join(' ').replace(/['"]/g, '').trim();

    const tituloCarta = document.getElementById('carta-titulo');
    const contenidoCarta = document.getElementById('carta-contenido');
    const layout = document.querySelector('.layout-principal');
    const nebulosa = document.querySelector('.fondo-nebulosa');

    switch(accion) {
        case 'clear':
            tituloCarta.innerText = "✨ Visor Libre";
            contenidoCarta.innerHTML = `<p style="color: #aaa; font-style: italic;">Consola despejada. Selecciona un nodo en el grafo o usa 'open [id-carta]' para decodificar una nueva memoria.</p>`;
            actualizarReproductorSpotify(null);
            break;
        
        case 'open':
            if (!argumento) {
                alert("Error: Especifica el ID de la carta. Ej: open intro1, open carta-1, open rumbos-univ");
                break;
            }
            
            let cartaSeleccionada = universoCartas[argumento];

            if (cartaSeleccionada) {
                tituloCarta.innerText = cartaSeleccionada.titulo;
                
                contenidoCarta.innerHTML = `
                    <p style="color: #5cf2bd; font-family: 'Fira Code', monospace; font-size: 0.85rem; margin-bottom: 15px;">
                        [INFO] Accediendo a los archivos de la era... Arquetipo decodificado.
                    </p>
                    ${cartaSeleccionada.texto}
                    <div style="margin-top: 25px; text-align: center;">
                        <a href="${cartaSeleccionada.rutaHTML}" class="btn-leer-carta">
                            Leer documento completo ➔
                        </a>
                    </div>
                `;
                
                actualizarReproductorSpotify(cartaSeleccionada.spotifyId);
                redGrafos.focus(argumento, { scale: 1.2, animation: { duration: 800, easingFunction: "easeInOutQuad" } });
            } else {
                alert(`No se encontró ninguna carta con el ID: '${argumento}'. Usa los IDs exactos (ej: carta-1, intro1, rumbos-univ).`);
            }
            break;

        case 'theme':
            if (argumento === 'shadows' || argumento === 'dark') {
                layout.style.background = "linear-gradient(135deg, #050409 0%, #0b0914 50%, #170f26 100%)";
                nebulosa.style.filter = "hue-rotate(50deg) saturate(1.5)";
                contenidoCarta.innerHTML = `<p style="color: #b5179e; margin-top: 15px;"><em>Modo 'Shadows' activado. El cosmos se ha oscurecido...</em></p>`;
            } else if (argumento === 'answer' || argumento === 'epiphany') {
                layout.style.background = "linear-gradient(135deg, #10122c 0%, #1a2544 50%, #2d1b33 100%)";
                nebulosa.style.filter = "hue-rotate(140deg) saturate(1.8) brightness(1.2)";
                contenidoCarta.innerHTML = `<p style="color: #48cae4; margin-top: 15px;"><em>Modo 'Answer' activado. Refracción de luz holográfica detectada.</em></p>`;
            } else if (argumento === 'forever' || argumento === 'young') {
                layout.style.background = "linear-gradient(135deg, #091a24 0%, #0e2730 60%, #1c2e24 100%)";
                nebulosa.style.filter = "hue-rotate(220deg) brightness(0.9) contrast(1.1)";
                contenidoCarta.innerHTML = `<p style="color: #5cf2bd; margin-top: 15px;"><em>Modo 'Young Forever' activado. Nebulosa en estado de calma térmica.</em></p>`;
            } else if (argumento === 'reset' || argumento === 'default') {
                layout.style.background = "linear-gradient(135deg, #161824 0%, #0b0914 50%, #1e1932 100%)";
                nebulosa.style.filter = "none";
                contenidoCarta.innerHTML = `<p style="color: #ffffff; margin-top: 15px;"><em>Cosmos restaurado.</em></p>`;
            } else {
                alert("Temas disponibles: 'shadows', 'answer', 'forever', 'default'");
            }
            break;

        case 'nodes':
            if (typeof window.network === 'undefined') {
                alert("La red no está inicializada.");
                break;
            }

            if (argumento === '--freeze' || argumento === 'stop') {
                window.network.setOptions({ physics: false });
                contenidoCarta.innerHTML = `<p style="color: #ffb3c1; margin-top: 15px;"><strong>[SISTEMA]</strong> Física cuántica del grafo suspendida.</p>`;
            } else if (argumento === '--unfreeze' || argumento === 'start') {
                window.network.setOptions({ physics: true });
                contenidoCarta.innerHTML = `<p style="color: #5cf2bd; margin-top: 15px;"><strong>[SISTEMA]</strong> Fuerzas gravitacionales reactivadas.</p>`;
            } else if (argumento === '--collapse') {
                window.network.setOptions({ physics: { solver: 'forceAtlas2Based', forceAtlas2Based: { gravitationalConstant: -300, springLength: 10 } } });
                contenidoCarta.innerHTML = `<p style="color: #ff5c5c; margin-top: 15px;"><strong>[SISTEMA]</strong> Colapso de masa. Incrementando fuerza centrípeta...</p>`;
            } else if (argumento === '--reset') {
                window.network.setOptions({ physics: { enabled: true, forceAtlas2Based: { gravitationalConstant: -140, springLength: 80 } } });
                contenidoCarta.innerHTML = `<p style="color: #ffffff; margin-top: 15px;"><strong>[SISTEMA]</strong> Gravedad equilibrada en 1G.</p>`;
            } else {
                alert("Parámetros de 'nodes': '--freeze', '--unfreeze', '--collapse', '--reset'");
            }
            break;

        case 'help':
            tituloCarta.innerText = "📟 Manual de Comandos";
            contenidoCarta.innerHTML = `
                <div style="font-family: 'Fira Code', monospace; font-size: 0.85rem; line-height: 1.6; padding-bottom: 20px;">
                    <p style="color: #5cf2bd; margin-bottom: 8px; font-weight: bold;">[NAVEGACIÓN]</p>
                    <p>• <strong>open [id-carta]</strong> - Carga la carta y su música (ej: open intro1, open rumbos-univ).</p>
                    <p>• <strong>clear</strong> - Limpia el visor.</p>
                    
                    <p style="color: #48cae4; margin-top: 15px; margin-bottom: 8px; font-weight: bold;">[FILTROS CÓSMICOS]</p>
                    <p>• <strong>theme shadows / answer / forever / default</strong></p>
                    
                    <p style="color: #ffb3c1; margin-top: 15px; margin-bottom: 8px; font-weight: bold;">[LÓGICA DE NODOS]</p>
                    <p>• <strong>nodes stop / start / --collapse / --reset</strong></p>
                </div>
            `;
            break;

        default:
            alert(`Comando no reconocido: '${accion}'. Escribe 'help' en la terminal para ver la lista.`);
            break;
    }
}

// ==========================================================================
// 7. REPRODUCTOR DE SPOTIFY
// ==========================================================================
function actualizarReproductorSpotify(trackId) {
    const contenedorSpotify = document.getElementById('spotify-wrapper');
    if (!contenedorSpotify) return;

    if (!trackId) {
        contenedorSpotify.innerHTML = `
            <div class="meta-track-panel" style="margin-bottom: 15px; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; text-align: center;">
                <span class="track-name" style="color: #aaa; font-size: 0.85rem;">🎵 Audio no vinculado a esta carta</span>
            </div>
        `;
        return;
    }

    contenedorSpotify.innerHTML = `
        <iframe 
            src="https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=1"
            width="100%" 
            height="80" 
            frameBorder="0" 
            allowfullscreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            style="border-radius: 12px; background: transparent; border: none; margin-bottom: 15px;">
        </iframe>
    `;
}