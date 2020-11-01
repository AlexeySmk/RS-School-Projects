window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const Keyboard = {

    elements: {

        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {

        oninput: null,
        onclose: null

    },

    properties: {

        value: "",
        capsLock: false,
        shift: false,
        audio: true,
        micro: false,
        recognition: new SpeechRecognition()

    },
    init() {

        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div")
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard-keys");
        this.elements.keysContainer.appendChild(this._createKeys("keyLayout"));
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        let audioKeyboard = document.createElement("audio");
        audioKeyboard.classList.add("audio-keyboard")
        this.elements.main.appendChild(audioKeyboard);
        audioKeyboard.setAttribute("src", "assets/sounds/keyboard_sound.wav")

        let audioShift = document.createElement("audio");
        audioShift.classList.add("audio-shift")
        this.elements.main.appendChild(audioShift);
        audioShift.setAttribute("src", "assets/sounds/shift_sound.wav")

        let audioBackspace = document.createElement("audio");
        audioBackspace.classList.add("audio-backspace")
        this.elements.main.appendChild(audioBackspace);
        audioBackspace.setAttribute("src", "assets/sounds/backspace_sound.wav")

        let audioCapslock = document.createElement("audio");
        audioCapslock.classList.add("audio-capslock")
        this.elements.main.appendChild(audioCapslock);
        audioCapslock.setAttribute("src", "assets/sounds/capslock_sound.wav")

        let audioEnter = document.createElement("audio");
        audioEnter.classList.add("audio-enter")
        this.elements.main.appendChild(audioEnter);
        audioEnter.setAttribute("src", "assets/sounds/enter_sound.wav")


        document.querySelectorAll(".use-keyboard-input").forEach(input => {

            input.addEventListener("focus", () => {

                this.open(input.value, currentValue => {

                    input.value = currentValue;

                });

            })

        })

        // document.querySelectorAll(".keyboard__key").forEach(item => {

        //     if (item.textContent !== "check_circle") {

        //         item.addEventListener("mousedown", () => {

        //             document.querySelector(".use-keyboard-input");

        //         })
        //     }

        // })

        document.addEventListener("mousedown", (e) => {

            if (e.target.classList.contains("keyboard__key") || e.target.classList.contains("keyboard-keys") || e.target.classList.contains("material-icons")) {

                e.preventDefault();

                if (!document.querySelector(".use-keyboard-input").focus()) {
                    document.querySelector(".use-keyboard-input").focus()
                }
            }


            // console.log(e.target);
        })

        let sw = document.querySelector(".switcher");


    },

    _createKeys(layout) {

        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "capslock", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "done",
            "micro", "sound", "ру", "space", "arrowleft", "arrowright"
        ];
        const keyLayoutRu = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
            "capslock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
            "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",", ".", "?", "done",
            "en", "space"
        ];

        const createIconHTML = (icon_name) => {
            return `<i class='material-icons'>${icon_name}</i>`;
        }

        function audio(name = "audio-keyboard") {

            const audio = document.querySelector(`.${name}`);
            audio.currentTime = 0;
            audio.play();

        }

        document.querySelector(".use-keyboard-input").addEventListener("keydown", (e) => {
            if (this.properties.sound) {
                console.log(true);
                if (e.key === "Shift") {
                    audio("audio-shift");
                } else if (e.key === "Enter") {

                    audio("audio-enter");

                } else if (e.key === "Backspace") {

                    audio("audio-backspace")

                } else if (e.key === "CapsLock") {

                    audio("audio-capslock")

                } else {
                    audio("audio-keyboard");
                }
            } else {
                console.log(false);
                return;
            }
        });
        (layout === "keyLayout" ? keyLayout : keyLayoutRu).forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "ъ", "enter", "done"].indexOf(key) !== -1;

            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            if (key === "ру" || key === "en") {
                keyElement.classList.add("switcher");
                keyElement.addEventListener("click", () => {

                    if (key === "en") {
                        console.log(key);
                        key = "ру";
                        keyElement.textContent = "ру";
                    } else {
                        console.log(key);
                        key = "en";
                        keyElement.textContent = "en";

                    }

                })
            }

            document.querySelector(".use-keyboard-input").addEventListener("keydown", (e) => {
                // console.log(e);
                // this.properties.value += document.querySelector(".use-keyboard-input").textContent;
                if (key === e.key.toLowerCase() || key === e.code.toLowerCase()) {
                    if (key === "backspace") {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                    }
                    if (key === "space") {
                        this.properties.value += " ";
                    }
                    if (key === "enter") {
                        this.properties.value += "\n";
                    }
                    if (key === "capslock") {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active");
                    }

                    function removeSpecialButtons(key) {
                        if (key === "backspace" || key === "enter" || key === "capslock" ||
                            key === "shift" || key === "space" || key === "arrowleft" || key === "arrowright" || key === " ") {

                            return "";
                        } else {
                            return key;
                        }
                    }
                    console.log(removeSpecialButtons(key));
                    this.properties.value += removeSpecialButtons(key);
                    keyElement.classList.add("keyboard__key--activeBtn");
                    setTimeout(() => {

                        keyElement.classList.remove("keyboard__key--activeBtn");

                    }, 100)

                }

            })

            switch (key) {

                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        if (this.properties.sound) {
                            audio("audio-backspace");
                        }
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "capslock":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        if (this.properties.sound) {
                            audio("audio-capslock");
                        }
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active");
                    });

                    break;
                case "shift":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    // keyElement.textContent = "shift";
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_up");

                    keyElement.addEventListener("click", () => {
                        this.properties.shift = !this.properties.shift;
                        if (this.properties.sound) {
                            audio("audio-shift");
                        }
                        if (this.properties.capsLock && this.properties.shift) {
                            this.elements.keys.forEach(key => {

                                if (key.childElementCount === 0) {

                                    console.log("active");
                                    key.textContent = key.textContent.toLowerCase();
                                    this.properties.capsLock = false;


                                    // key.addEventListener("click", () => {

                                    //     console.log("clicked");
                                    //     this.properties.capsLock = true;
                                    //     if (this.properties.capsLock && this.properties.shift) {
                                    //         this.elements.keys.forEach(item => {

                                    //             if (item.childElementCount === 0) {

                                    //                 item.textContent = item.textContent.toUpperCase();
                                    //                 // this.properties.capsLock = true;
                                    //                 this.properties.shift = false;
                                    //                 keyElement.classList.remove("keyboard__key--active");
                                    //             }

                                    //         })
                                    //     }

                                    // })
                                }

                            })

                        } else {


                            this.elements.keys.forEach(key => {

                                if (key.childElementCount === 0) {

                                    console.log("inactive");
                                    key.textContent = key.textContent.toUpperCase();
                                    this.properties.capsLock = true;
                                }

                            })

                        }
                        keyElement.classList.toggle("keyboard__key--active");
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        if (this.properties.sound) {
                            audio("audio-enter");
                        }
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;
                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        if (this.properties.sound) {
                            audio();
                        }
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;

                case "sound":
                    if (this.properties.sound) {
                        audio()
                    }
                    keyElement.classList.add("keyboard__key--wide");
                    this.sound() ? keyElement.innerHTML = createIconHTML("volume_up") : keyElement.innerHTML = createIconHTML("volume_off");

                    keyElement.addEventListener("click", () => {
                        if (this.properties.sound) {
                            audio()
                        }
                        this.sound() ? keyElement.innerHTML = createIconHTML("volume_up") : keyElement.innerHTML = createIconHTML("volume_off");

                        this._triggerEvent("onclose");
                    });

                    break;

                case "micro":
                    // if (this.properties.sound) {
                    //     audio()
                    // }
                    keyElement.classList.add("keyboard__key--wide");
                    this.properties.micro ? keyElement.innerHTML = createIconHTML("mic") : keyElement.innerHTML = createIconHTML("mic_off");
                    // this.properties.recognition = new SpeechRecognition();
                    keyElement.addEventListener("click", () => {
                        if (this.properties.sound) {
                            audio()
                        }
                        // this.properties.recognition = new SpeechRecognition();
                        if (this.micro()) {
                            this.properties.recognition.start();

                            this.properties.recognition.addEventListener("result", (e) => {

                                let transcript = Array.from(e.results).map(item => item[0]).map(item => item.transcript).join("");
                                let area = document.querySelector(".use-keyboard-input");
                                area.setRangeText(transcript + " ", area.selectionStart, area.selectionEnd, "end");
                                this.properties.value += transcript + " ";
                                console.log(e.results[0][0]);

                            })
                            this.properties.recognition.onend = () => {
                                this.properties.recognition.start();
                                // keyElement.innerHTML = createIconHTML("mic_off");
                                // this.properties.micro = true;
                            }

                        } else {

                            this.properties.recognition.abort();
                            this.properties.recognition.onend = () => {
                                this.properties.recognition.abort();
                            }
                            this.properties.recognition = new SpeechRecognition();
                            console.log(this.properties.micro, 1);
                        }
                        this.properties.micro ? keyElement.innerHTML = createIconHTML("mic") : keyElement.innerHTML = createIconHTML("mic_off");

                        this._triggerEvent("oninput");
                    });

                    break;

                case "arrowleft":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_left");

                    keyElement.addEventListener("click", () => {
                        if (this.properties.sound) {
                            audio();
                        }
                        // area.selectionStart = area.selectionStart - 1;
                        txt.setSelectionRange(txt.selectionStart, txt.selectionStart - 1);
                        if (txt.selectionStart === 0) {
                            txt.setSelectionRange(txt.selectionStart, txt.selectionStart);
                        }
                        // this.properties.value = this.properties.value.length - 1;
                        this._triggerEvent("oninput");
                        console.log(txt.selectionStart, "ggg");
                    });
                    break;

                case "arrowright":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_right");

                    keyElement.addEventListener("click", () => {
                        if (this.properties.sound) {
                            audio();
                        }
                        txt.setSelectionRange(txt.selectionStart + 1, txt.selectionStart + 1);
                        // if (txt.selectionStart === txt.selectionEnd) {
                        //     txt.selectionEnd = txt.selectionEnd;
                        // }
                        this._triggerEvent("oninput");
                        console.log(txt.selectionStart, "ggg");
                    });
                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        if (this.properties.sound) {
                            audio();
                        }
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;

            }


            fragment.appendChild(keyElement);

            if (insertLineBreak) {

                fragment.appendChild(document.createElement("br"));

            }

        })

        return fragment;

    },
    sound() {

        this.properties.sound = !this.properties.sound;
        return this.properties.sound;

    },

    micro() {

        this.properties.micro = !this.properties.micro;
        return this.properties.micro;

    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] === "function") {

            this.eventHandlers[handlerName](this.properties.value)

        }
        // console.log("Event Triggered! Event name: " + handlerName);
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {


            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();

            }
        }
    },


    // _toggleShift() {
    //     this.properties.shift = !this.properties.shift;

    //     for (const key of this.elements.keys) {

    //         if (key.childElementCount === 0) {

    //             if (this.properties.capsLock) {

    //                 this.properties.capsLock = false;
    //                 console.log(this.properties.capsLock);

    //             }
    //         }
    //     }

    // },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {

        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden")
        document.querySelector(".use-keyboard-input").blur();

    }

};


window.addEventListener("DOMContentLoaded", function() {

    Keyboard.init();
})

console.log(Keyboard);

document.querySelector(".keyboard")