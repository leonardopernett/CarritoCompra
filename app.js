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
   const addProduct = document.querySelector('#producto-add')

   const pintarCarrito = ()=>{
   addProduct.innerHTML=""
   const template = document.querySelector('#carrito-template').content
   const fragment = document.createDocumentFragment();

   Object.values(carrito).forEach(element=>{
      template.querySelectorAll('td')[0].textContent=element.id
      template.querySelectorAll('td')[1].textContent=element.title
      template.querySelectorAll('td')[2].textContent=element.cantidad
      template.querySelectorAll('td')[4].textContent=element.precio * element.cantidad
      
      template.querySelector('.btn-success').setAttribute('data-id',element.id)
      template.querySelector('.btn-danger').setAttribute('data-id',element.id)

      const clone = template.cloneNode(true)
      fragment.appendChild(clone)
   }) 
   addProduct.appendChild(fragment)
   pintarFooter()
}

   const footer = document.querySelector('#producto-footer')
   const pintarFooter = ()=>{
   footer.innerHTML=""

   if(Object.values(carrito).length == 0){
      footer.innerHTML="<td>carrito vacio html</td>"  
      return 
   }
   const template = document.querySelector('#footer-template').content
   const fragment = document.createDocumentFragment();
   
   let sum = 0
   for (let value in carrito) {
         sum += carrito[value].cantidad
   }
   
  let cantidad =  Object.values(carrito).reduce((accumulator,{cantidad})=> accumulator + cantidad,0 )
  let total    = Object.values(carrito).reduce((accumulator,{cantidad, precio})=>accumulator + cantidad*precio,0)
 
    template.querySelectorAll('td')[0].textContent=cantidad
    template.querySelectorAll('td')[2].textContent= '$' + total

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

     document.querySelector('#btn').addEventListener('click',()=>{
       carrito={}
       pintarCarrito()
    })
}




const pintarBoton = ()=>{
   addProduct.addEventListener('click',(e)=>{
      if(e.target.classList.contains('add')){
         const id = e.target.dataset.id
         const product = carrito[id]
         product.cantidad ++
         carrito[id] = {...product}
         pintarCarrito()
      }
  
      if(e.target.classList.contains('dis')){
        const id = e.target.dataset.id
        const product = carrito[id]
         product.cantidad --
         if(product.cantidad == 0){
            delete carrito[id]
            pintarCarrito()
         }else{
            carrito[id]= {...product}
            pintarCarrito()
         }

       
        
     }
  })
  
}
pintarBoton()



