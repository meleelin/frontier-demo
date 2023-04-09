# Random User

### 技術要求

之前沒有使用過 tailwind，但有用過 bootstrap，所以語法都蠻熟悉的，然後 tailwind 是手機優先開始撰寫，所以手機板不需要使用前綴詞。

### 會員資料

需要自己接會員資料，我找到一些 firebase 的教學，然後使用電子郵件 / 密碼來實作會員的註冊, 登入, 登出功能。

---

### 維持登入

如果有登入狀態的話，會回傳一個包含該使用者資料的物件，沒有則回傳 null。
有登入的話將會員資料存到 store, 用來判斷能否使用收藏功能跟切換收藏頁。

```javascript=
firebase.auth().onAuthStateChanged(currentUser => {
  if (currentUser) {
    // User is signed in.
  } else {
    // No user is signed in.
  }
});
```

---

### 我的收藏

在 firestore 建立一個集合叫 collected, 底下的文件 id 是會員的 uid, 文件底下有個欄位叫 collected 是個陣列，存的是收藏的 random User uuid。

```javascript=
if (collected.value.includes(uuid)) {
    // 如果已經被收藏過的, 則移除
    docRef.update({
      collected: firebase.firestore.FieldValue.arrayRemove(uuid),
    });
} else {
    // 沒有被收藏, 加進去
    docRef.update({
      collected: firebase.firestore.FieldValue.arrayUnion(uuid),
    });
}
```

---

### 重整頁面維持條件

我把一些變數存在 localStorage, 包含 currentPage(當前分頁), totalPage(總頁數), displayMode(顯示模式), count(每頁幾筆), filter(全部或收藏), 當程式執行的時候，先從 localStorage 抓出來，然後存在 store 裡面方便每個組件使用，重整頁面時會觸發 beforeUnload 這個事件，再把變數存回 localStorage。

---

### 切換分頁

從 random User 取得 3010 筆資料，然後存到 store 叫做 fetchData，然後再組件裡的 computed 對 fetchData 處理，用 slice 來切割陣列，用來顯示當前分頁的資料

```javascript=
const begin = (currentPage - 1) * count;
const end = currentPage * count;
const slice = fetchData.slice(begin, end);
```

---

### 切換幾筆

切換幾筆資料要重新計算有多少分頁，像是原本每頁 10 筆資料有 301 頁，切換到每頁 50 筆只剩 61
頁，然後如果當前分頁大於計算過後的總分頁，我會把當前分頁等於總分頁。

```javascript=
// 重新計算有多少分頁
const totalPage = Math.ceil(3010 / count);

// 如果當前分頁大於總分頁，當前分頁 = 總分頁
if (currentPage > totalPage) currentPage = totalPage
```

---

### 切換全部 / 收藏頁

store 中有個變數叫 filter，用來管理看全部還是收藏。

在 App.vue 中會先去取得會員的收藏紀錄，然後存到 store 中，叫做 collected，然後會跟 randomUser 的資料做比對，對 fetchData 做 filter，判斷跟 collected 這個陣列中有沒有這個 randomUser 的 uuid，如果不等於 -1，代表有這筆資料然後 return 資料，會產生一個新的陣列，是這個會員收藏過的 randomUser 資料，然後再去做 slice 顯示當前分頁的資料，總分頁也要重新計算。

```javascript=
const collectedArr = fetchData.value.filter((item) => {
const res = collected.value.indexOf(item.login.uuid);
if (res !== -1) return item;
});

slice = collectedArr.slice(begin, end);
totalPage = Math.ceil(collected.value.length / count.value);
```
