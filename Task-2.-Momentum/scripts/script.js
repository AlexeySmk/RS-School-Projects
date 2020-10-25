const time = document.getElementById("time"),
    tDate = document.getElementById("date"),
    greeting = document.getElementById("greeting"),
    name = document.getElementById("name"),
    focus = document.getElementById("focus"),
    btn = document.getElementById("arrow"),
    blackW = document.querySelector(".weather-about"),
    cityB = document.querySelector(".city"),
    focusB = document.querySelector("#focus");


function showTime() {

    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds(),
        month = today.getMonth(),
        date = today.getDate(),
        day = today.getDay();

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].find((item, index, array) => item === array[month]);
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].find((item, index, array) => item === array[day]);

    const amPm = hour >= 12 ? "PM" : "AM";

    hour = hour % 24 || 24;
    if (hour === 24) {
        hour = "00";

    } else if (hour >= 1 && hour <= 9) {

        hour = `0${hour}`;

    }
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${amPm}`;
    tDate.innerHTML = `${days}, ${months} ${date}`;

    setTimeout(showTime, 1000);
}

function addZero(n) {

    return (parseInt(n, 10) < 10 ? "0" : "") + n;

}

let pathMorning = "images/morning/";
let pathDay = "images/day/"
let pathEvening = "images/evening/";
let pathNight = "images/night/";

let images = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg"];


// console.log(changeImage(images));


function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');
    img.src = src;

    img.onload = () => {
        body.style.backgroundImage = `url(${src})`;
    };

}

let i = localStorage.getItem("indexOfImg");

function getImage(base) {
    const index = i % images.length;
    let imageSrc = base + images[index];
    // localStorage.setItem("imgPath", imageSrc);
    // let save = localStorage.getItem("imgPath");
    viewBgImage(imageSrc);
    i++;
    localStorage.setItem("indexOfImg", index);
    btn.disabled = true;
    setTimeout(function() { btn.disabled = false }, 1000);

}

function setBgGreet() {

    let today = new Date();
    hour = today.getHours();

    if (hour > 6 && hour < 12) {

        getImage(pathMorning);
        greeting.textContent = "Good Morning, ";

    } else if (hour >= 12 && hour < 18) {
        getImage(pathDay);
        // document.body.style.backgroundImage = `url("${pathDay}${imgObj[0]}")`;
        greeting.textContent = "Good Afternoon, ";

    } else if (hour >= 18 && hour < 23) {
        getImage(pathEvening);
        greeting.textContent = "Good Evening, ";

    } else {

        getImage(pathNight);
        greeting.textContent = "Good Night,";
        document.body.style.color = "white";
        blackW.style.color = "black";
        cityB.style.color = "black";
        focusB.style.color = "black";
        btn.style.background = "white";

    }

}

btn.addEventListener("click", function() {
    setBgGreet();
});

function countTime() {

    let date = new Date();
    let date2 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + 1);
    let diff = date2 - date;
    return Math.round(diff / 1000);

}

console.log(countTime());


// (countTime() * 1000)

let timing = setInterval(setBgGreet, (countTime() * 1000));

function getName() {

    if (localStorage.getItem("name") === null || localStorage.getItem("name") === "") {

        name.textContent = "Enter Name";

    } else {

        name.textContent = localStorage.getItem("name");

    }

}

function setName(e) {

    if (e.type === "keypress") {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem("name", e.target.innerText);
            name.blur();
        }

    } else {
        localStorage.setItem("name", e.target.innerText);
    }

}

function getFocus() {

    if (localStorage.getItem("focus") === null || localStorage.getItem("focus") === "") {

        focus.textContent = "Enter Your Focus";

    } else {

        focus.textContent = localStorage.getItem("focus");

    }


}

function setFocus(e) {

    if (e.type === "keypress") {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem("focus", e.target.innerText);
            focus.blur();
        }

    } else {
        localStorage.setItem("focus", e.target.innerText);
    }

}

name.addEventListener("click", function() {

    name.innerText = "";

})

focus.addEventListener("click", function() {

    focus.innerText = "";

})
name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);
name.addEventListener("blur", function() {

    if (name.textContent === "") {
        console.log(1);
        name.textContent = "Enter Name";

    }

})

focus.addEventListener("blur", function() {

    if (focus.textContent === "") {
        focus.textContent = "Enter Your Focus";

    }

})

setBgGreet();
showTime();
getName();
getFocus();