const preview = document.createElement('div')
preview.id = "preview"
const container = document.querySelector('.container')
container.append(preview)

const close = document.getElementById('close')
const images = document.querySelectorAll('.featured-img img')
images.forEach(image=>{
    image.addEventListener('click',()=>{
        console.log('clickeddd')
        preview.classList.add('active')
        close.classList.add('active')
        const img = document.createElement('img')
        img.src = image.src
        while(preview.firstChild){
            preview.removeChild(preview.firstChild)
        }
        preview.appendChild(img)
    })
})

if (close){
    close.addEventListener('click',()=>{
        preview.classList.remove('active')
        close.classList.remove('active')
    })
    preview.addEventListener('click',(e)=>{
        if(e.target !== e.currentTarget)return
        preview.classList.remove('active')
        close.classList.remove('active')
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
            link.style.animation = `navLinkFade 0.2s forwards ${index/7 + 0.2}s`
        }
        console.log(index/7)
    })

})