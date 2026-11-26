/* Marisa Stitches Studio — main.js */

// ── ✏️  EASY EDITS — change these whenever you need to ───────────────────────
const TURNAROUND = '1–2 weeks';           // update this whenever your lead time changes
const ORDER_STATUS = 'closed';            // 'open' or 'closed' — 'closed' hides the order form and shows the closed notice
const STATUS_MSG   = ORDER_STATUS === 'open'
  ? 'Currently accepting orders — 1–2 weeks out!'
  : 'The shop is currently closed. Stay tuned on Instagram for recent projects and reopening news!';
// ─────────────────────────────────────────────────────────────────────────────

// ── 📧  EMAIL CONFIRMATION CONFIG (EmailJS) ───────────────────────────────────
// Sends a branded confirmation email to the customer right after they submit.
// FREE for up to 200 emails/month — no backend needed.
//
// SETUP (takes about 5 minutes):
//   1. Go to https://emailjs.com and create a free account
//   2. Click "Email Services" → Add New Service → choose Gmail → connect your Gmail
//      → copy the Service ID into EMAILJS_SERVICE_ID below
//   3. Click "Email Templates" → Create New Template
//      → paste the template from the TEMPLATE section below → Save
//      → copy the Template ID into EMAILJS_TEMPLATE_ID below
//   4. Click your account name (top right) → API Keys
//      → copy your Public Key into EMAILJS_PUBLIC_KEY below
//
// ── EMAILJS TEMPLATE (paste this into the EmailJS template editor) ────────────
// SUBJECT LINE:  🪡 your order's in the hoop, {{to_name}}!
//
// HTML BODY — paste everything between the dashes into the EmailJS HTML editor:
// ---
// <div style="font-family:'Georgia',serif;max-width:560px;margin:0 auto;background:#F4EFE7;border-radius:12px;overflow:hidden;">
//   <div style="background:#1E2F4A;padding:2rem 2.5rem 1.5rem;text-align:center;">
//     <p style="font-family:'Georgia',serif;font-size:1rem;color:#C89A3C;letter-spacing:0.12em;margin:0 0 0.4rem;">Marisa's Stitches Studio</p>
//     <p style="font-family:'Georgia',serif;font-size:0.8rem;color:rgba(244,239,231,0.55);font-style:italic;margin:0;">charm, threaded in.</p>
//   </div>
//   <div style="padding:2rem 2.5rem;">
//     <p style="font-size:1.2rem;color:#1E2F4A;margin:0 0 1rem;">Hi {{to_name}} 👋</p>
//     <p style="color:#1E2F4A;line-height:1.6;margin:0 0 1rem;">Your order request just landed in my inbox — and I'm already excited about it. (That's just how I am. No regrets.)</p>
//     <p style="color:#1E2F4A;line-height:1.6;margin:0 0 1.5rem;">I'll put together a quote and get back to you within <strong>48 hours</strong>. Expect at least a few follow-up questions — it means I'm paying attention.</p>
//     <div style="background:#fff;border-left:3px solid #C89A3C;border-radius:6px;padding:1rem 1.25rem;margin:0 0 1.5rem;">
//       <p style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;color:#C89A3C;margin:0 0 0.5rem;font-weight:600;">Your Submission Summary</p>
//       <p style="color:#1E2F4A;font-size:0.9rem;line-height:1.7;margin:0;white-space:pre-line;">{{order_summary}}</p>
//     </div>
//     <p style="color:#1E2F4A;line-height:1.6;margin:0 0 1.5rem;">While you wait — come hang out! I post finished orders, works in progress, and the occasional chaotic behind-the-scenes.</p>
//     <div style="text-align:center;margin:0 0 1.5rem;">
//       <a href="https://instagram.com/marisastitches" style="display:inline-block;background:#1F4D3A;color:#F4EFE7;text-decoration:none;padding:0.75rem 2rem;border-radius:6px;font-size:0.9rem;letter-spacing:0.04em;">Follow @marisastitches →</a>
//     </div>
//   </div>
//   <div style="background:#1E2F4A;padding:1rem 2.5rem;text-align:center;">
//     <p style="color:rgba(244,239,231,0.45);font-size:0.75rem;margin:0;">Marisa's Stitches Studio · Clinton Township, MI · marisastitches.com</p>
//   </div>
// </div>
// ---
//
// REPLY TO:   {{reply_to}}
// TO EMAIL:   {{to_email}}
// ─────────────────────────────────────────────────────────────────────────────
const EMAILJS_PUBLIC_KEY  = 'kV6VKDL1U8oxz66u5';  // ← paste your Public Key here  (Account → API Keys)
const EMAILJS_SERVICE_ID  = 'service_t63bqjf';  // ← paste your Service ID here  (Email Services tab)
const EMAILJS_TEMPLATE_ID = 'template_558xjrn';  // ← paste your Template ID here (Email Templates tab)
// ─────────────────────────────────────────────────────────────────────────────

