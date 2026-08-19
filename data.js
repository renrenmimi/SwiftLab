// ===== SwiftLab 教学数据 / course content =====
// 每一条面向学习者的文案都是 { en, zh } 对,由 app.js 里的 L() 解析。
// Every learner-facing string is a { en, zh } pair, resolved by L() in app.js.
// Swift 关键字、选项标签等两种语言相同的内容仍是普通字符串。
// 正文里 [[key:显示文字]] 经 rich() 变成可点术语;两种语言必须用同一个 key,
// 只有显示文字不同,这样弹窗在任一语言下都能打开。

// ---- 小 App 自己显示的文字。教学代码和右侧模拟窗口共用,保证两边永远一致。----
// The text the little app itself shows. Shared by the teaching code and the mock
// windows so the two can never drift apart.
const APP_TEXT = {
  title: { en: "What will you get done today?", zh: "今天想完成什么?" },
  taskPh: { en: "One thing to do...", zh: "写下一件事…" },
  rewardPh: { en: "Reward (optional)", zh: "奖励(可选)" },
  addBtn: { en: "Add", zh: "添加" },
  reward: { en: "🎁 Reward: ", zh: "🎁 去领奖:" },
};
// 代码行里的 %key% 会替换成对应语言的 APP_TEXT[key]。
// %key% inside a code line is replaced with APP_TEXT[key] for each language.
function line(tpl) {
  const fill = (lang) => tpl.replace(/%(\w+)%/g, (_, k) => APP_TEXT[k][lang]);
  return { en: fill("en"), zh: fill("zh") };
}

// ===== 术语词典 / Glossary =====
const GLOSSARY = {
  swift: {
    title: { en: "Swift (the language)", zh: "Swift(语言)" },
    body: {
      en: "Swift is the programming language Apple created for building apps on Mac, iPhone, and iPad. A programming language is a fixed set of words and rules that a computer can follow exactly. Swift is strict about those rules: one wrong character and the code will not build.",
      zh: "苹果发明的编程语言,专门用来写 Mac / iPhone 的 App。编程语言就是一套固定的词和规则,电脑照着一步不差地执行。Swift 的规则特别严格,写错一个字符就编译不过。",
    },
  },
  swiftui: {
    title: { en: "SwiftUI (the interface framework)", zh: "SwiftUI(画界面的框架)" },
    body: {
      en: "SwiftUI is Apple's toolkit for describing an interface. It gives you ready-made parts: text, buttons, text fields, lists. You choose the parts and arrange them, and SwiftUI draws them. Apple's own Weather and Reminders apps are built with it.",
      zh: "苹果提供的一整箱现成零件:文字、按钮、输入框、列表都已经做好,你只管挑零件、搭起来,由 SwiftUI 负责画。系统自带的天气、提醒事项 App 就是用它写的。",
    },
  },
  xcode: {
    title: { en: "Xcode (where you build)", zh: "Xcode(开发工具)" },
    body: {
      en: "Xcode is Apple's free development app. It is an editor, a compiler, and a packaging tool in one. You write code in it, press one key, and it turns that code into an app you can run. Building a Mac or iPhone app requires it.",
      zh: "苹果官方的开发工具,免费。它把编辑器、编译器、打包工具合在一起:你在里面写代码,按一个键,它就把代码变成能运行的 App。做 Mac / iPhone App 必须用它。",
    },
  },
  compile: {
    title: { en: "Compiling", zh: "编译" },
    body: {
      en: "Compiling means translating the code you wrote into instructions the computer can actually run. The program that does this is the compiler. If something is wrong, the compiler stops and tells you which line has the problem. Those messages are the fastest way to learn.",
      zh: "把你写的代码翻译成电脑真正能执行的指令,这个过程叫编译,做这件事的程序叫编译器。写错了,编译器会停下来告诉你哪一行有问题——这些报错信息是最快的老师。",
    },
  },
  view: {
    title: { en: "View (the interface)", zh: "界面(View)" },
    body: {
      en: "A view is anything you can see on screen: text, a button, a list, a color. In SwiftUI every part is a view, and a larger view is built out of smaller views.",
      zh: "屏幕上你能看到的一切:文字、按钮、列表、颜色。在 SwiftUI 里每个零件都是一个 View,大 View 由小 View 拼成。",
    },
  },
  state: {
    title: { en: "State (the data)", zh: "数据 / 状态(State)" },
    body: {
      en: "State is what the app remembers: the list of tasks, whether each one is finished, how many days in a row you have checked in. The interface is what you see. The state is what the app actually holds.",
      zh: "App 记住的东西:任务列表、每条完成了没有、连续打卡几天。界面是你看到的样子,数据才是 App 真正持有的东西。",
    },
  },
  atstate: {
    title: { en: "@State", zh: "@State" },
    body: {
      en: "@State marks a piece of data that this view owns. When the value changes, SwiftUI runs <b>body</b> again and builds a new description of the view from the new value. A view is a struct and a struct is copied, so a view cannot simply change its own stored values. @State solves that by keeping the value outside the view and handing it back on every rebuild. That is why you can assign to a @State variable from inside a button action.",
      zh: "@State 标记一块由这个视图自己持有的数据。值一变,SwiftUI 就重新执行 <b>body</b>,依据新值重新描述一遍界面。视图是 struct,而 struct 是值类型、会被复制,所以视图没法直接改自己存的值;@State 的做法是把值存在视图之外,每次重建再交还给它——这就是为什么你能在按钮的代码里给 @State 变量赋值。",
    },
  },
  variable: {
    title: { en: "Variable (var)", zh: "变量(var)" },
    body: {
      en: "A variable is a named box that holds a value, and the value can be replaced later. <b>var newTask = \"\"</b> creates a box called newTask and puts an empty piece of text in it.",
      zh: "一个带名字的盒子,里面放着一个值,之后还可以换。<b>var newTask = \"\"</b> 的意思是:造一个叫 newTask 的盒子,先放一段空文字进去。",
    },
  },
  letconst: {
    title: { en: "Constant (let)", zh: "常量(let)" },
    body: {
      en: "let also creates a named box, but the value cannot be replaced after it is set. Swift encourages let wherever a value never needs to change, so the compiler can stop an accidental change.",
      zh: "let 也是带名字的盒子,但值一旦放进去就不能再换。Swift 鼓励能用 let 就用 let,这样值被意外改掉时编译器会拦住你。",
    },
  },
  string: {
    title: { en: "String", zh: "字符串(String)" },
    body: {
      en: "A String is a piece of text. You write it between double quotes, so <b>\"Run 3 km\"</b> is a string. Two quotes with nothing between them (<b>\"\"</b>) is an empty string: the text exists, it just has no characters in it.",
      zh: "一段文字的正式叫法,写在双引号里,<b>\"跑步 3 公里\"</b> 就是一个字符串。两个引号中间什么都没有(<b>\"\"</b>)叫空字符串:这段文字存在,只是一个字符都没有。",
    },
  },
  array: {
    title: { en: "Array", zh: "数组(Array)" },
    body: {
      en: "An array is an ordered list of values. <b>[String]</b> means an array that holds only strings. You can append a value to the end, count the values, and go through them one by one to draw a row for each.",
      zh: "一排按顺序排列的值。<b>[String]</b> 表示只装字符串的数组。你可以往队尾 append 一个值、数它有几个、也可以一个个遍历出来,每个画一行。",
    },
  },
  body: {
    title: { en: "body", zh: "body" },
    body: {
      en: "body is a computed property, which means its value is worked out again each time it is read. SwiftUI reads it to get a description of what the view should look like for the current data. It is not a list of drawing commands. You describe the result, and SwiftUI works out what to change on screen.",
      zh: "body 是一个计算属性(每次被读取时重新算一遍)。SwiftUI 读它,拿到的是「按当前数据,这个界面应该长什么样」的一份描述,而不是一串绘图命令。你负责描述结果,由 SwiftUI 算出屏幕上要改什么。",
    },
  },
  struct: {
    title: { en: "struct", zh: "struct(结构体)" },
    body: {
      en: "A struct groups several values into one new type. A task is more than one line of text: it has a title, a reward, and a finished flag. <b>struct PlanTask</b> packs those three into one type, so a single variable can carry all of them. A struct is a value type: assigning it to another variable copies it, and the two copies do not share later changes. (A class is a reference type, where two variables point at the same object.) Because a struct is copied, a method that changes the struct's own values has to be marked <b>mutating</b>.",
      zh: "把几个值打包成一个新类型。一条任务不只是一句话:它有标题、有奖励、有完成状态,<b>struct PlanTask</b> 把这三样合成一个类型,一个变量就能拎着走。struct 是值类型:赋给另一个变量是复制一份,之后各改各的,互不影响。(class 是引用类型,两个变量指向同一个对象。)正因为会被复制,struct 里要修改自身值的方法必须标上 <b>mutating</b>。",
    },
  },
  binding: {
    title: { en: "Binding ($)", zh: "绑定($)" },
    body: {
      en: "A binding is a two-way connection to a piece of state. Writing <b>$newTask</b> instead of newTask passes the connection itself, not just a copy of the current value. A text field needs this: it reads the value in order to show it, and writes the new value back while you type.",
      zh: "绑定是通向某块状态的双向连接。写 <b>$newTask</b> 而不是 newTask,传过去的是这条连接本身,不只是当前值的一份复制。输入框正需要它:既要读出值来显示,又要在你打字时把新值写回去。",
    },
  },
  foreach: {
    title: { en: "ForEach", zh: "ForEach" },
    body: {
      en: "ForEach takes a collection and builds one view for each element: three tasks, three rows. SwiftUI also has to tell those rows apart, so every element needs an identity. A type that conforms to Identifiable supplies its own id. Otherwise you point at one with <b>id:</b>. Writing <b>id: \\.self</b> uses the value itself as the identity, which breaks when two elements are equal, for example two tasks with the same title. Going through <b>tasks.indices</b> instead makes the position the identity, which is always unique.",
      zh: "ForEach 拿到一个集合,给每个元素生成一个视图:三条任务就是三行。SwiftUI 还要能区分这些行,所以每个元素都需要一个身份。遵守 Identifiable 的类型自带 id;否则要用 <b>id:</b> 指定一个。写 <b>id: \\.self</b> 是拿元素自己当身份,一旦两个元素相等(比如两条标题一样的任务)就会出问题;改成遍历 <b>tasks.indices</b>,身份是位置,一定唯一。",
    },
  },
  action: {
    title: { en: "Event (action)", zh: "事件(Action)" },
    body: {
      en: "An event is a tap, a keystroke, a drag. In SwiftUI the job of an event is to change the data. When the data changes, SwiftUI describes the interface again from it. You never edit the interface directly.",
      zh: "用户的每一次点击、输入、拖动。在 SwiftUI 里,事件的任务就是修改数据;数据一变,SwiftUI 依据新数据重新描述一遍界面。你从不直接改界面。",
    },
  },
  declarative: {
    title: { en: "Declarative", zh: "声明式" },
    body: {
      en: "Declarative means you describe what the interface should look like for the current data, instead of listing steps such as draw this, then move that. SwiftUI is declarative: you write the description, and SwiftUI works out what to change on screen.",
      zh: "声明式的意思是:你描述「数据是这样时,界面该是那样」,而不是一步步命令电脑「先画这个、再挪那个」。SwiftUI 是声明式的:你负责描述,它负责算出屏幕上要改什么。",
    },
  },
  appbundle: {
    title: { en: ".app (an app bundle)", zh: ".app(应用包)" },
    body: {
      en: "On a Mac, an app is a folder whose name ends in .app. Double-clicking it runs the program. Inside are the compiled program, the icons, and a settings file. Right-click any app and choose Show Package Contents to look inside.",
      zh: "在 Mac 上,一个 App 其实是个名字以 .app 结尾的文件夹,双击就能运行。里面装着编译好的程序、图标和一份配置文件(右键任何 App 选「显示包内容」就能看)。",
    },
  },
  modifier: {
    title: { en: "Modifier", zh: "修饰符(Modifier)" },
    body: {
      en: "A modifier is a <b>.something()</b> written after a view to change it: .font() sets the type size, .padding() adds space around it, .foregroundStyle() sets the color. Each modifier returns a new view with that one change applied, which is why they can be chained.",
      zh: "挂在零件后面的 <b>.xxx()</b>,用来改样式:.font() 改字号、.padding() 加留白、.foregroundStyle() 改颜色。每个修饰符返回的都是「加了这一处改动的新视图」,所以能一节一节接着写。",
    },
  },
  guardkw: {
    title: { en: "guard", zh: "guard" },
    body: {
      en: "guard checks a condition and leaves the current block when the condition is false. <b>guard !newTask.isEmpty else { return }</b> means: if the text field is empty, stop here and do nothing else.",
      zh: "guard 检查一个条件,条件不成立就离开当前这段代码。<b>guard !newTask.isEmpty else { return }</b> 的意思是:输入框是空的?那就到此为止,后面什么都不做。",
    },
  },
  optional: {
    title: { en: "Optional and nil", zh: "可选值与 nil" },
    body: {
      en: "Some values in Swift are allowed to be missing. Such a type is called an optional, and the missing value is written <b>nil</b>. A plain String is not optional: it always holds text, even if that text is empty (<b>\"\"</b>). Empty and missing are different things. To read an optional safely you unwrap it, usually with <b>if let</b>.",
      zh: "Swift 里有些值允许「根本不存在」,这种类型叫可选值,不存在写作 <b>nil</b>。普通的 String 不是可选值:它一定装着文字,哪怕那段文字是空的(<b>\"\"</b>)。「空」和「不存在」是两回事。要安全地读一个可选值,得先解包,常用写法是 <b>if let</b>。",
    },
  },
};

