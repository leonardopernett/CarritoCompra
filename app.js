import Api from './services.js'
const api = new Api()

api.fetchData().then(res=>{
   pintarProducto(res)
})

const productos = document.querySelector('#productos-lista')

const pintarProducto = (data)=>{
   const fragment = document.createDocumentFragment();
   const template = document.querySelector('#producto-template').content
   data.forEach(product => {
       template.querySelector('img').setAttribute('src', product.thumbnailUrl)
       template.querySelector('h3').textContent=product.title
       template.querySelector('p').textContent=`$ ${product.precio}`
       template.querySelector('button').setAttribute('data-id',product.id)
       template.querySelector('button').classList.add('add')
       const clone = template.cloneNode(true)
       fragment.appendChild(clone)
   });
   productos.appendChild(fragment)
   getproducto(data)
}


let carrito = {}
const getproducto = (data)=>{
  const  card = document.querySelectorAll('.card button')    
  card.forEach(btn=>{
     btn.addEventListener('click',(e)=>{
          let product = data.find(p=>p.id === parseInt(btn.dataset.id))
          product.cantidad = 1
          if(carrito[product.id]){
              product.cantidad = carrito[product.id].cantidad +1
          }
          carrito[product.id]= {...product}
          pintarCarrito()
     })

  })
  
}
   const add = document.querySelector('#producto-add')
const pintarCarrito = ()=>{
   add.innerHTML=""
   const template = document.querySelector('#carrito-template').content
   const fragment = document.createDocumentFragment();

   Object.values(carrito).forEach(element=>{
      template.querySelectorAll('td')[0].textContent=element.id
      template.querySelectorAll('td')[1].textContent=element.title
      template.querySelectorAll('td')[2].textContent=element.cantidad
      template.querySelectorAll('td')[4].textContent=element.precio * element.cantidad

      const clone = template.cloneNode(true)
      fragment.appendChild(clone)
   }) 
    
   add.appendChild(fragment)
   
}