// ── BASIC COLORS ─────────────────────────────────────────────────────────────
// Customers pick a general direction; Marisa follows up with exact thread shades.
// The first 12 go around the wheel, NEUTRALS sit in a row underneath.

const WHEEL_COLORS = [
  { name:'Red',         hex:'#cc1f2a' },
  { name:'Orange',      hex:'#ee7a20' },
  { name:'Yellow',      hex:'#f0c820' },
  { name:'Light Green', hex:'#8cc850' },
  { name:'Green',       hex:'#2a7a3c' },
  { name:'Teal',        hex:'#1f8a80' },
  { name:'Light Blue',  hex:'#8cbce4' },
  { name:'Blue',        hex:'#2a5cb8' },
  { name:'Navy',        hex:'#183060' },
  { name:'Purple',      hex:'#7a40a8' },
  { name:'Pink',        hex:'#e0508a' },
  { name:'Light Pink',  hex:'#f4b8c8' },
];

const NEUTRAL_COLORS = [
  { name:'Black',  hex:'#111111' },
  { name:'White',  hex:'#ffffff' },
  { name:'Cream',  hex:'#ece2cc' },
  { name:'Gray',   hex:'#9a9a9a' },
  { name:'Brown',  hex:'#7a4a28' },
  { name:'Gold',   hex:'#c89a3c' },
  { name:'Silver', hex:'#c8ccd0' },
];

const colorPicks = new Set();

function renderColorWheel() {
  const wrap = document.getElementById('color-wheel');
  if (!wrap) return;

  const ring = document.createElement('div');
  ring.className = 'color-ring';
  WHEEL_COLORS.forEach((c, i) => {
    const angle = i * (360 / WHEEL_COLORS.length) - 90;
    const dot = makeColorDot(c);
    dot.style.transform = `rotate(${angle}deg) translate(var(--ring-r)) rotate(${-angle}deg)`;
    ring.appendChild(dot);
  });
  const center = document.createElement('div');
  center.className = 'color-ring-center';
  center.id = 'color-ring-center';
  center.textContent = 'Tap a color';
  ring.appendChild(center);

  const neutrals = document.createElement('div');
  neutrals.className = 'color-neutrals';
  NEUTRAL_COLORS.forEach(c => neutrals.appendChild(makeColorDot(c)));

  wrap.appendChild(ring);
  wrap.appendChild(neutrals);
}

function makeColorDot(c) {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.className = 'color-dot';
  dot.style.background = c.hex;
  dot.title = c.name;
  dot.setAttribute('aria-label', c.name);
  dot.setAttribute('aria-pressed', 'false');
  dot.innerHTML = `<span class="color-dot-name">${c.name}</span>`;
  dot.addEventListener('click', () => {
    const on = !colorPicks.has(c.name);
    on ? colorPicks.add(c.name) : colorPicks.delete(c.name);
    dot.classList.toggle('picked', on);
    dot.setAttribute('aria-pressed', String(on));
    const center = document.getElementById('color-ring-center');
    if (center) center.textContent = colorPicks.size ? `${colorPicks.size} picked` : 'Tap a color';
    syncPicks();
  });
  return dot;
}

// Push font + color picks into the order form fields and the summary line
function syncPicks() {
  const fontField  = document.getElementById('font-preference');
  const colorField = document.getElementById('color-preference');
  if (fontField)  fontField.value  = [...fontPicks].join(', ');
  if (colorField) colorField.value = [...colorPicks].join(', ');

  const text = document.getElementById('picks-summary-text');
  if (!text) return;
  const parts = [];
  if (fontPicks.size)  parts.push(`<strong>Fonts:</strong> ${[...fontPicks].join(', ')}`);
  if (colorPicks.size) parts.push(`<strong>Colors:</strong> ${[...colorPicks].join(', ')}`);
  text.innerHTML = parts.length
    ? parts.join(' &nbsp;·&nbsp; ') + ' &nbsp;<a href="#order">These will carry into the order form →</a>'
    : 'Nothing picked yet. Your picks will carry into the order form.';
}

// ── ORDER FORM ───────────────────────────────────────────────────────────────
// ✏️ Stock items: set a price (number) to include it in the live estimate.
//    Leave price as null and the estimate says "item priced in your quote".
const STOCK_ITEMS = [
  { name:'Canvas pouch', price:5    },
  { name:'Bib',          price:5    },
  { name:'Bath towel',   price:5    },
];
const SHIPPING_FEE    = 7;
const TURNAROUND_DAYS = 14;  // longest standard turnaround — used for the "get it to me by" date
const SHIP_BACK_DAYS  = 5;   // extra days when shipping the finished order back
const MAX_INSPO       = 12;  // Netlify takes one file per field; index.html has inspo-1 … inspo-12

let inspoFiles = [];

