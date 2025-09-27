// --- YouTube & Twitch embeds ---
const youtubeBtn = document.getElementById('youtube-btn');
const twitchBtn = document.getElementById('twitch-btn');
const ytEmbed = document.getElementById('youtube-embed');
const twitchEmbed = document.getElementById('twitch-embed');

youtubeBtn.addEventListener('click', e => {
  e.preventDefault();
  ytEmbed.src = "https://www.youtube.com/embed/@0in1?rel=0";
});
twitchBtn.addEventListener('click', e => {
  e.preventDefault();
  twitchEmbed.src = "https://player.twitch.tv/?channel=0in1&parent=localhost";
});

// --- Cat movement smoother ---
const cat = document.getElementById('cat');
let catPos = { x: window.innerWidth/2, y: window.innerHeight-100 };
let targetPos = { x: catPos.x, y: catPos.y };

function moveCatSmoothly() {
  // Every few seconds pick a new target
  targetPos.x += Math.random()*100 - 50;
  targetPos.y += Math.random()*50 - 25;
  targetPos.x = Math.max(0, Math.min(window.innerWidth-50, targetPos.x));
  targetPos.y = Math.max(0, Math.min(window.innerHeight-50, targetPos.y));

  function animate() {
    const dx = (targetPos.x - catPos.x) * 0.05;
    const dy = (targetPos.y - catPos.y) * 0.05;
    if(Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
      catPos.x += dx;
      catPos.y += dy;
      cat.style.left = catPos.x + 'px';
      cat.style.top = catPos.y + 'px';
      requestAnimationFrame(animate);
    } else {
      setTimeout(moveCatSmoothly, 1000 + Math.random()*2000);
    }
  }
  animate();
}

moveCatSmoothly();

window.addEventListener('resize', () => {
  catPos.x = window.innerWidth/2;
  catPos.y = window.innerHeight-100;
  targetPos = {...catPos};
});

// --- FAQ toggle ---
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const a = q.nextElementSibling;
    a.style.display = (a.style.display === 'block') ? 'none' : 'block';
  });
});
