import data from './data.js'
const itemsContainer = document.querySelector('#items')
const itemList = document.getElementById('item-list')
const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById('cart-total')




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




//add items 
function addItem(name, price){
    const all_items_button = Array.from(document.querySelectorAll("button"))
    for(let i = 0; i < cart.length; i+=1){
        if(cart[i].name === name){
            cart[i].qty +=1
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
        itemStr += `<li> ${name} $${price} x ${qty} =  ${qty * price} </li>`
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
    for(let i = 0; i < cart.length; i +=1){
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
            return
        }
    }

}


//console.log(itemList)