// ===== 第一站:什么是 App(六幕)/ Stop 1: what an app is (six scenes) =====
const S1 = [
  {
    title: { en: "Start from what you already use", zh: "从你已经会的开始" },
    visual: {
      en: '<div><div class="v-emoji">✅</div><div class="v-caption">Your iCanDoIt is already sitting in your Applications folder</div></div>',
      zh: '<div><div class="v-emoji">✅</div><div class="v-caption">你的 iCanDoIt,已经躺在你的应用程序文件夹里</div></div>',
    },
    body: {
      en: "<p>You use iCanDoIt every day: you open it, write down what you want to do, check things off, and watch the confetti.</p><p>This stop answers one question: <strong>what is that app, really?</strong> Once it is taken apart, it is much simpler than it looks.</p><p>(No code in this stop. Nothing to install.)</p>",
      zh: "<p>你每天都在用 iCanDoIt:打开、写下今天想做的事、完成后打勾、看彩带飞起来。</p><p>这一站回答一个问题:<strong>这个 App 到底是个什么东西?</strong>拆开之后你会发现,它比想象中简单得多。</p><p>(这一站一行代码都不用写,也不用装任何东西。)</p>",
    },
  },
  {
    title: { en: "Everything you see is the interface", zh: "看到的一切,叫界面" },
    visual: {
      en: '<div><div class="v-row"><span class="v-chip">Text</span><span class="v-chip">Button</span><span class="v-chip">Text field</span><span class="v-chip">List</span></div><div class="v-caption">Every item on the screen is a part with a name</div></div>',
      zh: '<div><div class="v-row"><span class="v-chip">文字</span><span class="v-chip">按钮</span><span class="v-chip">输入框</span><span class="v-chip">列表</span></div><div class="v-caption">屏幕上的每一样东西,都是一个有名字的零件</div></div>',
    },
    body: {
      en: "<p>Everything you can see, the title, the circles, the task list, the confetti, is called the [[view:interface (View)]].</p><p>The interface is only the appearance. It remembers nothing on its own: close the app and it is gone.</p>",
      zh: "<p>屏幕上你能看到的一切——标题、打勾的圆圈、任务列表、彩带——统称[[view:界面(View)]]。</p><p>界面只是长相,它自己不记得任何事:关掉 App,界面就消失了。</p>",
    },
  },
  {
    title: { en: "Everything it remembers is the data", zh: "记住的一切,叫数据" },
    visual: {
      en: '<div><div class="v-big">📦 ["Run 3 km", "Read"]<br>✅ Done: 1 / 2</div><div class="v-caption">This is what the app actually holds</div></div>',
      zh: '<div><div class="v-big">📦 ["跑步", "读书"]<br>✅ 完成:1 / 2</div><div class="v-caption">这些才是 App 真正持有的东西</div></div>',
    },
    body: {
      en: "<p>The task list, whether each task is finished, how many days in a row you have checked in: that is the [[state:data (State)]].</p><p>Close the app, open it again, and the tasks are still there, because the data was saved to disk. <strong>The interface is what you see. The data is what the app is.</strong></p>",
      zh: "<p>任务列表、每条完成了没有、连续打卡几天——这些是[[state:数据(State)]]。</p><p>关掉 App 再打开,任务还在,是因为数据被存到了硬盘上。<strong>界面是你看到的,数据才是这个 App 本身。</strong></p>",
    },
  },
  {
    title: { en: "Every tap is an event", zh: "你的每次点击,叫事件" },
    visual: {
      en: '<div><div class="v-row"><span class="v-chip">👆 You tap</span><span class="v-arrow">→</span><span class="v-chip">📦 The data changes</span><span class="v-arrow">→</span><span class="v-chip">🖥 The interface follows</span></div><div class="v-caption">Notice the direction: a tap changes the data, not the interface</div></div>',
      zh: '<div><div class="v-row"><span class="v-chip">👆 点击</span><span class="v-arrow">→</span><span class="v-chip">📦 数据变了</span><span class="v-arrow">→</span><span class="v-chip">🖥 界面跟着变</span></div><div class="v-caption">注意方向:点击改的是数据,不是界面</div></div>',
    },
    body: {
      en: "<p>When you tap the circle, three things happen in this order: the [[action:event]] runs, isDone goes from false to true in the data, and the task title appears with a line through it.</p><p>The order is the whole point. <strong>You never change the interface directly. You change the data</strong>, and the interface is described again from it.</p>",
      zh: "<p>你点圆圈的那一刻,按顺序发生了三件事:[[action:事件]]执行 → 数据里的 isDone 从 false 变成 true → 界面上的任务标题出现删除线。</p><p>关键就在这个顺序:<strong>你从来没有直接改界面,你改的永远是数据</strong>,界面是依据数据重新描述出来的。</p>",
    },
  },
  {
    title: { en: "How SwiftUI works", zh: "SwiftUI 的规矩" },
    visual: {
      en: '<div><div class="v-big">When the data looks like this,<br>the interface looks like that</div><div class="v-caption">You write the description. SwiftUI builds the view.</div></div>',
      zh: '<div><div class="v-big">数据长这样时,<br>界面就画成那样</div><div class="v-caption">你负责描述,它负责重建界面</div></div>',
    },
    body: {
      en: "<p>[[swiftui:SwiftUI]] is [[declarative:declarative]]. You do not tell the computer to draw this and then move that. You describe a rule: a task whose isDone is true is shown with a line through its title.</p><p>Every time the data changes, SwiftUI reads your description again and works out the new interface. <strong>You describe. SwiftUI builds.</strong></p>",
      zh: "<p>[[swiftui:SwiftUI]] 的工作方式是[[declarative:声明式]]的:你不用一步步指挥电脑「先画这个再挪那个」,只需要描述规则——比如「isDone 是 true 的任务,标题加删除线」。</p><p>之后每当数据变化,SwiftUI 重新读一遍你的描述,算出新的界面。<strong>你管描述,它管重建。</strong></p>",
    },
  },
  {
    title: { en: "The formula", zh: "公式揭晓" },
    visual: {
      en: '<div><div class="v-formula">UI = f(data)</div><div class="v-caption">All of iCanDoIt is this one formula, applied again and again</div></div>',
      zh: '<div><div class="v-formula">界面 = f(数据)</div><div class="v-caption">整个 iCanDoIt,就是把这个公式反复用了几遍</div></div>',
    },
    body: {
      en: "<p>This is the whole idea behind modern app development: <strong>the UI is a function of your data.</strong> Data goes in, an interface comes out. You change the data, and the view follows.</p><p>You need three things, all free: [[swift:Swift]] is the language, [[swiftui:SwiftUI]] is the set of parts, [[xcode:Xcode]] is where you build.</p><p>Next stop: watch this app grow from one line of text into the finished thing.</p>",
      zh: "<p>这就是现代 App 开发的全部要点:<strong>界面是数据的函数。</strong>数据进,界面出。你只管改数据,界面自己跟上。</p><p>你需要的工具只有三样,全部免费:[[swift:Swift]] 是语言,[[swiftui:SwiftUI]] 是零件箱,[[xcode:Xcode]] 是开发工具。</p><p>下一站,亲眼看这个 App 怎么从一行字长成完整的样子。</p>",
    },
  },
];

