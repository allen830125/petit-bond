# CLAUDE.md — Petit Bond 專案指引

## 專案概述

Petit Bond 是一個手作寵物飾品電商，採 MVP 架構。
一人開發，使用 Next.js App Router + MySQL + Claude AI。

## 技術棧

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **ORM**: Prisma + MySQL
- **Auth**: NextAuth.js
- **AI**: Anthropic Claude API（商品描述自動生成）
- **Deploy**: Vercel（app）+ Railway（MySQL）

## 專案結構

```
app/
├── (store)/          # 買家前台（公開）
│   ├── page.tsx      # 首頁 / 作品集
│   └── inquiry/      # 預購表單
├── admin/            # 賣家後台（需登入）
│   ├── login/
│   └── products/     # 商品管理
├── api/              # API routes
│   ├── auth/
│   ├── products/
│   └── ai/           # Claude API 描述生成
prisma/
└── schema.prisma
```

## 開發規範

- 元件使用 TypeScript，props 必須定義型別
- 樣式使用 Tailwind CSS v4，不寫 inline style
  - ⚠️ **Tailwind v4 配置差異**：顏色變數、主題設定改在 `app/globals.css` 的 `@theme` 區塊，**不在 tailwind.config**
- API routes 放在 `app/api/` 下
- 資料庫操作統一透過 Prisma Client
- 環境變數從 `.env.local` 讀取，不可 hardcode
- 驗證改動時只跑 `lint`（例如 `npm run lint`），不要使用 `run` skill 啟動 dev server

## 環境變數

```env
DATABASE_URL=        # MySQL 連線字串（Railway 提供）
ANTHROPIC_API_KEY=   # Claude API key
NEXTAUTH_SECRET=     # 隨機字串
NEXTAUTH_URL=        # 部署後的網址
```

## MVP 功能範圍

### 買家端（公開頁面）
- [ ] 首頁：作品集展示（商品圖 + 故事描述）
- [ ] 預購表單：姓名、Email、商品、備註

### 賣家後台（需登入）
- [ ] 登入頁
- [ ] 新增商品：名稱、圖片、價格、描述
- [ ] AI 一鍵生成商品描述（Claude API）
- [ ] 商品列表管理

### 不在 MVP 範圍內
- 金流 / 線上付款
- 會員系統
- 庫存管理
- 訂單追蹤

## 當前進度

- [x] 專案初始化
- [x] README / CLAUDE.md 建立
- [ ] Phase 2：買家前台頁面
- [ ] Phase 3：賣家後台
- [ ] Phase 4：AI 描述生成
- [ ] Phase 5：Vercel 部署