function money(n) { return '$' + (Math.round(n * 100) / 100).toString().replace(/\.(\d)$/, '.$10'); }
function fmtDate(d) { return d.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' }); }
function startOfToday() { const d = new Date(); d.setHours(12, 0, 0, 0); return d; }

function orderState() {
  const f = document.getElementById('order-form');
  const qty        = Math.max(1, Math.min(99, parseInt(f.quantity.value, 10) || 1));
  const rate       = parseFloat(f.querySelector('[name="design-type"]:checked')?.dataset.price || 15);
  const placesSel  = [...f.querySelectorAll('.placement-opt:checked')].map(c => c.value);
  const placements = Math.max(1, placesSel.length);
  const fromStock  = f.querySelector('[name="item-source"]:checked')?.id === 'src-stock';
  const stockItem  = fromStock ? STOCK_ITEMS.find(s => s.name === f['stock-item'].value) : null;
  const shipBack   = f.querySelector('[name="delivery"]:checked')?.id === 'del-ship';
  const needBy     = f['need-by'].value ? new Date(f['need-by'].value + 'T12:00') : null;

  let rush = false, dueBy = null;
  if (needBy) {
    const leadDays = TURNAROUND_DAYS + (shipBack ? SHIP_BACK_DAYS : 0);
    dueBy = new Date(needBy); dueBy.setDate(dueBy.getDate() - leadDays);
    rush  = dueBy < startOfToday();
  }
  return { qty, rate, placesSel, placements, fromStock, stockItem, shipBack, needBy, dueBy, rush };
}

function updateEstimate() {
  const st = orderState();
  const lines = [];
  let total = 0, extra = '';

  const emb = st.qty * st.placements * st.rate;
  total += emb;
  lines.push([`Embroidery · ${st.qty} item${st.qty > 1 ? 's' : ''} × ${st.placements} spot${st.placements > 1 ? 's' : ''} × $${st.rate}`, money(emb)]);

  if (st.fromStock && st.stockItem) {
    if (st.stockItem.price != null) {
      const c = st.stockItem.price * st.qty;
      total += c;
      lines.push([`${st.stockItem.name} × ${st.qty}`, money(c)]);
    } else {
      lines.push([`${st.stockItem.name} × ${st.qty}`, 'in quote']);
      extra = ' + item';
    }
  }
  if (st.rush) {
    const fee = st.qty >= 6 ? 10 : 5;
    total += fee;
    lines.push(['Rush (if I can fit it)', money(fee)]);
  }
  lines.push([st.shipBack ? 'Shipping back to you' : 'Porch pickup', st.shipBack ? money(SHIPPING_FEE) : 'Free']);
  if (st.shipBack) total += SHIPPING_FEE;

  document.getElementById('estimate-lines').innerHTML =
    lines.map(([l, v]) => `<div class="estimate-line"><span>${l}</span><strong>${v}</strong></div>`).join('');
  const totalEl = document.getElementById('estimate-total');
  const newText = money(total) + extra;
  if (totalEl.textContent !== newText) {
    totalEl.textContent = newText;
    totalEl.classList.remove('bump'); void totalEl.offsetWidth; totalEl.classList.add('bump');
  }
  document.getElementById('f-estimate').value =
    lines.map(([l, v]) => `${l}: ${v}`).join(' | ') + ` | Total: ${newText}`;
}

function updateTiming() {
  const st      = orderState();
  const callout = document.getElementById('timing-callout');
  const dueEl   = document.getElementById('f-item-due');
  document.getElementById('own-item-fields').style.display   = st.fromStock ? 'none' : '';
  document.getElementById('stock-item-fields').style.display = st.fromStock ? '' : 'none';
  document.getElementById('handoff-fields').style.display    = st.fromStock ? 'none' : '';
  document.getElementById('delivery-ship-fields').style.display = st.shipBack ? '' : 'none';

  if (!st.needBy) { callout.style.display = 'none'; dueEl.value = ''; return; }
  callout.style.display = '';
  if (st.rush) {
    callout.className = 'timing-callout timing-callout--rush';
    callout.innerHTML = st.fromStock
      ? `<strong>That's a quick turnaround!</strong> I'll let you know if I can make it work. A small rush fee may apply.`
      : `<strong>That's a quick turnaround!</strong> Get your item to me as soon as you can, and I'll let you know if I can make it work. A small rush fee may apply.`;
    dueEl.value = 'ASAP (rush)';
  } else if (st.fromStock) {
    callout.className = 'timing-callout';
    callout.innerHTML = `Plenty of time. I'll have it ready by <strong>${fmtDate(st.needBy)}</strong>.`;
    dueEl.value = 'n/a (from stock)';
  } else {
    callout.className = 'timing-callout';
    callout.innerHTML = `📦 To make <strong>${fmtDate(st.needBy)}</strong>, please get your item to me by <strong>${fmtDate(st.dueBy)}</strong>.`;
    dueEl.value = fmtDate(st.dueBy);
  }
}

function refreshOrder() { updateTiming(); updateEstimate(); }

// ── Inspo photos ──
function addInspoFiles(fileList) {
  const incoming = [...fileList].filter(f => f.type.startsWith('image/'));
  const room = MAX_INSPO - inspoFiles.length;
  if (incoming.length > room) showColorToast(`Up to ${MAX_INSPO} photos. Paste extra inspo as links!`);
  inspoFiles = inspoFiles.concat(incoming.slice(0, Math.max(0, room)));
  renderInspoThumbs();
}

function renderInspoThumbs() {
  const wrap = document.getElementById('inspo-thumbs');
  wrap.querySelectorAll('img').forEach(img => URL.revokeObjectURL(img.src));
  wrap.innerHTML = '';
  inspoFiles.forEach((file, i) => {
    const t = document.createElement('div');
    t.className = 'inspo-thumb';
    t.innerHTML = `<img alt="Inspo photo ${i + 1}"/><button type="button" aria-label="Remove photo ${i + 1}">×</button>`;
    t.querySelector('img').src = URL.createObjectURL(file);
    t.querySelector('button').addEventListener('click', () => { inspoFiles.splice(i, 1); renderInspoThumbs(); });
    wrap.appendChild(t);
  });
}

// Shrinks photos so a dozen fit under Netlify's 8 MB submission limit
function compressImage(file, maxSide = 1600, quality = 0.8) {
  return new Promise(resolve => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale  = Math.min(1, maxSide / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width  = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob(blob => {
        if (!blob) return resolve(file);
        const name = file.name.replace(/\.[^.]+$/, '') + '.jpg';
        resolve(new File([blob], name, { type: 'image/jpeg' }));
      }, 'image/jpeg', quality);
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(file); };
    img.src = url;
  });
}