// ===== 第二站:看它长大(九步)/ Stop 2: watch it grow (nine steps) =====
// code: 每行 { t: 文本, add: 是否本步新增 } / each line is { t, add }
const S2 = [
  {
    beat: { en: "an empty app", zh: "建个空壳" },
    title: { en: "Xcode gives you a working app to start from", zh: "Xcode 送你一个能跑的最小 App" },
    xcode: {
      en: "Open Xcode, choose Create New Project, then macOS, then App, then keep clicking Next.",
      zh: "打开 Xcode → Create New Project → macOS → App → 一路 Next。",
    },
    narration: {
      en: "As soon as the project is created, [[xcode:Xcode]] has written these lines for you: an app that shows one line of text. Press <kbd>⌘R</kbd> and it really runs. Everything in this course grows out of these seven lines.",
      zh: "新项目一建好,[[xcode:Xcode]] 就已经替你写好了这几行:一个只显示一行字的 App。按 <kbd>⌘R</kbd>,它真的能跑起来。整个课程都将从这七行长出去。",
    },
    code: [
      { t: "import SwiftUI" },
      { t: "" },
      { t: "struct ContentView: View {" },
      { t: "    var body: some View {" },
      { t: "        Text(\"Hello, world!\")" },
      { t: "    }" },
      { t: "}" },
    ],
    mock: "hello",
    mockCaption: { en: "On the right is what it looks like when it runs", zh: "右边就是它跑起来的样子" },
  },
  {
    beat: { en: "your own line", zh: "写下问候" },
    title: { en: "Change the text to your own question", zh: "把它变成我们的开场白" },
    xcode: {
      en: "Edit the text inside ContentView.swift and save. The preview on the right updates immediately.",
      zh: "直接改 ContentView.swift 里的文字,保存,右侧预览立刻跟着变。",
    },
    narration: {
      en: "Replace Hello, world! with your own question, then attach a few [[modifier:modifiers]]: a larger type size, a purple color, a dark color scheme. Read it like this: Text is the view, and each .font() or .foregroundStyle() after it returns a new view with one more change applied.",
      zh: "把 Hello, world! 换成我们自己的问题,再挂几个[[modifier:修饰符]]:调大字号、染成紫色、声明走深色系。读法是这样:Text 是零件,后面每一节 .font()、.foregroundStyle() 都返回一个「多加了一处改动」的新视图。",
    },
    code: [
      { t: "import SwiftUI" },
      { t: "" },
      { t: "struct ContentView: View {" },
      { t: "    var body: some View {" },
      { t: line("        Text(\"%title%\")"), add: true },
      { t: "            .font(.system(size: 24, weight: .bold, design: .rounded))", add: true },
      { t: "            .foregroundStyle(.purple)", add: true },
      { t: "            .preferredColorScheme(.dark)", add: true },
      { t: "    }" },
      { t: "}" },
    ],
    mock: "title",
    mockCaption: { en: "It is starting to look like iCanDoIt", zh: "开始有 iCanDoIt 的味道了" },
  },
  {
    beat: { en: "data of its own", zh: "给它记性" },
    title: { en: "@State: data the view owns", zh: "@State:视图自己的数据" },
    xcode: {
      en: "Add three variables at the top of ContentView, and a new PlanTask struct at the bottom of the file.",
      zh: "在 ContentView 顶部加三个变量;文件底部新建一个 PlanTask 结构体。",
    },
    narration: {
      en: "Before the interface can change, there has to be [[state:data]] that changes. Here are three pieces: the text in the task field, the text in the reward field, and the list of tasks. Marking them [[atstate:@State]] tells SwiftUI that this view owns them, so when one changes SwiftUI runs body again and describes the view from the new values. A task is more than one line of text, so [[struct:struct]] packs a title, a reward, and a finished flag into one type called PlanTask.",
      zh: "界面要变,先得有会变的[[state:数据]]。这里声明三块:任务输入框的文字、奖励输入框的文字、任务列表。贴上 [[atstate:@State]],就是告诉 SwiftUI 这块数据归这个视图所有——它一变,SwiftUI 重新执行 body,依据新值重新描述界面。一条任务不只是一句话,所以用 [[struct:struct]] 把标题、奖励、完成状态打包成一个 PlanTask 类型。",
    },
    code: [
      { t: "struct ContentView: View {" },
      { t: "    @State private var newTask = \"\"", add: true },
      { t: "    @State private var newReward = \"\"", add: true },
      { t: "    @State private var tasks: [PlanTask] = []", add: true },
      { t: "" },
      { t: "    var body: some View {" },
      { t: { en: "        // ...the Text from the last step, unchanged", zh: "        // …上一步的 Text 不变" } },
      { t: "    }" },
      { t: "}" },
      { t: "" },
      { t: "struct PlanTask: Identifiable {", add: true },
      { t: "    let id = UUID()", add: true },
      { t: "    var title: String", add: true },
      { t: "    var reward: String", add: true },
      { t: "    var isDone = false", add: true },
      { t: "}", add: true },
    ],
    mock: "memory",
    mockCaption: {
      en: "The interface has not changed, but the view now owns three pieces of data",
      zh: "界面没变,但这个视图已经持有三块数据",
    },
  },
  {
    beat: { en: "the text fields", zh: "画出输入框" },
    title: { en: "TextField and $: a two-way connection", zh: "TextField 与 $:双向连接" },
    xcode: {
      en: "Wrap what is inside body in a VStack, then add an HStack below it holding two text fields.",
      zh: "把 body 里的内容包进 VStack(竖着排),下面加一个 HStack(横着排)放两个输入框。",
    },
    narration: {
      en: "The text field view is called TextField. Look at the <b>$</b> in front of the variable: that is a [[binding:binding]], a two-way connection. The field reads newTask in order to show it, and writes what you type back into newTask. Without the $ the field would receive only a copy of the current text and could not write anything back. VStack and HStack are layout views: top to bottom, and side by side.",
      zh: "输入框零件叫 TextField。注意变量前面的 <b>$</b>——那是[[binding:绑定]],一条双向连接:输入框既要读出 newTask 来显示,又要在你打字时把新内容写回去。不加 $,它拿到的只是当前文字的一份复制,写不回来。VStack / HStack 是排版零件:竖着排、横着排。",
    },
    code: [
      { t: "    var body: some View {" },
      { t: "        VStack(alignment: .leading, spacing: 16) {", add: true },
      { t: line("            Text(\"%title%\")") },
      { t: "                .font(.system(size: 24, weight: .bold, design: .rounded))" },
      { t: "                .foregroundStyle(.purple)" },
      { t: "" },
      { t: "            HStack {", add: true },
      { t: line("                TextField(\"%taskPh%\", text: $newTask)"), add: true },
      { t: line("                TextField(\"%rewardPh%\", text: $newReward)"), add: true },
      { t: "            }", add: true },
      { t: "        }", add: true },
      { t: "        .padding(24)", add: true },
      { t: "        .preferredColorScheme(.dark)" },
      { t: "    }" },
    ],
    mock: "inputs",
    mockCaption: { en: "Both fields are now connected to the data", zh: "两个输入框都接上了数据" },
  },
  {
    beat: { en: "a working Add button", zh: "让「添加」真的添加" },
    title: { en: "Button: an event changes the data", zh: "Button:事件改数据" },
    xcode: {
      en: "Inside the HStack, after the two text fields, add a Button.",
      zh: "在 HStack 里、两个输入框后面,加一个 Button。",
    },
    narration: {
      en: "A Button has two parts: the text in quotes is the label, and the code in braces <b>runs when the button is pressed</b>. That code only changes data. [[guardkw:guard]] stops the whole action if the field is empty. Then the new task is appended to the array and both fields are cleared. <b>Not one line touches the interface</b>, and yet a new row appears, because tasks changed and SwiftUI described the view again. This is the formula from stop 1 doing its work.",
      zh: "Button 有两半:引号里是按钮上的字,花括号里是<b>按下去执行的代码</b>。这段代码只做一件事——改数据:先让 [[guardkw:guard]] 拦住空输入,再把新任务 append 进数组、清空两个输入框。<b>没有一行代码去碰界面</b>,但界面自己长出一行新任务——因为 tasks 变了,SwiftUI 重新描述了一遍。这就是第一站的公式在干活。",
    },
    code: [
      { t: "            HStack {" },
      { t: line("                TextField(\"%taskPh%\", text: $newTask)") },
      { t: line("                TextField(\"%rewardPh%\", text: $newReward)") },
      { t: line("                Button(\"%addBtn%\") {"), add: true },
      { t: "                    guard !newTask.isEmpty else { return }", add: true },
      { t: "                    tasks.append(PlanTask(title: newTask, reward: newReward))", add: true },
      { t: "                    newTask = \"\"", add: true },
      { t: "                    newReward = \"\"", add: true },
      { t: "                }", add: true },
      { t: "            }" },
    ],
    mock: "addbtn",
    mockCaption: {
      en: "Watch on the right: type, press Add, the array gains a value, the list gains a row",
      zh: "看右边:输入 → 点添加 → 数组多一个 → 界面长一行",
    },
  },
  {
    beat: { en: "the list", zh: "画出列表" },
    title: { en: "One row for every value in the array", zh: "数组有几个,就画几行" },
    xcode: { en: "Add a ForEach below the HStack.", zh: "在 HStack 下面加一段 ForEach。" },
    narration: {
      en: "[[foreach:ForEach]] builds one view for each element of a collection. It is written $tasks with a dollar sign because checking a task off later has to <b>change</b> that task, so each row is handed a binding it can write back through. PlanTask is Identifiable, which gives every task a stable id, so SwiftUI can tell the rows apart. Three tasks, three rows. Add one and a row appears.",
      zh: "[[foreach:ForEach]] 给集合里每个元素生成一个视图。这里写成 $tasks 是因为待会儿打勾要<b>修改</b>那条任务,所以每行拿到的是一条能写回去的绑定。PlanTask 遵守 Identifiable,每条任务都有稳定的 id,SwiftUI 才能区分这些行。三条任务,三行;加一条,多一行。",
    },
    code: [
      { t: "            ForEach($tasks) { $task in", add: true },
      { t: "                HStack {", add: true },
      { t: "                    Text(task.title)", add: true },
      { t: "                    Spacer()", add: true },
      { t: "                }", add: true },
      { t: "            }", add: true },
    ],
    mock: "list",
    mockCaption: { en: "Three tasks, three rows, one for one", zh: "三个任务,三行,一一对应" },
  },
  {
    beat: { en: "checking a task off", zh: "让圆圈能打勾" },
    title: { en: "toggle: flip true and false", zh: "toggle:一点就翻面" },
    xcode: {
      en: "Add a round Button before the Text in each row.",
      zh: "在每行任务的 Text 前面加一个圆圈 Button。",
    },
    narration: {
      en: "The circle is a Button as well. Pressing it runs <b>task.isDone.toggle()</b>, which flips the value between true and false. The icon follows that value: checkmark.circle.fill when isDone is true, circle when it is false. The line through the title follows the same value, through .strikethrough(task.isDone). <b>Try the circles on the right. They work.</b>",
      zh: "圆圈也是个 Button,按下去执行 <b>task.isDone.toggle()</b>,把 true / false 翻个面。图标跟着这个值走:isDone 为 true 用 checkmark.circle.fill,否则用 circle;标题的删除线也跟着同一个值,写作 .strikethrough(task.isDone)。<b>右边的圆圈是活的,点一下试试。</b>",
    },
    code: [
      { t: "            ForEach($tasks) { $task in" },
      { t: "                HStack {" },
      { t: "                    Button {", add: true },
      { t: "                        task.isDone.toggle()", add: true },
      { t: "                    } label: {", add: true },
      { t: "                        Image(systemName: task.isDone ? \"checkmark.circle.fill\" : \"circle\")", add: true },
      { t: "                    }", add: true },
      { t: "                    .buttonStyle(.plain)", add: true },
      { t: "" },
      { t: "                    Text(task.title)" },
      { t: "                        .strikethrough(task.isDone)", add: true },
      { t: "                    Spacer()" },
      { t: "                }" },
      { t: "            }" },
    ],
    mock: "check",
    mockCaption: { en: "👆 The circles are live, give one a click", zh: "👆 圆圈是活的,点一下试试" },
  },
  {
    beat: { en: "the reward", zh: "完成时给颗糖" },
    title: { en: "if: show a view only when it should appear", zh: "if:只在该出现时出现" },
    xcode: { en: "Add an if below the Text.", zh: "在 Text 下面加一个 if 判断。" },
    narration: {
      en: "The last piece: show the reward once the task is finished. Inside body, if means include this view only when the condition is true. Here the task has to be done and the reward must not be empty. In the string, <b>\\(task.reward)</b> puts the value of the variable into the text, which is called string interpolation. The core of iCanDoIt is now complete.",
      zh: "最后一块拼图:任务完成时亮出奖励。在 body 里,if 的意思是「条件成立才包含这一块视图」——任务完成了,而且当初写了奖励,才显示。字符串里的 <b>\\(task.reward)</b> 是把变量的值嵌进文字里,这种写法叫字符串插值。到这里,iCanDoIt 的核心玩法全部长齐了。",
    },
    code: [
      { t: "                    Text(task.title)" },
      { t: "                        .strikethrough(task.isDone)" },
      { t: "                    if task.isDone && !task.reward.isEmpty {", add: true },
      { t: line("                        Text(\"%reward%\\(task.reward)\")"), add: true },
      { t: "                    }", add: true },
      { t: "                    Spacer()" },
    ],
    mock: "reward",
    mockCaption: { en: "Check off the first task and the reward appears", zh: "打勾第一条任务,奖励出现了" },
  },
  {
    beat: { en: "onto your Mac", zh: "装进你的 Mac" },
    title: { en: "From code to a .app", zh: "从代码到 .app" },
    xcode: {
      en: "Press ⌘R while you work. For a finished app, use Product, then Archive, to export a .app.",
      zh: "日常开发按 ⌘R 试跑;想要成品,Product → Archive 导出 .app。",
    },
    narration: {
      en: "While you are writing code, press <kbd>⌘R</kbd>: Xcode [[compile:compiles]] the project and runs it in front of you. Change a line and run it again. When you want an app you can keep in your Applications folder, use Product, then Archive, to export an [[appbundle:.app]]. (The iCanDoIt you already have was packaged the same way from the command line and copied into /Applications.)",
      zh: "写代码时按 <kbd>⌘R</kbd>,Xcode 当场[[compile:编译]]并跑给你看,改一行再跑一遍。想要一个能放进应用程序文件夹的成品,用 Product → Archive 导出 [[appbundle:.app]]。(你手上的 iCanDoIt 正式版,就是用等价的命令行方式打包、再拷进 /Applications 的。)",
    },
    code: [],
    mock: "ship",
    mockCaption: {
      en: "From one line of Hello, world! to an icon in the Dock",
      zh: "从一行 Hello, world!,到 Dock 上的图标",
    },
  },
];

