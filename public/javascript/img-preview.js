const preview = document.createElement('div')
preview.id = "preview"
const container = document.querySelector('.container')
container.append(preview)

const closed = document.getElementById('close')
const images = document.querySelectorAll('.featured-img img')
images.forEach(image=>{
    image.addEventListener('click',()=>{
        preview.classList.add('active')
        closed.classList.add('active')
        const img = document.createElement('img')
        img.src = image.src
        while(preview.firstChild){
            preview.removeChild(preview.firstChild)
        }
        preview.appendChild(img)
    })
})

if (closed){
    closed.addEventListener('click',()=>{
        preview.classList.remove('active')
        closed.classList.remove('active')
    })
    preview.addEventListener('click',(e)=>{
        if(e.target !== e.currentTarget)return
        preview.classList.remove('active')
        closed.classList.remove('active')
    })
    
}


const burger = document.querySelector('.burger')
const nav = document.querySelector('.header-nav ul')
const links = document.querySelectorAll('.header-nav ul li')


burger.addEventListener('click',()=>{
    burger.classList.toggle('active')
    nav.classList.toggle('nav-active')
    links.forEach((link,index)=>{
        if(link.style.animation){
            link.style.animation = ''
        }
        else{
            link.style.animation = `navLinkFade 0.4s forwards ${index/7 + 0.4}s`
        }
        console.log(index/7)
    })

})

const navHeader = document.querySelector('.header-nav')

document.addEventListener('scroll',()=>{
    const y = window.scrollY
    if( y > 130){
        navHeader.classList.add('scroll-down')
    }else{
        navHeader.classList.remove('scroll-down')
    }
})