// ===== SwiftLab 交互逻辑 / interaction =====

// ---- 语言 / language ----
// data.js 里所有面向学习者的文案都是 { en, zh } 对;L() 按当前语言取一半。
// Every learner-facing string in data.js is an { en, zh } pair; L() picks one half.
const LANG_KEY = "swiftlab-lang";
let LANG = "en";
try {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved === "en" || saved === "zh") LANG = saved;
} catch (e) { /* 隐私模式下忽略 */ }

function L(v) {
  return v && typeof v === "object" && !Array.isArray(v) && v.en !== undefined ? v[LANG] : v;
}
// fmt(UI.blankOf, { a: 1, b: 8 }) → "Blank 1 of 8"
function fmt(v, vals) {
  return L(v).replace(/\{(\w+)\}/g, (m, k) => (vals[k] !== undefined ? vals[k] : m));
}

// ---- 进度存取 / progress ----
const DEFAULT_PROGRESS = { stop: 0, s1: 0, s2: 0, s3: 0, doneStops: [false, false, false, false] };
function loadProgress() {
  try {
    const raw = localStorage.getItem("swiftlab");
    if (raw) return Object.assign({}, DEFAULT_PROGRESS, JSON.parse(raw));
  } catch (e) { /* 忽略 */ }
  return { ...DEFAULT_PROGRESS };
}
const P = loadProgress();
function save() { localStorage.setItem("swiftlab", JSON.stringify(P)); }

// ---- 小工具 ----
const $ = (sel) => document.querySelector(sel);
function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
// [[key:文字]] → 可点击术语(正文本身允许写 HTML)
// 两种语言用同一个 key,只有显示文字不同。
function rich(html) {
  return L(html).replace(/\[\[(\w+):([^\]]+)\]\]/g, (_, k, t) =>
    GLOSSARY[k] ? `<span class="term" data-k="${k}">${t}</span>` : t);
}

// ---- Swift 语法高亮(先转义,再按 字符串→注释→属性→关键字→类型 上色) ----
// 字符串和注释先换成 n 占位符再还原,这样代码里的数字(.padding(24))不会被误当成占位符。
const HOLD = "\u0001";
function hl(line) {
  let s = esc(L(line));
  const stash = [];
  const hold = (m, cls) => { stash.push(`<span class="${cls}">${m}</span>`); return `${HOLD}${stash.length - 1}${HOLD}`; };
  s = s.replace(/&quot;.*?&quot;/g, (m) => hold(m, "s"));
  s = s.replace(/\/\/.*$/g, (m) => hold(m, "c"));
  s = s.replace(/@\w+/g, '<span class="a">$&</span>');
  s = s.replace(/\b(import|struct|var|let|private|some|in|if|else|guard|return|true|false|func)\b/g, '<span class="k">$1</span>');
  s = s.replace(/\b(View|String|Bool|UUID|PlanTask|ContentView|VStack|HStack|Text|TextField|Button|ForEach|Image|Spacer|Identifiable)\b/g, '<span class="t">$1</span>');
  s = s.replace(new RegExp(HOLD + "(\\d+)" + HOLD, "g"), (_, i) => stash[+i]);
  return s;
}
// lines: 字符串 / { en, zh } 对 / { t, add } 三种都接受
function codeBlock(lines, opts = {}) {
  const rows = lines.map((l, i) => {
    const isStep = l && typeof l === "object" && l.t !== undefined;
    const text = L(isStep ? l.t : l);
    const added = isStep && l.add;
    const isComment = text.trim().startsWith("//");
    return `<div class="cl${added ? " added" : ""}${text === "" ? " blankline" : ""}${isComment ? " dim" : ""}">` +
      `<span class="ln">${opts.noNum ? "" : i + 1}</span><span class="ct">${hl(text) || " "}</span></div>`;
  }).join("");
  return `<div class="codebox">${rows}</div>`;
}

