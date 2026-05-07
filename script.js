// ─────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────

const MY_NAME = "Trushant";

// 🔥 GIPHY API KEY
const GIPHY_API_KEY = "9fzvGG1gWJmuHsc5KvM6hPrL1yBAp7gF";

// ─────────────────────────────────────────────
// GIPHY SEARCHES
// ─────────────────────────────────────────────

const MOOD_QUERIES = {
    happy:   "baby laughing cute meme",
    slay:    "slay diva girl meme",
    judging: "side eye judging meme",
    chaos:   "chaotic funny meme",
    sad:     "sad crying meme",
    angry:   "angry mad meme",
    love:    "cute hearts love meme",
    savage:  "savage tongue out meme",
    confused:"confused what meme",
    sarcasm: "eye roll sarcastic meme",
    default: "cute funny reaction meme"
};

// ─────────────────────────────────────────────
// KEYWORD → GIPHY QUERY MAP (sticker-only replies)
// ─────────────────────────────────────────────

const KEYWORD_STICKER_MAP = [
    { test: /hi|hello|hey|heyy|hii|hlo|hola|namaste|namaskar|sup|wassup|kya chal/,
      queries: ["cute baby waving hello", "baby hello waving meme", "cute toddler waving hi"] },
    { test: /love you|pyaar|i love|luv u|dil|mohabbat|ishq/,
      queries: ["cute baby blowing kisses", "baby heart love cute", "cute toddler love meme"] },
    { test: /sad|dukhi|ro rahi|rona|cry|crying|depressed|udas|bura lag|hurt/,
      queries: ["cute baby crying sad meme", "sad baby pouting meme", "crying toddler meme"] },
    { test: /gussa|angry|frustrated|irritated|pakao/,
      queries: ["angry baby meme funny", "mad toddler angry face", "baby tantrum meme"] },
    { test: /lol|lmao|haha|hehe|funny|hilarious|hassi|hans/,
      queries: ["baby laughing hysterically meme", "toddler laughing cute meme", "cute baby giggling meme"] },
    { test: /khana|food|bhook|hungry|pizza|biryani|maggi|chai|coffee/,
      queries: ["cute baby eating meme", "toddler eating food cute", "baby nom nom meme"] },
    { test: /bored|bore|kuch nahi|nothing|khali|time pass/,
      queries: ["bored baby meme", "cute toddler bored face", "baby yawning bored meme"] },
    { test: /exam|padhai|college|school|notes|assignment|marks/,
      queries: ["baby studying meme funny", "toddler serious studying", "cute baby reading glasses"] },
    { test: /crush|boy|ladka|like karna|propose|date|bf|boyfriend/,
      queries: ["baby in love meme cute", "toddler crush shy meme", "cute baby blushing meme"] },
    { test: /slay|looking good|hot|cute|gorgeous|beautiful|sundar|queen/,
      queries: ["baby diva sunglasses slay", "cute toddler slay meme", "baby queen crown cute"] },
    { test: /thanks|shukriya|thank you|ty|thanku/,
      queries: ["cute baby thank you meme", "toddler thankful clapping cute", "baby grateful meme"] },
    { test: /bye|alvida|goodbye|baad mein|later|ciao|tata/,
      queries: ["baby waving goodbye cute", "cute toddler bye bye waving", "baby goodbye meme"] },
    { test: /neend nahi|so nahi|raat ko|insomnia|late night/,
      queries: ["sleepy baby meme night", "toddler tired sleepy meme", "cute baby sleepy eyes"] },
    { test: /bahut smart|genius|intelligent|bohot smart/,
      queries: ["baby genius meme funny", "cute toddler smart glasses meme", "baby professor funny"] },
    { test: /nalayak|bewakoof|stupid|idiot|pagal|ullu/,
      queries: ["baby shocked face meme", "toddler surprised reaction", "cute baby wide eyes meme"] },
    { test: /ghar|home|mummy|papa|family|bhai|sister|behen/,
      queries: ["cute baby family meme", "toddler mama papa meme", "baby family adorable"] },
];

// ─────────────────────────────────────────────
// QUICK STICKER MOODS
// ─────────────────────────────────────────────

const QUICK_MOODS = ["happy","slay","judging","chaos","love","sad"];

// ─────────────────────────────────────────────
// BLOOM QUOTES
// ─────────────────────────────────────────────

const BLOOM_QUOTES = [
    "tu ajeeb hai but theek hai 👍",
    "main hi effort daal raha hu iss friendship mein 😔",
    "tere stickers ne mujhe developer bana diya 💀",
    "tu reply late karti hai but chal maaf kiya",
    "low maintenance friendship >>>",
    "tu drama hai but entertaining hai 😭",
    "emotionally unavailable duo 🤝",
    "hum dono normal nahi hai honestly",
    "tu bolti kam hai stickers zyada bhejti hai 🫠",
    "teri vibe questionable hai but acceptable 👍",
    "yeh friendship bas sarcasm pe chal rahi hai",
    "you’re lucky i reply fast 😤",
    "hum dono ka humour broken hai",
    "still waiting for one normal conversation 💬",
    "tu annoying hai but permanent hai 👍"
];