// ── Validation ──
function showError(msg, field) {
  clearError();
  const err = document.createElement('p');
  err.id = 'order-error';
  err.className = 'order-error';
  err.textContent = msg;
  document.querySelector('.of-submit').prepend(err);
  if (field) { field.focus({ preventScroll: true }); field.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
}
function clearError() { document.getElementById('order-error')?.remove(); }

function validateOrder(f) {
  const need = [['name', 'Please enter your name.'], ['phone', 'Please enter your phone number.'],
                ['email', 'Please enter your email.'], ['item', 'Tell me what we\'re embroidering.'],
                ['wording', 'Please add the exact wording.']];
  for (const [n, msg] of need) {
    if (!f[n].value.trim()) { showError(msg, f[n]); return false; }
  }
  if (!/\S+@\S+\.\S+/.test(f.email.value)) { showError('Please enter a valid email.', f.email); return false; }
  if (orderState().shipBack) {
    for (const n of ['ship-address', 'ship-city', 'ship-zip']) {
      if (!f[n].value.trim()) { showError('Please add your shipping address.', f[n]); return false; }
    }
  }
  return true;
}

// ── Success modal ──
function showFormSuccess(lines, emailVal, isNetworkFallback) {
  const success = document.getElementById('form-success');
  const summary = lines.length
    ? `<div class="form-success-summary">
         <p class="form-success-summary-label">📋 Your request</p>
         ${lines.map(l => `<p>${l}</p>`).join('')}
         <p class="form-success-summary-hint">Screenshot this for your records.</p>
       </div>` : '';
  const fallbackNote = isNetworkFallback
    ? `<p style="font-size:0.78rem;opacity:0.6;margin-top:0.25rem;">If you don't hear back within 48 hours, DM me on <a href="https://instagram.com/marisastitches" target="_blank" rel="noopener" style="color:var(--gold);">@marisastitches</a> just in case.</p>` : '';

  success.innerHTML = `
    <div class="form-success-modal">
      <button class="form-success-close-x" id="form-success-close-x" aria-label="Close">✕</button>
      <div class="form-success-header">
        <span class="form-success-icon">🪡</span>
        <div class="form-success-heading">order's in the hoop!</div>
        <div class="form-success-tagline">charm, threaded in.</div>
      </div>
      <div class="form-success-body">
        <p class="form-success-charm">You filled out a form. For me. I'm genuinely touched. (The Capricorn in me is also relieved.)</p>
        <p>I'll be back in your inbox within <strong>48 hours</strong>${emailVal ? ' at <strong>' + emailVal + '</strong>' : ''} with a quote${orderState().fromStock ? '' : ' and where to send your item'}. Expect questions. I ask a lot of them. It means I care.</p>
        ${summary}
        ${fallbackNote}
        <div class="form-success-ig">
          <p>While you wait, come hang out. I post finished orders and behind-the-scenes machine chaos.</p>
          <a href="https://instagram.com/marisastitches" target="_blank" rel="noopener" class="form-success-ig-btn">Follow @marisastitches →</a>
        </div>
      </div>
      <div class="form-success-footer">
        <button class="form-success-ok-btn" id="form-success-ok-btn">OK, I'm excited! 🎉</button>
      </div>
    </div>`;

  success.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  setTimeout(launchConfetti, 120);

  function closeModal() {
    success.style.display = 'none';
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleEsc);
  }
  function handleEsc(e) { if (e.key === 'Escape') closeModal(); }
  document.getElementById('form-success-close-x').addEventListener('click', closeModal);
  document.getElementById('form-success-ok-btn').addEventListener('click', closeModal);
  success.addEventListener('click', function overlayClick(e) {
    if (e.target === success) { closeModal(); success.removeEventListener('click', overlayClick); }
  });
  document.addEventListener('keydown', handleEsc);
}