// ===== 第三站:亲手写(挖空)/ Stop 3: write it yourself (fill in the blanks) =====
// 骨架行里 ⟦n⟧ 是第 n 个空 / ⟦n⟧ marks blank number n
const S3_LINES = [
  "import SwiftUI",
  "",
  "struct ContentView: View {",
  "    ⟦0⟧ private var newTask = \"\"",
  "    @State private var tasks: [String] = ⟦1⟧",
  "",
  "    var ⟦2⟧: some View {",
  "        VStack(alignment: .leading, spacing: 16) {",
  line("            ⟦3⟧(\"%title%\")"),
  "",
  line("            TextField(\"%taskPh%\", text: ⟦4⟧)"),
  "",
  line("            Button(\"%addBtn%\") {"),
  "                tasks.⟦5⟧(newTask)",
  "                newTask = ⟦6⟧",
  "            }",
  "",
  "            ⟦7⟧(tasks.indices, id: \\.self) { i in",
  "                Text(tasks[i])",
  "            }",
  "        }",
  "        .padding(24)",
  "    }",
  "}",
];

const S3_BLANKS = [
  {
    filled: "@State",
    lesson: {
      title: { en: "🎒 New idea · data the view owns", zh: "🎒 新知识 · 视图自己的数据" },
      body: {
        en: "For the interface to follow the data, the view has to own that data. You mark it with <b>@State</b>. When a value marked [[atstate:@State]] changes, SwiftUI runs body again and describes the view from the new value.",
        zh: "界面要跟着数据变,前提是这块数据归这个视图所有,写法是在变量前贴上 <b>@State</b>。被 [[atstate:@State]] 标记的值一变,SwiftUI 就重新执行 body,依据新值重新描述界面。",
      },
    },
    q: {
      en: "newTask holds the text in the field, and the view has to own it. What goes in the first blank?",
      zh: "newTask 存着输入框里的文字,得归这个视图所有。第一个空填什么?",
    },
    options: [
      {
        label: "var",
        fb: {
          en: "[[variable:var]] on its own declares an ordinary variable. Changing it would not make SwiftUI describe the view again. This line also already has var after the blank, so what is missing is the mark in front of it.",
          zh: "[[variable:var]] 只是声明一个普通变量,值变了 SwiftUI 也不会重新描述界面。而且这行空位后面已经有 var 了,缺的是前面那个标记。",
        },
      },
      { label: "@State", ok: true },
      {
        label: "let",
        fb: {
          en: "[[letconst:let]] is a constant: once it has a value, that value cannot be replaced. The text in the field changes with every keystroke, so it cannot be a constant.",
          zh: "[[letconst:let]] 是常量,值一旦放进去就不能再换。输入框的内容每敲一个键就变一次,不能用常量。",
        },
      },
      {
        label: "@Magic",
        fb: {
          en: "There is no such thing in Swift. Names that start with @ are property wrappers, and the one that marks data owned by a view is @State.",
          zh: "Swift 里没有这个东西。以 @ 开头的叫属性包装器,标记「视图自己的数据」的那个是 @State。",
        },
      },
    ],
  },
  {
    filled: "[]",
    lesson: {
      title: { en: "🎒 New idea · an array is an ordered list", zh: "🎒 新知识 · 数组是一排有序的值" },
      body: {
        en: "[String] means an [[array:array]] that holds only [[string:strings]]. When the app opens there are no tasks yet, so it starts with an <b>empty array</b>: the list exists, it simply has nothing in it.",
        zh: "[String] 表示只装[[string:字符串]]的[[array:数组]]。App 刚打开时一条任务都没有,所以要给它一个<b>空数组</b>:这排格子存在,只是里面什么都没放。",
      },
    },
    q: { en: "The task list starts out empty. What goes after the equals sign?", zh: "任务列表开局是空的。等号后面填什么?" },
    options: [
      {
        label: "nil",
        fb: {
          en: "nil means the value is missing entirely, which is a different idea from empty (see [[optional:optional and nil]]). [String] is not an optional, so it is not allowed to be missing. What is needed here is an array that exists and is empty, like a new bookshelf before any books are on it.",
          zh: "nil 是「这个值根本不存在」,和「空」是两回事(见[[optional:可选值与 nil]])。[String] 不是可选值,不允许不存在。这里要的是一个存在但空着的数组,就像刚买的书架:架子在,书还没放。",
        },
      },
      {
        label: "\"\"",
        fb: {
          en: "That is an empty string, a piece of <b>text</b> with no characters in it. What is needed is an empty <b>array</b>. They are different types, and the compiler will not accept one where the other is declared.",
          zh: "这是空字符串,一段没有字符的<b>文字</b>。这里要的是空<b>数组</b>。两者类型不同,编译器不会让你拿一个顶替另一个。",
        },
      },
      { label: "[]", ok: true },
      {
        label: "[0]",
        fb: {
          en: "This array already holds one value, the number 0, so it is not empty. It also holds the wrong type: the array is declared [String], and 0 is an Int.",
          zh: "这个数组里已经躺着一个数字 0,不是空的;而且类型也不对——数组声明的是 [String],0 是 Int。",
        },
      },
    ],
  },
  {
    filled: "body",
    lesson: {
      title: { en: "🎒 New idea · the description of a view", zh: "🎒 新知识 · 界面的那份描述" },
      body: {
        en: "Every SwiftUI view has to answer one question: what should you look like for the current data? The answer goes in a property with a fixed name, and SwiftUI reads it every time it builds the view. That name is <b>[[body:body]]</b>.",
        zh: "每个 SwiftUI 视图都必须回答一个问题:按当前数据,你该长什么样?答案写在一个名字固定的属性里,SwiftUI 每次重建界面都来读它。这个名字是 <b>[[body:body]]</b>。",
      },
    },
    q: { en: "What is that property called?", zh: "这个属性叫什么名字?" },
    options: [
      {
        label: "main",
        fb: {
          en: "main is where a program starts running. It is not the description of a view.",
          zh: "main 是整个程序开始运行的地方,不是界面的描述。",
        },
      },
      { label: "body", ok: true },
      {
        label: "screen",
        fb: {
          en: "A reasonable guess, but the name is fixed by the View protocol. SwiftUI looks for body, and any other name will not be found.",
          zh: "猜得合理,但这个名字由 View 协议定死了:SwiftUI 只找 body,换个名字它就找不到。",
        },
      },
      {
        label: "face",
        fb: {
          en: "SwiftUI only accepts the name body.",
          zh: "SwiftUI 只认 body 这个名字。",
        },
      },
    ],
  },
  {
    filled: "Text",
    lesson: {
      title: { en: "🎒 New idea · everything on screen is a view", zh: "🎒 新知识 · 屏幕上的一切都是视图" },
      body: {
        en: "To put words on screen you create a text view. A button is a Button, an input field is a TextField. The view that shows words is <b>Text</b>, written as Text(\"what you want to say\").",
        zh: "想在屏幕上写字,就造一个文字视图;要按钮就用 Button,要输入框就用 TextField。显示文字的视图叫 <b>Text</b>,写法是 Text(\"想说的话\")。",
      },
    },
    q: { en: "Which view puts the question on screen?", zh: "把这个问题显示在屏幕上,用哪个视图?" },
    options: [
      {
        label: "print",
        fb: {
          en: "print writes to the console <b>for the programmer</b>. Nothing appears in the app window. Remember the pair: Text for the user, print for your own debugging.",
          zh: "print 是往控制台打印<b>给程序员看</b>的,App 窗口里什么都不会出现。记住这一对:给用户看用 Text,给自己调试用 print。",
        },
      },
      {
        label: "String",
        fb: {
          en: "String is the <b>data</b>, the text itself. Text is the <b>view</b> that displays it. One is the content, the other puts it on screen.",
          zh: "String 是<b>数据</b>,也就是文字本身;把它显示出来的<b>视图</b>是 Text。一个是内容,一个负责显示。",
        },
      },
      { label: "Text", ok: true },
      {
        label: "Word",
        fb: {
          en: "There is no Word view in SwiftUI. The view that shows words is Text.",
          zh: "SwiftUI 里没有 Word 这个视图。显示文字的视图叫 Text。",
        },
      },
    ],
  },
  {
    filled: "$newTask",
    lesson: {
      title: { en: "🎒 New idea · $ is the two-way connection", zh: "🎒 新知识 · $ 是双向连接" },
      body: {
        en: "TextField needs both directions: it <b>reads</b> your variable in order to display it, and <b>writes</b> the new text back while you type. Putting <b>$</b> in front of the variable passes a [[binding:binding]], which carries both directions instead of just a copy of the value.",
        zh: "TextField 需要两个方向:既要<b>读</b>你的变量来显示,又要在你打字时把新文字<b>写回去</b>。在变量前加 <b>$</b>,传过去的是一条[[binding:绑定]],两个方向都带上,而不只是值的一份复制。",
      },
    },
    q: { en: "TextField needs a two-way connection to newTask. What goes here?", zh: "TextField 要和 newTask 双向连接,这里填什么?" },
    options: [
      {
        label: "newTask",
        fb: {
          en: "Without the $, this passes only the current text, so the field would have no way to write anything back. Xcode reports: Cannot convert value of type 'String' to expected argument type 'Binding&lt;String&gt;'.",
          zh: "少了 $,传过去的只是当前文字,输入框没办法写回来。Xcode 会报错:Cannot convert value of type 'String' to expected argument type 'Binding&lt;String&gt;'。",
        },
      },
      { label: "$newTask", ok: true },
      {
        label: "\"newTask\"",
        fb: {
          en: "In quotes it becomes the text newTask itself, with no connection to your variable. The field would always show those eight letters.",
          zh: "加了引号就变成 newTask 这八个字母本身了,和你的变量没有任何关系,输入框里会永远显示这段文字。",
        },
      },
      {
        label: "&newTask",
        fb: {
          en: "& marks an in-out argument in Swift, and it is how C takes an address. SwiftUI's two-way connection is written with $.",
          zh: "& 在 Swift 里用于 in-out 参数,在 C 语言里是取地址。SwiftUI 的双向连接用的是 $。",
        },
      },
    ],
  },
  {
    filled: "append",
    lesson: {
      title: { en: "🎒 New idea · adding to the end", zh: "🎒 新知识 · 往队尾加一个" },
      body: {
        en: "An array comes with a set of actions: count the values, read one, add one. The action that adds a value to the end is <b>append</b>. tasks.append(x) puts x after everything already in the array.",
        zh: "数组自带一批动作:数个数、取出一个、加一个……往队尾追加一个值的动作叫 <b>append</b>,tasks.append(x) 就是把 x 放到已有元素的后面。",
      },
    },
    q: { en: "Which action adds newTask to the task list?", zh: "把 newTask 加进任务列表,用哪个动作?" },
    options: [
      {
        label: "add",
        fb: {
          en: "Many languages call it add. Swift arrays do not have it. The compiler answers: value of type '[String]' has no member 'add'.",
          zh: "很多语言用 add,Swift 的数组没有这个方法。编译器会说:value of type '[String]' has no member 'add'。",
        },
      },
      {
        label: "push",
        fb: {
          en: "push belongs to a stack. A Swift array uses append.",
          zh: "push 是栈这种数据结构的说法。Swift 数组用的是 append。",
        },
      },
      { label: "append", ok: true },
      {
        label: "insert",
        fb: {
          en: "insert puts a value at a <b>chosen position</b> and needs that position as well: insert(x, at: 0). To add at the end, append is the direct choice.",
          zh: "insert 是插到<b>指定位置</b>,还得多给一个位置参数:insert(x, at: 0)。往队尾加,直接用 append。",
        },
      },
    ],
  },
  {
    filled: "\"\"",
    lesson: {
      title: { en: "🎒 New idea · clearing the field", zh: "🎒 新知识 · 清空输入框" },
      body: {
        en: "After a task is added, the field should be empty so you can write the next one. Clearing it means assigning an <b>empty string</b>: two quotes with nothing between them. Note that nil (missing) and \"\" (present but empty) are not the same thing, see [[optional:optional and nil]].",
        zh: "添加完任务,输入框该清空,好写下一条。清空就是赋一段<b>空字符串</b>:两个引号,中间什么都不放。注意 nil(不存在)和 \"\"(存在但是空的)是两回事,见[[optional:可选值与 nil]]。",
      },
    },
    q: { en: "What goes after the equals sign to clear newTask?", zh: "添加完把 newTask 清空,等号后面填什么?" },
    options: [
      { label: "\"\"", ok: true },
      {
        label: "nil",
        fb: {
          en: "newTask is a String, not an optional, so Swift does not allow it to be missing. Clearing it means giving it an empty piece of text, \"\".",
          zh: "newTask 的类型是 String,不是可选值,Swift 不允许它「不存在」。清空不是让它消失,是给它一段空文字 \"\"。",
        },
      },
      {
        label: "\" \"",
        fb: {
          en: "Look closely: there is a space between the quotes. The field would look empty, but it would hold one invisible character, and a later isEmpty check would report false.",
          zh: "仔细看,引号里藏着一个空格。输入框看起来空了,其实躺着一个看不见的字符,之后用 isEmpty 判断会得到 false。",
        },
      },
      {
        label: "delete",
        fb: {
          en: "Swift has no such statement here. To clear a string, assign an empty string, \"\".",
          zh: "Swift 没有这种写法。清空一个字符串,就是赋值一个空字符串 \"\"。",
        },
      },
    ],
  },
  {
    filled: "ForEach",
    lesson: {
      title: { en: "🎒 New idea · one view per element", zh: "🎒 新知识 · 每个元素画一个" },
      body: {
        en: "How does an array become rows on screen? One view takes the collection and builds a view for each element: three values, three rows. That view is <b>[[foreach:ForEach]]</b>. It also needs a way to tell the elements apart, which is what <b>id:</b> is for. Here the code goes through tasks.indices, so the identity of a row is its position.",
        zh: "怎么把数组变成屏幕上的一行行?用一个视图接过整个集合,给每个元素生成一个视图:三个值就是三行。这个视图叫 <b>[[foreach:ForEach]]</b>。它还需要能区分元素,这就是 <b>id:</b> 的用处。这里遍历的是 tasks.indices,所以每一行的身份就是它的位置。",
      },
    },
    q: { en: "Which view turns every value in tasks into a row?", zh: "把 tasks 里的每一条画成一行,用哪个视图?" },
    options: [
      {
        label: "for",
        fb: {
          en: "for is an ordinary loop in ordinary code. body is a description of views, not a list of steps, so it uses the view version, ForEach.",
          zh: "for 是普通代码里的循环。body 是一份界面描述,不是一串步骤,所以要用它的视图版本 ForEach。",
        },
      },
      { label: "ForEach", ok: true },
      {
        label: "Repeat",
        fb: {
          en: "There is no Repeat view in SwiftUI. The one that builds a view per element is ForEach.",
          zh: "SwiftUI 里没有 Repeat 这个视图。给每个元素生成一个视图的是 ForEach。",
        },
      },
      {
        label: "List",
        fb: {
          en: "Close. List is a scrolling container for rows. ForEach is what turns the array into those rows. They are often used together: List { ForEach... }.",
          zh: "接近了。List 是带滚动的行容器,而把数组变成一行行的是 ForEach。两个常常搭配用:List { ForEach… }。",
        },
      },
    ],
  },
];

