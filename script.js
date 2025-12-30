const app = {
    planetsData: [], // سيتم ملؤها من ملف JSON

    init: function() {
        this.loadData();
        this.initCanvas();
        this.setupSearch();
    },

    // دالة سحب البيانات (محاكاة الباك إند)
    loadData: async function() {
        try {
            const response = await fetch('data.json');
            this.planetsData = await response.json();
            
            // إخفاء شاشة التحميل
            document.getElementById('preloader').style.opacity = '0';
            setTimeout(() => { document.getElementById('preloader').style.display = 'none'; }, 500);
            
            // عرض الكواكب
            this.renderPlanets(this.planetsData);
        } catch (error) {
            console.error("Error loading data:", error);
            document.getElementById('preloader').innerHTML = '<p style="color:red;">Error: Data feed disconnected.</p>';
        }
    },

    showSection: function(id) {
        document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    renderPlanets: function(data) {
        const grid = document.getElementById('planetGrid');
        grid.innerHTML = '';
        
        if(data.length === 0) {
            grid.innerHTML = '<p style="text-align:center; grid-column:1/-1; color:white;">No planets found.</p>';
            return;
        }

        data.forEach(planet => {
            const card = document.createElement('div');
            card.className = 'planet-card glass-panel';
            card.onclick = () => app.openModal(planet);
            card.innerHTML = `
                <img src="${planet.image}" class="planet-icon" alt="${planet.name}">
                <h3>${planet.name}</h3>
                <p>${planet.desc.substring(0, 45)}...</p>
            `;
            grid.appendChild(card);
        });
    },

    setupSearch: function() {
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = this.planetsData.filter(planet => 
                planet.name.toLowerCase().includes(query)
            );
            this.renderPlanets(filtered);
        });
    },

    openModal: function(planet) {
        const modal = document.getElementById('planetModal');
        document.getElementById('modalTitle').innerText = planet.name;
        document.getElementById('modalBody').innerHTML = `
            <div style="text-align:center;">
                <img src="${planet.image}" style="width:100px; height:100px; border-radius:50%; margin-bottom:15px; box-shadow: 0 0 20px var(--primary);">
            </div>
            <p><strong>Description:</strong> ${planet.desc}</p>
            <p style="color:var(--primary); margin-top:10px;"><i class="fa-solid fa-star"></i> Trivia: ${planet.trivia}</p>
        `;
        modal.classList.add('open');
    },

    closeModal: function() {
        document.getElementById('planetModal').classList.remove('open');
    },

    handleContact: function(e) {
        e.preventDefault();
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
        e.target.reset();
    },

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

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});