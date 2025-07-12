const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettis = [];

for (let i = 0; i < 150; i++) {
  confettis.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 50,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    tilt: Math.floor(Math.random() * 10) - 10,
    tiltAngleIncremental: (Math.random() * 0.07) + 0.05,
    tiltAngle: 0
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < confettis.length; i++) {
    let conf = confettis[i];
    ctx.beginPath();
    ctx.lineWidth = conf.r;
    ctx.strokeStyle = conf.color;
    ctx.moveTo(conf.x + conf.tilt + conf.r / 2, conf.y);
    ctx.lineTo(conf.x + conf.tilt, conf.y + conf.tilt + conf.r / 2);
    ctx.stroke();
  }

  updateConfetti();
  requestAnimationFrame(drawConfetti);
}

function updateConfetti() {
  for (let i = 0; i < confettis.length; i++) {
    let conf = confettis[i];
    conf.tiltAngle += conf.tiltAngleIncremental;
    conf.y += (Math.cos(conf.d) + 3 + conf.r / 2) / 2;
    conf.x += Math.sin(conf.d);
    conf.tilt = Math.sin(conf.tiltAngle) * 15;

    if (conf.y > canvas.height) {
      conf.y = -20;
      conf.x = Math.random() * canvas.width;
    }
  }
}

drawConfetti();
