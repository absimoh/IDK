const app = {

    init(){
        this.updateClock()
        this.stars()

        setTimeout(()=>{
            document.getElementById('loader').style.display='none'
        },1000)

        const iframe = document.getElementById('nasaMap')
        iframe.onload = ()=>{
            document.getElementById('mapLoader').style.display='none'
        }

        setInterval(()=>this.updateClock(),1000)
    },

    updateClock(){
        const t = new Date().toISOString().split('T')[1].split('.')[0]
        document.getElementById('clock').innerText = t + ' UTC'
        const mc = document.getElementById('mapClock')
        if(mc) mc.innerText = t
    },

    navigate(id){
        document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'))
        document.getElementById(id).classList.add('active')
        document.body.style.overflow = id === 'solar' ? 'hidden' : 'auto'
        window.scrollTo(0,0)
    },

    searchPlanet(){
        const input = document.getElementById('planetInput')
        const v = input.value.trim().toLowerCase()
        if(!v) return

        const planets = {
            mercury:'mercury', عطارد:'mercury',
            venus:'venus', الزهرة:'venus',
            earth:'earth', الارض:'earth',
            mars:'mars', المريخ:'mars',
            jupiter:'jupiter', المشتري:'jupiter',
            saturn:'saturn', زحل:'saturn',
            uranus:'uranus', اورانوس:'uranus',
            neptune:'neptune', نبتون:'neptune'
        }

        if(!planets[v]){
            alert('PLANET NOT FOUND')
            return
        }

        const iframe = document.getElementById('nasaMap')
        iframe.src = `https://eyes.nasa.gov/apps/solar-system/#/${planets[v]}`
        document.getElementById('mapLoader').style.display='flex'
        input.value = ''
    },

    stars(){
        const c = document.getElementById('star-canvas')
        const ctx = c.getContext('2d')
        let w,h
        const resize=()=>{w=c.width=innerWidth;h=c.height=innerHeight}
        resize();addEventListener('resize',resize)

        const stars = Array.from({length:120},()=>({
            x:Math.random()*w,
            y:Math.random()*h,
            r:Math.random()*1.5,
            s:Math.random()*.4+.2
        }))

        function loop(){
            ctx.clearRect(0,0,w,h)
            stars.forEach(s=>{
                s.y-=s.s
                if(s.y<0)s.y=h
                ctx.fillStyle='rgba(0,240,255,.8)'
                ctx.beginPath()
                ctx.arc(s.x,s.y,s.r,0,Math.PI*2)
                ctx.fill()
            })
            requestAnimationFrame(loop)
        }
        loop()
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    app.init()
    app.navigate('home')
})
