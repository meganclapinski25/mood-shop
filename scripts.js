import data from './data.js'
const itemsContainer = document.querySelector('#items')
const itemList = document.getElementById('item-list')
const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById('cart-total')
const addForm = document.getElementById(' add-form')




//all_items_button.forEach(elt => elt.addEventListener('click', () => {
   // addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
   // showItems()
  //}))
//itemList.innerHTML = '<li> Hello World </li>'

for( let i = 0; i < data.length; i +=1){
    const newDiv = document.createElement('div');
    newDiv.className = 'item';
    const img = document.createElement('img');

    img.src = data[i].image
    img.width = 300
    img.height = 300

    newDiv.appendChild(img)
    console.log(img)
    itemsContainer.appendChild(newDiv);

    const desc = document.createElement('P')
    desc.innerText = data[i].desc
    newDiv.appendChild(desc)
    const price = document.createElement('P')
    price.innerText = data[i].price
    newDiv.appendChild(price)
    const button = document.createElement('button')
    button.id = data[i].name
    button.dataset.price = data[i].price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)

}

const all_items_button = Array.from(document.querySelectorAll("button"))
all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItems()
  }))
//console.log(all_items_button)
const cart = []
// handle change events on update input
itemList.onchange = function(e){
    if(e.target && e.target.classList.contains('update')){
        const name = e.target.dataset.name
        const qty = parseInt(e.target.value)

        updateCart(name, qty)


    }
}








// handle clicks on list 
itemList.onclick = function(e) {
    //console.log("Clicked List!! ")
    if(e.target && e.target.classList.contains('remove')){
       const name = e.target.dataset.name // data-name
        removeItem(name)
    }else if(e.target && e.target.classList.contains('add-one')){
        const name = e.target.dataset.name // data-name
        addItem(name)
        //const name = e.target.dataset.name
        //addItem(name)
    }else if(e.target && e.target.classList.contains('remove-one')){
       const name = e.target.dataset.name
       removeItem(name, 1)
    }
}


//handle add form submit
/*addForm.onsubmit = function(e) {
    e.preventDefault()
    const name = itemName.value
    const price = itemPrice.value
    addItem(name, price)
}*/




//add items 
function addItem(name, price){
    const all_items_button = Array.from(document.querySelectorAll("button"))
    for(let i = 0; i < cart.length; i+=1){
        if(cart[i].name === name){
            cart[i].qty +=1
            showItems()
            //stop here
            return
        }
    }
    const item = { name, price, qty: 1}
    cart.push(item);
    

}

//show items
function showItems(){
    const all_items_button = Array.from(document.querySelectorAll("button"))
    const qty = getQty()
    //console.log(`You have ${qty} items in your cart`)
    cartQty.innerHTML = `You have ${qty} items in your cart`

    let itemStr = ''
    for (let i = 0; i < cart.length; i +=1){
        //console.log(`-${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
        
        
       const {name , price, qty} = cart[i]

       
        itemStr += `<li> 
        ${name} $${price} x ${qty} =  ${qty * price} 
        <button class= "remove" data-name = "${name}">Remove</button>
        <button class= "add-one" data-name = "${name}"> + </button>
        <button class= "remove-one" data-name = "${name}"> - </button>
        <input class="update" type ="number" data-name = "${name}">

        </li>`
    }
    itemList.innerHTML = itemStr

    console.log(`Total in cart : $${getTotal()}`)
    //cartTotal.innerHTML = `Total in cart : $${getTotal()}`
    

}


//Get Quantity
function getQty(){
    let qty = 0;
    for(let i =0; i < cart.length; i+=1){
        qty += cart[i].qty
    }
    return qty
}


//Get total
function getTotal(){
    let total = 0
    for(let i =0; i < cart.length; i+=1){
        total+=cart[i].price *cart[i].qty
}
return total.toFixed(2)
}

function removeItem(name, qty = 0){
    for(let i = 0; i < cart.length; i+=1){
        if(cart[i].name === name){
            if(qty >0){
                cart[i].qty -=qty
            }
            
            if(cart[i].qty < 1 || qty === 0){
                cart.splice(i, 1)
            }
            //cart.splice(i, 1)
            showItems()
            return
        }
    }

}

// updateItem
function updateCart(name,qty){
    for(let i = 0; i < cart.length; i+=1){
        if(cart[i].name === name){
            if(qty < 1){
                removeItem(name)
                return
            }
            
            cart[i].qty = qty
            showItems()
            return
        }
        
    }
}


//console.log(itemList)

