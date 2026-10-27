/* Archive Mist
   Organic orange / peach mist rendered with a single WebGL fragment shader.
   A diagonal boundary splits the card into a saturated orange field (top-left)
   and a soft peach mass (bottom-right). Two levels of domain-warped noise bend
   that boundary into hills, valleys and tendrils; the edge is crisp on the
   left and grows misty towards the right, with a deep orange-red rim on the
   orange side and coral wisps drifting inside the peach.

   Usage: const mist = createArchiveMist(canvas);
          mist.start() / mist.stop()   (time only advances while running,
                                        so it resumes without jumps)
   Without WebGL it returns null and the CSS gradient behind the canvas shows. */
(function () {
    // ─── Parameters ───────────────────────────────────────────
    const MIST_DEFAULTS = {
        speed: 1.0,          // Animation speed multiplier
        boundary: 0.0,       // Main boundary position (+ = more peach, − = more orange)
        amplitude: 0.3,      // Organic deformation of the boundary
        softness: 0.012,     // Edge softness on the crisp (left) side
        mistSpread: 9.0,      // How much softer the edge gets towards the right
        wisps: 1.0,          // Strength of the coral wisps inside the peach (color distribution)
        depth: 0.4,          // Strength of the deep orange-red rim and patches (color distribution)
        resolution: 0.75,    // Render scale (the image is soft, so < 1 costs nothing visible)
        startTime: 36.0,     // Seconds into the motion shown as the first, resting frame
        colors: {
            orange: '#FF6701',
            deep: '#FF4000',
            peach: '#FFD7B8'
        }
    };

    const VERTEX = `
        attribute vec2 aPos;
        void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
    `;

    const FRAGMENT = `
        #ifdef GL_FRAGMENT_PRECISION_HIGH
        precision highp float;
        #else
        precision mediump float;
        #endif

        uniform vec2 uRes;
        uniform float uTime;
        uniform float uBoundary;
        uniform float uAmp;
        uniform float uSoft;
        uniform float uSpread;
        uniform float uWisps;
        uniform float uDepth;
        uniform vec3 uOrange;
        uniform vec3 uDeep;
        uniform vec3 uPeach;

        // 3D simplex noise — Ashima Arts / Stefan Gustavson (MIT)
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

        float snoise(vec3 v) {
            const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod289(i);
            vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            float n_ = 0.142857142857;
            vec3 ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);
            vec4 x = x_ * ns.x + ns.yyyy;
            vec4 y = y_ * ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);
            vec4 s0 = floor(b0) * 2.0 + 1.0;
            vec4 s1 = floor(b1) * 2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
            p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
        }

        // Few octaves on purpose: broad, smooth shapes rather than turbulence
        float fbm(vec3 p) {
            float sum = 0.0;
            float amp = 0.6;
            for (int i = 0; i < 3; i++) {
                sum += amp * snoise(p);
                p = p * 1.9 + vec3(1.7, -2.3, 0.0);
                amp *= 0.38;
            }
            return sum;
        }

        void main() {
            vec2 uv = gl_FragCoord.xy / uRes;          // 0..1, y up
            float aspect = uRes.x / uRes.y;
            vec2 p = vec2(uv.x * aspect, uv.y);        // Noise space keeps its proportions at any ratio
            float t = uTime;

            // Large-scale deformation (slow) → medium undulations travelling along it
            vec2 q = vec2(
                fbm(vec3(p * 0.55, t * 0.05)),
                fbm(vec3(p * 0.55 + vec2(5.2, 1.3), t * 0.045))
            );
            vec2 r = vec2(
                fbm(vec3(p * 0.95 + 1.3 * q + vec2(1.7, 9.2), t * 0.08)),
                fbm(vec3(p * 0.95 + 1.3 * q + vec2(8.3, 2.8), t * 0.075))
            );
            // Small living fluctuations (low frequency, so they swell rather than jitter)
            float fine = snoise(vec3(p * 1.8 + r, t * 0.12));

            // Diagonal boundary from bottom-left to top-right; positive = peach side
            vec2 d = uv - vec2(0.5, 0.45);
            float field = dot(d, normalize(vec2(0.95, -1.0)));
            field += uBoundary + uAmp * (0.8 * r.x + 0.5 * q.y) + 0.02 * fine;

            // Mist: crisp edge on the left, increasingly diffused towards the right
            float haze = smoothstep(0.3, 1.0, uv.x + 0.2 * q.x + 0.2 * uv.y);
            float soft = uSoft * (1.0 + uSpread * haze * haze);
            float peachMask = smoothstep(-soft, soft, field);

            // Orange field with slow, barely-there deep patches
            vec3 col = uOrange;
            float patches = smoothstep(0.1, 0.7, fbm(vec3(p * 0.7 + q, t * 0.035 + 7.0)));
            col = mix(col, uDeep, uDepth * 0.4 * patches);

            // Deep orange-red rim hugging the orange side of the boundary
            float rimWidth = 0.06 + soft * 1.5;
            float rim = exp(-pow((field + rimWidth) / rimWidth, 2.0));
            col = mix(col, uDeep, uDepth * rim);

            // Peach mass: dense and softly lit, with broad coral wisps that fade into it
            vec3 coral = mix(uPeach, uOrange, 0.55);
            float wispNoise = smoothstep(0.0, 0.55, fbm(vec3(p * 1.1 + 1.6 * r + vec2(0.0, -0.4), t * 0.06 + 3.0)));
            float nearEdge = 1.0 - smoothstep(0.0, 0.3 + soft * 2.0, field);
            float wisp = uWisps * wispNoise * nearEdge * (0.25 + 0.75 * haze);
            vec3 peachCol = mix(uPeach, coral, wisp);
            // Luminous coral glow just inside the edge
            float glow = exp(-pow((field - soft) / (soft * 2.0 + 0.025), 2.0));
            peachCol = mix(peachCol, mix(uPeach, uOrange, 0.35), 0.35 * glow);

            col = mix(col, peachCol, peachMask);

            // Dither to avoid banding in the long gradients
            float dither = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
            col += (dither - 0.5) / 255.0;

            gl_FragColor = vec4(col, 1.0);
        }
    `;

    function hexToRgb(hex) {
        const n = parseInt(hex.replace('#', ''), 16);
        return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
    }

    function compile(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.warn('Archive mist shader:', gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }

    window.createArchiveMist = function (canvas, options) {
        if (!canvas) return null;
        const opts = Object.assign({}, MIST_DEFAULTS, options);
        opts.colors = Object.assign({}, MIST_DEFAULTS.colors, options && options.colors);

        const gl = canvas.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false })
            || canvas.getContext('experimental-webgl');
        if (!gl) return null;

        const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
        const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
        if (!vs || !fs) return null;
        const program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
        gl.useProgram(program);

        // One full-screen triangle
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const aPos = gl.getAttribLocation(program, 'aPos');
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

        const u = name => gl.getUniformLocation(program, name);
        const uRes = u('uRes');
        const uTime = u('uTime');
        gl.uniform1f(u('uBoundary'), opts.boundary);
        gl.uniform1f(u('uAmp'), opts.amplitude);
        gl.uniform1f(u('uSoft'), opts.softness);
        gl.uniform1f(u('uSpread'), opts.mistSpread);
        gl.uniform1f(u('uWisps'), opts.wisps);
        gl.uniform1f(u('uDepth'), opts.depth);
        gl.uniform3fv(u('uOrange'), hexToRgb(opts.colors.orange));
        gl.uniform3fv(u('uDeep'), hexToRgb(opts.colors.deep));
        gl.uniform3fv(u('uPeach'), hexToRgb(opts.colors.peach));

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        let time = opts.startTime;
        let running = false;
        let frameId = null;
        let lastNow = 0;

        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const w = Math.max(1, Math.round(canvas.clientWidth * dpr * opts.resolution));
            const h = Math.max(1, Math.round(canvas.clientHeight * dpr * opts.resolution));
            if (canvas.width === w && canvas.height === h) return false;
            canvas.width = w;
            canvas.height = h;
            gl.viewport(0, 0, w, h);
            gl.uniform2f(uRes, w, h);
            return true;
        }

        function draw() {
            gl.uniform1f(uTime, time);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        }

        function loop(now) {
            const dt = Math.min((now - lastNow) / 1000, 0.05);
            lastNow = now;
            time += dt * opts.speed;
            draw();
            frameId = requestAnimationFrame(loop);
        }

        function start() {
            if (running || reducedMotion.matches) return; // Reduced motion: keep the still frame
            running = true;
            lastNow = performance.now();
            frameId = requestAnimationFrame(loop);
        }

        function stop() {
            running = false;
            if (frameId) cancelAnimationFrame(frameId);
            frameId = null;
        }

        if (window.ResizeObserver) {
            new ResizeObserver(() => { if (resize() && !running) draw(); }).observe(canvas);
        }
        resize();
        draw(); // Resting frame until the animation starts

        // renderAt(t): draw one still frame at time t (handy for previews/tests)
        function renderAt(t) { time = t; draw(); }

        return { start, stop, renderAt };
    };
})();
