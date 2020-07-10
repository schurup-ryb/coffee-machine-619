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