// ── Submit ──
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  clearError();
  if (!validateOrder(form)) return;

  const st  = orderState();
  const btn = document.getElementById('order-submit-btn');
  btn.textContent = inspoFiles.length ? 'Uploading photos…' : 'Sending…';
  btn.disabled = true;

  document.getElementById('f-placement').value = st.placesSel.join(', ');
  updateEstimate(); updateTiming();

  const v = n => (form[n]?.value || '').trim();
  const lines = [
    `<strong>Item:</strong> ${v('item')} × ${st.qty}${st.fromStock ? ' (from your stock: ' + v('stock-item') + ')' : ''}`,
    `<strong>Wording:</strong> ${v('wording')}`,
    st.placesSel.length ? `<strong>Placement:</strong> ${st.placesSel.join(', ')}` : '',
    v('font-preference')  ? `<strong>Fonts:</strong> ${v('font-preference')}` : '',
    v('color-preference') ? `<strong>Colors:</strong> ${v('color-preference')}` : '',
    st.needBy ? `<strong>Need it by:</strong> ${fmtDate(st.needBy)}` : '',
    st.needBy && !st.fromStock ? `<strong>Get your item to me by:</strong> ${v('item-to-marisa-by')}` : '',
    `<strong>Estimate:</strong> ${document.getElementById('estimate-total').textContent}`,
  ].filter(Boolean);
  const emailVal = v('email'), nameVal = v('name');

  const formData = new FormData(form);
  for (let i = 1; i <= MAX_INSPO; i++) formData.delete(`inspo-${i}`);
  const photos = await Promise.all(inspoFiles.map(f => compressImage(f)));
  photos.forEach((p, i) => formData.append(`inspo-${i + 1}`, p));

  const done = (fallback) => {
    sendConfirmationEmail({ name: nameVal, email: emailVal, lines });
    showFormSuccess(lines, emailVal, fallback);
    form.reset();
    inspoFiles = []; renderInspoThumbs();
    fontPicks.clear(); colorPicks.clear();
    document.querySelectorAll('.font-card.picked, .color-dot.picked').forEach(el => el.classList.remove('picked'));
    syncPicks(); refreshOrder();
    btn.textContent = 'Send My Order Request →';
    btn.disabled = false;
  };

  // Netlify captures the form at the edge and may answer with a redirect,
  // so treat any response (or a network error) as received.
  fetch('/', { method: 'POST', body: formData })
    .then(() => done(false))
    .catch(err => { console.error('Form error:', err); done(true); });
}

function initOrderForm() {
  const form = document.getElementById('order-form');
  if (!form) return;

  const sel = document.getElementById('f-stock');
  sel.innerHTML = STOCK_ITEMS.map(s =>
    `<option value="${s.name}">${s.name}${s.price != null ? ' (+' + money(s.price) + ' each)' : ''}</option>`).join('');
  const priced = STOCK_ITEMS.filter(s => s.price != null);
  document.getElementById('stock-hint').textContent = priced.length === STOCK_ITEMS.length
    ? 'The item price is added to your estimate.'
    : "I'll include the item price in your quote.";
  const stockNote = document.getElementById('stock-note');
  if (stockNote && priced.length === STOCK_ITEMS.length && new Set(priced.map(x => x.price)).size === 1) {
    stockNote.textContent = `Canvas pouches, bibs, and bath towels, ${money(priced[0].price)} each. Just pick one in the order form.`;
  }

  const needBy = document.getElementById('f-needby');
  needBy.min = new Date().toISOString().slice(0, 10);

  form.addEventListener('input', refreshOrder);
  form.addEventListener('change', refreshOrder);
  form.addEventListener('submit', handleSubmit);
  // Stop the iPhone "Go" key from sending the form from a single-line field
  form.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type !== 'submit') e.preventDefault();
  });

  form.querySelectorAll('.stepper-btn').forEach(b => b.addEventListener('click', () => {
    const input = document.getElementById(b.dataset.for);
    input.value = Math.max(1, Math.min(99, (parseInt(input.value, 10) || 1) + parseInt(b.dataset.step, 10)));
    refreshOrder();
  }));

  document.getElementById('f-inspo-picker').addEventListener('change', e => {
    addInspoFiles(e.target.files);
    e.target.value = '';
  });

  const isGift = document.getElementById('is-gift');
  isGift.addEventListener('change', () => {
    document.getElementById('gift-note-wrap').style.display = isGift.checked ? 'block' : 'none';
  });

  refreshOrder();
}

