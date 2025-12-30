const app = {

    init(){
        this.updateClock()
        this.stars()

        // Hide system loader
        setTimeout(()=>{
            document.getElementById('loader').style.display='none'
        },1000)

        // Map loader
        const iframe = document.getElementById('nasaMap')
        iframe.onload = () => {
            document.getElementById('mapLoader').style.display='none'
        }

        setInterval(()=>this.updateClock(),1000)
    },

    updateClock(){
        const time = new Date().toISOString().split('T')[1].split('.')[0]
        document.getElementById('clock').innerText = time + ' UTC'

        const mapClock = document.getElementById('mapClock')
        if(mapClock) mapClock.innerText = time
    },

    navigate(id){
        document.querySelectorAll('.section').forEach(s=>{
            s.classList.remove('active')
        })

        const target = document.getElementById(id)
        if(!target) return

        target.classList.add('active')
        document.body.style.overflow = id === 'solar' ? 'hidden' : 'auto'
        window.scrollTo(0,0)
    },

    stars(){
        const canvas = document.getElementById('star-canvas')
        const ctx = canvas.getContext('2d')

        let w,h
        const resize = ()=>{
            w = canvas.width = window.innerWidth
            h = canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize',resize)

        const stars = Array.from({length:120},()=>({
            x:Math.random()*w,
            y:Math.random()*h,
            r:Math.random()*1.5,
            s:Math.random()*.4+.2
        }))

        function animate(){
            ctx.clearRect(0,0,w,h)
            stars.forEach(s=>{
                s.y -= s.s
                if(s.y < 0) s.y = h
                ctx.fillStyle = 'rgba(0,240,255,.8)'
                ctx.beginPath()
                ctx.arc(s.x,s.y,s.r,0,Math.PI*2)
                ctx.fill()
            })
            requestAnimationFrame(animate)
        }
        animate()
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    app.init()
    app.navigate('home')
})
