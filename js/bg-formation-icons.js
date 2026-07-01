// === bgFormation.js ===
// Icônes flottantes (université, diplôme, livre, chapeau)
// Style : Glow minimal + mouvement lent

const canvas = document.getElementById("bgFormation");
const ctx = canvas.getContext("2d");

// Ajuste la taille du canvas
function resize() {
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;
}
resize();
window.addEventListener("resize", resize);

// Palette douce bleu-mauve
const colors = ["#60a5fa", "#3b82f6", "#7c3aed", "#93c5fd"];

// Liste d'icônes
const icons = ["🎓", "📜", "📘", "🏛️"];

// Génération des particules/icônes
const particles = [];
for (let i = 0; i < 20; i++) {
  const icon = icons[Math.floor(Math.random() * icons.length)];
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 36 + Math.random() * 16,
    speedX: (Math.random() - 0.5) * 0.2,
    speedY: (Math.random() - 0.5) * 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
    glow: 0.6 + Math.random() * 0.4,
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.003,
    icon: icon,
  });
}

// Dessin fond étoilé
function drawBackground() {
  for (let i = 0; i < 120; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    ctx.fillStyle = "rgba(255,255,255,0.03)";
    ctx.fillRect(x, y, 2, 2);
  }
}

// Animation principale
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBackground();

  particles.forEach((p) => {
    // mouvement flottant lent
    p.x += p.speedX;
    p.y += p.speedY;
    p.angle += p.spin;

    // rebouclage
    if (p.x < -100) p.x = canvas.width + 100;
    if (p.x > canvas.width + 100) p.x = -100;
    if (p.y < -100) p.y = canvas.height + 100;
    if (p.y > canvas.height + 100) p.y = -100;

    // dessin de l'icône avec glow
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(Math.sin(p.angle) * 0.1);

    // halo lumineux
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 1.8);
    gradient.addColorStop(0, `rgba(255,255,255,${p.glow})`);
    gradient.addColorStop(0.3, `${p.color}66`);
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, p.size * 1.2, 0, Math.PI * 2);
    ctx.fill();

    // icône
    ctx.globalAlpha = 0.9;
    ctx.font = `${p.size}px "Segoe UI Emoji", "Arial"`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = p.color;
    ctx.fillText(p.icon, 0, 0);

    ctx.restore();
  });

  requestAnimationFrame(animate);
}

animate();