// ── FONT PICKER ──────────────────────────────────────────────────────────────
// Marisa's favorite machine fonts (she has 100+). To swap one, change the name
// and pick a similar-looking Google Font for the web preview (fonts.google.com).
// Web previews are approximate — embroidery rendering varies.

const FONT_CATALOG = [
  { name:'Block',                  gf:'Archivo+Black',             css:'Archivo Black',      vibe:'Classic bold block' },
  { name:'Block Condensed',        gf:'Oswald:wght@600',           css:'Oswald',             vibe:'Tall & clean, fits long names', weight:600 },
  { name:'Bold Cursive',           gf:'Great+Vibes',               css:'Great Vibes',        vibe:'Fancy, formal script' },
  { name:'Bold Cursive Connected', gf:'Alex+Brush',                css:'Alex Brush',         vibe:'Fancy script, letters joined' },
  { name:'Brush Script Connected', gf:'Yellowtail',                css:'Yellowtail',         vibe:'Casual brush lettering' },
  { name:'Caramel Candy',          gf:'Fjalla+One',                css:'Fjalla One',         vibe:'Chunky, sporty block' },
  { name:'Charlotte',              gf:'Kaushan+Script',            css:'Kaushan Script',     vibe:'Script with swirly capitals' },
  { name:'Cotton Candy',           gf:'Antonio:wght@600',          css:'Antonio',            vibe:'Skinny, modern block', weight:600 },
  { name:'Ellie Mae',              gf:'Pacifico',                  css:'Pacifico',           vibe:'Bubbly & sweet' },
  { name:'Georgia Peach',          gf:'Libre+Baskerville:wght@700',css:'Libre Baskerville',  vibe:'Bold, classic serif', weight:700 },
  { name:'Juniper',                gf:'Dancing+Script:wght@700',   css:'Dancing Script',     vibe:'Bold everyday script', weight:700 },
  { name:'Vanilla Bean',           gf:'Cookie',                    css:'Cookie',             vibe:'Playful, bouncy script' },
];

const MAX_FONT_PICKS = 3;
const fontPicks = new Set();

function renderFontCatalog() {
  const container = document.getElementById('font-catalog-grid');
  if (!container) return;

  // Load Google Fonts for previews (once)
  if (!document.getElementById('font-catalog-gfonts')) {
    const families = FONT_CATALOG.map(f => 'family=' + f.gf).join('&');
    const link = document.createElement('link');
    link.id   = 'font-catalog-gfonts';
    link.rel  = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
    document.head.appendChild(link);
  }

  container.innerHTML = '';
  FONT_CATALOG.forEach(font => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'font-card';
    card.setAttribute('aria-pressed', 'false');
    card.innerHTML = `
      <div class="font-preview" style="font-family:'${font.css}', serif;font-weight:${font.weight || 400}"></div>
      <div class="font-card-name">${font.name}</div>
      <div class="font-card-desc">${font.vibe}</div>
      <span class="font-heart" aria-hidden="true">♡</span>
    `;
    card.addEventListener('click', () => {
      if (fontPicks.has(font.name)) {
        fontPicks.delete(font.name);
      } else {
        if (fontPicks.size >= MAX_FONT_PICKS) {
          showColorToast(`Pick up to ${MAX_FONT_PICKS} — tap one to remove it first`);
          return;
        }
        fontPicks.add(font.name);
      }
      const on = fontPicks.has(font.name);
      card.classList.toggle('picked', on);
      card.setAttribute('aria-pressed', String(on));
      card.querySelector('.font-heart').textContent = on ? '♥' : '♡';
      syncPicks();
    });
    container.appendChild(card);
  });

  const input = document.getElementById('font-try');
  const update = () => {
    const text = (input && input.value.trim()) || 'Marisa';
    container.querySelectorAll('.font-preview').forEach(el => { el.textContent = text; });
  };
  if (input) input.addEventListener('input', update);
  update();
}

// ── GALLERY CAROUSEL ─────────────────────────────────────────────────────────

