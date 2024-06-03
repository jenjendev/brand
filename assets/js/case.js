/* =========== User Data =========== */

const counters = [...document.querySelectorAll(".user-data .number")];
const speed = 5000; // change animation speed here

const start = () => {
    counters.forEach((counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;
            const inc = target / speed;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + "+";
            }
        };
        updateCount();
    });
};

window.addEventListener(
    "scroll",
    () => {
        if (window.pageYOffset >= 250) {
            start();
        }
    },
    { passive: true }
);

/* ========== Swiper =========== */
const swiper = new Swiper(".mySwiper", {
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
        el: ".custom-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".custom-button-prev",
        prevEl: ".custom-button-next",
    },
    breakpoints: {
        567: {
            slidesPerView: 2,
        },
        996: {
            slidesPerView: 3,
        },
    },
});

/* =========== Scroll Top =========== */
const scrollTop = document.querySelector(".scroll-top");

scrollTop.addEventListener("click", () => {
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth",
    });
});

window.addEventListener("scroll", (e) => {
    const scrollHeight = window.pageYOffset;

    if (scrollHeight > 300) {
        scrollTop.classList.add("show");
    } else {
        scrollTop.classList.remove("show");
    }
});

/* ========== Scroll Reveal ============ */
const scroll = ScrollReveal({
    distance: "60px",
    duration: 2500,
    delay: 300,
    reset: true,
});

scroll.reveal(`.hero .col:last-child`, { delay: 600 });




scroll.reveal(
    `.col:first-child img, .languages img, .testimonials .row`,
    {
        origin: "top",
    }
);

scroll.reveal(`.about-2 .col:first-child img`, { origin: "right" });

scroll.reveal(`.footer .col div,.footer .col p`, {
    origin: "top",
    interval: 100,
});



const slides = document.querySelector(".slider").children;
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const indicator = document.querySelector(".indicator");
let index = 0;


prev.addEventListener("click", function () {
    prevSlide();
    updateCircleIndicator();
    resetTimer();
})

next.addEventListener("click", function () {
    nextSlide();
    updateCircleIndicator();
    resetTimer();

})

// create circle indicators
function circleIndicator() {
    for (let i = 0; i < slides.length; i++) {
        const div = document.createElement("div");
        div.innerHTML = i + 1;
        div.setAttribute("onclick", "indicateSlide(this)")
        div.id = i;
        if (i == 0) {
            div.className = "active";
        }
        indicator.appendChild(div);
    }
}
circleIndicator();

function indicateSlide(element) {
    index = element.id;
    changeSlide();
    updateCircleIndicator();
    resetTimer();
}

function updateCircleIndicator() {
    for (let i = 0; i < indicator.children.length; i++) {
        indicator.children[i].classList.remove("active");
    }
    indicator.children[index].classList.add("active");
}

function prevSlide() {
    if (index == 0) {
        index = slides.length - 1;
    }
    else {
        index--;
    }
    changeSlide();
}

function nextSlide() {
    if (index == slides.length - 1) {
        index = 0;
    }
    else {
        index++;
    }
    changeSlide();
}

function changeSlide() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }

    slides[index].classList.add("active");
}

function resetTimer() {
    // when click to indicator or controls button 
    // stop timer 
    clearInterval(timer);
    // then started again timer
    timer = setInterval(autoPlay, 20000);
}


function autoPlay() {
    nextSlide();
    updateCircleIndicator();
}

let timer = setInterval(autoPlay, 20000);