// ===== 第四站:装进你的 Mac / Stop 4: put it on your Mac =====
const S4_STEPS = [
  {
    n: "0",
    body: {
      en: "<b>Before you start:</b> install [[xcode:Xcode]] from the Mac App Store. It is free, and the download is large, so allow some time. <b>Your Mac already has version 26.6, so go straight to step 1.</b>",
      zh: "<b>前提:</b>Mac 上装好 [[xcode:Xcode]](App Store 免费下载,体积大,耐心等)。<b>你的电脑已经装好了 26.6,直接跳到第 1 步。</b>",
    },
  },
  {
    n: "1",
    body: {
      en: "Open Xcode and click <b>Create New Project</b> (or use File, then New, then Project).",
      zh: "打开 Xcode,点 <b>Create New Project</b>(或菜单 File → New → Project)。",
    },
  },
  {
    n: "2",
    body: {
      en: "Select the <b>macOS</b> tab at the top, choose <b>App</b>, then click <b>Next</b>.",
      zh: "顶部选 <b>macOS</b> 标签 → 选中 <b>App</b> → <b>Next</b>。",
    },
  },
  {
    n: "3",
    body: {
      en: "Set Product Name to <b>MyPlanner</b>. Check that Interface is <b>SwiftUI</b> and Language is <b>Swift</b>. Testing System can stay None. Click <b>Next</b> and save the project in your Downloads folder.",
      zh: "Product Name 填 <b>MyPlanner</b>;确认 Interface 是 <b>SwiftUI</b>、Language 是 <b>Swift</b>;Testing System 选 None 即可 → <b>Next</b> → 保存到「下载」文件夹。",
    },
  },
  {
    n: "4",
    body: {
      en: "In the file list on the left, open <b>ContentView.swift</b>. Select everything in it, delete it, and paste in the complete code below.",
      zh: "左侧文件列表点开 <b>ContentView.swift</b>,全选里面的内容删掉,把下面这份完整代码粘贴进去。",
    },
  },
  {
    n: "5",
    body: {
      en: "Press <kbd>⌘R</kbd> (or click ▶ at the top left). If a signing or permission dialog appears the first time, choose the automatic or allow option.",
      zh: "按 <kbd>⌘R</kbd>(或点左上角 ▶)。第一次运行如果弹出签名或权限提示,选自动 / 允许即可。",
    },
  },
  {
    n: "6",
    body: {
      en: "🎉 A real Mac app is running on your own machine. Add a task, check it off, collect the reward. You can read every line of code that does it.",
      zh: "🎉 一个真正的 Mac App 在你手里跑起来了——输入任务、打勾、领奖励,每一行代码你都认识。",
    },
  },
];

