/* Configure before launch. Never put secret API keys in a static website. */
const SITE_CONFIG = Object.freeze({
  formEndpoint: '', // e.g. https://formspree.io/f/your_verified_form_id
  phone: '', // Confirmed international format: +91 followed by 10 digits.
  whatsapp: '' // Same format; supplied nine-digit number needs correction.
});

// Progressive navigation: all links remain available without JavaScript.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');
if (menuButton && navigation) {
  document.body.classList.add('menu-ready');
  const closeMenu = (restoreFocus = false) => {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = 'Menu';
    if (restoreFocus) menuButton.focus();
  };
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    navigation.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? 'Close' : 'Menu';
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  matchMedia('(min-width: 760px)').addEventListener('change', () => closeMenu());
}

// Only expose call/chat links after a complete number has been configured.
const validNumber = number => /^\+[1-9]\d{7,14}$/.test(number) && (!number.startsWith('+91') || /^\+91[6-9]\d{9}$/.test(number));
for (const kind of ['phone', 'whatsapp']) {
  const number = SITE_CONFIG[kind];
  if (!validNumber(number)) continue;
  document.querySelectorAll(`[data-contact="${kind}"]`).forEach(link => {
    link.href = kind === 'phone' ? `tel:${number}` : `https://wa.me/${number.slice(1)}?text=${encodeURIComponent('Hello VGET, I would like to discuss digital marketing for my business.')}`;
    link.hidden = false;
  });
}
document.querySelectorAll('[data-year]').forEach(item => { item.textContent = new Date().getFullYear(); });

// Content remains visible when JavaScript or IntersectionObserver is unavailable.
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.08 });
  document.body.classList.add('motion-ready');
  document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
}

const form = document.querySelector('#quote-form');
if (form) {
  const status = document.querySelector('#form-status');
  const submit = form.querySelector('[type="submit"]');
  const choices = [...form.querySelectorAll('[name="services"]')];
  const fields = [...form.querySelectorAll('[data-validate]')];
  const selected = new URLSearchParams(location.search).getAll('service');
  choices.forEach(choice => { choice.checked = selected.includes(choice.value); });
  const dateInput = form.querySelector('[name="start_date"]');
  const today = new Date();
  dateInput.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const setStatus = (message, type = '') => {
    status.textContent = message;
    status.className = `form-status ${type}`;
  };
  const validateField = field => {
    field.setCustomValidity('');
    if (field.required && !field.value.trim()) field.setCustomValidity('Please complete this field.');
    if (field.name === 'phone' && field.value && !/^[+\d\s().-]{7,25}$/.test(field.value)) field.setCustomValidity('Enter a valid phone number, including your country code.');
    const invalid = !field.validity.valid;
    field.setAttribute('aria-invalid', String(invalid));
    document.getElementById(`${field.id}-error`).textContent = invalid ? field.validationMessage : '';
    return !invalid;
  };
  const validateServices = () => {
    const valid = choices.some(choice => choice.checked);
    document.querySelector('#services-error').textContent = valid ? '' : 'Please select at least one service.';
    choices.forEach(choice => choice.setAttribute('aria-invalid', String(!valid)));
    return valid;
  };
  fields.forEach(field => field.addEventListener('input', () => {
    if (field.getAttribute('aria-invalid') === 'true') validateField(field);
  }));
  choices.forEach(choice => choice.addEventListener('change', validateServices));
  const endpointReady = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(SITE_CONFIG.formEndpoint);
  if (!endpointReady) {
    setStatus('Online enquiries are being set up. Please email akhilraj06200@gmail.com to request your quote.');
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (form.dataset.sending === 'true') return;
    const validFields = fields.map(validateField).every(Boolean);
    const validServices = validateServices();
    if (!validFields || !validServices) {
      setStatus('Please check the highlighted fields.', 'error');
      (fields.find(field => !field.validity.valid) || choices[0]).focus();
      return;
    }
    if (!endpointReady) {
      setStatus('Your request has not been sent. Please email akhilraj06200@gmail.com while online enquiries are being set up.', 'error');
      return;
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    form.dataset.sending = 'true';
    submit.disabled = true;
    submit.textContent = 'Sending…';
    setStatus('Sending your requirements…');
    try {
      const response = await fetch(SITE_CONFIG.formEndpoint, {
        method: 'POST', body: new FormData(form),
        headers: { Accept: 'application/json' }, signal: controller.signal
      });
      if (!response.ok) throw new Error('Submission was not accepted.');
      form.reset();
      fields.forEach(field => {
        field.setCustomValidity('');
        field.removeAttribute('aria-invalid');
        document.getElementById(`${field.id}-error`).textContent = '';
      });
      choices.forEach(choice => choice.removeAttribute('aria-invalid'));
      setStatus('Thank you. Your enquiry has been received. VGET will reply to the email you provided.', 'success');
    } catch (error) {
      setStatus(error.name === 'AbortError'
        ? 'We could not confirm delivery. Please email us before retrying to avoid a duplicate enquiry.'
        : 'We could not confirm delivery. Your details are still here. Please retry or email akhilraj06200@gmail.com.', 'error');
    } finally {
      clearTimeout(timeout);
      form.dataset.sending = 'false';
      submit.disabled = false;
      submit.textContent = 'Send my requirements →';
    }
  });
  // Enable only after handlers are attached; no accidental GET of personal details.
  submit.disabled = false;
}
