import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push,  onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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
   let itemArray = Object.values(snapshot.val());
removeItem()
   for (let i = 0 ; i < itemArray.length; i++){
    const shopList= itemArray[i];
    addItemToCart(shopList);}    
})
  
function addItemToCart(itemValue) {
  cart.innerHTML += `<li>${itemValue}</li>`;
}
function refreshInput() {
  item.value = "";
} 
function removeItem() {
  cart.innerHTML=""}