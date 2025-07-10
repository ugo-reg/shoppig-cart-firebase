import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push,  onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appURL={
    databaseURL:"https://playground-401d9-default-rtdb.europe-west1.firebasedatabase.app/"
}
 
const app = initializeApp(appURL); 
const db = getDatabase(app);
const itemInDb = ref(db, "items");

const item= document.querySelector("#groceries");
const add=document.querySelector("#add");
 const cart = document.querySelector("#cart");


function addItem() {
    let itemValue = item.value;

    push(itemInDb, itemValue)
    refreshInput()
}
add.addEventListener("click",addItem);
    
onValue(itemInDb, function (snapshot) {
  if (snapshot.exists()) {
   let itemArray = Object.entries(snapshot.val());
removeItem();
   for (let i = 0 ; i < itemArray.length; i++){

    const shopList= itemArray[i]
    let currentItemValue = shopList[1]
    let itemKey = shopList[0]
    addItemToCart(shopList)
   }
  }    
  else {
    cart.innerHTML = "want something 😜";
  }
})
  

function refreshInput() {
  item.value = "";
} 
function removeItem() {
  cart.innerHTML=""}

  function addItemToCart(itemValue) {
  let itemKey = itemValue[0]; 
  itemValue = itemValue[1]; 

let li = document.createElement("li"); 
li.textContent = itemValue

li.addEventListener("click", function(){

 let deleteItem = ref(db, `items/${itemKey}`); // delete item by key
  remove(deleteItem)
})
cart.appendChild(li);

 
}