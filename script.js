// --- DATA (LUMINODE DATABASE) ---
const planets = [
    { id: 'mercury', name: 'Mercury', img: 'https://picsum.photos/seed/mercury/300/300.jpg', desc: 'The smallest planet in the Solar System and the closest to the Sun. Its orbit is highly eccentric.', trivia: 'Mercury shrinks as its iron core cools.' },
    { id: 'venus', name: 'Venus', img: 'https://picsum.photos/seed/venus/300/300.jpg', desc: 'Second planet from the Sun. It has the hottest planetary surface in the solar system due to greenhouse effect.', trivia: 'Venus rotates backwards compared to other planets.' },
    { id: 'earth', img: 'https://picsum.photos/seed/earth/300/300.jpg', desc: 'Our home. The third planet from the Sun and the only astronomical object known to harbor life.', trivia: 'Earth is the only planet not named after a god.' },
    { id: 'mars', img: 'https://picsum.photos/seed/mars/300/300.jpg', desc: 'Fourth planet from the Sun. Known as the Red Planet due to iron oxide prevalent on its surface.', trivia: 'Mars has the longest canyon in the solar system.' },
    { id: 'jupiter', img: 'https://picsum.photos/seed/jupiter/300/300.jpg', desc: 'Fifth planet from the Sun. A gas giant and the largest planet in the Solar System.', trivia: 'Jupiter has 95 known moons and a massive storm called the Great Red Spot.' },
    { id: 'saturn', img: 'https://picsum.photos/seed/saturn/300/300.jpg', desc: 'Sixth planet from the Sun. Famous for its prominent ring system composed of ice particles.', trivia: 'Saturn is so light it could float in water.' },
    { id: 'uranus', img: 'https://picsum.photos/seed/uranus/300/300.jpg', desc: 'Seventh planet from the Sun. It has the coldest planetary atmosphere in the Solar System.', trivia: 'Uranus rotates on its side with an axial tilt of 98 degrees.' },
    { id: 'neptune', img: 'https://picsum.photos/seed/neptune/300/300.jpg', desc: 'Eighth planet from the Sun. Dark, cold, and whipped by supersonic winds.', trivia: 'Neptune was discovered through mathematical calculations.' }
];

// --- LUMINODE CONTROLLER ---
const app = {
    init: () => {
        app.updateClock();
        app.renderCards(planets);
        app.startStars();
        app.setupSearch();
        
        // System Boot Loader
        setTimeout(() => {
            document.getElementById('loader').style.opacity = '0';
            setTimeout(() => document.getElementById('loader').style.display = 'none', 500);
        }, 1000);
        
        setInterval(app.updateClock, 1000);
    },

    updateClock: () => {
        const now = new Date();
        document.getElementById('clock').innerText = now.toISOString().split('T')[1].split('.')[0] + ' UTC';
    },

    navigate: (targetId) => {
        document.querySelectorAll('.section').forEach(sec => {
            sec.classList.remove('active');
            setTimeout(() => { if(!sec.classList.contains('active')) sec.style.display = 'none'; }, 400);
        });
        
        const target = document.getElementById(targetId);
        target.style.display = 'block';
        setTimeout(() => target.classList.add('active'), 50);
        
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        window.scrollTo({top: 0, behavior: 'smooth'});
    },

    renderCards: (data) => {
        const grid = document.getElementById('planetGrid');
        grid.innerHTML = '';
        
        if(!data.length) {
            grid.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:var(--text-dim);">NO CELESTIAL OBJECTS FOUND.</p>';
            return;
        }

        data.forEach(p => {
            const card = document.createElement('div');
            card.className = 'planet-card';
            card.innerHTML = `
                <img src="${p.img}" class="planet-img" alt="${p.name}">
                <h3 style="margin-bottom:0.5rem;">${p.name}</h3>
                <p style="font-size:0.9rem;">${p.desc.substring(0, 50)}...</p>
            `;
            card.onclick = () => app.openModal(p);
            grid.appendChild(card);
        });
    },

    setupSearch: () => {
        const input = document.getElementById('searchInput');
        input.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = planets.filter(p => p.name.toLowerCase().includes(term));
            app.renderCards(filtered);
        });
    },

    openModal: (planet) => {
        const modal = document.getElementById('infoModal');
        document.getElementById('mName').innerText = planet.name.toUpperCase();
        document.getElementById('mImg').src = planet.img;
        document.getElementById('mDesc').innerText = planet.desc;
        document.getElementById('mTrivia').innerHTML = `<strong style="color:var(--secondary)">TRIVIA:</strong> ${planet.trivia}`;
        modal.classList.add('active');
    },

    closeModal: () => {
        document.getElementById('infoModal').classList.remove('active');
    },

    submitForm: (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        btn.innerText = 'TRANSMITTING...';
        setTimeout(() => {
            alert('UPLINK ESTABLISHED. DATA RECEIVED.');
            e.target.reset();
            btn.innerText = 'SEND TRANSMISSION';
        }, 1500);
    },

    startStars: () => {
        const canvas = document.getElementById('star-canvas');
        const ctx = canvas.getContext('2d');
        let w, h, stars = [];

        const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
        window.addEventListener('resize', resize);
        resize();

        class Star {
            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.r = Math.random() * 1.5;
                this.s = Math.random() * 0.2 + 0.05;
                this.a = Math.random();
            }
            update() {
                this.y -= this.s;
                this.a += 0.01;
                if(this.y < 0) { this.y = h; this.x = Math.random() * w; }
            }
            draw() {
                ctx.fillStyle = `rgba(0, 240, 255, ${Math.abs(Math.sin(this.a))})`;
                ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI*2); ctx.fill();
            }
        }

        for(let i=0; i<150; i++) stars.push(new Star());
        
        const animate = () => {
            ctx.clearRect(0, 0, w, h);
            stars.forEach(s => { s.update(); s.draw(); });
            requestAnimationFrame(animate);
        };
        animate();
    }
};

document.addEventListener('DOMContentLoaded', app.init);
