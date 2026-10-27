/* ═══════════════════════════════════════════════════════════════
   HRZNS Studio™ — JavaScript Interactions & Animations
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Custom Cursor ─────────────────────────────────────────
    const customCursor = document.getElementById('customCursor');
    let cursorX = 0, cursorY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    function updateCursor() {
        currentX += (cursorX - currentX) * 0.15;
        currentY += (cursorY - currentY) * 0.15;
        customCursor.style.transform = `translate(${currentX - 10}px, ${currentY - 10}px)`;
        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    document.addEventListener('mousedown', () => {
        customCursor.classList.add('active');
    });

    document.addEventListener('mouseup', () => {
        setTimeout(() => {
            customCursor.classList.remove('active');
        }, 150);
    });

    // ─── Elements ──────────────────────────────────────────────
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuBackdrop = document.getElementById('menuBackdrop');
    const projectCards = document.querySelectorAll('.project-card');
    const footer = document.querySelector('.footer');

    // ─── Navbar Scroll Effect ──────────────────────────────────
    let lastScroll = 0;

    function handleNavbarScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = scrollY;
    }

    // ─── Navbar Color Inversion on Works Section ────────────────
    const projectsSection = document.getElementById('works');
    if (projectsSection) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navbar.classList.add('nav-inverted');
                } else {
                    navbar.classList.remove('nav-inverted');
                }
            });
        }, {
            rootMargin: '-1px 0px -95% 0px'
        });
        navObserver.observe(projectsSection);
    }

    // ─── Menu Overlay ──────────────────────────────────────────
    // Small dropdown under the nav: the menu button toggles it, a click
    // anywhere else closes it, and the page keeps scrolling
    function openMenu() {
        menuOverlay.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        menuOverlay.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (menuOverlay.classList.contains('active')) closeMenu();
        else openMenu();
    });
    menuClose.addEventListener('click', closeMenu);
    menuBackdrop.addEventListener('click', closeMenu);
    document.addEventListener('click', (e) => {
        if (menuOverlay.classList.contains('active') && !menuOverlay.contains(e.target)) closeMenu();
    });

    // Close menu on nav link click
    document.querySelectorAll('.menu-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (projectDetailOverlay && projectDetailOverlay.classList.contains('active')) {
                closeProjectDetail();
            } else if (menuOverlay.classList.contains('active')) {
                closeMenu();
            }
        }
    });

    // ─── Project Detail Panel ──────────────────────────────────
    const projectDetailOverlay = document.getElementById('projectDetailOverlay');
    const projectDetailClose = document.getElementById('projectDetailClose');
    const projectDetailTitle = document.getElementById('projectDetailTitle');
    const projectDetailTools = document.getElementById('projectDetailTools');
    const projectDetailDescription = document.getElementById('projectDetailDescription');
    const projectDetailCategory = document.getElementById('projectDetailCategory');
    const projectDetailYear = document.getElementById('projectDetailYear');
    const projectDetailRole = document.getElementById('projectDetailRole');
    const projectDetailGallery = document.getElementById('projectDetailGallery');

    // Project data — customize your content here
    const projectData = {
        mmm: {
            title: 'Mail Metro Media',
            category: 'Rebranding',
            year: '2026',
            role: 'Designer, Erretres branding team',
            description: 'Mail Metro Media is the commercial home of a family of UK news brands. I worked on this rebrand as a designer in the Erretres branding team. Together we set out to give it a single, modern voice, built on one idea: we create the environment and the moment to power attention and connection between audience, content and brands. '
                + 'The identity grows from the concept of the highlight. The main logo holds the name within a unique shape made of three horizontal blocks. In its dynamic version each line of text slides inside its container while the blocks expand and contract, always masked, so the name never leaves its bounds. '
                + 'The palette steps away from a wide range of colours. A light, airy base of white and soft greys, with black kept for high-impact moments, builds recognition around coral and a 45° gradient that runs from warm red to orange. '
                + 'Geist sets the voice: Medium for large headlines, Regular for everything else. Geist Mono adds a technical touch to tags, legends and small details. '
                + 'Presentations rest on an eight-column grid and a modular system, where the logo container itself becomes a frame for headlines, portraits and data. Portraits and news imagery are lit with the brand gradient, and AI is only used to adjust the lighting of real photographs, never to create people. '
                + 'Cobranding rules let each title lead with its own colour while the master brand stays present, so Metro, Eliza and Mail Metro Media live together across decks, events, merchandise and every touchpoint.',
            cover: 'assets/img/MMM/mockup MMM.mp4',
            thumb: 'assets/img/MMM/merch/Slide 16_9 - 30.jpg',
            mediaRatio: '16 / 9', // Slides and mockups are 16:9 — keep them uncropped
            tools: ['Figma', 'Illustrator', 'Photoshop', 'After Effects'],
            images: [
                // 1 · Sketches: pop-ups and two layout explorations
                'assets/img/MMM/bocetos/pop-up.jpg',
                'assets/img/MMM/bocetos/slides bocetos 2.jpg',
                'assets/img/MMM/bocetos/slides bocetos2.jpg',
                // 2 · Sketch animation
                'assets/img/MMM/bocetos/bocetos animacion.mp4',
                // 3 · First applications: credential, posters and objects
                //     (so the slides animation lands on a large right slot)
                'assets/img/MMM/merch/Slide 16_9 - 29.jpg',
                { src: 'assets/img/MMM/merch/Slide 16_9 - 31.jpg', col: '1 / 5' },   // billboard, left
                { src: 'assets/img/MMM/merch/Slide 16_9 - 41.jpg', col: '5 / 13' },  // vertical poster, large right
                'assets/img/MMM/merch/Slide 16_9 - 35.jpg',
                // 4 · Presentation system animation (large, right)
                'assets/img/MMM/animacion_slides.mp4',
                // 5 · More applications: merchandise and digital
                'assets/img/MMM/merch/Slide 16_9 - 36.jpg',
                'assets/img/MMM/merch/Slide 16_9 - 38.jpg',
                'assets/img/MMM/merch/favicon2.jpg',
                'assets/img/MMM/merch/image 324.jpg',
                'assets/img/MMM/merch/image 325.jpg',
                'assets/img/MMM/merch/image 326.jpg'
            ]
        },
        baiala: {
            title: 'Baiala',
            category: 'Branding',
            year: '2026',
            role: 'Designer, Erretres branding team',
            locked: true, // Confidential: opens only after the password
            description: 'Baiala is a beach restaurant in Calpe, on the Mediterranean coast, that brings together classic European elegance with a simple, relaxed touch. As a designer in the Erretres branding team, I helped shape a brand that felt timeless and quietly luxurious, never loud. '
                + 'The name is a neologism waiting to be filled with meaning: of dance, of bay, of an aspirational and sophisticated world. So beautiful it means nothing, so mysterious it means everything. '
                + 'The logotype was drawn from the water itself. Its soft, flowing letterforms are traced from the movement of the waves at the shoreline, giving the wordmark a liquid, crafted rhythm. '
                + 'The brand territory, Spicy chillin\', lives the Mediterranean in all its intensities, from dipping your toes to diving in, with sunset as its golden hour. The palette is born from that light: Blue Marine, Warm Yellow, Light Yellow and Off White. '
                + 'Acid Grotesk gives the brand its voice, mostly in its Normal weight for a light, relaxed feel, with Medium kept for emphasis. Layouts follow the Mediterranean horizon, the reflection of the sea and the calm of dusk. '
                + 'A line pattern adds rhythm and recognition. Baiala uses it with restraint and elegance, while Baiala Beach lets it lead in more expressive compositions, keeping both spaces visibly linked.',
            cover: 'assets/img/Baiala/baiala.mp4',
            thumb: 'assets/img/Baiala/image_grande.jpg',
            mediaRatio: '16 / 9',
            tools: ['Figma', 'Illustrator', 'Photoshop', 'InDesign'],
            images: [
                // 1 · Sketches: one animation gathers the exploration, plus the first poster
                { src: 'assets/img/Baiala/bocetos/bocetos animacionbaiala.mp4', zoom: 1.04 },   // video enlarged inside its box
                { src: 'assets/img/Baiala/bocetos/poster.jpg', natural: true },
                // 2 · Identity: logotype versions
                // (navy first so it contrasts with the yellow poster above)
                'assets/img/Baiala/image 328.jpg',
                'assets/img/Baiala/image 330.jpg',
                // 3 · Applications: posters, objects, beach and the final system
                // Exception: these two go large, one above the other
                { src: 'assets/img/Baiala/image 324.jpg', col: '5 / 13' },
                { src: 'assets/img/Baiala/image 327.jpg', col: '5 / 13' },
                { src: 'assets/img/Baiala/image 325.jpg', col: '5 / 13' },   // large
                'assets/img/Baiala/image 326.jpg',
                'assets/img/Baiala/image 331.jpg',
                'assets/img/Baiala/bento.jpg'
            ]
        },
        faro: {
            title: 'Faro Santander',
            category: 'Branding',
            year: '2026',
            role: 'Designer, Erretres branding team',
            description: 'Faro Santander is the cultural foundation of Banco Santander in Spain, housed in the bank\'s historic building, restored and opened as a national museum for major works of art. I designed its identity as part of the Erretres branding team. '
                + 'The identity takes its inspiration from that building and from a single idea: light. Like the lighthouse in its name, the museum becomes a beacon that brings art closer to everyone. '
                + 'Light turns into the graphic system. A beam crosses each artwork and reveals a block of luminous colour that frames names, titles and dates, so every piece feels lit from within. '
                + 'A vivid palette of light tones, from violet and lime to yellow, cyan and coral, contrasts with the classic paintings, while a clean, contemporary typography lets the works and the artists\' names take centre stage. '
                + 'The system unfolds across the city and the museum: street posters, banners, columns and billboards, credentials, tickets, business cards, publications and a website that carry the same light.',
            cover: 'assets/img/Faro santander/edificio.jpg',
            thumb: 'assets/img/Faro santander/medios impresos/image 106.jpg',
            mediaRatio: '16 / 9',
            tools: ['Figma', 'Illustrator', 'Photoshop', 'InDesign'],
            images: [
                // 1 · Concept: light crossing the artwork
                'assets/img/Faro santander/image 119.jpg',
                'assets/img/Faro santander/base recurso grafico.jpg',
                'assets/img/Faro santander/image 120.jpg',
                // 2 · Print media in the city
                'assets/img/Faro santander/medios impresos/image 105.jpg',
                'assets/img/Faro santander/medios impresos/image 106.jpg',
                { src: 'assets/img/Faro santander/medios impresos/image 107.jpg', col: '1 / 5' },   // banners, left
                { src: 'assets/img/Faro santander/medios impresos/image 108.jpg', col: '5 / 13' },  // MUPI, large right
                'assets/img/Faro santander/medios impresos/image 109.jpg',
                'assets/img/Faro santander/medios impresos/image 110.jpg',
                // 3 · Stationery and publications
                'assets/img/Faro santander/medios impresos/image 111.jpg',
                'assets/img/Faro santander/medios impresos/image 116.jpg',
                'assets/img/Faro santander/medios impresos/image 114.jpg',
                'assets/img/Faro santander/medios impresos/image 112.jpg',
                'assets/img/Faro santander/medios impresos/image 117.jpg',
                // 4 · Digital
                // Exception: website header and footer large, favicon small on the left
                { src: 'assets/img/Faro santander/image 105.jpg', col: '5 / 13' },
                { src: 'assets/img/Faro santander/image 106.jpg', col: '5 / 13' },
                { src: 'assets/img/Faro santander/medios impresos/image 115.jpg', col: '1 / 5' }
            ]
        },
        strobe: {
            title: 'Becher',
            category: 'Editorial',
            year: '2025',
            role: 'Creative Direction',
            context: 'Academic project',
            description: 'Becher is an experimental publication that traces the cup as a symbol across time, exploring four meanings it has carried through human history: fertility, union, triumph, and abundance. An everyday object that, when looked at closely, reveals layers of meaning accumulated over centuries. Created alongside my classmates Walter López and Selena Prada, I took on the role of creative director, shaping a visual language built on abstraction and transparency. Each spread works as an independent composition where images overlap, fragment, and dialogue with one another, inviting the reader to see through the object and uncover its deeper significance. The result is a work that moves between the art book and the visual essay, challenging linear reading and proposing an experience where each person finds their own path. Becher was exhibited at the Museo Nacional de Artes Decorativas in Madrid, chosen by the team who runs the museum as one of their favourites.',
            award: 'Exhibited at the Museo Nacional de Artes Decorativas, Madrid. Selected by the museum\'s team as one of their favourites.',
            cover: 'assets/img/becher/img_fullscreen.jpg',
            thumb: 'assets/img/becher/img_fullscreen.jpg',
            tools: ['Figma', 'Photoshop', 'InDesign', 'Illustrator', 'After Effects'],
            images: [
                'assets/img/becher/bechergif.mp4',
                'assets/img/becher/img_fullscreen.jpg',
                'assets/img/becher/img_becher2.jpg',
                'assets/img/becher/img_becher3.jpg',
                'assets/img/becher/img_becher4.jpg',
                { paragraph: true },
                { src: 'assets/img/becher/img_becher5.jpg', col: '5 / 13' },
                { paragraph: true },   // paragraph — last image — paragraph
                'assets/img/becher/img_becher6.jpg'
            ]
        },
        forma: {
            title: 'Cesida',
            category: 'Rebranding',
            year: '2025',
            role: 'Identity Design',
            context: 'Academic project',
            description: 'Cesida is a state organisation based in Madrid that fights to end the stigma surrounding people living with HIV. Its work goes far beyond information: it is about changing the way society looks at and treats those who live with this reality. In this project, my team and I developed a complete redesign for the association, creating a renewed identity, a new website, motion graphics pieces, and a full communication campaign. The goal was to build an image that conveyed closeness and strength in equal measure, moving away from the clinical tone that usually accompanies these subjects. Every visual decision, from the colour palette to the typography, was made to break barriers and bring the message closer to an audience that too often prefers not to listen. The result is a brand that speaks clearly, directly, and without fear.',
            cover: 'assets/img/cesida/cesida_fullscreen.mp4',
            thumb: 'assets/img/cesida/mockup_landing.jpg',
            tools: ['Figma', 'Photoshop', 'InDesign', 'Illustrator', 'After Effects'],
            images: [
                'assets/img/cesida/cesidavideoresumen.mp4',
                'assets/img/cesida/mockup conjunto.jpg',
                'assets/img/cesida/imgcesida1.jpg',
                'assets/img/cesida/imgcesida2.jpg',
                'assets/img/cesida/imgcesida3.jpg',
                'assets/img/cesida/imgcesida4.jpg',
                { src: 'assets/img/cesida/imgcesida4.5.jpg', col: '5 / 13' }, // large, stacked:
                { paragraph: true },                                           // image — paragraph — image
                { src: 'assets/img/cesida/imgcesida5.jpg', col: '5 / 13' },
                'assets/img/cesida/mock up individual amarillo.jpg'
            ]
        },
        nordika: {
            title: 'Dentcob',
            category: 'Web Design',
            year: '2026',
            role: 'UI/UX Design',
            context: 'Freelance project',
            description: 'A web design project focused on creating an attractive and intuitive digital presence for a dental clinic located in Madrid, Spain. The design combines a modern aesthetic with clear navigation, conveying trust and professionalism at first glance. The content management system was custom-built using HTML, CSS and JavaScript, allowing the team to manage content independently.',
            link: 'https://clinicadentcob.com/index.html',
            cover: 'assets/img/dentcob/monitor_video_28s.mp4',
            coverVeil: true, // Light white veil to calm the busy footage
            thumb: 'assets/img/dentcob/Mockupdentcob.jpg',
            tools: ['Google Antigravity', 'VSCode', 'Claude Code', 'Diseño de Prompts'],
            images: [
                'assets/img/dentcob/dentcob.mp4'
            ]
        },
        personal: {
            title: 'Archive',
            category: 'Freelance & Personal Projects',
            year: '2024–2026',
            role: 'Creative Direction',
            description: 'Archive is a collection of personal explorations spanning illustration, 3D, motion graphics, and experimental design. These are works born from creative freedom, with no brief and no client, where the only rule is curiosity. Each piece responds to a different impulse: a texture that caught the eye, an idea that did not fit any professional project, or simply the desire to try something new without fear of getting it wrong. This archive does not aim to be a tidy portfolio but rather a visual diary in constant evolution, a space where mistakes and discoveries coexist with equal ease. Here you see what happens when design stops being a commission and becomes a personal drive, a way of understanding the world and testing your own limits with no pressure other than the need to keep creating.',
            thumb: 'assets/img/archive/animacion_logo.mp4',
            page: 'pages/archive.html', // Archive has its own page — "Next Project" links there
            tools: ['Cinema 4D', 'After Effects', 'Photoshop', 'InDesign', 'Illustrator'],
            images: [
                'assets/img/archive/flame.jpg',
                'assets/img/archive/ASCII.mp4',
                'assets/img/archive/summer.jpg',
                'assets/img/archive/desire final pt.jpg',
                'assets/img/archive/i see you baby boi.jpg',
                'assets/img/archive/sunsun.jpg',
                'assets/img/archive/centralcee.jpg',
                'assets/img/archive/helio.jpg',
                'assets/img/archive/nintendo_camara3_1.jpg'
            ]
        }
    };

    // Order used by the "Next Project" block (same order as the landing page)
    const projectOrder = ['mmm', 'baiala', 'strobe', 'faro', 'nordika', 'forma', 'personal'];

    // Asymmetric 12-column gallery layout (inspired by howardphillips.design).
    // Each row lists the grid-column range of every image in it; images sit
    // glued to each other (no gaps). The pattern repeats.
    const GALLERY_ROWS = [
        ['5 / 13'],            // large — right
        ['1 / 5'],             // small — left (a paragraph sits beside it)
        ['5 / 9', '9 / 13'],   // pair — right
        ['5 / 13'],            // large — right
        ['1 / 5', '5 / 9'],    // pair — left
        ['9 / 13'],            // small — far right
        ['5 / 9']              // small — centre
    ];
    const PD_MAX_LINES = 5;            // Max lines per description paragraph
    const PD_TEXT_BESIDE = '6 / 13';   // Paragraph next to a left image
    const PD_TEXT_BELOW = '5 / 12';    // Paragraph on its own row, under images

    // Split the description into paragraphs of at most PD_MAX_LINES lines,
    // grouping whole sentences, estimated from the text column width
    function splitDescription(text) {
        if (!text) return [];
        const probe = projectDetailDescription;
        const width = (probe.parentElement.clientWidth || 800) * (7 / 8); // narrowest slot: 7 of 8 columns
        const fontSize = parseFloat(getComputedStyle(probe).fontSize) || 28;
        const charsPerLine = Math.max(20, Math.floor(width / (fontSize * 0.42))); // ~0.42em per Helvetica char
        const budget = charsPerLine * PD_MAX_LINES;
        const sentences = text.match(/[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g) || [text];

        const paragraphs = [];
        let current = '';
        sentences.forEach((sentence) => {
            const s = sentence.trim();
            if (!s) return;
            if (current && (current + ' ' + s).length > budget) {
                paragraphs.push(current);
                current = s;
            } else {
                current = current ? `${current} ${s}` : s;
            }
        });
        if (current) paragraphs.push(current);
        return paragraphs;
    }

    function createTextCell(text, column) {
        const cell = document.createElement('div');
        cell.className = 'pd-text-cell';
        cell.style.gridColumn = column;
        const p = document.createElement('p');
        p.className = 'pd-text';
        p.textContent = text;
        cell.appendChild(p);
        return cell;
    }

    // Helper: create a media element (image or video)
    function createMediaElement(src, alt) {
        const isVideo = /\.(mp4|webm|mov)$/i.test(src);
        let el;

        if (isVideo) {
            el = document.createElement('video');
            el.src = src;
            el.autoplay = true;
            el.loop = true;
            el.muted = true;
            el.playsInline = true;
        } else {
            el = document.createElement('img');
            el.src = src;
            el.alt = alt || 'Project image';
            el.loading = 'lazy';
        }

        el.className = 'pd-media';
        return el;
    }

    // Images glued together; the remaining description paragraphs fill the
    // right side: beside a left image, and on their own rows under images
    function buildGallery(images, title, paragraphs = []) {
        projectDetailGallery.innerHTML = '';
        const texts = [...paragraphs];

        const addTextRow = () => {
            const row = document.createElement('div');
            row.className = 'pd-grid pd-gallery-row pd-text-row';
            row.appendChild(createTextCell(texts.shift(), PD_TEXT_BELOW));
            projectDetailGallery.appendChild(row);
        };

        if (images.length === 0) {
            const placeholder = document.createElement('div');
            placeholder.className = 'pd-gallery-placeholder';
            placeholder.innerHTML = '<span>Coming soon</span>';
            projectDetailGallery.appendChild(placeholder);
            while (texts.length) addTextRow();
            return;
        }

        // Count the image rows first, so paragraphs can be spread evenly
        // through the whole gallery instead of bunching at the start
        let totalRows = 0;
        for (let n = 0; n < images.length; totalRows++) {
            n += GALLERY_ROWS[totalRows % GALLERY_ROWS.length].length;
        }
        const textEvery = Math.max(2, Math.floor(totalRows / (texts.length + 1)));

        let i = 0;
        let rowIndex = 0;
        let textPending = false;
        const manualText = images.some(e => e && e.paragraph);

        while (i < images.length) {
            // { paragraph: true } places the next paragraph exactly here
            if (images[i] && images[i].paragraph) {
                if (texts.length) addTextRow();
                textPending = false;
                i++;
                continue;
            }

            // An entry can set its own column — { src, col: '1 / 5' } — or
            // { src, wide: true } for a large right slot. That row still counts
            // as a zigzag row, so the pieces after it keep their place in the pattern.
            const current = images[i];
            const custom = typeof current === 'object' && (current.col || current.wide);
            const pattern = custom
                ? [current.col || GALLERY_ROWS[0][0]]
                : GALLERY_ROWS[rowIndex % GALLERY_ROWS.length];
            const row = document.createElement('div');
            row.className = 'pd-grid pd-gallery-row';
            if (custom) row.dataset.pinned = 'true'; // placed by hand: closing rule leaves it alone

            let rowClosed = false;
            pattern.forEach((column, slot) => {
                if (i >= images.length || rowClosed) return;
                // A pattern row stops before an entry that sets its own position
                const next = images[i];
                if (!custom && slot > 0 && typeof next === 'object' && (next.col || next.wide || next.paragraph)) {
                    rowClosed = true;
                    return;
                }
                const figure = document.createElement('figure');
                figure.className = 'pd-figure';
                figure.style.gridColumn = column;
                // Entries are a path, or an object: { src, natural: true } keeps the image's own ratio
                const entry = images[i];
                const src = typeof entry === 'string' ? entry : entry.src;
                if (entry.natural) figure.classList.add('pd-figure--natural');
                const media = createMediaElement(src, `${title} — image ${i + 1}`);
                // { zoom: 1.2 } enlarges the media inside its box (edges are cropped)
                if (entry.zoom) media.style.transform = `scale(${entry.zoom})`;
                figure.appendChild(media);
                row.appendChild(figure);
                i++;
            });

            // Every `textEvery` rows a paragraph: beside a lone left image when
            // there's one, otherwise on its own row under the images
            // A paragraph that falls between two pinned pieces is postponed, so
            // pieces placed together (e.g. two large images) stay stacked
            // With hand-placed paragraphs, automatic ones only go beside a left image
            if ((rowIndex + 1) % textEvery === 0 && texts.length) textPending = true;
            const loneLeft = pattern.length === 1 && pattern[0] === '1 / 5';
            const nextEntry = images[i];
            const nextPinned = custom && typeof nextEntry === 'object' && (nextEntry.col || nextEntry.wide);
            if (textPending && loneLeft && texts.length) {
                row.appendChild(createTextCell(texts.shift(), PD_TEXT_BESIDE));
                textPending = false;
            }

            projectDetailGallery.appendChild(row);
            rowIndex++;

            if (textPending && !manualText && !nextPinned && texts.length && i < images.length) {
                addTextRow();
                textPending = false;
            }
        }

        // Closing images: the last image row gets the same large size as the
        // first one; two images become two large rows, one under the other
        const imageRows = [...projectDetailGallery.querySelectorAll('.pd-gallery-row:not(.pd-text-row)')];
        const lastRow = imageRows[imageRows.length - 1];
        if (lastRow && imageRows.length > 1 && !lastRow.dataset.pinned) {
            const figures = [...lastRow.querySelectorAll('.pd-figure')];
            const besideText = lastRow.querySelector('.pd-text-cell');
            const rows = figures.map((figure) => {
                const row = document.createElement('div');
                row.className = 'pd-grid pd-gallery-row';
                figure.style.gridColumn = GALLERY_ROWS[0][0]; // same as the first, large image
                row.appendChild(figure);
                return row;
            });
            if (besideText) {
                besideText.style.gridColumn = PD_TEXT_BELOW;
                const textRow = document.createElement('div');
                textRow.className = 'pd-grid pd-gallery-row pd-text-row';
                textRow.appendChild(besideText);
                rows.push(textRow);
            }
            lastRow.replaceWith(...rows);
        }

        // Whatever is left goes under the last images
        while (texts.length) addTextRow();
    }

    // "Next Project" block
    const nextLink = document.getElementById('projectDetailNextLink');
    const nextName = document.getElementById('projectDetailNextName');

    function renderNextProject(projectId) {
        const idx = projectOrder.indexOf(projectId);
        const nextId = projectOrder[(idx + 1) % projectOrder.length];
        const next = projectData[nextId];
        if (!next) return;

        nextName.textContent = next.title;
        nextLink.href = next.page || 'javascript:void(0)';
        nextLink.dataset.next = nextId;
    }

    nextLink.addEventListener('click', (e) => {
        const next = projectData[nextLink.dataset.next];
        if (next && !next.page) {
            e.preventDefault();
            openProjectDetail(nextLink.dataset.next);
        }
    });

    // ─── Detail cover ─────────────────────────────────────────
    // Full-screen cover above the title. Uses `cover` (image/video) when a
    // project has one, otherwise a colour block (`coverColor`). On scroll it
    // drifts slower than the content and eases away (parallax).
    const projectDetailPanel = document.getElementById('projectDetailPanel');
    const coverSection = document.getElementById('projectDetailCover');
    const coverMedia = document.getElementById('projectDetailCoverMedia');
    const COVER_DRIFT = 0.45;   // Fraction of the scroll the cover follows (0 = fixed, 1 = normal)
    const COVER_COLORS = {
        mmm: '#FF4444',
        baiala: '#0F233B',
        faro: '#7B61FF',
        strobe: '#2B3A55', forma: '#6B7B6A', nordika: '#C9A27E',
        personal: '#FF6A1F',
    };

    function renderCover(projectId, data) {
        coverMedia.innerHTML = '';
        coverMedia.style.background = data.coverColor || COVER_COLORS[projectId] || '#FF6A1F';
        if (data.cover) coverMedia.appendChild(createMediaElement(data.cover, data.title));
        coverSection.classList.toggle('has-veil', !!data.coverVeil);
        coverMedia.style.transform = '';
    }

    const detailHeader = document.querySelector('.project-detail-header');

    // Header is transparent while the cover is under it, solid once it's gone
    function syncDetailHeader() {
        if (!detailHeader || !coverSection) return;
        const navH = detailHeader.offsetHeight;
        const coverBottom = coverSection.offsetTop + coverSection.offsetHeight;
        detailHeader.classList.toggle('is-over-cover', projectDetailPanel.scrollTop + navH < coverBottom);
    }

    let coverTicking = false;
    if (projectDetailPanel && coverSection) {
        projectDetailPanel.addEventListener('scroll', () => {
            if (coverTicking) return;
            coverTicking = true;
            requestAnimationFrame(() => {
                syncDetailHeader();
                const y = projectDetailPanel.scrollTop;
                const h = coverSection.offsetHeight || 1;
                if (y <= h) {
                    const p = y / h;
                    coverMedia.style.transform = `translate3d(0, ${(y * COVER_DRIFT).toFixed(1)}px, 0) scale(${(1 + p * 0.06).toFixed(4)})`;
                }
                coverTicking = false;
            });
        }, { passive: true });
    }

    function openProjectDetail(projectId) {
        const data = projectData[projectId];
        if (!data) return;

        // Confidential projects ask for the password first
        if (data.locked && !isProjectUnlocked(projectId)) {
            requestProjectUnlock(projectId);
            return;
        }

        // Intro content
        document.getElementById('projectDetailTag').textContent = data.category;
        projectDetailTitle.textContent = data.title;

        // Description in short paragraphs: the first stays in the intro,
        // the rest are spread through the gallery
        const paragraphs = splitDescription(data.description || '');
        projectDetailDescription.textContent = paragraphs[0] || '';

        // Recognition badge (e.g. an exhibition) under the title
        const awardEl = document.getElementById('projectDetailAward');
        if (awardEl) {
            awardEl.hidden = !data.award;
            document.getElementById('projectDetailAwardText').textContent = data.award || '';
        }

        // Metadata
        projectDetailCategory.textContent = data.category;
        projectDetailYear.textContent = data.year;
        projectDetailRole.textContent = data.role;
        // Context (academic, freelance…) — only shown when a project has one
        document.getElementById('projectDetailContextItem').hidden = !data.context;
        document.getElementById('projectDetailContext').textContent = data.context || '';
        projectDetailTools.textContent = (data.tools && data.tools.length) ? data.tools.join('\n') : '—';

        // "Visit Website" — only for projects with a link (e.g. Dentcob)
        const projectLink = document.getElementById('projectDetailLink');
        if (data.link) {
            projectLink.href = data.link;
            projectLink.hidden = false;
        } else {
            projectLink.hidden = true;
        }

        // Gallery + next project
        renderCover(projectId, data);
        // Per-project media ratio (e.g. 16:9 slides) so images aren't cropped
        projectDetailGallery.style.setProperty('--pd-media-ratio', data.mediaRatio || '');
        if (!data.mediaRatio) projectDetailGallery.style.removeProperty('--pd-media-ratio');
        buildGallery(data.images || [], data.title, paragraphs.slice(1));
        renderNextProject(projectId);

        // Scroll panel to top
        const panel = document.getElementById('projectDetailPanel');
        if (panel) panel.scrollTop = 0;
        syncDetailHeader();

        // Open overlay
        projectDetailOverlay.classList.add('active');
        document.body.classList.add('menu-open');
    }

    function closeProjectDetail() {
        projectDetailOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    // ─── Confidential projects (password gate) ─────────────────
    // A light client-side gate: it keeps confidential work out of casual view
    // and asks visitors for a password you share with them. Only a SHA-256 hash
    // of the password lives in the code. Unlocking lasts for the browser session.
    const LOCK_HASH = '728fb445f657800383a72105bf84d3a5ea05406cb202b1d310045bc9b9f5badf';
    const LOCK_STORAGE_KEY = 'unlockedProjects';
    const projectLock = document.getElementById('projectLock');
    const projectLockForm = document.getElementById('projectLockForm');
    const projectLockInput = document.getElementById('projectLockInput');
    const projectLockError = document.getElementById('projectLockError');
    const projectLockTitle = document.getElementById('projectLockTitle');
    let pendingLockedProject = null;

    function readUnlocked() {
        try { return JSON.parse(sessionStorage.getItem(LOCK_STORAGE_KEY)) || []; } catch (e) { return []; }
    }

    function isProjectUnlocked(projectId) {
        return readUnlocked().includes(projectId);
    }

    function markProjectUnlocked(projectId) {
        const list = readUnlocked();
        if (!list.includes(projectId)) list.push(projectId);
        try { sessionStorage.setItem(LOCK_STORAGE_KEY, JSON.stringify(list)); } catch (e) { /* private mode */ }
        document.querySelectorAll(`.project-icon-wrapper[data-project="${projectId}"]`).forEach(w => {
            const card = w.closest('.project-card');
            if (card) card.classList.add('is-unlocked');
        });
    }

    async function sha256(text) {
        const data = new TextEncoder().encode(text);
        const digest = await crypto.subtle.digest('SHA-256', data);
        return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
    }

    function requestProjectUnlock(projectId) {
        if (!projectLock) return;
        pendingLockedProject = projectId;
        projectLockTitle.textContent = projectData[projectId].title;
        projectLockError.hidden = true;
        projectLockInput.value = '';
        projectLock.classList.add('active');
        projectLock.setAttribute('aria-hidden', 'false');
        setTimeout(() => projectLockInput.focus(), 50);
    }

    function closeProjectLock() {
        if (!projectLock) return;
        projectLock.classList.remove('active', 'is-wrong');
        projectLock.setAttribute('aria-hidden', 'true');
        pendingLockedProject = null;
    }

    if (projectLockForm) {
        projectLockForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const projectId = pendingLockedProject;
            let ok = false;
            try { ok = (await sha256(projectLockInput.value.trim())) === LOCK_HASH; } catch (err) { ok = false; }
            if (!ok || !projectId) {
                projectLockError.hidden = false;
                projectLock.classList.remove('is-wrong');
                void projectLock.offsetWidth; // restart the shake
                projectLock.classList.add('is-wrong');
                projectLockInput.select();
                return;
            }
            markProjectUnlocked(projectId);
            closeProjectLock();
            openProjectDetail(projectId);
        });
        document.getElementById('projectLockCancel').addEventListener('click', closeProjectLock);
        document.getElementById('projectLockBackdrop').addEventListener('click', closeProjectLock);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && projectLock.classList.contains('active')) closeProjectLock();
        });
    }

    // Cards already unlocked this session show their image unblurred
    readUnlocked().forEach(id => {
        document.querySelectorAll(`.project-icon-wrapper[data-project="${id}"]`).forEach(w => {
            const card = w.closest('.project-card');
            if (card) card.classList.add('is-unlocked');
        });
    });

    // Click handlers for project icons
    document.querySelectorAll('.project-icon-wrapper[data-project]').forEach(wrapper => {
        wrapper.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = wrapper.getAttribute('data-project');
            openProjectDetail(projectId);
        });
    });

    // Close handlers
    if (projectDetailClose) {
        projectDetailClose.addEventListener('click', closeProjectDetail);
    }

    // ─── Project Cards — Visibility (horizontal row) ──────────
    // A project "enters" once it slides into view inside the pinned stage
    function handleProjectVisibility() {
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        projectCards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const inView = rect.left < vw * 0.92 && rect.right > vw * 0.08
                && rect.top < vh && rect.bottom > 0;
            card.classList.toggle('visible', inView);
        });
    }

    // ─── Project Cards — Depth on the Visuals ─────────────────
    // Visuals ease to full size near the center of the screen, slightly
    // smaller towards the edges, as the row slides past
    function handleProjectParallax() {
        const vw = window.innerWidth;

        projectCards.forEach((card) => {
            const icon = card.querySelector('.project-icon-wrapper');
            if (!icon) return;
            if (!card.classList.contains('visible')) {
                icon.style.transform = ''; // Let the entrance animation replay next time
                return;
            }
            const rect = card.getBoundingClientRect();
            const dist = Math.min(1, Math.abs(rect.left + rect.width / 2 - vw / 2) / vw);
            icon.style.transform = `scale(${(1 - dist * 0.06).toFixed(4)})`;
        });
    }

    // ─── Projects — Horizontal Scroll ─────────────────────────
    // The section is as tall as the row is wide (100vh + overflow). Its stage
    // sticks while a critically damped spring follows the scroll: the stage
    // glides over the hero on the way in, then the track moves left so the
    // rest of the projects come into view. After the last one the page
    // continues to the footer.
    const projectsPin = document.getElementById('projectsPin');
    const projectsTrack = document.getElementById('projectsTrack');
    const ROW_SPRING = 22;                         // Higher = follows the scroll more tightly
    const ROW_DAMPING = 2 * Math.sqrt(ROW_SPRING); // Critically damped: no overshoot
    const rowReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const rowVertical = window.matchMedia('(max-width: 768px)'); // Mobile: plain vertical list
    let rowTravel = 0;
    let rowProgress = 0;
    let rowScroll = window.scrollY;

    // Rail dots: one per project on the "Selected projects" rule. They leave
    // grouped from the start of the rail; the group slides along with the
    // scroll and drops one dot above each card's top-left corner.
    const RAIL_GROUP_SPACING = 0.75; // Distance between grouped dots, × dot size (<1 = slightly overlapping)
    const RAIL_LOCK_BY = 0.9;       // Progress at which the last dot locks
    const projectsHeader = projectsTrack ? projectsTrack.querySelector('.projects-header') : null;
    const railDots = [];   // [{ drop, core }] — drop silhouettes below, orange cores on top
    let railTargets = [];
    let railDotSize = 18;
    if (projectsHeader) {
        const rail = document.createElement('div');
        rail.className = 'projects-rail';
        rail.setAttribute('aria-hidden', 'true');
        const drops = projectCards.length ? [...projectCards].map(() => {
            const drop = document.createElement('span');
            drop.className = 'rail-drop';
            rail.appendChild(drop);
            return drop;
        }) : [];
        drops.forEach(drop => {
            const core = document.createElement('span');
            core.className = 'rail-core';
            rail.appendChild(core);
            railDots.push({ drop, core });
        });
        projectsHeader.appendChild(rail);
    }

    function measureRailTargets() {
        if (!projectsHeader || !railDots.length) return;
        const dotSize = railDots[0].core.offsetWidth || 18;
        railDotSize = dotSize;
        // Card left edge in the header's coordinates, dot sitting flush on the corner
        railTargets = [...projectCards].map(card => card.offsetLeft - projectsHeader.offsetLeft + dotSize / 2);
    }

    function renderRailDots() {
        if (!railDots.length || !railTargets.length) return;
        // The group starts at the first card's corner and travels to the last one
        const first = railTargets[0];
        const last = railTargets[railTargets.length - 1];
        const lead = first + Math.min(1, rowProgress / RAIL_LOCK_BY) * (last - first);
        const xs = railTargets.map((target, i) => Math.min(target, lead + i * RAIL_GROUP_SPACING * railDotSize));

        railDots.forEach(({ drop, core }, i) => {
            const t = `translate3d(${xs[i].toFixed(2)}px, 0, 0)`;
            drop.style.transform = t;
            core.style.transform = t;

            // Each side fades orange → white → rule only when it's free; a side
            // facing a close neighbour hides its tail (the overlapping cores join
            // the drops), and the tail comes back as the drops move apart
            const gapL = i > 0 ? xs[i] - xs[i - 1] : Infinity;
            const gapR = i < xs.length - 1 ? xs[i + 1] - xs[i] : Infinity;
            const bg = railDropGradient(railSideFree(gapL), railSideFree(gapR));
            if (drop.dataset.bg !== bg) {
                drop.dataset.bg = bg;
                drop.style.background = bg;
            }
        });

        // The Archive mist flows while the last dot sits on its card
        const lastIndex = xs.length - 1;
        setArchiveArrived(xs[lastIndex] >= railTargets[lastIndex] - 0.5);
    }

    // Archive card mist: rests on a still frame, flows while the dot (or, on
    // mobile, the card) is there, and freezes again when it leaves.
    const archiveMist = window.createArchiveMist
        ? window.createArchiveMist(document.getElementById('archiveMist'))
        : null;
    let archiveArrived = false;

    function setArchiveArrived(arrived) {
        if (!archiveMist || arrived === archiveArrived) return;
        archiveArrived = arrived;
        if (arrived) archiveMist.start();
        else archiveMist.stop();
    }

    // 0 = neighbour touching (tail hidden) · 1 = free side (full fade)
    function railSideFree(gap) {
        const dropWidth = railDotSize * 7;
        return Math.max(0, Math.min(1, (gap - railDotSize) / (dropWidth - railDotSize)));
    }

    function railDropGradient(freeL, freeR) {
        const white = k => `rgba(255, 255, 255, ${k.toFixed(3)})`;
        const orange = k => `rgba(255, 106, 31, ${k.toFixed(3)})`;
        return `linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 14%, `
            + `${white(freeL)} 30%, ${orange(freeL)} 40%, #FF6A1F 43%, #FF6A1F 57%, `
            + `${orange(freeR)} 60%, ${white(freeR)} 70%, rgba(255, 255, 255, 0) 86%, rgba(255, 255, 255, 0) 100%)`;
    }
    let rowVelocity = 0;
    let rowLoopId = null;
    let rowLastTime = 0;

    function measureProjectRow() {
        if (!projectsSection || !projectsTrack) return;
        if (rowVertical.matches) {
            rowTravel = 0;
            projectsSection.style.height = '';
            return;
        }
        rowTravel = Math.max(0, projectsTrack.scrollWidth - window.innerWidth);
        projectsSection.style.height = `${window.innerHeight + rowTravel}px`;
        measureRailTargets();
    }

    function renderProjectRow() {
        if (!projectsSection || !projectsPin || !projectsTrack) return;
        const sectionTop = projectsSection.getBoundingClientRect().top + window.scrollY;

        if (rowVertical.matches) {
            // Vertical list: no pinning or horizontal travel, only reveal the cards
            projectsPin.style.transform = '';
            projectsTrack.style.transform = '';
            handleProjectVisibility();
            // No rail on mobile: the Archive mist flows when its card shows up
            const archiveCard = document.getElementById('project-personal');
            setArchiveArrived(!!archiveCard && archiveCard.classList.contains('visible'));
            return;
        }

        // Entry: glide the stage over the hero with the smoothed scroll
        const stuckTop = Math.max(0, sectionTop - window.scrollY);
        const smoothTop = Math.max(0, sectionTop - rowScroll);
        const offset = smoothTop - stuckTop;
        projectsPin.style.transform = Math.abs(offset) < 0.5 ? '' : `translate3d(0, ${offset.toFixed(2)}px, 0)`;

        // Horizontal travel across the row
        const progress = rowTravel > 0
            ? Math.max(0, Math.min(1, (rowScroll - sectionTop) / rowTravel))
            : 0;
        projectsTrack.style.transform = `translate3d(${(-progress * rowTravel).toFixed(2)}px, 0, 0)`;
        rowProgress = progress;
        renderRailDots();

        // Top light sweeps left → right from the box entering to the end of the page (footer)
        const revealStart = sectionTop - window.innerHeight;
        const revealEnd = document.documentElement.scrollHeight - window.innerHeight;
        const reveal = revealEnd > revealStart
            ? Math.max(0, Math.min(1, (rowScroll - revealStart) / (revealEnd - revealStart)))
            : 1;
        projectsPin.style.setProperty('--top-reveal', reveal.toFixed(4));

        handleProjectVisibility();
        handleProjectParallax();
    }

    function rowLoop(now) {
        const dt = Math.max(Math.min((now - rowLastTime) / 1000, 0.05), 0.001);
        rowLastTime = now;

        const target = window.scrollY;
        const steps = Math.ceil(dt * 120);
        const h = dt / steps;
        for (let s = 0; s < steps; s++) {
            const acc = (target - rowScroll) * ROW_SPRING - rowVelocity * ROW_DAMPING;
            rowVelocity += acc * h;
            rowScroll += rowVelocity * h;
        }

        const settled = Math.abs(target - rowScroll) < 0.3 && Math.abs(rowVelocity) < 2;
        if (settled) {
            rowScroll = target;
            rowVelocity = 0;
        }
        renderProjectRow();
        rowLoopId = settled ? null : requestAnimationFrame(rowLoop);
    }

    function handleProjectRow() {
        if (rowReducedMotion.matches) {
            rowScroll = window.scrollY;
            renderProjectRow();
            return;
        }
        if (!rowLoopId) {
            rowLastTime = performance.now();
            rowLoopId = requestAnimationFrame(rowLoop);
        }
    }

    window.addEventListener('scroll', handleProjectRow, { passive: true });
    window.addEventListener('resize', () => {
        measureProjectRow();
        rowScroll = window.scrollY;
        rowVelocity = 0;
        renderProjectRow();
    });
    window.addEventListener('load', () => {
        measureProjectRow();
        renderProjectRow();
    });
    rowVertical.addEventListener('change', () => {
        measureProjectRow();
        renderProjectRow();
    });
    measureProjectRow();
    renderProjectRow();

    // ─── Footer — IntersectionObserver ─────────────────────────
    const footerObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.2 }
    );

    if (footer) {
        footerObserver.observe(footer);
    }

    // ─── Smooth Scroll for All Anchors ─────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ─── Scroll Event Listeners ────────────────────────────────
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleNavbarScroll();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // ─── Initial State ─────────────────────────────────────────
    handleNavbarScroll();

    // ─── Cursor Trail Effect (subtle) ──────────────────────────
    const cursorTrail = document.createElement('div');
    cursorTrail.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid rgba(0,0,0,0.15);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease-out, opacity 0.15s ease;
        mix-blend-mode: normal;
        opacity: 0;
    `;
    document.body.appendChild(cursorTrail);

    let cursorVisible = false;

    document.addEventListener('mousemove', (e) => {
        cursorTrail.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
        if (!cursorVisible) {
            cursorVisible = true;
            cursorTrail.style.opacity = '1';
        }
    });

    document.addEventListener('mouseleave', () => {
        cursorVisible = false;
        cursorTrail.style.opacity = '0';
    });

    // Scale cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorTrail.style.width = '40px';
            cursorTrail.style.height = '40px';
            cursorTrail.style.transform = `translate(${parseInt(cursorTrail.style.transform.split('(')[1]) - 10}px, ${parseInt(cursorTrail.style.transform.split(',')[1]) - 10}px)`;
            cursorTrail.style.borderColor = 'rgba(0,0,0,0.3)';
        });
        el.addEventListener('mouseleave', () => {
            cursorTrail.style.width = '20px';
            cursorTrail.style.height = '20px';
            cursorTrail.style.borderColor = 'rgba(0,0,0,0.15)';
        });
    });

    // ─── Intro Video ───────────────────────────────────────────
    const introOverlay = document.getElementById('introOverlay');
    const introVideo = document.getElementById('introVideo');

    if (introOverlay && introVideo) {
        // Lock scroll during intro
        document.body.classList.add('intro-active');
        document.body.style.opacity = '1';

        // When video ends → fade out overlay, reveal landing
        introVideo.addEventListener('ended', () => {
            introOverlay.classList.add('fade-out');
            document.body.classList.remove('intro-active');

            // Remove overlay from DOM after fade transition
            setTimeout(() => {
                introOverlay.classList.add('hidden');
            }, 2000);
        });

        // Click to skip intro
        introOverlay.addEventListener('click', () => {
            introVideo.pause();
            introOverlay.classList.add('fade-out');
            document.body.classList.remove('intro-active');

            setTimeout(() => {
                introOverlay.classList.add('hidden');
            }, 2000);
        });

        // Fallback: if video fails to load, remove overlay
        introVideo.addEventListener('error', () => {
            introOverlay.classList.add('hidden');
            document.body.classList.remove('intro-active');
        });
    } else {
        // No intro video → normal fade in
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
        });
    }

    // ─── Hero ASCII Dots Sphere ─────────────────────────────────
    const heroWaveCanvas = document.getElementById('heroWaveCanvas');
    if (heroWaveCanvas) {
        const ctx = heroWaveCanvas.getContext('2d');
        const heroEl = document.getElementById('hero') || heroWaveCanvas.parentElement;
        let asciiAnimId = null;
        let asciiTime = 0;
        let isHeroVisible = true;
        let lastFrameTime = 0;

        const CELL_SIZE = 10;
        const SPHERE_RATIO = 0.8;               // Sphere diameter relative to hero height
        const LIGHT = { x: -0.45, y: -0.55, z: 0.7 }; // Light direction (top-left, front)
        // Canvas background follows the Warm / Cold theme (--paper)
        const readPaper = () => getComputedStyle(document.documentElement).getPropertyValue('--paper').trim() || '#F4EEED';
        let BG_COLOR = readPaper();
        document.addEventListener('themechange', () => {
            // Read after the attribute flips (next frame), so the new value is live
            requestAnimationFrame(() => { BG_COLOR = readPaper(); });
        });
        const DOT_RGB = '255, 106, 31';           // Orange dots and circles
        const GLOW_FROM = [255, 106, 31];         // Glow behind the dots: orange…
        const GLOW_TO = [255, 200, 69];           // …to yellow at the strongest waves
        const GLOW_SCALE = 0.2;                   // Glow layer resolution (soft by design)
        const GLOW_BLUR = 10;                     // Extra blur when drawing the glow (px)

        // Low-res layer where every dot leaves a soft halo; halos overlap and
        // blend, so the dots melt into each other through a subtle gradient
        const glowCanvas = document.createElement('canvas');
        const glowCtx = glowCanvas.getContext('2d');
        const dots = [];

        // Mouse tracking (px relative to canvas, null = not moved yet)
        const asciiMouse = { x: null, y: null };

        // Wave sources on the sphere surface (normalized -1..1, scaled each frame)
        const waves = [];
        for (let i = 0; i < 3; i++) {
            waves.push({
                rx: (Math.random() - 0.5) * 1.2,
                ry: (Math.random() - 0.5) * 1.2,
                frequency: 0.2 + Math.random() * 0.3,
                amplitude: 0.5 + Math.random() * 0.5,
                phase: Math.random() * Math.PI * 2,
                speed: 0.5 + Math.random() * 0.5,
            });
        }

        function resizeAscii() {
            const rect = heroWaveCanvas.parentElement.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            heroWaveCanvas.width = rect.width * dpr;
            heroWaveCanvas.height = rect.height * dpr;
            heroWaveCanvas.style.width = rect.width + 'px';
            heroWaveCanvas.style.height = rect.height + 'px';
            ctx.scale(dpr, dpr);
            glowCanvas.width = Math.max(1, Math.round(rect.width * GLOW_SCALE));
            glowCanvas.height = Math.max(1, Math.round(rect.height * GLOW_SCALE));
        }

        resizeAscii();
        window.addEventListener('resize', resizeAscii);

        heroEl.addEventListener('mousemove', (e) => {
            const rect = heroWaveCanvas.getBoundingClientRect();
            asciiMouse.x = e.clientX - rect.left;
            asciiMouse.y = e.clientY - rect.top;
        });

        // Projects a point on the sphere's disc (normalized, r = 1 at the edge)
        // to "surface" coords, so waves bend around the sphere like on a globe.
        // Points beyond the edge keep going linearly so the cursor wave stays continuous.
        function toSurface(nx, ny, radiusCells) {
            const r = Math.sqrt(nx * nx + ny * ny);
            if (r === 0) return { x: 0, y: 0 };
            const arc = r <= 1 ? Math.asin(r) : Math.PI / 2 + (r - 1);
            const k = (arc / r) * radiusCells;
            return { x: nx * k, y: ny * k };
        }

        // Pause when off-screen, or when the first project has covered the
        // (sticky) hero completely
        let heroIntersecting = true;
        let heroCovered = false;

        function syncAsciiVisibility() {
            isHeroVisible = heroIntersecting && !heroCovered;
            if (isHeroVisible && !asciiAnimId) {
                lastFrameTime = performance.now();
                asciiAnimId = requestAnimationFrame(animateAscii);
            }
        }

        const asciiObserver = new IntersectionObserver((entries) => {
            heroIntersecting = entries[0].isIntersecting;
            syncAsciiVisibility();
        }, { threshold: 0.05 });
        asciiObserver.observe(heroWaveCanvas.parentElement);

        if (projectCards.length) {
            const checkHeroCovered = () => {
                const stage = document.getElementById('projectsPin') || projectCards[0];
                const covered = stage.getBoundingClientRect().top <= 0;
                if (covered !== heroCovered) {
                    heroCovered = covered;
                    syncAsciiVisibility();
                }
            };
            window.addEventListener('scroll', checkHeroCovered, { passive: true });
            checkHeroCovered();
        }

        function animateAscii(timestamp) {
            if (!isHeroVisible) { asciiAnimId = null; return; }

            const delta = Math.min((timestamp - lastFrameTime) / 1000, 0.1);
            lastFrameTime = timestamp;
            asciiTime += delta * 0.75;

            const rect = heroWaveCanvas.parentElement.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;

            // Sphere geometry proportional to hero height
            const centerX = w / 2;
            const centerY = h / 2;
            const radiusPx = Math.min(h * SPHERE_RATIO, w * 0.9) / 2;
            const radiusCells = radiusPx / CELL_SIZE;
            const span = Math.ceil(radiusCells);

            // Mouse wave source, projected onto the sphere surface
            const mx = asciiMouse.x === null ? centerX : asciiMouse.x;
            const my = asciiMouse.y === null ? centerY : asciiMouse.y;
            const mouseSurface = toSurface((mx - centerX) / radiusPx, (my - centerY) / radiusPx, radiusCells);
            const mouseWave = {
                x: mouseSurface.x, y: mouseSurface.y,
                frequency: 0.3, amplitude: 1,
                phase: asciiTime * 2, speed: 1,
            };

            const allWaves = waves.map(wv => {
                const s = toSurface(wv.rx, wv.ry, radiusCells);
                return {
                    x: s.x, y: s.y,
                    frequency: wv.frequency, amplitude: wv.amplitude,
                    phase: wv.phase, speed: wv.speed,
                };
            });
            allWaves.push(mouseWave);

            // Clear
            ctx.fillStyle = BG_COLOR;
            ctx.fillRect(0, 0, w, h);
            glowCtx.setTransform(1, 0, 0, 1, 0, 0);
            glowCtx.clearRect(0, 0, glowCanvas.width, glowCanvas.height);
            glowCtx.setTransform(glowCanvas.width / w, 0, 0, glowCanvas.height / h, 0, 0);
            dots.length = 0;

            for (let gy = -span; gy <= span; gy++) {
                for (let gx = -span; gx <= span; gx++) {
                    const nx = gx / radiusCells;
                    const ny = gy / radiusCells;
                    const r2 = nx * nx + ny * ny;
                    if (r2 > 1) continue;

                    // Surface normal → depth & light shading
                    const nz = Math.sqrt(1 - r2);
                    const light = Math.max(0, nx * LIGHT.x + ny * LIGHT.y + nz * LIGHT.z);
                    const shade = 0.35 + 0.65 * (0.5 * nz + 0.5 * light);

                    const s = toSurface(nx, ny, radiusCells);
                    let totalWave = 0;

                    for (let i = 0; i < allWaves.length; i++) {
                        const wv = allWaves[i];
                        const dx = s.x - wv.x;
                        const dy = s.y - wv.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const falloff = 1 / (1 + dist * 0.1);
                        totalWave += Math.sin(
                            dist * wv.frequency - asciiTime * wv.speed + wv.phase
                        ) * wv.amplitude * falloff;
                    }

                    const cx = centerX + gx * CELL_SIZE;
                    const cy = centerY + gy * CELL_SIZE;

                    if (Math.abs(totalWave) > 0.2) {
                        const normalized = (totalWave + 2) / 4;
                        const intensity = Math.min(1.0, Math.max(0, normalized));
                        const radius = (0.8 + intensity * 3) * (0.45 + 0.55 * nz);
                        const opacity = (0.5 + intensity * 0.5) * shade;

                        // Halo behind the dot, warmer/yellower where the wave peaks
                        const g = GLOW_FROM.map((c, k) => Math.round(c + (GLOW_TO[k] - c) * intensity));
                        glowCtx.beginPath();
                        glowCtx.arc(cx, cy, radius * 2.6 + 4, 0, Math.PI * 2);
                        glowCtx.fillStyle = `rgba(${g[0]}, ${g[1]}, ${g[2]}, ${(0.16 * intensity * shade).toFixed(3)})`;
                        glowCtx.fill();

                        dots.push(cx, cy, radius, opacity, intensity > 0.65 ? 1 : 0, nz);
                    } else {
                        // Faint base dot keeps the sphere silhouette readable
                        dots.push(cx, cy, 0.6 * (0.5 + 0.5 * nz), 0.16 * shade, 2, nz);
                    }
                }
            }

            // Glow first (behind), then the crisp dots on top
            ctx.save();
            ctx.filter = `blur(${GLOW_BLUR}px)`;
            ctx.drawImage(glowCanvas, 0, 0, w, h);
            ctx.restore();

            for (let i = 0; i < dots.length; i += 6) {
                const cx = dots[i], cy = dots[i + 1], radius = dots[i + 2];
                const opacity = dots[i + 3], kind = dots[i + 4], nz = dots[i + 5];
                ctx.beginPath();
                ctx.arc(cx, cy, radius, 0, Math.PI * 2);
                if (kind === 1) {
                    // High intensity → stroke only (outline)
                    ctx.strokeStyle = `rgba(${DOT_RGB}, ${opacity})`;
                    ctx.lineWidth = 1.8 * (0.5 + 0.5 * nz);
                    ctx.stroke();
                } else {
                    // Normal (and faint base) → filled
                    ctx.fillStyle = `rgba(${DOT_RGB}, ${opacity})`;
                    ctx.fill();
                }
            }

            asciiAnimId = requestAnimationFrame(animateAscii);
        }

        lastFrameTime = performance.now();
        asciiAnimId = requestAnimationFrame(animateAscii);
    }

    // ─── Footer Dome ────────────────────────────────────────────
    // A luminous orange dome rising from the bottom of the footer. Inside it
    // (clipped to its shape) the hero's dot waves run in warm white, and the
    // cursor adds its own wave, like in the hero sphere.
    const footerDome = document.getElementById('footerDome');
    if (footerDome) {
        const dctx = footerDome.getContext('2d');
        const DOME_CELL = 10;
        const DOME_DOT_RGB = '255, 248, 240';
        const domeReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const domeMouse = { x: null, y: null };
        const domeWaves = [];
        for (let i = 0; i < 3; i++) {
            domeWaves.push({
                rx: 0.25 + Math.random() * 0.5,
                ry: 0.35 + Math.random() * 0.5,
                frequency: 0.2 + Math.random() * 0.3,
                amplitude: 0.5 + Math.random() * 0.5,
                phase: Math.random() * Math.PI * 2,
                speed: 0.5 + Math.random() * 0.5,
            });
        }
        let domeW = 0;
        let domeH = 0;
        let domeTime = 0;
        let domeLast = 0;
        let domeAnimId = null;
        let domeVisible = false;

        function resizeDome() {
            const dpr = window.devicePixelRatio || 1;
            domeW = footerDome.clientWidth;
            domeH = footerDome.clientHeight;
            footerDome.width = Math.round(domeW * dpr);
            footerDome.height = Math.round(domeH * dpr);
            dctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            if (!domeAnimId) drawDome();
        }

        // Dome geometry: the top half of a wide ellipse sitting on the bottom edge
        function domeShape() {
            // Leaves room above the apex so the glow isn't cut by the canvas edge
            return { cx: domeW / 2, cy: domeH, rx: domeW * 0.53, ry: domeH * 0.74 };
        }

        function drawDome() {
            const { cx, cy, rx, ry } = domeShape();
            dctx.clearRect(0, 0, domeW, domeH);

            // Luminous body: deep orange at the base, peach towards the rim,
            // with a soft glow that melts into the page
            const body = dctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
            body.addColorStop(0, '#E9561C');
            body.addColorStop(0.35, '#F07433');
            body.addColorStop(0.7, '#F39D6E');
            body.addColorStop(1, '#F6C2A4');
            dctx.save();
            dctx.beginPath();
            dctx.ellipse(cx, cy, rx, ry, 0, Math.PI, 2 * Math.PI);
            dctx.closePath();
            dctx.shadowColor = 'rgba(255, 120, 50, 0.45)';
            dctx.shadowBlur = 70;
            dctx.fillStyle = body;
            dctx.fill();
            dctx.restore();

            // Dot waves, clipped to the dome
            dctx.save();
            dctx.beginPath();
            dctx.ellipse(cx, cy, rx, ry, 0, Math.PI, 2 * Math.PI);
            dctx.closePath();
            dctx.clip();

            const cols = Math.ceil(domeW / DOME_CELL);
            const rows = Math.ceil(domeH / DOME_CELL);
            const mx = domeMouse.x === null ? cx : domeMouse.x;
            const my = domeMouse.y === null ? domeH * 0.6 : domeMouse.y;
            const waves = domeWaves.map(wv => ({
                x: wv.rx * cols, y: wv.ry * rows,
                frequency: wv.frequency, amplitude: wv.amplitude,
                phase: wv.phase, speed: wv.speed,
            }));
            waves.push({ x: mx / DOME_CELL, y: my / DOME_CELL, frequency: 0.3, amplitude: 1, phase: domeTime * 2, speed: 1 });

            const top = Math.max(0, Math.floor((cy - ry) / DOME_CELL));
            for (let y = top; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const px = x * DOME_CELL + DOME_CELL / 2;
                    const py = y * DOME_CELL + DOME_CELL / 2;
                    const ex = (px - cx) / rx;
                    const ey = (py - cy) / ry;
                    if (ex * ex + ey * ey > 1) continue;

                    let total = 0;
                    for (let i = 0; i < waves.length; i++) {
                        const wv = waves[i];
                        const dx = x - wv.x;
                        const dy = y - wv.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        total += Math.sin(dist * wv.frequency - domeTime * wv.speed + wv.phase)
                            * wv.amplitude / (1 + dist * 0.1);
                    }
                    if (Math.abs(total) <= 0.2) continue;

                    const intensity = Math.min(1, Math.max(0, (total + 2) / 4));
                    const radius = 0.8 + intensity * 3;
                    const opacity = 0.14 + intensity * 0.42;
                    dctx.beginPath();
                    dctx.arc(px, py, radius, 0, Math.PI * 2);
                    if (intensity > 0.65) {
                        dctx.strokeStyle = `rgba(${DOME_DOT_RGB}, ${opacity})`;
                        dctx.lineWidth = 1.6;
                        dctx.stroke();
                    } else {
                        dctx.fillStyle = `rgba(${DOME_DOT_RGB}, ${opacity})`;
                        dctx.fill();
                    }
                }
            }
            dctx.restore();
        }

        function animateDome(now) {
            if (!domeVisible) { domeAnimId = null; return; }
            const dt = Math.min((now - domeLast) / 1000, 0.1);
            domeLast = now;
            domeTime += dt * 0.75;
            drawDome();
            domeAnimId = requestAnimationFrame(animateDome);
        }

        const domeParent = footerDome.closest('.footer') || footerDome;
        domeParent.addEventListener('mousemove', (e) => {
            const rect = footerDome.getBoundingClientRect();
            domeMouse.x = e.clientX - rect.left;
            domeMouse.y = e.clientY - rect.top;
        });

        new IntersectionObserver((entries) => {
            domeVisible = entries[0].isIntersecting;
            if (domeVisible && !domeAnimId && !domeReducedMotion.matches) {
                domeLast = performance.now();
                domeAnimId = requestAnimationFrame(animateDome);
            }
        }, { threshold: 0.01 }).observe(footerDome);

        window.addEventListener('resize', resizeDome);
        resizeDome();
    }

    // ─── Hero Rotating Word ─────────────────────────────────────
    // "Design dwells in ___": the last word changes at random. Letters of the
    // old word sweep up and out, the new ones rise from below, staggered
    // left → right, while the slot's width eases to the new word.
    const heroRotator = document.getElementById('heroRotator');
    if (heroRotator) {
        // Change, passage and the pull of the unknown; 8–11 letters like "liminality".
        // Each must read correctly in "Design dwells in ___" (uncountable nouns,
        // no article needed).
        const ROTATOR_WORDS = [
            'liminality', 'transition', 'becoming', 'emergence', 'evolution',
            'transience', 'uncertainty', 'discovery', 'possibility', 'curiosity',
        ];
        const ROTATOR_FIRST_DELAY = 3200;   // Let the hero intro finish first (ms)
        const ROTATOR_INTERVAL = 4200;      // Time between changes (ms)
        const ROTATOR_SWAP = 2000;          // Sweep duration incl. stagger (ms)
        const rotatorReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        function makeRotWord(text) {
            const word = document.createElement('span');
            word.className = 'rot-word';
            [...text].forEach((ch, i) => {
                const c = document.createElement('span');
                c.className = 'rot-char';
                c.style.setProperty('--i', i);
                c.textContent = ch;
                word.appendChild(c);
            });
            return word;
        }

        let currentText = heroRotator.textContent.trim();
        let currentWord = makeRotWord(currentText);
        heroRotator.setAttribute('aria-live', 'polite');
        heroRotator.textContent = '';
        heroRotator.appendChild(currentWord);

        function nextText() {
            const options = ROTATOR_WORDS.filter(w => w !== currentText);
            return options[Math.floor(Math.random() * options.length)];
        }

        function swapWord() {
            const text = nextText();
            const incoming = makeRotWord(text);

            if (rotatorReducedMotion.matches) {
                heroRotator.replaceChild(incoming, currentWord);
                currentWord = incoming;
                currentText = text;
                return;
            }

            // Measure the new word and animate the slot from old to new width
            incoming.classList.add('is-entering', 'is-before');
            heroRotator.appendChild(incoming);
            heroRotator.style.width = `${currentWord.offsetWidth}px`;
            const targetWidth = incoming.offsetWidth;

            const outgoing = currentWord;
            requestAnimationFrame(() => {
                heroRotator.style.width = `${targetWidth}px`;
                outgoing.classList.add('is-out');
                incoming.classList.remove('is-before');
            });

            setTimeout(() => {
                outgoing.remove();
                incoming.classList.remove('is-entering');
                heroRotator.style.width = '';
            }, ROTATOR_SWAP);

            currentWord = incoming;
            currentText = text;
        }

        setTimeout(() => {
            swapWord();
            setInterval(() => {
                if (!document.hidden) swapWord();
            }, ROTATOR_INTERVAL);
        }, ROTATOR_FIRST_DELAY);
    }

    // ─── Hero Image Trail Effect ────────────────────────────────
    // Temporarily disabled: set to true to bring back the images that
    // follow the cursor over the hero
    const HERO_IMAGE_TRAIL_ENABLED = false;
    const heroSection = document.getElementById('hero');
    const heroImageTrail = document.getElementById('heroImageTrail');

    if (HERO_IMAGE_TRAIL_ENABLED && heroSection && heroImageTrail) {
        let heroImages = [];
        let lastTrailTime = 0;
        let lastTrailX = 0;
        let lastTrailY = 0;
        let currentImageIndex = 0;
        const TRAIL_INTERVAL = 100;   // ms between images
        const MIN_DISTANCE = 25;       // min px cursor must move
        const MAX_TRAIL_IMAGES = 15;   // max visible at once
        const IMAGE_LIFETIME = 2100;   // ms before removal

        // Load image list from manifest (sorted alphabetically)
        fetch('assets/img/heroimg/images.json')
            .then(res => res.json())
            .then(images => {
                images.sort();
                heroImages = images.map(name => `assets/img/heroimg/${name}`);
                // Preload images
                heroImages.forEach(src => {
                    const img = new Image();
                    img.src = src;
                });
            })
            .catch(() => {
                console.warn('Could not load hero images manifest.');
            });

        heroSection.addEventListener('mousemove', (e) => {
            if (heroImages.length === 0) return;

            const now = Date.now();
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Check time and distance threshold
            const dx = x - lastTrailX;
            const dy = y - lastTrailY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (now - lastTrailTime < TRAIL_INTERVAL || dist < MIN_DISTANCE) return;

            lastTrailTime = now;
            lastTrailX = x;
            lastTrailY = y;

            // Pick next image in order, cycle back
            const src = heroImages[currentImageIndex];
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;

            // Create image element
            const img = document.createElement('img');
            img.src = src;
            img.className = 'trail-image';
            img.style.left = `${x - 100}px`;  // center the 200px image
            img.style.top = `${y - 140}px`;   // center the 280px image

            heroImageTrail.appendChild(img);

            // Limit max visible images
            const trailImages = heroImageTrail.querySelectorAll('.trail-image');
            if (trailImages.length > MAX_TRAIL_IMAGES) {
                trailImages[0].remove();
            }

            // Remove after animation completes
            setTimeout(() => {
                if (img.parentNode) img.remove();
            }, IMAGE_LIFETIME);
        });
    }

});
