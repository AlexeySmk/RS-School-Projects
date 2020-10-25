const quote = document.querySelector("blockquote");
const author = document.querySelector("figcaption");
const refQuote = document.querySelector(".refreshQuote");


async function getQ() {

    const url = "https://favqs.com/api/qotd";

    let arr = [];

    const res = await fetch(url);
    const data = await res.json();
    arr.push(data);

    quote.textContent = arr[Math.floor(Math.random() * arr.length)].quote.body;
    author.textContent = arr[Math.floor(Math.random() * arr.length)].quote.author;


}
getQ();

let clicked = false;
refQuote.addEventListener("click", function() {

    if (clicked) {
        refQuote.classList.remove("refreshQuote-tapped");
        refQuote.classList.add("refreshQuote-tapped2");
        clicked = false;
        getQ();
    } else {
        refQuote.classList.add("refreshQuote-tapped");
        refQuote.classList.remove("refreshQuote-tapped2");
        clicked = true;
        getQ();

    }



});