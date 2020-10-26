    let btn = document.querySelector("#burger-btn");
    let wrapper = document.querySelector(".burger");
    let overlay = document.querySelector(".overlay");

    let check = false;

    window.addEventListener("click", function(e) {

        if (e.target === overlay) {

            overlay.classList.toggle("overlay-inactive");
            wrapper.classList.toggle("burger-active");
            wrapper.classList.toggle("burger-inactive");
            btn.classList.toggle("burger-menu-active");
            btn.classList.toggle("burger-menu-inactive");

        }

    })

    btn.addEventListener("click", function() {

        btn.classList.toggle("burger-menu-inactive");
        btn.classList.toggle("burger-menu-active");

        wrapper.classList.toggle("burger-inactive");
        wrapper.classList.toggle("burger-active");
        overlay.classList.toggle("overlay-inactive");

        // if (btn.classList.contains("burger-menu-inactive")) {
        //     document.body.style.overflowY = "hidden";

        // } else {

        //     document.body.style.overflow = "";

        // }

    })