function initGalleryCarousel() {
  const track    = document.getElementById('gallery-track');
  const viewport = document.getElementById('gallery-viewport');
  const prevBtn  = document.getElementById('gallery-prev');
  const nextBtn  = document.getElementById('gallery-next');
  const dotsWrap = document.getElementById('gallery-dots');
  if (!track || !prevBtn || !nextBtn) return;

  const slides      = Array.from(track.querySelectorAll('.carousel-slide'));
  const total       = slides.length;
  let   currentIdx  = 0;

  // How many visible at once (responsive)
  function visibleCount() {
    return window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3;
  }

  // Build dots
  function buildDots() {
    dotsWrap.innerHTML = '';
    const steps = total - visibleCount() + 1;
    for (let i = 0; i < steps; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function updateDots() {
    dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentIdx);
    });
  }

  function goTo(idx) {
    const visible  = visibleCount();
    const maxIdx   = total - visible;
    currentIdx     = Math.max(0, Math.min(idx, maxIdx));

    // Slide width + gap
    const slideEl  = slides[0];
    const gap      = 10;
    const offset   = currentIdx * (slideEl.offsetWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;

    prevBtn.disabled = currentIdx === 0;
    nextBtn.disabled = currentIdx >= maxIdx;
    updateDots();
  }

  prevBtn.addEventListener('click', () => goTo(currentIdx - 1));
  nextBtn.addEventListener('click', () => goTo(currentIdx + 1));

  // Keyboard navigation — arrow keys when carousel is focused
  viewport.setAttribute('tabindex', '0');
  viewport.setAttribute('role', 'region');
  viewport.setAttribute('aria-label', 'Recent orders photo gallery');
  viewport.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(currentIdx - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(currentIdx + 1); }
    if (e.key === 'Home')       { e.preventDefault(); goTo(0); }
    if (e.key === 'End')        { e.preventDefault(); goTo(total); }
  });

  // Update aria-label on slides
  slides.forEach((slide, i) => {
    const img = slide.querySelector('img');
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-label', `Photo ${i + 1} of ${total}`);
    if (img && !img.getAttribute('alt')) img.setAttribute('alt', `Gallery photo ${i + 1}`);
  });

  // Touch/swipe support
  let touchStartX = 0;
  viewport.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  viewport.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(currentIdx + (diff > 0 ? 1 : -1));
  });

  window.addEventListener('resize', () => { buildDots(); goTo(currentIdx); });

  buildDots();
  goTo(0);
}

// ── INIT ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initOrderForm();

  // Running-stitch rules "sew" themselves in as they scroll into view
  document.documentElement.classList.add('js-anim');
  const sewObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('sewn'); sewObs.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('.thin-rule').forEach(el => sewObs.observe(el));

  const motionOK = !matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Thread progress bar sews across the header as you scroll
  const thread = document.getElementById('sew-thread');
  const needle = document.getElementById('sew-needle');
  if (thread) {
    let ticking = false;
    const sew = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, scrollY / max) : 0;
      thread.style.transform = `scaleX(${p})`;
      needle.style.left = (p * 100) + '%';
      needle.style.opacity = p > 0.005 && p < 0.995 ? 1 : 0;
      ticking = false;
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(sew); } }, { passive: true });
    sew();
  }

  // Windows pop open + polaroids get pinned up as they scroll in
  const popObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      e.target.querySelectorAll?.('.polaroid').forEach((p, i) => { p.style.transitionDelay = `${i * 0.07}s`; });
      popObs.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.win:not(.estimate):not(.shop-closed)').forEach(w => { w.classList.add('reveal'); popObs.observe(w); });
  document.querySelectorAll('.photo-wall').forEach(w => popObs.observe(w));

  // Gem sparkle trail behind the mouse (desktop only)
  if (motionOK && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const gems = ['ruby', 'citrine', 'emerald', 'amethyst', 'sapphire'];
    let last = 0, n = 0;
    addEventListener('mousemove', e => {
      const now = performance.now();
      if (now - last < 70) return;
      last = now;
      const g = document.createElement('span');
      g.className = 'trail-gem';
      g.style.left = e.clientX + 'px';
      g.style.top  = (e.clientY + 14) + 'px';
      g.style.backgroundImage = `var(--gem-${gems[n++ % gems.length]})`;
      g.style.setProperty('--dx', (Math.random() * 30 - 15) + 'px');
      g.style.setProperty('--rot', (Math.random() * 180 - 90) + 'deg');
      document.body.appendChild(g);
      setTimeout(() => g.remove(), 800);
    }, { passive: true });
  }

  // Hearts burst out when a font gets favorited
  document.getElementById('font-catalog-grid')?.addEventListener('click', e => {
    const card = e.target.closest('.font-card');
    if (!motionOK || !card || !card.classList.contains('picked')) return;
    for (let i = 0; i < 6; i++) {
      const h = document.createElement('span');
      h.className = 'heart-pop';
      h.textContent = '♥';
      h.style.right = '1rem'; h.style.top = '0.9rem';
      const a = (Math.PI * 2 * i) / 6;
      h.style.setProperty('--dx', Math.cos(a) * 34 + 'px');
      h.style.setProperty('--dy', Math.sin(a) * 34 + 'px');
      card.appendChild(h);
      setTimeout(() => h.remove(), 800);
    }
  });

  // On phones the estimate is a bar at the bottom — tap to see the breakdown
  const estimate = document.getElementById('estimate');
  if (estimate) {
    estimate.querySelector('.estimate-total-row').addEventListener('click', () => estimate.classList.toggle('open'));
  }

  // Render color wheel
  renderColorWheel();

  // Render font catalog
  renderFontCatalog();

  // Init gallery carousel
  initGalleryCarousel();


  // Scroll reveal for process steps
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => { if (el.isIntersecting) el.target.classList.add('visible'); });
  }, { threshold: 0.12 });

  document.querySelectorAll('.p-step').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
    observer.observe(el);
  });

  // Fade-in for portfolio items, service cards, FAQ items
  const portObs = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.style.opacity = '1';
        el.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.port-item, .svc, .faq-item').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
    portObs.observe(el);
  });
});


