// ===== SwiftLab 交互逻辑 =====

// ---- 进度存取 ----
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
function rich(html) {
  return html.replace(/\[\[(\w+):([^\]]+)\]\]/g, (_, k, t) =>
    GLOSSARY[k] ? `<span class="term" data-k="${k}">${t}</span>` : t);
}

// ---- Swift 语法高亮(先转义,再按 字符串→注释→属性→关键字→类型 上色) ----
function hl(line) {
  let s = esc(line);
  const stash = [];
  s = s.replace(/&quot;.*?&quot;/g, (m) => { stash.push(`<span class="s">${m}</span>`); return `${stash.length - 1}`; });
  s = s.replace(/\/\/.*$/g, (m) => { stash.push(`<span class="c">${m}</span>`); return `${stash.length - 1}`; });
  s = s.replace(/@\w+/g, '<span class="a">$&</span>');
  s = s.replace(/\b(import|struct|var|let|private|some|in|if|else|guard|return|true|false|func)\b/g, '<span class="k">$1</span>');
  s = s.replace(/\b(View|String|Bool|UUID|PlanTask|ContentView|VStack|HStack|Text|TextField|Button|ForEach|Image|Spacer|Identifiable)\b/g, '<span class="t">$1</span>');
  s = s.replace(/(\d+)/g, (_, i) => stash[+i]);
  return s;
}
function codeBlock(lines, opts = {}) {
  const rows = lines.map((l, i) => {
    const text = typeof l === "string" ? l : l.t;
    const added = typeof l === "object" && l.add;
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
  pop.innerHTML = `<div class="pop-title">${g.title}</div><div class="pop-body">${g.body}</div>
    <div class="pop-close"><button class="btn ghost" onclick="closeTerm()">知道了</button></div>`;
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
      <div><div class="stop-name">${s.name}</div><div class="stop-desc">${s.desc}</div></div>
    </div>`).join("");
  const n = P.doneStops.filter(Boolean).length;
  $("#progressFill").style.width = (n / 4) * 100 + "%";
  $("#progressNum").textContent = `${n} / 4`;
}
function go(i) { P.stop = i; save(); render(); scrollTo(0, 0); }
function markDone(i) {
  if (!P.doneStops[i]) { P.doneStops[i] = true; save(); }
}

// ---- Mac 模拟窗口 ----
const DEMO_TASKS = ["跑步 3 公里", "读 20 页书", "给妈妈打电话"];
function macWin(inner, light = false) {
  return `<div class="mac-win${light ? " light" : ""}">
    <div class="mac-bar"><span class="mac-dot r"></span><span class="mac-dot y"></span><span class="mac-dot g"></span></div>
    <div class="mac-body">${inner}</div></div>`;
}
function mockInputs(typed = "") {
  return `<div class="mock-inputs">
    <div class="mock-input" id="mockInput">${typed ? `<span class="typed">${typed}</span>` : "写下一件事…"}</div>
    <div class="mock-input">奖励(可选)</div></div>`;
}
function mockTaskRow(title, i, opt = {}) {
  const done = opt.done ? " done" : "";
  const reward = opt.reward ? `<span class="mock-reward" ${opt.hideReward ? 'style="display:none"' : ""} data-reward>🎁 ${opt.reward}</span>` : "";
  return `<div class="mock-task" data-i="${i}">
    <div class="mock-circle${done}" data-circle>${opt.done ? "✓" : ""}</div>
    <span class="tt${done}">${title}</span>${reward}</div>`;
}
function renderMock(kind) {
  const title = `<div class="mock-title">今天想完成什么?</div>`;
  switch (kind) {
    case "hello":
      return macWin(`<div class="mock-hello">Hello, world!</div>`, true);
    case "title":
      return macWin(title);
    case "memory":
      return macWin(title + `<div class="mock-badges">
        <div class="mock-badge">@State newTask = ""</div>
        <div class="mock-badge">@State newReward = ""</div>
        <div class="mock-badge">@State tasks = []  ← 0 条任务</div></div>`);
    case "inputs":
      return macWin(title + mockInputs());
    case "addbtn":
      return macWin(title + `<div class="mock-inputs">
          <div class="mock-input" id="mockInput">写下一件事…</div>
          <div class="mock-addbtn" id="mockAdd">添加</div></div>
        <div class="mock-tasks" id="mockTasks"></div>`);
    case "list":
      return macWin(title + mockInputs() +
        `<div class="mock-tasks">${DEMO_TASKS.map((t, i) => mockTaskRow(t, i)).join("")}</div>`);
    case "check":
      return macWin(title + mockInputs() +
        `<div class="mock-tasks" data-interactive>${DEMO_TASKS.map((t, i) => mockTaskRow(t, i)).join("")}</div>`);
    case "reward":
      return macWin(title + mockInputs() +
        `<div class="mock-tasks" data-interactive>${
          mockTaskRow(DEMO_TASKS[0], 0, { reward: "一杯冰美式", hideReward: true })}${
          mockTaskRow(DEMO_TASKS[1], 1)}${mockTaskRow(DEMO_TASKS[2], 2)}</div>`);
    case "ship":
      return macWin(`<div class="mock-dock">
        <div class="dock-ic">😀</div><div class="dock-ic">🌐</div>
        <div class="dock-ic hero">✅</div><div class="dock-ic">📁</div></div>
        <div class="mock-caption" style="margin-top:18px">iCanDoIt.app · 你的作品</div>`);
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
  const text = DEMO_TASKS[0];
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
    input.textContent = "写下一件事…";
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
    <span class="kicker">第 1 站 · 先懂</span>
    <h1 class="station-title">什么是 App</h1>
    <p class="station-sub">零代码。拆开你每天在用的 iCanDoIt,看清它的三个器官。<br>正文里<span class="term" data-k="view">这种虚线词</span>都可以点,弹出小白解释。</p>
    <div class="card">
      <div class="scene-visual">${sc.visual}</div>
      <div class="scene-title">${sc.title}</div>
      <div class="scene-body">${rich(sc.body)}</div>
      <div class="scene-nav">
        <button class="btn ghost" onclick="s1Go(${i - 1})" ${i === 0 ? "disabled" : ""}>← 上一幕</button>
        <div class="scene-dots">${S1.map((_, d) => `<span class="dot${d === i ? " on" : ""}"></span>`).join("")}</div>
        ${last
          ? `<button class="btn" onclick="markDone(0); go(1)">去第二站,看它长大 →</button>`
          : `<button class="btn" onclick="s1Go(${i + 1})">${S1[i + 1].title} →</button>`}
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
    <span class="kicker">第 2 站 · 再看</span>
    <h1 class="station-title">看它长大</h1>
    <p class="station-sub">九步慢动作:左边是代码怎么写(<span style="color:var(--mint)">绿色</span>是本步新增的行),右边是 App 长成了什么样。</p>
    <div class="card">
      <div class="step-head">
        <span class="step-count">${i + 1} / ${S2.length}</span>
        <span class="step-title">${st.title}</span>
      </div>
      <div class="duo">
        <div>
          <div class="xcode-strip">🛠 <span><b>你在 Xcode 里:</b>${rich(st.xcode)}</span></div>
          <div class="narration">${rich(st.narration)}</div>
          ${st.code.length ? codeBlock(st.code) : ""}
        </div>
        <div class="mock-side">
          ${renderMock(st.mock)}
          <div class="mock-caption">${st.mockCaption}</div>
        </div>
      </div>
      <div class="step-nav">
        <button class="btn ghost" onclick="s2Go(${i - 1})" ${i === 0 ? "disabled" : ""}>← 上一步</button>
        <div class="scene-dots">${S2.map((_, d) => `<span class="dot${d === i ? " on" : ""}"></span>`).join("")}</div>
        ${last
          ? `<button class="btn" onclick="markDone(1); go(2)">去第三站,亲手写 →</button>`
          : `<button class="btn" onclick="s2Go(${i + 1})">下一拍:${S2[i + 1].beat} →</button>`}
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
      <h2>八个空,全部是你自己填的</h2>
      <p>上面这份代码已经完整,和真正能跑的 Swift 一字不差。<br>点「运行」,看看它跑起来什么样。</p>
      <div style="margin-top:18px"><button class="btn" onclick="s3Run()">▶ 运行你的代码</button></div>
      <div id="runStage" style="max-width:420px;margin:22px auto 0"></div>
      <div id="runNext" style="margin-top:20px"></div>
    </div>`;
  } else {
    const b = S3_BLANKS[i];
    const revealed = (wrongCount[i] || 0) >= 3;
    panel = `
      <div class="lesson-card">
        <div class="lesson-tag">${b.lesson.title}</div>
        <div class="lesson-body">${rich(b.lesson.body)}</div>
      </div>
      <div class="blank-q">第 ${i + 1} / ${S3_BLANKS.length} 空 · ${b.q}</div>
      <div class="options">${b.options.map((o, oi) =>
        `<button class="opt" data-oi="${oi}" onclick="s3Answer(${oi})">${esc(o.label)}</button>`).join("")}</div>
      <div class="feedback" id="fb"></div>
      ${revealed ? `<div class="reveal-btn"><button class="btn ghost" onclick="s3Reveal()">🫣 看答案</button></div>` : ""}`;
  }
  return `<div class="wrap">
    <span class="kicker">第 3 站 · 动手</span>
    <h1 class="station-title">亲手写</h1>
    <p class="station-sub">下面是一个迷你版 iCanDoIt,挖了 8 个空。每个空先教一个新知识,再由你来填。<br>填错不扣分——错误信息本身就是最好的课。</p>
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
    fb.innerHTML = `✅ 正确!<b>${esc(b.filled)}</b> 已经填进上面的代码里。`;
    confettiTick();
    setTimeout(() => { P.s3 = i + 1; save(); render(); }, 950);
  } else {
    btns[oi].classList.add("wrong");
    wrongCount[i] = (wrongCount[i] || 0) + 1;
    fb.className = "feedback bad";
    fb.innerHTML = `❌ ${rich(o.fb)}`;
    if (wrongCount[i] === 3 && !document.querySelector(".reveal-btn")) {
      fb.insertAdjacentHTML("afterend",
        `<div class="reveal-btn"><button class="btn ghost" onclick="s3Reveal()">🫣 看答案</button></div>`);
    }
  }
}
function s3Reveal() {
  const i = P.s3, b = S3_BLANKS[i];
  const fb = $("#fb");
  fb.className = "feedback good";
  fb.innerHTML = `答案是 <b>${esc(b.filled)}</b>。没关系,回头再体会一遍这张知识卡,印象会更深。`;
  setTimeout(() => { P.s3 = i + 1; save(); render(); }, 1400);
}
function confettiTick() { /* 小庆祝:答对时轻量彩带 */ confetti(false); }
function s3Run() {
  const stage = $("#runStage");
  stage.innerHTML = `<div class="mac-win">
    <div class="mac-bar"><span class="mac-dot r"></span><span class="mac-dot y"></span><span class="mac-dot g"></span></div>
    <div class="mac-body">
      <div class="mock-title">今天想完成什么?</div>
      <div class="mock-inputs"><div class="mock-input" id="mockInput">写下一件事…</div>
      <div class="mock-addbtn" id="mockAdd">添加</div></div>
      <div class="mock-tasks" id="mockTasks"></div>
    </div></div>`;
  clearDemo();
  const input = $("#mockInput"), btn = $("#mockAdd"), list = $("#mockTasks");
  const items = ["跑步 3 公里", "给妈妈打电话"];
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
      input.textContent = "写下一件事…";
      list.insertAdjacentHTML("beforeend", mockTaskRow(text, idx));
    }, (delay += 250)));
  });
  demoTimers.push(setTimeout(() => {
    confetti(true);
    markDone(2); renderSidebar();
    $("#runNext").innerHTML = `<p style="color:var(--text-2);font-size:13.5px;line-height:1.8">
      你刚才填的每一个词,都是真的 Swift,一字不差。<br>最后一站:把它装进真正的 Xcode,跑在你的 Mac 上。</p>
      <div style="margin-top:14px"><button class="btn" onclick="go(3)">去第四站,装进你的 Mac →</button></div>`;
  }, delay + 700));
}

// ---- 第四站 ----
function renderS4() {
  return `<div class="wrap">
    <span class="kicker">第 4 站 · 实战</span>
    <h1 class="station-title">装进你的 Mac</h1>
    <p class="station-sub">${rich("前三站的一切都在浏览器里。现在打开真正的 [[xcode:Xcode]],七步,把这个 App 跑在你自己的电脑上。")}</p>
    <div class="card">
      <div class="check-list">${S4_STEPS.map((s) =>
        `<div class="check-item"><div class="check-num">${s.n}</div><div class="check-body">${rich(s.body)}</div></div>`).join("")}
      </div>
      <div class="copy-row">
        <b style="font-size:15px">ContentView.swift 完整代码(已验证可编译 ✓)</b>
        <button class="btn ghost" onclick="copyCode()">📋 复制全部</button>
      </div>
      ${codeBlock(S4_CODE)}
      <div class="challenge">
        <b>🏆 进阶三连(不给答案,给提示):</b><br>
        ① 把标题换成你自己的话——找到那个 Text 就行。<br>
        ② 让完成的任务能被删除——提示:数组有个动作叫 <b>remove(at:)</b>,再配一个 Button。<br>
        ③ 给"添加"按钮换个颜色——提示:试试挂一个 <b>.tint(.pink)</b> 修饰符。
      </div>
      <div class="challenge" style="margin-top:14px;background:rgba(77,223,174,0.07);border-color:rgba(77,223,174,0.3)">
        <b>📦 想看豪华版?</b><br>
        正式版 iCanDoIt 的完整源码在
        <a href="https://github.com/renrenmimi/iCanDoIt" target="_blank" rel="noopener">github.com/renrenmimi/iCanDoIt</a>:
        毛玻璃、彩带动画、连击、热力图,每个文件都能打开读。
        建议从 <b>Sources/iCanDoIt/Views/TodayView.swift</b> 读起——你现在已经能看懂它的骨架了。
      </div>
      <div style="text-align:center;margin-top:26px">
        <button class="btn" onclick="s4Done()">🎉 我跑起来了!</button>
      </div>
    </div>
  </div>`;
}
function copyCode() {
  navigator.clipboard.writeText(S4_CODE.join("\n"))
    .then(() => toast("已复制,去 Xcode 里粘贴吧"))
    .catch(() => toast("复制失败,请手动选中复制"));
}
function s4Done() {
  markDone(3); renderSidebar(); confetti(true);
  toast("恭喜!你已经是写过 Mac App 的人了 🚀");
}

// ---- 总渲染 ----
function render() {
  renderSidebar();
  clearDemo();
  const stops = [renderS1, renderS2, renderS3, renderS4];
  $("#main").innerHTML = stops[P.stop]();
  if (P.stop === 1) wireMock(S2[Math.min(P.s2, S2.length - 1)].mock);
}
render();
