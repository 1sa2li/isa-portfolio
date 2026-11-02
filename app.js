// Isa Ali portfolio - static JavaScript. No backend or sensitive data.
const menuButton = document.querySelector('.menu-toggle');
const nav = document.getElementById('main-nav');
const rgbButton = document.getElementById('rgb-toggle');
const progress = document.getElementById('scroll-progress');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('nav-open');
  menuButton.classList.toggle('active', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

const navLinks = [...document.querySelectorAll('.desktop-nav a')];
navLinks.forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('nav-open');
  menuButton.classList.remove('active');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}));

function setRGB(enabled) {
  document.body.classList.toggle('rgb-off', !enabled);
  rgbButton.setAttribute('aria-pressed', String(enabled));
  rgbButton.setAttribute('aria-label', enabled ? 'Turn RGB accent colors off' : 'Turn RGB accent colors on');
  try { localStorage.setItem('isa-rgb-enabled', String(enabled)); } catch (_) { /* Optional. */ }
}
let initialRGB = true;
try { initialRGB = localStorage.getItem('isa-rgb-enabled') !== 'false'; } catch (_) { /* Optional. */ }
setRGB(initialRGB);
rgbButton.addEventListener('click', () => setRGB(rgbButton.getAttribute('aria-pressed') !== 'true'));

function updateScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = max > 0 ? `${Math.min(100, window.scrollY / max * 100)}%` : '0%';
}
window.addEventListener('scroll', updateScroll, { passive: true });
window.addEventListener('resize', updateScroll);
updateScroll();

// Terminal tabs (mouse + keyboard).
const tabs = [...document.querySelectorAll('[data-terminal-tab]')];
function activateTab(target) {
  tabs.forEach((tab) => {
    const selected = tab === target;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    tab.classList.toggle('is-selected', selected);
    const panel = document.getElementById(tab.getAttribute('aria-controls'));
    if (panel) panel.hidden = !selected;
  });
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let next = i;
    if (event.key === 'ArrowRight') next = (i + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    tabs[next].focus();
    activateTab(tabs[next]);
  });
});

// Reveal on scroll. Reduced-motion users see everything immediately.
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .065, rootMargin: '0px 0px -24px 0px' });
  reveals.forEach((element) => revealObserver.observe(element));
} else {
  reveals.forEach((element) => element.classList.add('visible'));
}

if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle('is-active', link.hash === '#' + entry.target.id));
    });
  }, { rootMargin: '-17% 0px -66% 0px' });
  document.querySelectorAll('main section[id]').forEach((section) => navObserver.observe(section));
}

const projectDetails = {
  shortage: {
    title: 'Shortage Request App',
    description: 'An internal perfume shortage request tool built to replace manual request sheets with a searchable, structured workflow for store teams.',
    focus: [
      'Staff search the perfume catalog, select an available product size, enter the required quantity, and submit a shortage request.',
      'Requests are captured in an organized shared list to make missing items easier to review and follow up.',
      'Teams can manage active requests, remove resolved entries, and prepare consolidated PDF reports for fulfillment.',
      'The responsive interface uses JavaScript, Google Apps Script, and Google Sheets, with product and variant checks to help reduce mistakes.'
    ]
  },
  bho: {
    title: 'BHO - Delivery Management Portal',
    description: 'An in-progress internal delivery management application designed to make deliveries, staff assignments, and settlements easier to track across roles.',
    focus: [
      'Designing the data model, role-based permissions, and workflows for operations teams.',
      'Developing a web interface with React and Supabase.',
      'Structuring order assignment, delivery statuses, and settlement review.',
      'Planning a secure Shopify integration without exposing private records.'
    ]
  },
  shopify: {
    title: 'Shopify Regional Operations',
    description: 'Improving the day-to-day management of product data, localization, pricing workflows, and e-commerce operations.',
    focus: [
      'Coordinating consistent product naming and product catalog updates.',
      'Supporting market-based settings, pricing workflows, and localization.',
      'Improving store and order processes while reducing avoidable manual steps.',
      'Working with product data and store configuration for clearer operations.'
    ]
  },
  notify: {
    title: 'Back-in-Stock Notifications',
    description: 'An out-of-stock request experience designed to notify customers via WhatsApp or email once a product becomes available.',
    focus: [
      'Integrating a customer notification request into Shopify storefront UI.',
      'Supporting Arabic and English message templates and user experience.',
      'Connecting WhatsApp notifications through Interakt and email flows.',
      'Testing the stock availability trigger and notification experience.'
    ]
  },
  reporting: {
    title: 'Reporting & Inventory Tools',
    description: 'Spreadsheet-based tools and reporting flows supporting shipment monitoring, receiving checks, and material tracking.',
    focus: [
      'Organizing shipment follow-up data and report views.',
      'Tracking inventory receiving and recording verification results.',
      'Structuring material-consumption data and production reports.',
      'Using formulas and clear reporting layouts to support daily decisions.'
    ]
  }
};

const dialog = document.getElementById('project-dialog');
const closeDialog = dialog.querySelector('.dialog-close');
let openingButton = null;
document.querySelectorAll('[data-project]').forEach((button) => {
  button.addEventListener('click', () => {
    const details = projectDetails[button.dataset.project];
    if (!details) return;
    openingButton = button;
    document.getElementById('dialog-title').textContent = details.title;
    document.getElementById('dialog-description').textContent = details.description;
    const list = document.getElementById('dialog-points');
    list.replaceChildren(...details.focus.map((text) => {
      const item = document.createElement('li');
      item.textContent = text;
      return item;
    }));
    dialog.showModal();
  });
});
closeDialog.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => openingButton?.focus());
