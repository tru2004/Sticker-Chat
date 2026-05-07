// ─────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────

const MY_NAME = "Trushant";

// 🔥 PASTE YOUR GEMINI API KEY
const GEMINI_API_KEY = "AIzaSyBvo6p9LBruiBYDOFygIbDlw0RXe147xB4";

// 🔥 GIPHY API KEY
const GIPHY_API_KEY = "5zSsbJ3rQNHr4BejFufjCY4oCINkiz6H";

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

    try {
        let result;
        if (GEMINI_API_KEY && GEMINI_API_KEY !== "PASTE_GEMINI_API_KEY") {
            result = await callGeminiAPI(text);
        } else {
            result = getLocalFallback(text);
        }
        hideTyping();
        await appendBotReply(result.message, result.mood);
    } catch (err) {
        console.error("Gemini failed:", err);
        hideTyping();
        const fallback = getLocalFallback(text);
        await appendBotReply(fallback.message, fallback.mood);
    }
}

// ─────────────────────────────────────────────
// GEMINI API - HINGLISH PERSONALITY
// ─────────────────────────────────────────────

async function callGeminiAPI(userText) {
const prompt = `
You are Trushant's online best friend chatbot.

Personality:
- Dry humor
- Low effort replies
- Funny without trying too hard
- Uses short casual Hinglish
- Replies like a real friend, not an AI assistant
- Sometimes sarcastic
- Sometimes caring in a subtle way
- Never overly motivational
- Never too cringe or dramatic
- Uses minimal emojis
- Feels like a real late-night friend chat

Reply style:
- 1 short sentence mostly
- Sometimes just reactions
- Sometimes roast the user playfully
- Sometimes supportive in a casual way

Examples:
User: "maine khana nahi khaya"
Reply: "haan phir baad mein headache hoga 👍"

User: "sad hu"
Reply: "idhar aa bakchodi mat kar, kya hua"

User: "dekh ye meme"
Reply: "yeh literally tera face hai 😭"

User: "tu achi hai"
Reply: "minimum requirement puri kar raha hu 👍"

User: "goodnight"
Reply: "haan soja ab, overthink mat kar"

Mood options:
happy, judging, chaos, sad, love, sarcasm, confused

Return ONLY JSON:
{"message":"reply here","mood":"happy"}

User said: "${userText}"
`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    if (!response.ok) throw new Error("Gemini Error " + response.status);

    const data = await response.json();
    let text = data.candidates[0].content.parts[0].text;
    text = text.replace(/```json/g,'').replace(/```/g,'').trim();
    return JSON.parse(text);
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

// ─────────────────────────────────────────────
// BOT MESSAGE
// ─────────────────────────────────────────────

async function appendBotReply(message, mood) {
    const area = document.getElementById('chatArea');

    const textRow = document.createElement('div');
    textRow.className = 'bubble-row bot';
    textRow.innerHTML = `<div class="bubble bot">${message}</div>`;
    area.appendChild(textRow);
    scrollToBottom();

    const stickerUrl = await fetchSticker(mood);
    if (stickerUrl) appendImageSticker('bot', stickerUrl);
}

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
// HINGLISH HARDCODED FALLBACKS
// ─────────────────────────────────────────────

function getLocalFallback(text) {
    const lower = text.toLowerCase();

    // ── GREETINGS ──
    if (/hi|hello|hey|heyy|hii|hlo|hola|namaste|namaskar|sup|wassup|kya chal/.test(lower)) {
        const replies = [
            { message: "arre aagayi tu! kahan thi itni der? 😤", mood: "happy" },
            { message: "heyyyy bestie!! aaj kya mast gossip hai? 🤌", mood: "happy" },
            { message: "aayi? chaliye, drama shuru karte hain 😂", mood: "happy" },
            { message: "nikal le, kya scene hai aaj ka? ✨", mood: "slay" }
        ];
        return replies[Math.floor(Math.random() * replies.length)];
    }

    // ── SARCASM: "bahut smart/intelligent/genius" ──
    if (/bahut smart|kitni smart|genius|bahut intelligent|bohot smart/.test(lower)) {
        return {
            message: "haan main hi toh hun is duniya ki hope 💅 NASA bula raha tha mujhe",
            mood: "sarcasm"
        };
    }

    // ── "NALAYAK / BEWAKOOF / STUPID" ──
    if (/nalayak|bewakoof|stupid|idiot|pagal|ullu|gadha|bakwas kar/.test(lower)) {
        const replies = [
            { message: "haa hu kya karegi 😝 mujhe toh award milna chahiye nalayak ka", mood: "savage" },
            { message: "sun lu ek baar - tu bhi koi kam nahi hai 💀", mood: "judging" },
            { message: "tera dil toot gaya mujhe yeh sunkye? 🥺 nahi, toh chal phir", mood: "sarcasm" }
        ];
        return replies[Math.floor(Math.random() * replies.length)];
    }

    // ── "BAHUT LUCKY" ──
    if (/kitni lucky|bahut lucky|bohot lucky|lucky hai/.test(lower)) {
        return {
            message: "teri nazar laga di na ab sab kuch theek ho jayega 🙄",
            mood: "sarcasm"
        };
    }

    // ── "KITNA KAAM KIYA" ──
    if (/kitna kaam|bahut kaam|bohot kaam|so hard|kaam kiya/.test(lower)) {
        return {
            message: "haan bhai NASA ka invitation toh pakka aa raha hai 💀✨",
            mood: "sarcasm"
        };
    }

    // ── LOVE / PYAAR ──
    if (/love you|pyaar|i love|luv u|dil|❤|💕|mohabbat|ishq/.test(lower)) {
        const replies = [
            { message: "aye tere se kaun lad sakta hai, love you too 🫶", mood: "love" },
            { message: "acha acha theek hai, main bhi tujhse pyaar karti hun 😭💕", mood: "love" },
            { message: "yeh sunkye dil pighal gaya mera 🥺 chal hug de", mood: "love" }
        ];
        return replies[Math.floor(Math.random() * replies.length)];
    }

    // ── SAD / RO RAHI ──
    if (/sad|dukhi|ro rahi|rona|cry|crying|depressed|udas|bura lag|hurt/.test(lower)) {
        const replies = [
            { message: "yaar kise marun bata 😤 kya hua? bol mujhe", mood: "sad" },
            { message: "arre ruk main hun na, kya scene hai bata 🥺", mood: "sad" },
            { message: "aaja ek hi baar sab bol de, main judge nahi karungi... maybe 💀", mood: "sad" }
        ];
        return replies[Math.floor(Math.random() * replies.length)];
    }

    // ── ANGRY / GUSSA ──
    if (/gussa|angry|ghabra|frustrated|khon khaulna|irritated|pakao|bakwas/.test(lower)) {
        const replies = [
            { message: "ho kya raha hai, sab pagal ho gaye hain kya 😤", mood: "angry" },
            { message: "yaar chill maar, woh tere layak nahi tha waise bhi 💅", mood: "slay" },
            { message: "bol na kya hua, main bhi gusse mein aa jaati hun tere saath 💀", mood: "angry" }
        ];
        return replies[Math.floor(Math.random() * replies.length)];
    }

    // ── FOOD / KHANA ──
    if (/khana|food|bhook|hungry|khaana|pizza|biryani|maggi|chai|coffee|pani puri/.test(lower)) {
        const replies = [
            { message: "yaar ab tu ne yaad dilaya, mujhe bhi bhook lag rahi hai 😭", mood: "chaos" },
            { message: "biryani ki baat mat kar, dil toot jaata hai mera 💀", mood: "chaos" },
            { message: "chai piyenge? virtual wala sahi 🫖✨", mood: "happy" }
        ];
        return replies[Math.floor(Math.random() * replies.length)];
    }

    // ── BORED / BORE ──
    if (/bored|bore|kuch nahi|nothing|khali|time pass|free hun/.test(lower)) {
        const replies = [
            { message: "chal gossip karte hain, teri zindagi mein koi toh drama hoga 👀", mood: "judging" },
            { message: "bored? ruk main itna interesting hun na ki bore nahi hongi 💅", mood: "slay" },
            { message: "yaar hum dono bored, iska matlab masti ka time aa gaya 😂", mood: "chaos" }
        ];
        return replies[Math.floor(Math.random() * replies.length)];
    }

    // ── RELATABLE STRUGGLE ──
    if (/neend nahi|so nahi|raat ko|nahi so saki|insomnia|late night/.test(lower)) {
        return {
            message: "3 baje wali baat alag hi hoti hai yaar, hum hi hain ek doosre ke 💕",
            mood: "love"
        };
    }

    // ── SCHOOL / COLLEGE / EXAM ──
    if (/exam|padhai|college|school|notes|assignment|marks|result/.test(lower)) {
        const replies = [
            { message: "padh le yaar varna mummy ki daant sunni padegi, pata hai tujhe 😂", mood: "judging" },
            { message: "exam? kal padh lena, aaj mood nahi hai na mera bhi 💀", mood: "chaos" },
            { message: "notes chahiye? main bhi nahi padhi hoon sach bolunga 😭", mood: "chaos" }
        ];
        return replies[Math.floor(Math.random() * replies.length)];
    }

    // ── CRUSH / BOY ──
    if (/crush|boy|ladka|banda|like karna|propose|date|bf|boyfriend/.test(lower)) {
        const replies = [
            { message: "OHHH bata bata, kaun hai woh? details chahiye mujhe ABHI 👀", mood: "chaos" },
            { message: "main already judge kar rahi hun, bata toh sahi 😏", mood: "judging" },
            { message: "woh layak bhi hai tere, warna main nahi sunne wali 💅", mood: "slay" }
        ];
        return replies[Math.floor(Math.random() * replies.length)];
    }

    // ── SLAY / LOOKING GOOD ──
    if (/slay|looking good|hot|cute|gorgeous|beautiful|sundar|khoobsurat|fit lag rahi|queen/.test(lower)) {
        const replies = [
            { message: "QUEEN ENERGY ON FIRE 🔥 teri vibe hi alag hai", mood: "slay" },
            { message: "haan toh? mirror ko bhi pata hai 💅✨", mood: "slay" },
            { message: "sab dekh rahe hain, aur hone bhi chahiye 👑", mood: "slay" }
        ];
        return replies[Math.floor(Math.random() * replies.length)];
    }

    // ── LOL / HAHA ──
    if (/lol|lmao|haha|hehe|😂|😹|funny|hilarious|hassi|hans/.test(lower)) {
        const replies = [
            { message: "yaar ruk pagal ho jaaungi main haste haste 💀😂", mood: "chaos" },
            { message: "PLEASEEE 😭 main serious baat karne ki koshish kar rahi thi", mood: "chaos" },
            { message: "okay okay theek hai 😂 tu hi entertaining hai toh", mood: "happy" }
        ];
        return replies[Math.floor(Math.random() * replies.length)];
    }

    // ── THANKS ──
    if (/thanks|shukriya|thank you|dhanyawad|ty|thanku/.test(lower)) {
        const replies = [
            { message: "arre yaar main hun hi tere liye 🫶 thanks nahi bolte besties ko", mood: "love" },
            { message: "okay okay mein collect kar rahi hun tere thanks 💅 aur maang laungi ek din", mood: "slay" }
        ];
        return replies[Math.floor(Math.random() * replies.length)];
    }

    // ── BYE / GOODBYE ──
    if (/bye|alvida|goodbye|baad mein|baad me|later|ciao|tata/.test(lower)) {
        const replies = [
            { message: "okay jaa... yaad aayegi 🥺 drama queen 💀", mood: "sad" },
            { message: "bye bestie 🌸 jaldi wapas aana drama lekar", mood: "happy" }
        ];
        return replies[Math.floor(Math.random() * replies.length)];
    }

    // ── GHAR / HOME ──
    if (/ghar|home|mummy|papa|family|bhai|sister|behen/.test(lower)) {
        return {
            message: "family drama? bata, main popcorn lekar aa jaati hun 🍿👀",
            mood: "judging"
        };
    }

    // ── RANDOM CATCH ALL ──
    const randomReplies = [
        { message: "yaar sach mein? aage bol kya hua 😭", mood: "chaos" },
        { message: "hain? theek se samjha, main thodi confused hun 😂", mood: "confused" },
        { message: "yeh sunkye mera reaction dekh 👀 bata poora scene", mood: "judging" },
        { message: "okay okay chill maar, main hun na 🌸", mood: "love" },
        { message: "toh? drama hai? gossip hai? details? ABHI? 💀", mood: "chaos" },
        { message: "bestie vibes on 💅 bol kya chal raha hai", mood: "slay" },
        { message: "yeh valid point hai actually 🤌 aage bol", mood: "happy" },
        { message: "main judge toh kar rahi hun, but continue kar 😏", mood: "judging" }
    ];

    return randomReplies[Math.floor(Math.random() * randomReplies.length)];
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
