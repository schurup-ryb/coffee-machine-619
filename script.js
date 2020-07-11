"use strict"

let state = "waiting"//"cooking","ready"
let balance = document.querySelector(".balance");
let cup = document.querySelector(".cup img");
//onclick="cookCoffee(Американо)"
function cookCoffee(name, price, elem) {
  if (state != "waiting") {
    return;
  }
  if (balance.value >= price) {
    state = "cooking";
    balance.style.backgroundColor = "";
    balance.value -= price; //balance.value = balance.value - price
    changeDisplayText(`Ваш ${name} готовится`);
    
    //console.log(elem);
    let coffeeImg = elem.querySelector("img");
    //console.log(coffeeImg);
    let coffeeSrc = coffeeImg.getAttribute("src");
    //console.log(coffeeSrc);
    //console.log(coffeeImg.src);
    
    startCooking(name, coffeeSrc);
  } else {
    changeDisplayText("Недостаточно средств");
    balance.style.backgroundColor = "rgb(255, 50, 50)";
  }
}
//Планирование
//setTimeout(func,ms);-отрабатывает только один раз
//setInterval(func, ms);-отрабатывает пока не отключим
//let timeout =setTimeout(func,ms);
//let interval =setInterval(func,ms);
//clearTimeout(timeout);
//clearInterval(interval);
function startCooking(name, src) {
  //let progressBar = document.querySelector(".progress-bar")
  
  cup.setAttribute("srg", src);
  cup.style.display = "inline";
  let t = 0;
  let cookingInterval = setInterval(() => {// то же самое, что и function() {}
    t++;
    cup.style.opacity = t + "%";
    //progressBar.style.width = t + "%";
    changeProgressPercent(t);
    console.log(t);
    if (t == 100) {
      state = "ready";
      clearInterval(cookingInterval);
      changeDisplayText(`Ваш ${name} готов!`);
      cup.style.cursor = "pointer";
      cup.onclick = function() {
        takeCoffee();
      }
    }
  }, 50); 
}

function takeCoffee() {
  if (state != "ready") {
    return;
  }
  state = "waiting";
  changeProgressPercent(0);
  cup.style.opacity = 0;
  cup.style.display = "";// или "none"
  cup.style.cursor = "";
  changeDisplayText("");
  cup.onclick = null;
  
}

function changeProgressPercent(percent) {
  let progressBar = document.querySelector(".progress-bar");
  progressBar.style.width = percent + "%";
}


function changeDisplayText(text) {
  if (text.length > 23) {
    text = text.slice(0, 23) + "...";
  }
  let displayText = document.querySelector(".display span");
  displayText.innerHTML = text;
}

//----------------Drang-n-Drop-----------

let money = document.querySelectorAll(".money img");

//for (let i = 0; i < money.length; i++) {
//  money[i].onmousedown = takeMoney;
//}

for (let bill of money) {
  bill.onmousedown = takeMoney;
}
//В функцию, которая присвоена событию
function takeMoney() {
  event.preventDefault();
 /* console.log(this);
  console.log(event);
  console.log([event.target, event.clientX, event.clientY]);*/
  let bill = this;
  
  console.log(bill.style.height);//""
  console.log(bill.style.width);//""
  console.log(bill.getBoundingClientRect());
  
  let billCoords = bill.getBoundingClientRect();//Получение объекта, которые описывает положение элемента на странице
  
  
  let billHeight = billCoords.height;
  let billWidth = billCoords.width; 
  
  bill.style.position = "absolute";
  if (!bill.style.transform) {//bill.style.transform =="" (""== false);
    bill.style.top =( event.clientY  - billHeight/2) + "px";
    bill.style.left =( event.clientX - billWidth/2) + "px";
    bill.style.transform = "rotate(90deg)";
  } else {
    bill.style.top = ( event.clientY  - billWidth/2) + "px";
    bill.style.left = ( event.clientX - billHeight/2) + "px";
  }
  bill.style.trasition = "transform .3s";
  
  window.onmousemove = function(event) { 
    console.log([event.clientX, event.clientY]);
    bill.style.top =( event.clientY  - billWidth/2) + "px";
    bill.style.left =( event.clientX - billHeight/2) + "px";
  }
  
  bill.onmouseup = function() {
    window.onmousemove = null;
    if ( inAtm(bill) ) {
      console.log( bill.qetAttribute("data-cost") );
      console.log( bill.dataset.cost );
      balance.value = +balance.value + +bill.dataset.cost;
      bill.remove();//Удаляет элемент
    }
  }
}
function inAtm(bill) {
  let atm = document.querySelector(".atm img");
  
  let atmCoords = atm.qetBoundingClientRect();
  let atmLeftX = atmCoords.x;
  let atmRightX = atmCoords.x + atmCoords.width;
  let atmTopY = atmCoords.y; 
  let atmBottomY = atmCoords.y + atmCoords.height/3;
  
  let billCoords = bill.qetBoundingClientRect();
  let billLeftX = billCoords.x;
  let billRightX = billCoords.x + billCoords.width;
  let billY = billCoords.y;
  if(
        billLeftX > atmLeftX
    &&  billRightX < atmRightX  
    &&  billY > atmTopY
    &&  billY < atmBottomY
    ) {
    return true;  
  } else {
    return false;
  }
  
  /*return {
    atm: [atmLeftX, atmRightX,atmTopY, atmBottomY],
    bill: [billLeftX, billRightX, billY],*/
  }; 
}

