// ---- 术语弹窗 ----
const pop = $("#popover"), mask = $("#popMask");
function openTerm(key) {
  const g = GLOSSARY[key];
  if (!g) return;
  pop.innerHTML = `<div class="pop-title">${L(g.title)}</div><div class="pop-body">${L(g.body)}</div>
    <div class="pop-close"><button class="btn ghost" onclick="closeTerm()">${L(UI.gotIt)}</button></div>`;
  mask.style.display = "block";
  pop.style.display = "block";
  requestAnimationFrame(() => pop.classList.add("show"));
}
function closeTerm() {
  pop.classList.remove("show");
  setTimeout(() => { pop.style.display = "none"; mask.style.display = "none"; }, 180);
}
mask.addEventListener("click", closeTerm);
document.addEventListener("click", (e) => {
  const t = e.target.closest(".term");
  if (t) openTerm(t.dataset.k);
});

// ---- 彩带 ----
function confetti(big = false) {
  const cv = $("#confetti"), ctx = cv.getContext("2d");
  cv.width = innerWidth; cv.height = innerHeight;
  const colors = ["#8c5cf6", "#ed4899", "#4ddfae", "#ffb84d", "#ffffff"];
  const N = big ? 200 : 120;
  const ps = Array.from({ length: N }, () => ({
    x: Math.random() * cv.width, y: -20 - Math.random() * 100,
    vx: (Math.random() - 0.5) * 2.4, vy: 2 + Math.random() * 3.5,
    w: 6 + Math.random() * 7, r: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3, c: colors[(Math.random() * colors.length) | 0],
  }));
  const t0 = performance.now();
  (function tick(now) {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, cv.width, cv.height);
    if (t > 3.2) return;
    const alpha = t > 2.4 ? Math.max(0, 1 - (t - 2.4) / 0.8) : 1;
    ctx.globalAlpha = alpha;
    for (const p of ps) {
      p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.w / 4, p.w, p.w / 2);
      ctx.restore();
    }
    requestAnimationFrame(tick);
  })(t0);
}

