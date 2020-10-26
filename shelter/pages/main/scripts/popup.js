let pet1 = {
    "name": "Jennifer",
    "img": "assets/images/pets-jennifer-500.png",
    "type": "Dog",
    "breed": "Labrador",
    "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    "age": "2 months",
    "inoculations": "none",
    "diseases": ["none"],
    "parasites": ["none"]
};

let pet2 = {
    "name": "Sophia",
    "img": "assets/images/pets-sophia.png",
    "type": "Dog",
    "breed": "Shih tzu",
    "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    "age": "1 month",
    "inoculations": ["parvovirus"],
    "diseases": ["none"],
    "parasites": ["none"]
};

let pet3 = {
    "name": "Woody",
    "img": "assets/images/pets-woody-500.png",
    "type": "Dog",
    "breed": "Golden Retriever",
    "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
    "age": "3 years 6 months",
    "inoculations": ["adenovirus", "distemper"],
    "diseases": ["right back leg mobility reduced"],
    "parasites": ["none"]
};

let pet4 = {
    "name": "Scarlett",
    "img": "assets/images/pets-scarlet.png",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
    "age": "3 months",
    "inoculations": ["parainfluenza"],
    "diseases": ["none"],
    "parasites": ["none"]
};

let pet5 = {
    "name": "Katrine",
    "img": "assets/images/pets-katrine-500.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
    "age": "6 months",
    "inoculations": ["panleukopenia"],
    "diseases": ["none"],
    "parasites": ["none"]
};


let pet6 = {
    "name": "Timmy",
    "img": "assets/images/pets-timmy.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
    "age": "2 years 3 months",
    "inoculations": ["calicivirus", "viral rhinotracheitis"],
    "diseases": ["kidney stones"],
    "parasites": ["none"]
};

let pet7 = {
    "name": "Freddie",
    "img": "assets/images/pets-freddie.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
    "age": "2 months",
    "inoculations": ["rabies"],
    "diseases": ["none"],
    "parasites": ["none"]
};

let pet8 = {
    "name": "Charly",
    "img": "assets/images/pets-charly.png",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
    "age": "8 years",
    "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
    "diseases": ["deafness", "blindness"],
    "parasites": ["lice", "fleas"]
};


let header = document.querySelector(".popup-header");
let description = document.querySelector(".popup-description");
let text = document.querySelector(".popup-text");
let age = document.querySelector(".popup-about-age");
let inoculations = document.querySelector(".popup-about-inoculations");
let diseases = document.querySelector(".popup-about-diseases");
let parasites = document.querySelector(".popup-about-parasites");
let close = document.querySelector(".popup-close");
let popups = document.querySelectorAll("body > section > article > div.pets-block > div > div > button")
let popup = document.querySelector("button");
let popupWrapper = document.querySelector(".popup-wrapper");
let childNodes = document.querySelectorAll(".popup-about > p");
let img = document.querySelector(".popup-image");


close.addEventListener("click", function(e) {

    document.querySelector(".popup-wrapper").style.display = "none";
    document.querySelector("body").style.overflow = "";
    document.querySelectorAll(".slider-item").forEach(item => item.style.zIndex = "");

})



function deleteNodes(node) {

    node.forEach((item, index) => {

        let childs = item.childNodes;

        for (let i = 0; i < childs.length; i++) {

            if (i >= 2) {
                item.removeChild(childs[1]);

            }

        }

    })

}
deleteNodes(childNodes)

function paste(object) {

    img.setAttribute("src", object.img);
    header.innerText = object.name;
    description.innerText = `${object.type} - ${object.breed}`
    text.innerText = object.description;
    age.insertAdjacentText('beforeend', " " + object.age);
    inoculations.insertAdjacentText('beforeend', " " + object.inoculations);
    diseases.insertAdjacentText('beforeend', " " + object.diseases);
    parasites.insertAdjacentText('beforeend', " " + object.parasites);

}


popups.forEach(item => {
    item.addEventListener("click", function(e) {
        document.querySelector(".popup-wrapper").style.position = "fixed";
        if (e.target.className === "pets-item-btn pop1") {
            paste(pet5);
            deleteNodes(childNodes);
            document.querySelector(".popup-wrapper").style.display = "flex";
            document.querySelector("body").style.overflow = "hidden";
        }
        if (e.target.className === "pets-item-btn pop2") {
            paste(pet1);
            deleteNodes(childNodes);
            document.querySelector(".popup-wrapper").style.display = "flex";
            document.querySelector("body").style.overflow = "hidden";
        }
        if (e.target.className === "pets-item-btn pop3") {
            paste(pet3);
            deleteNodes(childNodes);
            document.querySelector(".popup-wrapper").style.display = "flex";
            document.querySelector("body").style.overflow = "hidden";
        }
        if (e.target.className === "pets-item-btn pop4") {
            paste(pet2);
            deleteNodes(childNodes);
            document.querySelector(".popup-wrapper").style.display = "flex";
            document.querySelector("body").style.overflow = "hidden";
        }

        if (e.target.className === "pets-item-btn pop5") {
            paste(pet6);
            deleteNodes(childNodes);
            document.querySelector(".popup-wrapper").style.display = "flex";
            document.querySelector("body").style.overflow = "hidden";
        }

        if (e.target.className === "pets-item-btn pop6") {
            paste(pet8);
            deleteNodes(childNodes);
            document.querySelector(".popup-wrapper").style.display = "flex";
            document.querySelector("body").style.overflow = "hidden";
        }

        if (e.target.className === "pets-item-btn pop7") {
            paste(pet4);
            deleteNodes(childNodes);
            document.querySelector(".popup-wrapper").style.display = "flex";
            document.querySelector("body").style.overflow = "hidden";
        }

        if (e.target.className === "pets-item-btn pop8") {
            paste(pet7);
            deleteNodes(childNodes);
            document.querySelector(".popup-wrapper").style.display = "flex";
            document.querySelector("body").style.overflow = "hidden";
        }

    })
})

window.addEventListener("click", function(e) {
    if (e.target === popupWrapper) {
        document.querySelectorAll(".slider-item").forEach(item => item.style.zIndex = "");
        document.querySelector(".popup-wrapper").style.display = "none";
        document.querySelector("body").style.overflow = "";

    }

})