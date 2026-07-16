const pages = document.querySelectorAll(".page");
let currentPage = 0;

const bgmusic = document.getElementById("bgmusic");
const pikachu = document.getElementById("pikachu");
const particleContainer = document.getElementById("magic-particles-container");

// Page Change Logic (Triggers the 0.95s pop-up animation)
function showPage(index) {
    pages.forEach(page => {
        page.classList.remove("active");
        // Force reflow to restart CSS animation properly
        void page.offsetWidth; 
    });
    pages[index].classList.add("active");
    
    // Add a little bounce to Pikachu when he "sends" a new page
    pikachu.style.transform = "translateX(-50%) scale(1.2)";
    setTimeout(() => {
        pikachu.style.transform = "translateX(-50%) scale(1)";
    }, 200);
}

function nextPage() {
    currentPage++;
    if (currentPage >= pages.length) currentPage = pages.length - 1;
    showPage(currentPage);
}

document.querySelectorAll(".next-btn").forEach(btn => {
    btn.addEventListener("click", nextPage);
});

document.getElementById("startBtn").addEventListener("click", () => {
    bgmusic.play();
    bgmusic.volume = 0.7;
    pikachu.style.display = "block"; // Pikachu appears!
    nextPage();
});

// ================================
// ❓ CUTE QUESTIONS LOGIC
// ================================
const questions = [
    "Ananya Ji, Kya hum hamesha aise hi achhe dost rahenge? 🥺🤝✨",
    "Kya aap mere saare gande wale jokes hamesha jhelogi? 🤪🙉😂",
    "Promise karo mujhse kabhi bina baat ke gussa nahi hougi? 🥺😤💖",
    "Meri choti-choti galtiyon ko hamesha maaf kar dogi na? 😇🙏💕",
    "Toh kya ab hum lifetime wale Best Friends ban gaye? 🤝👯‍♀️🥳"
];

const funnyNoMsgs = [
    "Aise kaise No? 😢💔", "Soch lo ek baar aur! 🤔💭", "Galat button dab gaya kya? 🧐🖱️", 
    "Pakad ke dikhao button ko! 🏃‍♀️💨", "Maan jao na Ananya Ji! 🥺🙏💖"
];

let qIndex = 0;
const questionText = document.getElementById("questionText");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const funnyMessage = document.getElementById("funnyMessage");

yesBtn.addEventListener("click", () => {
    qIndex++;
    if (qIndex < questions.length) {
        questionText.innerText = questions[qIndex];
        noBtn.style.position = "relative";
        noBtn.style.transform = "translate(0px, 0px)";
        funnyMessage.innerText = "";
        
        if (qIndex === questions.length - 1) {
            yesBtn.innerText = "Pakka Promise! 💖🤞";
        }
        
        // Pikachu reacts when Yes is clicked
        pikachu.style.transform = "translateX(-50%) scale(1.1) rotate(10deg)";
        setTimeout(() => pikachu.style.transform = "translateX(-50%) scale(1) rotate(0deg)", 200);
    } else {
        nextPage();
    }
});

const runAway = (e) => {
    if(e) e.preventDefault();
    const maxX = window.innerWidth - noBtn.offsetWidth - 40;
    const maxY = window.innerHeight - noBtn.offsetHeight - 40;
    const x = Math.random() * (maxX / 2) * (Math.random() > 0.5 ? 1 : -1);
    const y = Math.random() * (maxY / 2) * (Math.random() > 0.5 ? 1 : -1);

    noBtn.style.position = "absolute";
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
    funnyMessage.innerText = funnyNoMsgs[Math.floor(Math.random() * funnyNoMsgs.length)];
};

noBtn.addEventListener("mouseover", runAway);
noBtn.addEventListener("touchstart", runAway, {passive: false});

// ================================
// 📸 17-PHOTO SLIDESHOW & SHAYARI
// ================================
const galleryImage = document.getElementById("galleryImage");
const shayariText = document.getElementById("shayariText");
const shayaris = [
    "Dosti ki mehek gulabon se kam nahi hoti... 🌹✨💖", "Waqt ke sath yaadein aur gehri hoti hain... ⏳🌊💕",
    "Ek achha dost zindagi ka sabse bada tohfa hota hai... 🎁🥰", "Duriyan chahe kitni bhi ho, dosti nahi badalti... 🌍🤝",
    "Tumhare bina har mehfil adhoori lagti hai... 😔🕯️", "Sachi dosti woh hai jo bin kahe sab samajh jaye... 🤫💖",
    "Dosto ke bina ye safar bahut lamba lagta... 🛤️🚶‍♀️", "Kuch yaadein hamesha dil ke kareeb rehti hain... 🧠❤️",
    "Hasi-mazak aur yaari, yahi hai zindagi hamari... 😂🎉", "Zindagi ke har mod par dosto ka sath zaruri hai... 🛣️🤝",
    "Ek pyaari si muskaan sab gam bhula deti hai... 😊🌈", "Dosti me koi 'Sorry' aur 'Thank you' nahi hota... 🚫🙏",
    "Yaado ke panno me hamesha tumhara naam hai... 📖✍️", "Chahe duniya badal jaye, hum nahi badlenge... 🌍🔄",
    "Tumhari dosti ne zindagi ko khubsurat bana diya... 🌺🦋", "Sath bitaye hue pal hamesha yaad aayenge... 📸🕰️",
    "Hamesha aise hi khush rehna meri pyari dost Ananya Ji! ❤️🤗"
];
const photos = [];
for(let i = 1; i <= 17; i++) { photos.push(`images/${i}.jpg`); }
let photoIndex = 0;

document.getElementById("photoArea").addEventListener("click", () => {
    photoIndex++;
    if (photoIndex >= photos.length) {
        nextPage(); 
    } else {
        galleryImage.src = photos[photoIndex];
        shayariText.innerText = shayaris[photoIndex];
    }
});

// =======================================
// ✨ SIMPLE TAP EFFECT (Trail Removed)
// =======================================
document.addEventListener("click", (e) => {
    const ripple = document.createElement("div");
    ripple.className = "tap-ripple";
    ripple.style.left = e.pageX + "px";
    ripple.style.top = e.pageY + "px";
    particleContainer.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
});

// ================================
// 🌸 SAKURA PETAL EFFECT
// ================================
function createPetal() {
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.width = (Math.random() * 8 + 6) + "px";
    petal.style.height = (Math.random() * 12 + 10) + "px";
    petal.style.animationDuration = (Math.random() * 3 + 3) + "s";
    document.getElementById("sakura-container").appendChild(petal);
    setTimeout(() => petal.remove(), 6000);
}
setInterval(createPetal, 400);

// ================================
// 🎆 FIREWORKS (PAGE 7 ONLY)
// ================================
function createFirework() {
    if (currentPage !== 6) return; 
    const fire = document.createElement("div");
    fire.style.position = "absolute";
    fire.style.fontSize = Math.random() > 0.5 ? "35px" : "25px";
    fire.style.pointerEvents = "none";
    const fx = ["🎆", "✨", "🌸", "💖"];
    fire.innerHTML = fx[Math.floor(Math.random() * fx.length)];
    fire.style.left = Math.random() * 100 + "vw";
    fire.style.top = Math.random() * 80 + "vh";
    fire.style.animation = "fade 1s ease-out forwards";
    document.getElementById("fireworks").appendChild(fire);
    setTimeout(() => fire.remove(), 1000);
}
setInterval(createFirework, 600);
