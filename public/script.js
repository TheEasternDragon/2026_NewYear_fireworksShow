const canvas = document.getElementById('fireworksCvs');
const ctx = canvas.getContext('2d');

function resizeCanvas()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize',resizeCanvas);

let fireworks = [];
let particles = [];

canvas.addEventListener('click',function(e){
    fireworks.push({
        x:e.clientX,
        y:canvas.height,
        vy:-12-Math.random()*4,
        targetY:canvas.height*0.2 + Math.random()* canvas.height* 0.3,
        color:['#ff3300','#ff7700','#ffaa00','#ff3366','#ff00aa','#00ccff'][Math.floor(Math.random()*6)],
        life: 1.0,
    })
})

function explode(x,y,color)
{
    for(let i=0;i<30;i++)
    {
        particles.push({
            x:x,
            y:y,
            vx:(Math.random() - 0.5)*8,
            vy:(Math.random() - 0.5)*8,
            color:color,
            size:Math.random()*3 + 2,
            life:1.0,
        });
    }
}

function animate()
{
    ctx.fillStyle = 'rgba(10,10,42,0.2)';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    for(let i = fireworks.length - 1;i>=0;i--)
    {
        const f = fireworks[i];

        f.y+=f.vy;
        f.vy+=0.2;
        
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(f.x,f.y,3,0,Math.PI*2);
        ctx.fillStyle=f.color;
        ctx.fill();

        if(f.y<=f.targetY||f.vy>=0)
        {
            explode(f.x,f.y,f.color);
            fireworks.splice(i,1);
        }
    }

    for(let i = particles.length-1; i >= 0; i--)
    {
        const p = particles[i];

        p.x+=p.vx;
        p.y+=p.vy;
        p.vy+=0.1;
        p.life-=0.01;

        if(p.life <= 0||
            p.y > canvas.height||
            p.x < 0||
            p.x > canvas.width)
        {
            particles.splice(i,1);
            continue;
        }

        //重新绘制
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.size*p.life,0,Math.PI*2);
        ctx.fillStyle = p.color;
        ctx.fill();
    }
    requestAnimationFrame(animate);
}

animate();

let autoFire = false;
let autoFireInterval;

const autoFireBtn = document.getElementById('autoFireButton');

//自动放烟花
autoFireBtn.addEventListener('click',function(){
    autoFire = !autoFire;
    this.textContent = autoFire ? '暂停烟花' : '自动播放烟花';

    if(autoFire)
    {
        autoFireInterval = setInterval(() => {
            fireworks.push({
                x:Math.random()*canvas.width,
                y:canvas.height,
                vy:-12 - Math.random()*4,
                targetY:canvas.height*0.2+Math.random()* canvas.height*0.3,
                color:['#ff3300','#ff7700','#ffaa00','#ff3366','#ff00aa','#00ccff'][Math.floor(Math.random()*6)],
                life:1.0,
            })
        }, 400);
    }
    else
    {
        clearInterval(autoFireInterval);
    }
});