// Turnaround + open/closed status
document.addEventListener('DOMContentLoaded', () => {
  // ── Populate turnaround time everywhere ──────────────────────────────────
  document.querySelectorAll('.turnaround-val').forEach(el => {
    el.textContent = TURNAROUND;
  });

  // ── Status announcement bar ───────────────────────────────────────────────
  const bar = document.getElementById('status-bar');
  if (bar) {
    bar.querySelector('.status-msg').textContent = STATUS_MSG;
    bar.classList.add(ORDER_STATUS === 'open' ? 'status-bar--open' : 'status-bar--closed');
  }

  // Keep page content clear of the pinned banner + nav
  const top = document.getElementById('site-top');
  const setTopH = () => document.documentElement.style.setProperty('--top-h', top.offsetHeight + 'px');
  if (top) { setTopH(); window.addEventListener('resize', setTopH); }

  // ── Closed mode: swap the order form for the closed notice ────────────────
  if (ORDER_STATUS !== 'open') {
    const closed = document.getElementById('shop-closed');
    const open   = document.getElementById('order-open-content');
    const cta    = document.getElementById('status-cta');
    const sticky = document.getElementById('sticky-order-btn');
    if (closed) closed.style.display = 'block';
    if (open)   open.style.display   = 'none';
    if (cta) {
      cta.textContent = 'Follow along →';
      cta.href = 'https://instagram.com/marisastitches';
      cta.target = '_blank';
      cta.rel = 'noopener';
    }
    if (sticky) sticky.style.display = 'none';
  }
});

// ── STICKY ORDER BUTTON ───────────────────────────────────────────────────────
(function() {
  const btn      = document.getElementById('sticky-order-btn');
  const heroSec  = document.querySelector('.hero');
  const orderSec = document.getElementById('order');
  if (!btn) return;

  // Track which sections are currently visible
  const visible = new Set();

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) visible.add(e.target);
      else visible.delete(e.target);
    });
    // Hide button whenever the hero or order form is on screen
    btn.classList.toggle('sticky-order-btn--hidden', visible.size > 0);
  }, { threshold: 0.15 });

  if (heroSec)  obs.observe(heroSec);
  if (orderSec) obs.observe(orderSec);
})();

// ── CONFIRMATION EMAIL ────────────────────────────────────────────────────────
function sendConfirmationEmail({ name, email, lines }) {
  // Skip silently if EmailJS isn't configured yet
  if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) return;
  const summaryLines = lines.map(l => l.replace(/<[^>]+>/g, ''));

  const firstName = name.split(' ')[0] || name;

  if (typeof emailjs === 'undefined') return;
  try {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_name:       firstName,
      to_email:      email,
      reply_to:      email,
      order_summary: summaryLines.join('\n'),
    }).catch(err => {
      // Silent failure — Netlify already captured the form, email is a bonus
      console.warn('EmailJS send failed (non-critical):', err);
    });
  } catch (err) {
    console.warn('EmailJS init failed (non-critical):', err);
  }
}

// ── CONFETTI ──────────────────────────────────────────────────────────────────
function launchConfetti() {
  if (typeof confetti !== 'function') return;
  const colors = ['#C89A3C', '#1F4D3A', '#F4EFE7', '#d6336c', '#2E5FA5', '#8e5cc8', '#1e9c6a'];
  // Center burst
  confetti({ particleCount: 100, spread: 70, origin: { x: 0.5, y: 0.4 }, colors, zIndex: 99999 });
  // Left burst
  setTimeout(() => confetti({ particleCount: 60, spread: 100, angle: 60, origin: { x: 0.1, y: 0.5 }, colors, zIndex: 99999 }), 220);
  // Right burst
  setTimeout(() => confetti({ particleCount: 60, spread: 100, angle: 120, origin: { x: 0.9, y: 0.5 }, colors, zIndex: 99999 }), 380);
  // Final shower from top
  setTimeout(() => confetti({ particleCount: 80, spread: 160, startVelocity: 20, origin: { x: 0.5, y: 0 }, colors, zIndex: 99999 }), 600);
}

// ── TOAST ────────────────────────────────────────────────────────
function showColorToast(msg) {
  let toast = document.getElementById('color-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'color-toast';
    document.body.appendChild(toast);
    toast.className = 'color-toast';
  }
  toast.textContent = msg;
  toast.classList.add('color-toast--visible');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('color-toast--visible'), 2200);
}
