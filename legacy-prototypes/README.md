# ChainThread — Evidence First (Open Agent Hackathon 2026)

一句话：Lifechain × ETH 切片 — 评委可以为一个地址存下一条推理；当该地址出现新的链上活动时，存过的推理被带回来，评委决定保留还是修正它。

## 评委动手旅程（5 步以内）

1. 用浏览器打开 `index.html`（ChainThread 主流程原型，双语，默认英文）。
2. 按页面内四步走：贴材料 → 确认理解 → 条件与回放 → 复核与保存。
3. 在复核步决定保留或修正判断；修正后存为带来源的新版本（复核版本存在浏览器 localStorage，可导出 markdown 研究简报）。
4. 打开 `graph-mock.html`（钱包关系图谱 mock，辅助视觉参考）：用模拟控件走种子态 → 触发态 → 记忆关对照 → 复核后四态。
5. 重跑：刷新页面即可重走流程。

## 诚实状态

- 真实接通：Zetaris `eth_transactions` 表已通过官方 09 脚本注册并验证（AWS_BLOCKCHAIN_S3，22 列，仅 2026-09-01 一个分区，2,013,158 行，LIMIT 10 跑通，CACHE 未跑，金额单位为 Wei、展示需换算 ETH）。注意：本 repo 内的 demo **未直连** Zetaris / Nemotron / H-MEM，演示数据全部为合成数据。
- 合成/模拟：ChainThread demo 全程 8 笔合成交易（非真实哈希）；图谱 mock 的触发与开关均为模拟按钮，不是规则计算。
- 已知未完成：第二场景未定；四个可操作错误态（数据缺失 / 查询失败 / 模型不可用 / 保存失败）未实现；规则测试（去重 / 边界 / 回退）未跑；H-MEM conformance 套件与端到端测试（证明记忆确实改变复核结果）未跑，均不宣称已过；演示视频未提供。
- 本 repo 只含为比赛新造的 ChainThread 产物，不含 Lemon / Unseen 生产系统源码。

## 运行方式

静态 HTML，直接用现代浏览器打开即可，无需构建、无需 Node / npm。

## 评分对照

Impact / Technical / Innovation / Demo / Product / Sponsor tech — Sponsor tech 只写实际选定的引擎：H-MEM 为已选首选引擎（覆盖完整生命周期；conformance 未跑，不宣称已过）。
