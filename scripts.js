// --- Seasonal Emojis ---
const seasons = [
  { name:'Spring', gradient:['#6DBE45','#A7D49B'], elements:['🌸','🍃','🐦','☘️','🌼','🐝'] },
  { name:'Summer', gradient:['#3E8E41','#82C784'], elements:['☀️','🌻','🌴','🍹','🐞','🦋'] },
  { name:'Fall', gradient:['#A0522D','#E9967A'], elements:['🍂','🍁','🎃','🦉','🌰','🍄'] },
  { name:'Winter', gradient:['#2F4F4F','#B0C4DE'], elements:['❄️','⛄','🦌','🌲','☕','🧣'] },
];
let currentSeason = 0;
const hero = document.querySelector('.hero');

function showSeason(index) {
  hero.style.background = `linear-gradient(135deg, ${seasons[index].gradient[0]}, ${seasons[index].gradient[1]})`;
  document.querySelectorAll('.seasonal-element').forEach(e => e.remove());
  seasons[index].elements.forEach(el => {
    const div = document.createElement('div');
    div.className = 'seasonal-element';
    div.style.top = `${Math.random()*80}%`;
    div.style.left = `${Math.random()*80}%`;
    div.style.fontSize = `${12 + Math.random()*24}px`;
    div.style.animationDuration = `${5 + Math.random()*15}s`;
    div.textContent = el;
    hero.appendChild(div);
  });
}

showSeason(currentSeason);
setInterval(() => {
  currentSeason = (currentSeason + 1) % seasons.length;
  showSeason(currentSeason);
}, 15000);

document.getElementById('prev-season').addEventListener('click', () => {
  currentSeason = (currentSeason - 1 + seasons.length) % seasons.length;
  showSeason(currentSeason);
});

document.getElementById('next-season').addEventListener('click', () => {
  currentSeason = (currentSeason + 1) % seasons.length;
  showSeason(currentSeason);
});

// --- Scroll reveal ---
const sections = document.querySelectorAll("section");
const revealOnScroll = () => {
  const trigger = window.innerHeight * 0.8;
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < trigger) sec.classList.add("show");
  });
};
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// --- Cat movement ---
const cat = document.getElementById('cat');
let catPos = { x: window.innerWidth/2, y: window.innerHeight-100 };
let resting = true;

function moveCat() {
  const target = resting
    ? { x: catPos.x + (Math.random()*20-10), y: catPos.y + (Math.random()*10-5) }
    : { x: Math.random()*(window.innerWidth-50), y: Math.random()*(window.innerHeight-50) };
  
  target.x = Math.max(0, Math.min(window.innerWidth-50, target.x));
  target.y = Math.max(0, Math.min(window.innerHeight-50, target.y));
  
  let steps = 60, step = 0;
  
  function animateStep() {
    step++;
    catPos.x += (target.x - catPos.x)/(steps-step+1);
    catPos.y += (target.y - catPos.y)/(steps-step+1);
    cat.style.left = catPos.x + 'px';
    cat.style.top = catPos.y + 'px';
    if(step < steps) requestAnimationFrame(animateStep);
    else {
      resting = Math.random() > 0.3;
      const waitTime = resting ? (2000 + Math.random()*3000) : (500 + Math.random()*500);
      setTimeout(moveCat, waitTime);
    }
  }
  
  animateStep();
}

moveCat();
cat.addEventListener('click', () => { window.location.href='cat.html'; });
window.addEventListener('resize', () => { catPos.x = window.innerWidth/2; catPos.y = window.innerHeight-100; });

// --- FAQ toggle ---
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const a = q.nextElementSibling;
    a.style.display = (a.style.display === 'block') ? 'none' : 'block';
  });
});

// --- YouTube & Twitch toggle ---
const videoBtn = document.getElementById('video-btn');
const twitchEmbed = document.getElementById('twitch-embed');
const ytEmbed = document.getElementById('youtube-embed');
videoBtn.addEventListener('click', () => {
  const show = (twitchEmbed.style.display === 'block');
  twitchEmbed.style.display = show ? 'none' : 'block';
  ytEmbed.style.display = show ? 'none' : 'block';
});
