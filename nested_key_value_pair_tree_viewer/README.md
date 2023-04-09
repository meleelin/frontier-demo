# Nested Key-Value Pair Tree Viewer

## 如何執行專案

```zsh=
# clone 下來後，安裝 dependencies 的套件
yarn

# 本地開發和測試應用程式
yarn dev

# 編譯，打包程式碼
yarn build

```

---

### 遞迴組件樹

右邊的預覽區類似資料夾的結構，可以用遞迴組件的方式實現，指的是同一個組件不斷地引用自己，造成一層包著一層組件的情況，直到該元件沒有滿足 v-if 的要求，代表遞迴結束。

### 字串切割 / 轉成 tree 結構

我們需要把 key 裡的值做字串切割

```javascript=
const key = [
  "nav.header.creator",
  "nav.icon",
  "nav.header.product",
  "common.feature.experience"
];


const keySplit = key.map((item) => item.split("."))

// output
// keySplit = [
//   [ 'nav', 'header', 'creator' ],
//   [ 'nav', 'icon' ],
//   [ 'nav', 'header', 'product' ],
//   [ 'common', 'feature', 'experience' ]
// ]
```

將字串切割好的陣列帶到另一個函式 arrayToTree 中，需要帶入兩個參數進行轉換

- keyArray (字串切割後的陣列)
- valueArray (輸入 value 的陣列)

需要留意的點：

- 最外層沒有 name 和 children 屬性。
- 由最外層的下一層開始，直至最內層之前，都有 name 和 children 屬性。
- 最內層沒有 children 屬性，但有 value 屬性。

轉換完後會回傳 treeNode，交給 Menu 去跑遞迴。
