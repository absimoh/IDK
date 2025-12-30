// --- DATA (Embedded for seamless Frontend execution) ---
const planets = [
    { id: 'mercury', name: 'Mercury', img: 'https://picsum.photos/seed/mercury/300/300.jpg', desc: 'The smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun\'s planets.', trivia: 'Despite being closest to the Sun, Mercury is not the hottest planet.' },
    { id: 'venus', name: 'Venus', img: 'https://picsum.photos/seed/venus/300/300.jpg', desc: 'Second planet from the Sun. It has a dense atmosphere consisting mainly of carbon dioxide, trapping heat and making it the hottest planet.', trivia: 'Venus rotates in the opposite direction to most other planets.' },
    { id: 'earth', name: 'Earth', img: 'https://picsum.photos/seed/earth/300/300.jpg', desc: 'Third planet from the Sun and the only astronomical object known to harbor life. About 29% of Earth\'s surface is land consisting of continents and islands.', trivia: 'Earth is the only planet not named after a Greek or Roman deity.' },
    { id: 'mars', name: 'Mars', img: 'https://picsum.photos/seed/mars/300/300.jpg', desc: 'Fourth planet from the Sun. It is often referred to as the "Red Planet" because the iron oxide prevalent on its surface gives it a reddish appearance.', trivia: 'Mars has the largest volcano in the solar system, Olympus Mons.' },
    { id: 'jupiter', name: 'Jupiter', img: 'https://picsum.photos/seed/jupiter/300/300.jpg', desc: 'Fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets combined.', trivia: 'Jupiter has the shortest day of all the planets, rotating in just 9 hours.' },
    { id: 'saturn', name: 'Saturn', img: 'https://picsum.photos/seed/saturn/300/300.jpg', desc: 'Sixth planet from the Sun and the second-largest in the Solar System. It is famous for its prominent ring system, composed mainly of ice particles.', trivia: 'Saturn is less dense than water and would theoretically float in a giant bathtub.' },
    { id: 'uranus', name: 'Uranus', img: 'https://picsum.photos/seed/uranus/300/300.jpg', desc: 'Seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System.', trivia: 'Uranus rotates on its side, with an axial tilt of 98 degrees.' },
    { id: 'neptune', name: 'Neptune', img: 'https://picsum.photos/seed/neptune/300/300.jpg', desc: 'Eighth and farthest-known Solar planet from the Sun. It is the fourth-largest planet in the Solar System by diameter, the third-most-massive planet.', trivia: 'Neptune has the strongest winds in the solar system, reaching 1,300 mph.' }
];

// --- APP CONTROLLER ---
const app = {
    init: () => {
        app.renderCards(planets);
        app.startStars();
        app.setupSearch();
        
        // Remove Preloader
        setTimeout(() => {
            const loader = document.getElementById('preloader');
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }, 1200);
    },

    // Navigation Logic
    navigate: (targetId) => {
        document.querySelectorAll('.section').forEach(sec => {
            sec.classList.remove('active');
            sec.style.display = 'none'; // Ensure display none happens
        });
        
        const target = document.getElementById(targetId);
        target.style.display = 'block';
        // Small delay to allow display block to apply before opacity transition
        setTimeout(() => target.classList.add('active'), 10);
        
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        // Highlight logic roughly
        window.scrollTo({top: 0, behavior: 'smooth'});
    },

    // Render Planet Cards
    renderCards: (data) => {
        const grid = document.getElementById('planetGrid');
        grid.innerHTML = '';
        
        if(!data.length) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:white;">No planets found.</p>';
            return;
        }

        data.forEach(p => {
            const card = document.createElement('div');
            card.className = 'planet-card glass-panel';
            card.innerHTML = `
                <img src="${p.img}" class="planet-img" alt="${p.name}">
                <h3>${p.name}</h3>
                <p style="font-size:0.9rem;">${p.desc.substring(0, 60)}...</p>
            `;
            card.onclick = () => app.openModal(p);
            grid.appendChild(card);
        });
    },

    // Search Logic
    setupSearch: () => {
        const input = document.getElementById('searchInput');
        input.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = planets.filter(p => p.name.toLowerCase().includes(term));
            app.renderCards(filtered);
        });
    },

    // Modal Logic
    openModal: (planet) => {
        const modal = document.getElementById('infoModal');
        document.getElementById('mTitle').innerText = planet.name;
        document.getElementById('mImg').src = planet.img;
        document.getElementById('mDesc').innerText = planet.desc;
        document.getElementById('mTrivia').innerHTML = `<strong>Trivia:</strong> ${planet.trivia}`;
        
        modal.classList.add('active');
    },

    closeModal: () => {
        document.getElementById('infoModal').classList.remove('active');
    },

    // Contact Form
    submitForm: (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'TRANSMITTING...';
        setTimeout(() => {
            alert('Data transmitted successfully to the observatory.');
            e.target.reset();
            btn.innerText = originalText;
        }, 1500);
    },

    // Star Animation
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
            }
            update() {
                this.y -= this.s;
                if(this.y < 0) { this.y = h; this.x = Math.random() * w; }
            }
            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`;
                ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI*2); ctx.fill();
            }
        }

        for(let i=0; i<200; i++) stars.push(new Star());
        
        const animate = () => {
            ctx.clearRect(0, 0, w, h);
            stars.forEach(s => { s.update(); s.draw(); });
            requestAnimationFrame(animate);
        };
        animate();
    }
};

document.addEventListener('DOMContentLoaded', app.init);