// ---- Toast ----
let toastTimer;
function toast(msg) {
  let el = $(".toast");
  if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
  el.textContent = msg;
  requestAnimationFrame(() => el.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

// ---- 侧栏 ----
function renderSidebar() {
  $("#stops").innerHTML = STOPS.map((s, i) =>
    `<div class="stop${P.stop === i ? " active" : ""}${P.doneStops[i] ? " done" : ""}" onclick="go(${i})">
      <div class="stop-num">${P.doneStops[i] ? "✓" : i + 1}</div>
      <div><div class="stop-name">${L(s.name)}</div><div class="stop-desc">${L(s.desc)}</div></div>
    </div>`).join("");
  const n = P.doneStops.filter(Boolean).length;
  $("#progressFill").style.width = (n / 4) * 100 + "%";
  $("#progressNum").textContent = fmt(UI.progressCount, { n });
}
function go(i) { P.stop = i; save(); render(); scrollTo(0, 0); }
function markDone(i) {
  if (!P.doneStops[i]) { P.doneStops[i] = true; save(); }
}

// ---- Mac 模拟窗口 ----
function macWin(inner, light = false) {
  return `<div class="mac-win${light ? " light" : ""}">
    <div class="mac-bar"><span class="mac-dot r"></span><span class="mac-dot y"></span><span class="mac-dot g"></span></div>
    <div class="mac-body">${inner}</div></div>`;
}
function mockInputs(typed = "") {
  return `<div class="mock-inputs">
    <div class="mock-input" id="mockInput">${typed ? `<span class="typed">${typed}</span>` : L(APP_TEXT.taskPh)}</div>
    <div class="mock-input">${L(APP_TEXT.rewardPh)}</div></div>`;
}
function mockTaskRow(title, i, opt = {}) {
  const done = opt.done ? " done" : "";
  const reward = opt.reward ? `<span class="mock-reward" ${opt.hideReward ? 'style="display:none"' : ""} data-reward>🎁 ${opt.reward}</span>` : "";
  return `<div class="mock-task" data-i="${i}">
    <div class="mock-circle${done}" data-circle>${opt.done ? "✓" : ""}</div>
    <span class="tt${done}">${title}</span>${reward}</div>`;
}
function renderMock(kind) {
  const title = `<div class="mock-title">${L(APP_TEXT.title)}</div>`;
  const demo = DEMO_TASKS.map(L);
  switch (kind) {
    case "hello":
      return macWin(`<div class="mock-hello">Hello, world!</div>`, true);
    case "title":
      return macWin(title);
    case "memory":
      return macWin(title + `<div class="mock-badges">
        <div class="mock-badge">@State newTask = ""</div>
        <div class="mock-badge">@State newReward = ""</div>
        <div class="mock-badge">@State tasks = []  ← ${L(UI.tasksBadge)}</div></div>`);
    case "inputs":
      return macWin(title + mockInputs());
    case "addbtn":
      return macWin(title + `<div class="mock-inputs">
          <div class="mock-input" id="mockInput">${L(APP_TEXT.taskPh)}</div>
          <div class="mock-addbtn" id="mockAdd">${L(APP_TEXT.addBtn)}</div></div>
        <div class="mock-tasks" id="mockTasks"></div>`);
    case "list":
      return macWin(title + mockInputs() +
        `<div class="mock-tasks">${demo.map((t, i) => mockTaskRow(t, i)).join("")}</div>`);
    case "check":
      return macWin(title + mockInputs() +
        `<div class="mock-tasks" data-interactive>${demo.map((t, i) => mockTaskRow(t, i)).join("")}</div>`);
    case "reward":
      return macWin(title + mockInputs() +
        `<div class="mock-tasks" data-interactive>${
          mockTaskRow(demo[0], 0, { reward: L(UI.demoReward), hideReward: true })}${
          mockTaskRow(demo[1], 1)}${mockTaskRow(demo[2], 2)}</div>`);
    case "ship":
      return macWin(`<div class="mock-dock">
        <div class="dock-ic">😀</div><div class="dock-ic">🌐</div>
        <div class="dock-ic hero">✅</div><div class="dock-ic">📁</div></div>
        <div class="mock-caption" style="margin-top:18px">${L(UI.dockCaption)}</div>`);
  }
  return "";
}
// 打勾交互 + 「添加」演示动画
function wireMock(kind) {
  document.querySelectorAll("[data-interactive] [data-circle]").forEach((c) => {
    c.addEventListener("click", () => {
      const row = c.closest(".mock-task");
      const done = c.classList.toggle("done");
      c.textContent = done ? "✓" : "";
      row.querySelector(".tt").classList.toggle("done", done);
      const rw = row.querySelector("[data-reward]");
      if (rw) rw.style.display = done ? "" : "none";
    });
  });
  if (kind === "addbtn") runAddDemo();
}
let demoTimers = [];
function clearDemo() { demoTimers.forEach(clearTimeout); demoTimers = []; }
function runAddDemo() {
  clearDemo();
  const input = $("#mockInput"), btn = $("#mockAdd"), list = $("#mockTasks");
  if (!input || !btn || !list) return;
  const text = L(DEMO_TASKS[0]);
  input.innerHTML = ""; list.innerHTML = "";
  let shown = "";
  text.split("").forEach((ch, i) => {
    demoTimers.push(setTimeout(() => {
      shown += ch;
      input.innerHTML = `<span class="typed">${shown}</span>`;
    }, 500 + i * 130));
  });
  const tEnd = 500 + text.length * 130;
  demoTimers.push(setTimeout(() => btn.classList.add("pressed"), tEnd + 400));
  demoTimers.push(setTimeout(() => {
    btn.classList.remove("pressed");
    input.textContent = L(APP_TEXT.taskPh);
    list.innerHTML = mockTaskRow(text, 0);
  }, tEnd + 650));
  demoTimers.push(setTimeout(runAddDemo, tEnd + 3600));
}

// ---- 第一站 ----
function renderS1() {
  const i = Math.min(P.s1, S1.length - 1);
  const sc = S1[i];
  const last = i === S1.length - 1;
  return `<div class="wrap">
    <span class="kicker">${L(UI.s1Kicker)}</span>
    <h1 class="station-title">${L(UI.s1Title)}</h1>
    <p class="station-sub">${L(UI.s1Sub)}</p>
    <div class="card">
      <div class="scene-visual">${L(sc.visual)}</div>
      <div class="scene-title">${L(sc.title)}</div>
      <div class="scene-body">${rich(sc.body)}</div>
      <div class="scene-nav">
        <button class="btn ghost" onclick="s1Go(${i - 1})" ${i === 0 ? "disabled" : ""}>${L(UI.prevScene)}</button>
        <div class="scene-dots">${S1.map((_, d) => `<span class="dot${d === i ? " on" : ""}"></span>`).join("")}</div>
        ${last
          ? `<button class="btn" onclick="markDone(0); go(1)">${L(UI.toStop2)}</button>`
          : `<button class="btn" onclick="s1Go(${i + 1})">${L(S1[i + 1].title)} →</button>`}
      </div>
    </div>
  </div>`;
}
function s1Go(i) {
  P.s1 = Math.max(0, Math.min(i, S1.length - 1));
  if (P.s1 === S1.length - 1) markDone(0);
  save(); render();
}

// ---- 第二站 ----
function renderS2() {
  const i = Math.min(P.s2, S2.length - 1);
  const st = S2[i];
  const last = i === S2.length - 1;
  return `<div class="wrap">
    <span class="kicker">${L(UI.s2Kicker)}</span>
    <h1 class="station-title">${L(UI.s2Title)}</h1>
    <p class="station-sub">${L(UI.s2Sub)}</p>
    <div class="card">
      <div class="step-head">
        <span class="step-count">${i + 1} / ${S2.length}</span>
        <span class="step-title">${L(st.title)}</span>
      </div>
      <div class="duo">
        <div>
          <div class="xcode-strip">🛠 <span><b>${L(UI.inXcode)}</b> ${rich(st.xcode)}</span></div>
          <div class="narration">${rich(st.narration)}</div>
          ${st.code.length ? codeBlock(st.code) : ""}
        </div>
        <div class="mock-side">
          ${renderMock(st.mock)}
          <div class="mock-caption">${L(st.mockCaption)}</div>
        </div>
      </div>
      <div class="step-nav">
        <button class="btn ghost" onclick="s2Go(${i - 1})" ${i === 0 ? "disabled" : ""}>${L(UI.prevStep)}</button>
        <div class="scene-dots">${S2.map((_, d) => `<span class="dot${d === i ? " on" : ""}"></span>`).join("")}</div>
        ${last
          ? `<button class="btn" onclick="markDone(1); go(2)">${L(UI.toStop3)}</button>`
          : `<button class="btn" onclick="s2Go(${i + 1})">${fmt(UI.nextBeat, { beat: L(S2[i + 1].beat) })}</button>`}
      </div>
    </div>
  </div>`;
}
function s2Go(i) {
  clearDemo();
  P.s2 = Math.max(0, Math.min(i, S2.length - 1));
  if (P.s2 === S2.length - 1) markDone(1);
  save(); render();
}

// ---- 第三站:挖空闯关 ----
let wrongCount = {};
function s3CodeHtml(current) {
  const rows = S3_LINES.map((raw, li) => {
    let h = hl(raw);
    h = h.replace(/⟦(\d+)⟧/g, (_, n) => {
      n = +n;
      if (n < current) return `<span class="blank-done">${esc(S3_BLANKS[n].filled)}</span>`;
      if (n === current) return `<span class="blank-token">____?</span>`;
      return `<span class="blank-future">____</span>`;
    });
    return `<div class="cl"><span class="ln">${li + 1}</span><span class="ct">${h || " "}</span></div>`;
  }).join("");
  return `<div class="codebox">${rows}</div>`;
}
function renderS3() {
  const i = P.s3;
  const doneAll = i >= S3_BLANKS.length;
  let panel;
  if (doneAll) {
    panel = `<div class="done-banner">
      <div class="big">🎉</div>
      <h2>${L(UI.s3DoneTitle)}</h2>
      <p>${L(UI.s3DoneBody)}</p>
      <div style="margin-top:18px"><button class="btn" onclick="s3Run()">${L(UI.s3Run)}</button></div>
      <div id="runStage" style="max-width:420px;margin:22px auto 0"></div>
      <div id="runNext" style="margin-top:20px"></div>
    </div>`;
  } else {
    const b = S3_BLANKS[i];
    const revealed = (wrongCount[i] || 0) >= 3;
    panel = `
      <div class="lesson-card">
        <div class="lesson-tag">${L(b.lesson.title)}</div>
        <div class="lesson-body">${rich(b.lesson.body)}</div>
      </div>
      <div class="blank-q">${fmt(UI.blankOf, { a: i + 1, b: S3_BLANKS.length })} · ${L(b.q)}</div>
      <div class="options">${b.options.map((o, oi) =>
        `<button class="opt" data-oi="${oi}" onclick="s3Answer(${oi})">${esc(o.label)}</button>`).join("")}</div>
      <div class="feedback" id="fb"></div>
      ${revealed ? `<div class="reveal-btn"><button class="btn ghost" onclick="s3Reveal()">${L(UI.showAnswer)}</button></div>` : ""}`;
  }
  return `<div class="wrap">
    <span class="kicker">${L(UI.s3Kicker)}</span>
    <h1 class="station-title">${L(UI.s3Title)}</h1>
    <p class="station-sub">${L(UI.s3Sub)}</p>
    <div class="card">
      ${s3CodeHtml(Math.min(i, S3_BLANKS.length))}
      <div style="margin-top:20px">${panel}</div>
    </div>
  </div>`;
}
function s3Answer(oi) {
  const i = P.s3, b = S3_BLANKS[i], o = b.options[oi];
  const btns = document.querySelectorAll(".opt"), fb = $("#fb");
  if (o.ok) {
    btns[oi].classList.add("right");
    btns.forEach((x) => (x.onclick = null));
    fb.className = "feedback good";
    fb.innerHTML = fmt(UI.correct, { filled: esc(b.filled) });
    confettiTick();
    setTimeout(() => { P.s3 = i + 1; save(); render(); }, 950);
  } else {
    btns[oi].classList.add("wrong");
    wrongCount[i] = (wrongCount[i] || 0) + 1;
    fb.className = "feedback bad";
    fb.innerHTML = `❌ ${rich(o.fb)}`;
    if (wrongCount[i] === 3 && !document.querySelector(".reveal-btn")) {
      fb.insertAdjacentHTML("afterend",
        `<div class="reveal-btn"><button class="btn ghost" onclick="s3Reveal()">${L(UI.showAnswer)}</button></div>`);
    }
  }
}
function s3Reveal() {
  const i = P.s3, b = S3_BLANKS[i];
  const fb = $("#fb");
  fb.className = "feedback good";
  fb.innerHTML = fmt(UI.revealed, { filled: esc(b.filled) });
  setTimeout(() => { P.s3 = i + 1; save(); render(); }, 1400);
}
function confettiTick() { /* 小庆祝:答对时轻量彩带 */ confetti(false); }
function s3Run() {
  const stage = $("#runStage");
  stage.innerHTML = `<div class="mac-win">
    <div class="mac-bar"><span class="mac-dot r"></span><span class="mac-dot y"></span><span class="mac-dot g"></span></div>
    <div class="mac-body">
      <div class="mock-title">${L(APP_TEXT.title)}</div>
      <div class="mock-inputs"><div class="mock-input" id="mockInput">${L(APP_TEXT.taskPh)}</div>
      <div class="mock-addbtn" id="mockAdd">${L(APP_TEXT.addBtn)}</div></div>
      <div class="mock-tasks" id="mockTasks"></div>
    </div></div>`;
  clearDemo();
  const input = $("#mockInput"), btn = $("#mockAdd"), list = $("#mockTasks");
  const items = [L(DEMO_TASKS[0]), L(DEMO_TASKS[2])];
  let delay = 400;
  items.forEach((text, idx) => {
    let shown = "";
    text.split("").forEach((ch) => {
      demoTimers.push(setTimeout(() => {
        shown += ch;
        input.innerHTML = `<span class="typed">${shown}</span>`;
      }, (delay += 110)));
    });
    demoTimers.push(setTimeout(() => btn.classList.add("pressed"), (delay += 350)));
    demoTimers.push(setTimeout(() => {
      btn.classList.remove("pressed");
      input.textContent = L(APP_TEXT.taskPh);
      list.insertAdjacentHTML("beforeend", mockTaskRow(text, idx));
    }, (delay += 250)));
  });
  demoTimers.push(setTimeout(() => {
    confetti(true);
    markDone(2); renderSidebar();
    $("#runNext").innerHTML = `<p style="color:var(--text-2);font-size:13.5px;line-height:1.8">${L(UI.s3RunNext)}</p>
      <div style="margin-top:14px"><button class="btn" onclick="go(3)">${L(UI.toStop4)}</button></div>`;
  }, delay + 700));
}

// ---- 第四站 ----
function renderS4() {
  return `<div class="wrap">
    <span class="kicker">${L(UI.s4Kicker)}</span>
    <h1 class="station-title">${L(UI.s4Title)}</h1>
    <p class="station-sub">${rich(UI.s4Sub)}</p>
    <div class="card">
      <div class="check-list">${S4_STEPS.map((s) =>
        `<div class="check-item"><div class="check-num">${s.n}</div><div class="check-body">${rich(s.body)}</div></div>`).join("")}
      </div>
      <div class="copy-row">
        <b style="font-size:15px">${L(UI.s4CodeLabel)}</b>
        <button class="btn ghost" onclick="copyCode()">${L(UI.copyAll)}</button>
      </div>
      ${codeBlock(S4_CODE)}
      <div class="challenge">${L(UI.challenge)}</div>
      <div class="challenge" style="margin-top:14px;background:rgba(77,223,174,0.07);border-color:rgba(77,223,174,0.3)">
        ${L(UI.fullVersion)}
      </div>
      <div style="text-align:center;margin-top:26px">
        <button class="btn" onclick="s4Done()">${L(UI.s4Done)}</button>
      </div>
    </div>
  </div>`;
}
function copyCode() {
  navigator.clipboard.writeText(S4_CODE.map(L).join("\n"))
    .then(() => toast(L(UI.copied)))
    .catch(() => toast(L(UI.copyFailed)));
}
function s4Done() {
  markDone(3); renderSidebar(); confetti(true);
  toast(L(UI.finishedToast));
}

// ---- 页面外壳:index.html 里带 data-i18n 的元素 ----
// Page chrome: elements carrying data-i18n in index.html.
function applyChrome() {
  document.documentElement.lang = LANG === "zh" ? "zh-CN" : "en";
  document.title = L(UI.docTitle);
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = UI[el.dataset.i18n];
    if (v) el.textContent = L(v);
  });
  document.querySelectorAll("[data-i18n-label]").forEach((el) => {
    const v = UI[el.dataset.i18nLabel];
    if (v) el.setAttribute("aria-label", L(v));
  });
  document.querySelectorAll(".lang-btn").forEach((b) => {
    const on = b.dataset.lang === LANG;
    b.classList.toggle("on", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
}
function setLang(l) {
  if (l === LANG) return;
  LANG = l;
  try { localStorage.setItem(LANG_KEY, l); } catch (e) { /* 隐私模式下忽略 */ }
  applyChrome();
  render();           // 原地重绘:当前站点、进度、答题状态都不变
  closeTerm();
}
document.querySelectorAll(".lang-btn").forEach((b) => {
  b.addEventListener("click", () => setLang(b.dataset.lang));
});

// ---- 总渲染 ----
function render() {
  renderSidebar();
  clearDemo();
  const stops = [renderS1, renderS2, renderS3, renderS4];
  $("#main").innerHTML = stops[P.stop]();
  if (P.stop === 1) wireMock(L(S2[Math.min(P.s2, S2.length - 1)].mock));
}
applyChrome();
render();
