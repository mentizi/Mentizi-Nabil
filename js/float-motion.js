// === ANIMATION DÉSORGANISÉE DES BOUTONS LATÉRAUX ===
const floatButtons = document.querySelectorAll(".float-btn");

floatButtons.forEach((btn) => {
  let baseX = btn.offsetLeft;
  let baseY = btn.offsetTop;
  let offsetX = Math.random() * 20 - 10;
  let offsetY = Math.random() * 20 - 10;
  let speedX = (Math.random() * 0.8 + 0.2) * (Math.random() > 0.5 ? 1 : -1);
  let speedY = (Math.random() * 0.8 + 0.2) * (Math.random() > 0.5 ? 1 : -1);

  function animate() {
    offsetX += speedX * 0.3;
    offsetY += speedY * 0.3;

    // rebond lent autour de leur base
    if (Math.abs(offsetX) > 20) speedX *= -1;
    if (Math.abs(offsetY) > 20) speedY *= -1;

    btn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

    requestAnimationFrame(animate);
  }
  animate();
});
