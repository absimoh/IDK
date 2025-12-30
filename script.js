// --- LUMINODE DATA CORE ---
const planetsDB = [
    { id: 'mercury', name: 'Mercury', img: 'https://picsum.photos/seed/mercury/300/300.jpg', desc: 'The smallest planet in our solar system and closest to the Sun.', trivia: 'Mercury has no moons.' },
    { id: 'venus', name: 'Venus', img: 'https://picsum.photos/seed/venus/300/300.jpg', desc: 'Second planet from the Sun. It has a thick atmosphere.', trivia: 'Venus spins backwards (retrograde rotation).' },
    { id: 'earth', name: 'Earth', img: 'https://picsum.photos/seed/earth/300/300.jpg', desc: 'Our home. The only place we know of so far that’s inhabited by living things.', trivia: 'Earth has one natural satellite, the Moon.' },
    { id: 'mars', name: 'Mars', img: 'https://picsum.photos/seed/mars/300/300.jpg', desc: 'Fourth planet from the Sun. Known as the Red Planet.', trivia: 'Mars is home to Olympus Mons, the highest volcano in the solar system.' },
    { id: 'jupiter', name: 'Jupiter', img: 'https://picsum.photos/seed/jupiter/300/300.jpg', desc: 'Fifth planet from the Sun. A gas giant.', trivia: 'Jupiter is more than twice as massive as all the other planets combined.' },
    { id: 'saturn', name: 'Saturn', img: 'https://picsum.photos/seed/saturn/300/300.jpg', desc: 'Sixth planet from the Sun. Famous for its rings.', trivia: 'Saturn’s rings are made of chunks of ice and rock.' },
    { id: 'uranus', name: 'Uranus', img: 'https://picsum.photos/seed/uranus/300/300.jpg', desc: 'Seventh planet from the Sun. It rotates at a nearly 90-degree angle.', trivia: 'Uranus was discovered in 1781 by William Herschel.' },
    { id: 'neptune', name: 'Neptune', img: 'https://picsum.photos/seed/neptune/300/300.jpg', desc: 'Eighth planet from the Sun. It is dark, cold and very windy.', trivia: 'Neptune has the strongest winds in the solar system.' }
];

// --- LUMINODE CONTROLLER (RELIABLE) ---
const app = {
    init: () => {
        // 1. Start Systems
        app.renderPlanets(planetsDB);
        app.startCanvas();
        app.setupSearch();
        
        // 2. Loader Logic (Robust)
        window.addEventListener('load', () => {
            // Wait slightly to ensure assets painted
            setTimeout(() => {
                app.dismissLoader();
            }, 1000);
            
            // Safety: If loader doesn't dismiss, show button
            setTimeout(() => {
                const loader = document.getElementById('loader');
                if(!loader.classList.contains('hidden')) {
                    document.getElementById('loader-btn').style.display = 'block';
                    document.getElementById('loader-text').innerText = "SYSTEM HANG - CLICK TO LOAD";
                }
            }, 4000);
        });
    },

    // Remove Loader Animation
    dismissLoader: () => {
        const loader = document.getElementById('loader');
        loader.classList.add('hidden');
    },

    // Navigation
    navTo: (id) => {
        document.querySelectorAll('.section').forEach(sec => {
            sec.classList.remove('active');
            setTimeout(() => { sec.style.display = 'none'; }, 400);
        });
        
        const target = document.getElementById(id);
        target.style.display = 'block';
        setTimeout(() => target.classList.add('active'), 10);
        
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        window.scrollTo({top:0, behavior:'smooth'});
    },

    // Render Data Cards
    renderPlanets: (data) => {
        const grid = document.getElementById('planetGrid');
        grid.innerHTML = '';
        
        if(data.length === 0) {
            grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; color:var(--text-dim);">NO DATA FOUND.</div>';
            return;
        }

        data.forEach(p => {
            const el = document.createElement('div');
            el.className = 'card';
            el.innerHTML = `
                <img src="${p.img}" class="card-img" alt="${p.name}">
                <h3 style="margin-bottom:0.5rem;">${p.name}</h3>
                <p style="font-size:0.9rem; margin:0;">${p.desc.substring(0, 45)}...</p>
                <div style="margin-top:1rem; font-size:0.8rem; color:var(--primary);">ANALYZE ></div>
            `;
            el.onclick = () => app.showData(p);
            grid.appendChild(el);
        });
    },

    // Search
    setupSearch: () => {
        const input = document.getElementById('search');
        input.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            const found = planetsDB.filter(p => p.name.toLowerCase().includes(val));
            app.renderPlanets(found);
        });
    },

    // Modal
    showData: (planet) => {
        const m = document.getElementById('infoModal');
        document.getElementById('mName').innerText = planet.name.toUpperCase();
        document.getElementById('mImg').src = planet.img;
        document.getElementById('mDesc').innerText = planet.desc;
        document.getElementById('mTrivia').innerHTML = `<strong>TRIVIA:</strong> ${planet.trivia}`;
        m.classList.add('active');
    },

    closeModal: () => {
        document.getElementById('infoModal').classList.remove('active');
    },

    // Star Canvas
    startCanvas: () => {
        const c = document.getElementById('star-canvas');
        const ctx = c.getContext('2d');
        let w, h, stars = [];

        const resize = () => { w = c.width = window.innerWidth; h = c.height = window.innerHeight; };
        window.addEventListener('resize', resize);
        resize();

        class Star {
            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.s = Math.random() * 1.5;
                this.v = Math.random() * 0.2 + 0.05;
            }
            update() {
                this.y -= this.v;
                if(this.y < 0) { this.y = h; this.x = Math.random() * w; }
            }
            draw() {
                ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
                ctx.beginPath(); ctx.arc(this.x, this.y, this.s, 0, Math.PI*2); ctx.fill();
            }
        }

        for(let i=0; i<100; i++) stars.push(new Star());
        
        const loop = () => {
            ctx.clearRect(0,0,w,h);
            stars.forEach(s => { s.update(); s.draw(); });
            requestAnimationFrame(loop);
        };
        loop();
    }
};

// Start
document.addEventListener('DOMContentLoaded', app.init);
