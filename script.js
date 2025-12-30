const app = {
    init(){
        this.clock()
        this.stars()
        setTimeout(()=>document.getElementById('loader').style.display='none',1000)

        const iframe=document.getElementById('nasaMap')
        iframe.onload=()=>document.getElementById('mapLoader').style.display='none'

        setInterval(this.clock,1000)
    },

    clock(){
        const t=new Date().toISOString().split('T')[1].split('.')[0]
        document.getElementById('clock').innerText=t+' UTC'
        const mc=document.getElementById('mapClock')
        if(mc) mc.innerText=t
    },

    navigate(id){
        document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'))
        document.getElementById(id).classList.add('active')
        document.body.style.overflow=id==='solar'?'hidden':'auto'
    },

    stars(){
        const c=document.getElementById('star-canvas')
        const ctx=c.getContext('2d')
        let w,h
        const resize=()=>{w=c.width=innerWidth;h=c.height=innerHeight}
        resize();addEventListener('resize',resize)

        const stars=Array.from({length:120},()=>({
            x:Math.random()*w,
            y:Math.random()*h,
            r:Math.random()*1.5,
            s:Math.random()*.5+.2
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

document.addEventListener('DOMContentLoaded',()=>app.init())
