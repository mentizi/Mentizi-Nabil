// Animation "flux réseau" sur canvas bleu
const canvas = document.getElementById("network-bg");
const ctx = canvas.getContext("2d");

let particles = [];
const numParticles = 60;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// Créer les particules
for (let i = 0; i < numParticles; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.7,
    dy: (Math.random() - 0.5) * 0.7
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(15,23,42,0.4)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dessiner les connexions
  for (let i = 0; i < numParticles; i++) {
    for (let j = i + 1; j < numParticles; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(96,165,250, ${1 - dist / 120})`; // bleu doux
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  // Dessiner les particules
  for (let i = 0; i < numParticles; i++) {
    const p = particles[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "#60a5fa";
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    // rebond aux bords
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  }

  requestAnimationFrame(draw);
}
draw();