const S4_CODE = [
  "import SwiftUI",
  "",
  "struct ContentView: View {",
  "    @State private var newTask = \"\"",
  "    @State private var newReward = \"\"",
  "    @State private var tasks: [PlanTask] = []",
  "",
  "    var body: some View {",
  "        VStack(alignment: .leading, spacing: 16) {",
  line("            Text(\"%title%\")"),
  "                .font(.system(size: 24, weight: .bold, design: .rounded))",
  "                .foregroundStyle(.purple)",
  "",
  "            HStack {",
  line("                TextField(\"%taskPh%\", text: $newTask)"),
  line("                TextField(\"%rewardPh%\", text: $newReward)"),
  line("                Button(\"%addBtn%\") {"),
  "                    guard !newTask.isEmpty else { return }",
  "                    tasks.append(PlanTask(title: newTask, reward: newReward))",
  "                    newTask = \"\"",
  "                    newReward = \"\"",
  "                }",
  "            }",
  "",
  "            ForEach($tasks) { $task in",
  "                HStack {",
  "                    Button {",
  "                        task.isDone.toggle()",
  "                    } label: {",
  "                        Image(systemName: task.isDone ? \"checkmark.circle.fill\" : \"circle\")",
  "                    }",
  "                    .buttonStyle(.plain)",
  "",
  "                    Text(task.title)",
  "                        .strikethrough(task.isDone)",
  "",
  "                    if task.isDone && !task.reward.isEmpty {",
  line("                        Text(\"%reward%\\(task.reward)\")"),
  "                    }",
  "                    Spacer()",
  "                }",
  "            }",
  "            Spacer()",
  "        }",
  "        .padding(24)",
  "        .frame(minWidth: 480, minHeight: 380)",
  "        .preferredColorScheme(.dark)",
  "    }",
  "}",
  "",
  "struct PlanTask: Identifiable {",
  "    let id = UUID()",
  "    var title: String",
  "    var reward: String",
  "    var isDone = false",
  "}",
];

