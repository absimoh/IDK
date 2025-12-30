// --- 1. DATA (English) ---
const planetsData = [
    { id: 'mercury', name: 'Mercury', image: 'https://picsum.photos/seed/mercury/200/200.jpg', desc: 'The smallest planet in our solar system and closest to the Sun.', trivia: 'Mercury has no atmosphere to keep heat in, so nights are very cold.' },
    { id: 'venus', name: 'Venus', image: 'https://picsum.photos/seed/venus/200/200.jpg', desc: 'Second planet from the Sun. It has a thick, toxic atmosphere.', trivia: 'Venus spins in the opposite direction to most other planets.' },
    { id: 'earth', name: 'Earth', image: 'https://picsum.photos/seed/earth/200/200.jpg', desc: 'Our home planet, the only place we know of that supports life.', trivia: 'Earth is the only planet not named after a god.' },
    { id: 'mars', name: 'Mars', image: 'https://picsum.photos/seed/mars/200/200.jpg', desc: 'The Red Planet. Dusty, cold, desert world with a very thin atmosphere.', trivia: 'Mars has the largest volcano in the solar system: Olympus Mons.' },
    { id: 'jupiter', name: 'Jupiter', image: 'https://picsum.photos/seed/jupiter/200/200.jpg', desc: 'The largest planet. A gas giant with a Great Red Spot storm.', trivia: 'Jupiter is twice as massive as all other planets combined.' },
    { id: 'saturn', name: 'Saturn', image: 'https://picsum.photos/seed/saturn/200/200.jpg', desc: 'Adorned with a dazzling, complex system of icy rings.', trivia: 'Saturn is made mostly of hydrogen and helium.' },
    { id: 'uranus', name: 'Uranus', image: 'https://picsum.photos/seed/uranus/200/200.jpg', desc: 'Rotates at a nearly 90-degree angle from the plane of its orbit.', trivia: 'Uranus is known as an "ice giant".' },
    { id: 'neptune', name: 'Neptune', image: 'https://picsum.photos/seed/neptune/200/200.jpg', desc: 'Dark, cold, and whipped by supersonic winds.', trivia: 'Neptune was the first planet found through mathematical calculations.' }
];

// --- 2. APPLICATION LOGIC ---
const app = {
    init: function() {
        // Hide Preloader after 1.5s
        setTimeout(() => {
            document.getElementById('preloader').style.opacity = '0';
            setTimeout(() => { document.getElementById('preloader').style.display = 'none'; }, 500);
        }, 1500);

        this.renderPlanets(planetsData);
        this.initCanvas();
        this.setupSearch();
    },

    // Navigation
    showSection: function(id) {
        document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        // Simple logic to highlight active link (optional)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // Render Planets
    renderPlanets: function(data) {
        const grid = document.getElementById('planetGrid');
        grid.innerHTML = ''; // Clear existing
        
        data.forEach(planet => {
            const card = document.createElement('div');
            card.className = 'planet-card glass-panel';
            card.onclick = () => app.openModal(planet);
            card.innerHTML = `
                <img src="${planet.image}" class="planet-icon" alt="${planet.name}">
                <h3>${planet.name}</h3>
                <p>${planet.desc.substring(0, 50)}...</p>
            `;
            grid.appendChild(card);
        });
    },

    // SEARCH FUNCTIONALITY
    setupSearch: function() {
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            
            const filtered = planetsData.filter(planet => 
                planet.name.toLowerCase().includes(query)
            );
            
            this.renderPlanets(filtered);
        });
    },

    // Modal Logic
    openModal: function(planet) {
        const modal = document.getElementById('planetModal');
        document.getElementById('modalTitle').innerText = planet.name;
        document.getElementById('modalBody').innerHTML = `
            <div style="text-align:center;">
                <img src="${planet.image}" style="width:100px; height:100px; border-radius:50%; margin-bottom:15px;">
            </div>
            <p><strong>Description:</strong> ${planet.desc}</p>
            <p style="color:var(--primary); margin-top:10px;"><i class="fa-solid fa-star"></i> Trivia: ${planet.trivia}</p>
        `;
        modal.classList.add('open');
    },

    closeModal: function() {
        document.getElementById('planetModal').classList.remove('open');
    },

    // Accordion
    toggleFaq: function(el) {
        el.parentElement.classList.toggle('open');
    },

    // Contact
    handleContact: function(e) {
        e.preventDefault();
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
        e.target.reset();
    },

    // Canvas Star Background
    initCanvas: function() {
        const canvas = document.getElementById('star-canvas');
        const ctx = canvas.getContext('2d');
        let width, height, stars = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        class Star {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2;
                this.speed = Math.random() * 0.5 + 0.1;
            }
            update() {
                this.y -= this.speed;
                if (this.y < 0) this.y = height;
            }
            draw() {
                ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for(let i=0; i<150; i++) stars.push(new Star());

        function animate() {
            ctx.clearRect(0, 0, width, height);
            stars.forEach(star => {
                star.update();
                star.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();
    }
};

// Start App when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});