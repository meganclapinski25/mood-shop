import data from './data.js'
const itemsContainer = document.querySelector('#items')


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
const cart = []



console.log(obj)

function addItems(name, price){
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
    const qty = getQty()
    console.log(`You have ${qty} items in your cart`)
    for (let i = 0; i < cart.length; i +=1){
        console.log(`-${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
        
    }
   
    console.log(`Total in cart : $${getTotal()}`)
}
//Get Quantity
function getQty(){
    let qty = 0;
    for(i =0; i < cart.length; i+=1){
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
addItems('apple', .99)
addItems('orange', .50)
addItems('pineapple', 1.99)
addItems('watermelon', 2.99)

showItems()