const STOPS = [
  {
    name: { en: "What an app is", zh: "什么是 App" },
    desc: { en: "Understand · no code", zh: "先懂 · 零代码" },
  },
  {
    name: { en: "Watch it grow", zh: "看它长大" },
    desc: { en: "Watch · nine steps", zh: "再看 · 九步慢动作" },
  },
  {
    name: { en: "Write it yourself", zh: "亲手写" },
    desc: { en: "Practice · 8 blanks", zh: "动手 · 填空闯关" },
  },
  {
    name: { en: "Put it on your Mac", zh: "装进你的 Mac" },
    desc: { en: "For real · in Xcode", zh: "实战 · 真的 Xcode" },
  },
];

// ===== 界面文案 / Interface strings =====
// {a} {b} {beat} {n} 这类占位符由 app.js 的 fmt() 填充。
// Placeholders such as {a}, {b}, {beat}, {n} are filled in by fmt() in app.js.
const UI = {
  // --- 页面外壳 / page chrome (data-i18n in index.html) ---
  docTitle: { en: "SwiftLab · see an app take shape", zh: "SwiftLab · 看得见的 App" },
  tagline: { en: "See an app take shape", zh: "看得见的 App" },
  progressLabel: { en: "Your progress", zh: "学习进度" },
  progressCount: { en: "{n} / 4 done", zh: "{n} / 4 完成" },
  sideNote: {
    en: "Sister site: AgentLab · see inside an AI agent",
    zh: "姐妹站:AgentLab · 看得见的 Agent",
  },
  langAria: { en: "Language", zh: "语言" },
  gotIt: { en: "Got it", zh: "知道了" },

  // --- 第一站 / stop 1 ---
  s1Kicker: { en: "Stop 1 · understand", zh: "第 1 站 · 先懂" },
  s1Title: { en: "What an app is", zh: "什么是 App" },
  s1Sub: {
    en: "No code. Take apart the iCanDoIt you use every day and see its three parts.<br>Words with a dotted underline, like <span class=\"term\" data-k=\"view\">this one</span>, open a short explanation when you click them.",
    zh: "零代码。拆开你每天在用的 iCanDoIt,看清它的三个部分。<br>正文里<span class=\"term\" data-k=\"view\">这种带虚线的词</span>都可以点,弹出一段小白解释。",
  },
  prevScene: { en: "← Back", zh: "← 上一幕" },
  toStop2: { en: "Stop 2: watch it grow →", zh: "去第二站,看它长大 →" },

  // --- 第二站 / stop 2 ---
  s2Kicker: { en: "Stop 2 · watch", zh: "第 2 站 · 再看" },
  s2Title: { en: "Watch it grow", zh: "看它长大" },
  s2Sub: {
    en: "Nine steps in slow motion. On the left is the code (<span style=\"color:var(--mint)\">green</span> marks the lines this step adds). On the right is the app as it grows.",
    zh: "九步慢动作:左边是代码怎么写(<span style=\"color:var(--mint)\">绿色</span>是本步新增的行),右边是 App 长成了什么样。",
  },
  inXcode: { en: "In Xcode:", zh: "你在 Xcode 里:" },
  prevStep: { en: "← Back", zh: "← 上一步" },
  nextBeat: { en: "Next: {beat} →", zh: "下一拍:{beat} →" },
  toStop3: { en: "Stop 3: write it yourself →", zh: "去第三站,亲手写 →" },

  // --- 第三站 / stop 3 ---
  s3Kicker: { en: "Stop 3 · practice", zh: "第 3 站 · 动手" },
  s3Title: { en: "Write it yourself", zh: "亲手写" },
  s3Sub: {
    en: "Below is a small version of iCanDoIt with 8 blanks. Each blank teaches one idea first, then asks you to fill it in.<br>A wrong answer costs nothing. The explanation that follows it is part of the lesson.",
    zh: "下面是一个迷你版 iCanDoIt,挖了 8 个空。每个空先教一个新知识,再由你来填。<br>填错不扣分——跟着出现的解释本身就是这一课的一部分。",
  },
  blankOf: { en: "Blank {a} of {b}", zh: "第 {a} / {b} 空" },
  showAnswer: { en: "🫣 Show the answer", zh: "🫣 看答案" },
  correct: { en: "✅ Correct. <b>{filled}</b> is now in the code above.", zh: "✅ 正确!<b>{filled}</b> 已经填进上面的代码里。" },
  revealed: {
    en: "The answer is <b>{filled}</b>. Read the card above once more before you move on.",
    zh: "答案是 <b>{filled}</b>。没关系,回头再把上面那张知识卡看一遍,印象会更深。",
  },
  s3DoneTitle: { en: "Eight blanks, all filled in by you", zh: "八个空,全部是你自己填的" },
  s3DoneBody: {
    en: "The code above is complete. It is real Swift, character for character.<br>Press Run to see what it does.",
    zh: "上面这份代码已经完整,和真正能跑的 Swift 一字不差。<br>点「运行」,看看它跑起来什么样。",
  },
  s3Run: { en: "▶ Run your code", zh: "▶ 运行你的代码" },
  s3RunNext: {
    en: "Every word you filled in is real Swift.<br>Last stop: put it into Xcode and run it on your own Mac.",
    zh: "你刚才填的每一个词,都是真的 Swift,一字不差。<br>最后一站:把它装进真正的 Xcode,跑在你自己的 Mac 上。",
  },
  toStop4: { en: "Stop 4: put it on your Mac →", zh: "去第四站,装进你的 Mac →" },

  // --- 第四站 / stop 4 ---
  s4Kicker: { en: "Stop 4 · for real", zh: "第 4 站 · 实战" },
  s4Title: { en: "Put it on your Mac", zh: "装进你的 Mac" },
  s4Sub: {
    en: "The first three stops all happened in this browser. Now open the real [[xcode:Xcode]] and follow seven steps to run this app on your own computer.",
    zh: "前三站的一切都在浏览器里。现在打开真正的 [[xcode:Xcode]],七步,把这个 App 跑在你自己的电脑上。",
  },
  s4CodeLabel: {
    en: "ContentView.swift, the complete code (checked: it compiles ✓)",
    zh: "ContentView.swift 完整代码(已验证可编译 ✓)",
  },
  copyAll: { en: "📋 Copy all", zh: "📋 复制全部" },
  challenge: {
    en: "<b>🏆 Three things to try next (hints, not answers):</b><br>① Change the title to your own words. There is only one Text to find.<br>② Let a finished task be deleted. Hint: an array has an action called <b>remove(at:)</b>, and you need one more Button.<br>③ Give the Add button a different color. Hint: attach the <b>.tint(.pink)</b> modifier.",
    zh: "<b>🏆 进阶三连(不给答案,给提示):</b><br>① 把标题换成你自己的话——找到那个 Text 就行。<br>② 让完成的任务能被删除——提示:数组有个动作叫 <b>remove(at:)</b>,再配一个 Button。<br>③ 给「添加」按钮换个颜色——提示:试试挂一个 <b>.tint(.pink)</b> 修饰符。",
  },
  fullVersion: {
    en: "<b>📦 Want to see the full version?</b><br>The complete source of the real iCanDoIt is at <a href=\"https://github.com/renrenmimi/iCanDoIt\" target=\"_blank\" rel=\"noopener\">github.com/renrenmimi/iCanDoIt</a>: frosted glass, the confetti animation, streaks, and a heat map. Every file is there to read. Start with <b>Sources/iCanDoIt/Views/TodayView.swift</b>. You can already follow its structure.",
    zh: "<b>📦 想看豪华版?</b><br>正式版 iCanDoIt 的完整源码在 <a href=\"https://github.com/renrenmimi/iCanDoIt\" target=\"_blank\" rel=\"noopener\">github.com/renrenmimi/iCanDoIt</a>:毛玻璃、彩带动画、连击、热力图,每个文件都能打开读。建议从 <b>Sources/iCanDoIt/Views/TodayView.swift</b> 读起——你现在已经能看懂它的骨架了。",
  },
  s4Done: { en: "🎉 It runs!", zh: "🎉 我跑起来了!" },
  copied: { en: "Copied. Paste it into Xcode.", zh: "已复制,去 Xcode 里粘贴吧" },
  copyFailed: { en: "Copy failed. Select the code and copy it manually.", zh: "复制失败,请手动选中复制" },
  finishedToast: { en: "Well done. You have written a Mac app 🚀", zh: "恭喜!你已经是写过 Mac App 的人了 🚀" },

  // --- 模拟窗口 / mock windows ---
  tasksBadge: { en: "0 tasks", zh: "0 条任务" },
  demoReward: { en: "Iced coffee", zh: "一杯冰美式" },
  dockCaption: { en: "iCanDoIt.app · your own build", zh: "iCanDoIt.app · 你的作品" },
};

// 模拟窗口和打字演示用的示例任务 / sample tasks for the mock windows
const DEMO_TASKS = [
  { en: "Run 3 km", zh: "跑步 3 公里" },
  { en: "Read 20 pages", zh: "读 20 页书" },
  { en: "Call Mom", zh: "给妈妈打电话" },
];
