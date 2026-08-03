# CLAUDE.md — SwiftLab

Swift 零基础教学站的项目背景。新会话先读完这份再动手。

## 这是什么

**SwiftLab(看得见的 App)**:教项目主人(零基础、非程序员)看懂并亲手做出
他自己的 macOS App「iCanDoIt」(源码在 ../icandoit)。
教学模式完全参考姐妹站 ../AgentLab(先懂 → 再看 → 亲手写 的闭环 +
术语词典 + 挖空闯关 + 针对性纠错),核心结论一句话:**界面 = f(数据)**。

## 关键决策

- **纯静态**(HTML/CSS/vanilla JS),双击 index.html 即用。
  刻意不用 AgentLab 的 Next.js——用户是非程序员,不给他任何命令行负担。
- 只有中文,无 i18n(AgentLab 有双语,这里不需要)。
- 视觉与 iCanDoIt 正式版同一套语言:深色玻璃、极光、紫粉渐变
  (用户审美见 icandoit 项目记忆:极透毛玻璃、弹簧动画、忌保守)。
- 第四站的完整代码**必须保持可编译**——改动后用
  `swiftc -parse-as-library` 包一层 @main App 验证过再发布。
- 教学代码是简化版(单文件 ContentView,[String]/PlanTask),
  刻意不含正式版的 SwiftData/毛玻璃/动画,降低认知负担;
  第四站末尾指路 ../icandoit 看豪华版源码。

## 结构

- `data.js` 全部内容:GLOSSARY(术语)/ S1(六幕)/ S2(九步,含 mock 类型)/
  S3_LINES+S3_BLANKS(挖空,⟦n⟧ 是空位标记)/ S4_STEPS+S4_CODE / STOPS
- `app.js` 逻辑:render() 按 P.stop 分发;进度存 localStorage key `swiftlab`;
  语法高亮 hl() 是简易正则版(字符串→注释→@属性→关键字→类型)
- mock 交互:S2 第 5 步自动演示打字动画(runAddDemo,切步时 clearDemo),
  第 7/8 步圆圈可点击打勾
- 正文写 HTML,`[[key:词]]` 经 rich() 变成可点术语

## 预览/测试

.claude/launch.json 里有 python http.server 配置(8123 端口),
用 Browser 预览工具测;测完记得 `localStorage.removeItem('swiftlab')`
清掉测试进度,别污染用户的学习记录。
