// === SIGNAL ÉNERGÉTIQUE BLEU–MAUVE AMÉLIORÉ (RÉALISTE) ===
const signalCanvas = document.getElementById("signalCanvas");
const signalCtx = signalCanvas.getContext("2d");

function resizeSignalCanvas() {
  signalCanvas.width = window.innerWidth;
  signalCanvas.height = window.innerHeight;
}
resizeSignalCanvas();
window.addEventListener("resize", resizeSignalCanvas);

function getAvatarCenter() {
  const avatar = document.querySelector(".avatar");
  if (!avatar) return { x: 0, y: 0 };
  const rect = avatar.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
}

// 💡 Animation du flux
function shootSignalTo(element) {
  const start = getAvatarCenter();
  const rect = element.getBoundingClientRect();
  const end = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };

  let progress = 0;
  const sparks = [];

  function animate() {
    signalCtx.clearRect(0, 0, signalCanvas.width, signalCanvas.height);
    progress += 0.02;

    // position intermédiaire du flux
    const midX = start.x + (end.x - start.x) * progress;
    const midY = start.y + (end.y - start.y) * progress;

    // 🔮 Dégradé bleu-mauve plus profond
    const grad = signalCtx.createLinearGradient(start.x, start.y, midX, midY);
    grad.addColorStop(0, "#60a5fa");
    grad.addColorStop(0.4, "#7c3aed");
    grad.addColorStop(1, "#c084fc");

    signalCtx.beginPath();
    signalCtx.moveTo(start.x, start.y);

    // 💫 effet de vibration naturelle
    const segments = 25;
    for (let i = 1; i <= segments; i++) {
      const t = i / segments;
      const x = start.x + (end.x - start.x) * t;
      const y =
        start.y +
        (end.y - start.y) * t +
        Math.sin(t * 20 + progress * 10) * (Math.sin(progress * 5) * 6);
      signalCtx.lineTo(x, y);
    }

    signalCtx.strokeStyle = grad;
    signalCtx.lineWidth = 2.2 + Math.sin(progress * 15) * 0.5;
    signalCtx.shadowBlur = 25;
    signalCtx.shadowColor = "#9f7aea";
    signalCtx.globalAlpha = 0.9;
    signalCtx.stroke();
    signalCtx.globalAlpha = 1;

    // 💥 petites étincelles dynamiques
    if (Math.random() < 0.3) {
      sparks.push({
        x: midX,
        y: midY,
        size: Math.random() * 2 + 1,
        life: 1
      });
    }

    for (let i = 0; i < sparks.length; i++) {
      const s = sparks[i];
      signalCtx.beginPath();
      signalCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      signalCtx.fillStyle = "rgba(147,51,234," + s.life + ")";
      signalCtx.shadowBlur = 20;
      signalCtx.shadowColor = "#7c3aed";
      signalCtx.fill();
      s.life -= 0.04;
    }

    // filtre les étincelles mortes
    for (let i = sparks.length - 1; i >= 0; i--) {
      if (sparks[i].life <= 0) sparks.splice(i, 1);
    }

    // 💡 impact lumineux plus réaliste
    if (progress >= 1) {
      signalCtx.beginPath();
      signalCtx.arc(end.x, end.y, 10, 0, Math.PI * 2);
      const impact = signalCtx.createRadialGradient(
        end.x,
        end.y,
        0,
        end.x,
        end.y,
        40
      );
      impact.addColorStop(0, "rgba(192,132,252,0.9)");
      impact.addColorStop(1, "rgba(192,132,252,0)");
      signalCtx.fillStyle = impact;
      signalCtx.fill();

      setTimeout(() => signalCtx.clearRect(0, 0, signalCanvas.width, signalCanvas.height), 200);
    } else {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

// ⚡ Activation au clic
document.querySelectorAll(".float-btn").forEach((btn) => {
  btn.addEventListener("click", () => shootSignalTo(btn));
});
