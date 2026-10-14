// Site-wide behaviour: scroll progress, hero parallax, scroll reveals, logo hover and the mobile menu.

declare global {
  interface Window {
    __cw?: boolean;
  }
}

window.__cw = true;

const root = document.documentElement;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

/* ---------- Scroll progress hairline + hero parallax ---------- */

const progress = document.querySelector<HTMLElement>('[data-progress]');
const hero = document.querySelector<HTMLElement>('[data-hero-img]');
let frame = 0;

function onScroll() {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    const y = window.scrollY;
    const max = root.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    if (hero && !reducedMotion.matches && y < window.innerHeight * 1.5) hero.style.translate = `0 ${y * 0.25}px`;
  });
}

addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll, { passive: true });
onScroll();

/* ---------- Scroll reveal ----------
   [data-reveal] fades and slides up on its own; children of [data-stagger] do the same,
   110ms apart (capped at 8 steps) for siblings that come into view together. */

function reveal(el: HTMLElement, delay: number) {
  el.style.setProperty('--d', `${delay}ms`);
  el.classList.add('in');
  el.addEventListener('transitionend', () => el.style.removeProperty('--d'), { once: true });
}

if (root.classList.contains('motion') && !reducedMotion.matches && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      const shown = entries
        .filter((e) => e.isIntersecting)
        .map((e) => e.target as HTMLElement)
        .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
      const steps = new Map<Element | null, number>();
      for (const el of shown) {
        io.unobserve(el);
        if (el.hasAttribute('data-reveal')) {
          reveal(el, 0);
          continue;
        }
        const step = steps.get(el.parentElement) ?? 0;
        steps.set(el.parentElement, step + 1);
        reveal(el, Math.min(step, 8) * 110);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );

  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
  document.querySelectorAll('[data-stagger]').forEach((box) => {
    for (const child of box.children) io.observe(child);
  });
} else {
  root.classList.remove('motion');
}

/* ---------- Logo iris: a seamless 60° turn on hover ---------- */

document.querySelectorAll<HTMLElement>('[data-lockup]').forEach((lockup) => {
  const iris = lockup.querySelector('[data-iris] svg');
  lockup.addEventListener('mouseenter', () => {
    if (reducedMotion.matches || !iris) return;
    iris.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(60deg)' }], {
      duration: 900,
      easing: 'cubic-bezier(.65,0,.35,1)',
    });
  });
});

/* ---------- Mobile menu ---------- */

const header = document.querySelector<HTMLElement>('[data-header]');
const menuBtn = header?.querySelector<HTMLButtonElement>('[data-menu-btn]');
const menuLabel = menuBtn?.querySelector('.menu-btn__label');

if (header && menuBtn) {
  const isOpen = () => header.hasAttribute('data-open');
  const setOpen = (open: boolean) => {
    header.toggleAttribute('data-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    if (menuLabel) menuLabel.textContent = open ? 'Close' : 'Menu';
  };

  menuBtn.addEventListener('click', () => setOpen(!isOpen()));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      setOpen(false);
      menuBtn.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (isOpen() && !header.contains(e.target as Node)) setOpen(false);
  });

  matchMedia('(min-width: 760px)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });
}

export {};