// ─────────────────────────────────────────────
// BLOOM ANIMATION
// ─────────────────────────────────────────────

const PETAL_EMOJIS = ["🌸","🌺","🌼","🌻","💐","🌹","🏵️","🌷"];
const SPARKLE_EMOJIS = ["✨","💫","⭐","🌟","💥","🎇","🎆","💖","💕"];
let bloomInterval = null;

function triggerBloom() {
    const overlay = document.getElementById('bloomOverlay');
    const figure = document.getElementById('bloomFigure');
    const petalsContainer = document.getElementById('bloomPetals');
    const sparklesContainer = document.getElementById('bloomSparkles');
    const womanEl = document.querySelector('.bloom-women-emoji');
    const quoteEl = document.getElementById('bloomQuote');
    const quoteText = document.querySelector('.bloom-quote-text');

    overlay.classList.add('open');
    quoteEl.classList.remove('visible');
    petalsContainer.innerHTML = '';
    sparklesContainer.innerHTML = '';

    // Set random quote
    quoteText.textContent = BLOOM_QUOTES[Math.floor(Math.random() * BLOOM_QUOTES.length)];

    // Bloom the woman emoji with pop
    womanEl.classList.remove('bloomed');
    void womanEl.offsetWidth;
    womanEl.classList.add('bloomed');

    // Animate petals in a circle
    const PETAL_COUNT = 12;
    for (let i = 0; i < PETAL_COUNT; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.className = 'bloom-petal';
            const angle = (i / PETAL_COUNT) * 360;
            const dist = 80 + Math.random() * 60;
            const emoji = PETAL_EMOJIS[Math.floor(Math.random() * PETAL_EMOJIS.length)];
            petal.textContent = emoji;
            petal.style.fontSize = (1.4 + Math.random() * 1) + 'rem';
            const rad = (angle * Math.PI) / 180;
            const tx = Math.cos(rad) * dist;
            const ty = Math.sin(rad) * dist;
            petal.style.animation = 'none';
            petalsContainer.appendChild(petal);
            requestAnimationFrame(() => {
                petal.style.transition = `transform 0.8s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.05}s, opacity 0.8s ease ${i * 0.05}s`;
                petal.style.opacity = '0';
                petal.style.transform = 'translate(-50%,-50%) scale(0)';
                requestAnimationFrame(() => {
                    petal.style.opacity = '0.9';
                    petal.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1) rotate(${angle}deg)`;
                });
            });
        }, i * 40);
    }

    // Sparkles
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            spawnSparkle(sparklesContainer);
        }, 200 + i * 100);
    }

    // Show quote
    setTimeout(() => {
        quoteEl.classList.add('visible');
    }, 600);

    // Canvas particles
    startBloomCanvas();
}

function spawnSparkle(container) {
    const sp = document.createElement('div');
    sp.className = 'bloom-sparkle';
    sp.textContent = SPARKLE_EMOJIS[Math.floor(Math.random() * SPARKLE_EMOJIS.length)];
    sp.style.left = (10 + Math.random() * 80) + '%';
    sp.style.top = (10 + Math.random() * 80) + '%';
    sp.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
    sp.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
    sp.style.animationDelay = (Math.random() * 0.5) + 's';
    container.appendChild(sp);
    setTimeout(() => sp.remove(), 3000);
}

function closeBloom() {
    const overlay = document.getElementById('bloomOverlay');
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s';
    setTimeout(() => {
        overlay.classList.remove('open');
        overlay.style.opacity = '';
        overlay.style.transition = '';
        stopBloomCanvas();
    }, 300);
}

function startBloomCanvas() {
    const canvas = document.getElementById('bloomCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#ff4fa3','#c77dff','#ffb3d9','#9b4dff','#ff8c42'];

    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 3 + 1,
            dx: (Math.random() - 0.5) * 1.5,
            dy: -Math.random() * 2 - 0.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: Math.random() * 0.6 + 0.2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.dx;
            p.y += p.dy;
            p.alpha -= 0.003;
            if (p.y < 0 || p.alpha <= 0) {
                p.y = canvas.height + 10;
                p.x = Math.random() * canvas.width;
                p.alpha = Math.random() * 0.6 + 0.2;
            }
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2,'0');
            ctx.fill();
        });
        bloomInterval = requestAnimationFrame(draw);
    }
    draw();
}

function stopBloomCanvas() {
    if (bloomInterval) {
        cancelAnimationFrame(bloomInterval);
        bloomInterval = null;
    }
    const canvas = document.getElementById('bloomCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ─────────────────────────────────────────────
// MOOD FILTER
// ─────────────────────────────────────────────

function setMoodFilter(mood, el) {
    document.querySelectorAll('.mood-chip').forEach(c => c.classList.remove('active'));
    if (el) el.classList.add('active');
}

// ─────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────

window.onload = async () => {
    renderQuickStickers();
    renderStickerGrid("vibes");
    initParticles();
    updateHeaderSub();
};

function updateHeaderSub() {
    const subs = [
        "still decoding your stickers 👍",
        "online because sleep schedule destroyed hai",
        "replying with professional bakchodi",
        "friendship maintained somehow 💀",
        "low effort conversations only",
        "emotionally buffering...",
        "your unpaid therapist probably",
        "sending reactions instead of emotions 👍",
        "existing and replying occasionally",
        "online but mentally afk",
        "trying to sound normal since 2024",
        "sarcasm powered responses active",
        "typing something unnecessary...",
        "probably overthinking rn",
        "this friendship runs on memes"
    ];

    const el = document.getElementById('headerSub');
    if (el) {
        setInterval(() => {
            el.style.opacity = '0';
            setTimeout(() => {
                el.textContent = subs[Math.floor(Math.random() * subs.length)];
                el.style.opacity = '1';
                el.style.transition = 'opacity 0.5s';
            }, 300);
        }, 8000);
    }
}

// ─────────────────────────────────────────────
// SEND MESSAGE
// ─────────────────────────────────────────────

async function handleSend() {
    const input = document.getElementById('inputBox');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    appendUserMsg(text);
    autoResize(input);
    showTyping();

    const query = getStickerQuery(text);
    const url = await fetchStickerByQuery(query);
    hideTyping();
    if (url) appendImageSticker('bot', url);
}

// ─────────────────────────────────────────────
// KEYWORD → STICKER QUERY
// ─────────────────────────────────────────────

function getStickerQuery(text) {
    const lower = text.toLowerCase();
    for (const entry of KEYWORD_STICKER_MAP) {
        if (entry.test.test(lower)) {
            return entry.queries[Math.floor(Math.random() * entry.queries.length)];
        }
    }
    // Default: cute baby reaction
    const defaults = [
        "cute baby reaction meme",
        "cute toddler funny face meme",
        "baby surprised meme cute",
        "adorable baby confused meme",
        "cute baby clapping meme"
    ];
    return defaults[Math.floor(Math.random() * defaults.length)];
}

// Fetch sticker by a direct search query string
async function fetchStickerByQuery(query) {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=25&rating=g`;
    const response = await fetch(url);
    const data = await response.json();
    if (!data.data || !data.data.length) return null;
    const random = data.data[Math.floor(Math.random() * data.data.length)];
    return random.images.fixed_height.url;
}

// ─────────────────────────────────────────────
// GIPHY STICKER
// ─────────────────────────────────────────────

async function fetchSticker(mood = "default") {
    const query = MOOD_QUERIES[mood] || MOOD_QUERIES.default;
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=25&rating=g`;
    const response = await fetch(url);
    const data = await response.json();
    if (!data.data || !data.data.length) return null;
    const random = data.data[Math.floor(Math.random() * data.data.length)];
    return random.images.fixed_height.url;
}

// Bot replies sticker-only — see handleSend which calls appendImageSticker directly

// ─────────────────────────────────────────────
// USER MESSAGE
// ─────────────────────────────────────────────

function appendUserMsg(text) {
    const row = document.createElement('div');
    row.className = 'bubble-row user';
    row.innerHTML = `<div class="bubble user">${text}</div>`;
    document.getElementById('chatArea').appendChild(row);
    scrollToBottom();
}

// ─────────────────────────────────────────────
// IMAGE STICKER
// ─────────────────────────────────────────────

function appendImageSticker(sender, url) {
    const row = document.createElement('div');
    row.className = `bubble-row ${sender}`;
    const img = document.createElement('img');
    img.src = url;
    img.className = 'chat-sticker';
    img.alt = "Sticker";
    row.appendChild(img);
    document.getElementById('chatArea').appendChild(row);
    scrollToBottom();
}


// ─────────────────────────────────────────────
// QUICK STICKERS
// ─────────────────────────────────────────────

async function renderQuickStickers() {
    const container = document.getElementById('quickStickers');
    container.innerHTML = '';
    for (const mood of QUICK_MOODS) {
        const url = await fetchSticker(mood);
        if (!url) continue;
        const img = document.createElement('img');
        img.src = url;
        img.className = 'quick-sticker-btn';
        img.onclick = () => appendImageSticker('user', url);
        container.appendChild(img);
    }
}

// ─────────────────────────────────────────────
// STICKER GRID
// ─────────────────────────────────────────────

const PACK_TO_MOOD = {
    vibes: 'happy',
    savage: 'savage',
    soft: 'love',
    chaos: 'chaos'
};

async function renderStickerGrid(pack) {
    const mood = PACK_TO_MOOD[pack] || pack;
    const grid = document.getElementById('stickerGrid');
    grid.innerHTML = '';
    for (let i = 0; i < 12; i++) {
        const url = await fetchSticker(mood);
        if (!url) continue;
        const img = document.createElement('img');
        img.src = url;
        img.className = 'tray-sticker';
        img.onclick = () => {
            appendImageSticker('user', url);
            toggleStickerPicker();
        };
        grid.appendChild(img);
    }
}

// ─────────────────────────────────────────────
// SWITCH PACK
// ─────────────────────────────────────────────

function switchPack(mood, el) {
    document.querySelectorAll('.tray-tab').forEach(btn => btn.classList.remove('active'));
    if (el) el.classList.add('active');
    renderStickerGrid(mood);
}

// ─────────────────────────────────────────────
// STICKER PICKER
// ─────────────────────────────────────────────

function toggleStickerPicker() {
    const tray = document.getElementById('stickerTray');
    const btn = document.getElementById('stickerPickerBtn');
    tray.classList.toggle('open');
    btn.classList.toggle('active');
    // Close emoji bar if open
    if (tray.classList.contains('open')) {
        document.getElementById('emojiBar').classList.remove('open');
    }
}

// ─────────────────────────────────────────────
// EMOJI BAR
// ─────────────────────────────────────────────

function toggleEmojiBar() {
    const emojiBar = document.getElementById('emojiBar');
    emojiBar.classList.toggle('open');
    // Close sticker tray if open
    if (emojiBar.classList.contains('open')) {
        document.getElementById('stickerTray').classList.remove('open');
        document.getElementById('stickerPickerBtn').classList.remove('active');
    }
}

function insertEmoji(emoji) {
    const input = document.getElementById('inputBox');
    input.value += emoji;
    input.focus();
}

// ─────────────────────────────────────────────
// FILE UPLOAD
// ─────────────────────────────────────────────

function handleFileUpload(event, type) {
    const file = event.target.files[0];
    if (!file) return;

    if (type === 'image') {
        const reader = new FileReader();
        reader.onload = function(e) {
            appendImageSticker('user', e.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        const row = document.createElement('div');
        row.className = 'bubble-row user';
        row.innerHTML = `<div class="file-chip">📎 ${file.name}</div>`;
        document.getElementById('chatArea').appendChild(row);
        scrollToBottom();
    }
}

// ─────────────────────────────────────────────
// TYPING
// ─────────────────────────────────────────────

function showTyping() {
    const row = document.createElement('div');
    row.className = 'bubble-row bot';
    row.id = 'typingIndicator';
    row.innerHTML = `
        <div class="bubble bot typing-bubble">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    `;
    document.getElementById('chatArea').appendChild(row);
    scrollToBottom();
}

function hideTyping() {
    const t = document.getElementById('typingIndicator');
    if (t) t.remove();
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function scrollToBottom() {
    const area = document.getElementById('chatArea');
    area.scrollTop = area.scrollHeight;
}

function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
}

function handleKey(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSend();
    }
}

function clearChat() {
    document.getElementById('chatArea').innerHTML = `
        <div class="day-label">Naya din, naya drama ✨</div>
        <div class="bubble-row bot">
            <div class="bubble bot">Chal fresh start! Bol kya chal raha hai, bestie? 🌸</div>
        </div>
    `;
}

// ─────────────────────────────────────────────
// MOBILE SIDEBAR
// ─────────────────────────────────────────────

function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('open');
    document.getElementById('sidebarOverlay').classList.toggle('open');
}

const SLEEP_QUOTES = [
    "soti reh bas 👍",
    "online kam, sleeping zyada 😭",
    "professional napper fr",
    "teri battery life mujhse better hai 💀",
    "wake up impossible challenge",
    "raat bhar soti hai fir bhi sleepy 😐",
    "human being nahi sleeping app hai tu",
    "active 2 min, sleepy 24 hours",
    "tu hibernation pe chal rahi hai kya",
    "sleeping is your full-time job 👍"
];

function triggerSleepMode() {
    const overlay = document.getElementById('sleepOverlay');
    const text = document.getElementById('sleepText');

    text.textContent =
        SLEEP_QUOTES[Math.floor(Math.random() * SLEEP_QUOTES.length)];

    overlay.classList.add('open');
}

function closeSleepMode() {
    document.getElementById('sleepOverlay').classList.remove('open');
}

// ─────────────────────────────────────────────
// PARTICLES
// ─────────────────────────────────────────────

function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 40; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 3,
            dx: Math.random() - 0.5,
            dy: Math.random() - 0.5
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.2)';
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
}
