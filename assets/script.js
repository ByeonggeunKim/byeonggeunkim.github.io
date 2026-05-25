// Mobile hamburger toggle + sliding nav indicator dot. Vanilla JS, no jQuery.
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.hamburger');
  const links = document.querySelector('.nav-links');
  if (btn && links) {
    btn.addEventListener('click', () => links.classList.toggle('open'));
  }

  const navBar = document.querySelector('.nav-bar');
  if (!navBar) return;

  const indicator = document.createElement('span');
  indicator.className = 'nav-indicator';
  navBar.appendChild(indicator);

  const targets = navBar.querySelectorAll('.nav-links a, .social a');

  const moveTo = (el) => {
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nav = navBar.getBoundingClientRect();
    const left = r.left - nav.left + r.width / 2 - 3;
    const top = r.bottom - nav.top + 4;
    indicator.style.left = `${left}px`;
    indicator.style.top = `${top}px`;
    indicator.style.opacity = '1';
  };

  const active = navBar.querySelector('.nav-links a.active');
  if (active) requestAnimationFrame(() => moveTo(active));

  targets.forEach((a) => {
    a.addEventListener('mouseenter', () => moveTo(a));
  });

  navBar.addEventListener('mouseleave', () => {
    if (active) moveTo(active);
    else indicator.style.opacity = '0';
  });

  window.addEventListener('resize', () => {
    if (active) moveTo(active);
  });
});
