# JavaScript & React コードレシピ集

この資料は、初めてのプロダクト開発（SNS開発など）で「やりたいこと」を実現するための最小限のコードパターンをまとめたものです。

---

# Part 1: JavaScript 基礎レシピ
(DOM操作を中心とした基本パターン)

## 1. ユーザーの入力を受け取る
(既存のコードと同じ)
```javascript
const input = document.getElementById('username');
const button = document.getElementById('btn');

button.addEventListener('click', () => {
  const value = input.value;
  alert(`こんにちは、${value}さん！`);
});
```

## 2. 画面に要素を追加する（投稿機能）
```javascript
const list = document.getElementById('post-list');
const addBtn = document.getElementById('add-btn');

addBtn.addEventListener('click', () => {
  const newItem = document.createElement('li');
  newItem.textContent = '新しい投稿メッセージです';
  list.appendChild(newItem);
});
```

## 3. 見た目を動的に変える（「いいね」ボタン）
```javascript
const likeBtn = document.getElementById('like-btn');

likeBtn.addEventListener('click', () => {
  likeBtn.classList.toggle('active');
});
```

## 4. データを一時的に保存する
```javascript
localStorage.setItem('my_post', '投稿内容のメモ');
const savedPost = localStorage.getItem('my_post');
```

## 5. 条件によって表示を変える
```javascript
const posts = ['JavaScript最高', '今日は晴れ', 'プログラミング楽しい'];
const filtered = posts.filter(post => post.includes('プロ'));
```

---

# Part 2: React 実践レシピ
(モダンなコンポーネント開発のパターン)

## 1. 状態を管理する (useState)
画面上で変化するデータ（数字や文字）を扱う基本中の基本です。

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // [現在の値, 更新するための関数]

  return (
    <div>
      <p>いいね数: {count}</p>
      <button onClick={() => setCount(count + 1)}>いいね！</button>
    </div>
  );
}
```
**使い所:** カウンター、入力フォームの値、表示/非表示の切り替えなど。

## 2. リストを表示する (map)
配列データから、複数のコンポーネントを自動的に生成します。

```jsx
function PostList() {
  const posts = [
    { id: 1, content: '初投稿です！' },
    { id: 2, content: 'React勉強中' }
  ];

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.content}</li>
      ))}
    </ul>
  );
}
```
**使い所:** 投稿一覧、ユーザー一覧、コメント欄の表示など。

## 3. 入力内容と画面を同期する (双方向バインディング)
ユーザーが入力した文字をリアルタイムで取得・表示します。

```jsx
function InputExample() {
  const [text, setText] = useState('');

  return (
    <div>
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
      />
      <p>入力内容: {text}</p>
    </div>
  );
}
```
**使い所:** 投稿フォーム、プロフィール編集、検索バー。

## 4. コンポーネントを使い回す (Props)
共通の見た目を「部品」として作り、中身だけ変えて再利用します。

```jsx
// 部品（子コンポーネント）
function Card({ title, content }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}

// 使う側（親コンポーネント）
function App() {
  return (
    <div>
      <Card title="お知らせ" content="明日は休みです" />
      <Card title="重要" content="宿題を忘れずに" />
    </div>
  );
}
```
**使い所:** 投稿カード、ボタン、ヘッダー、プロフィールアイコンなど。

## 5. 条件で表示を分ける (三項演算子)
「ログインしている時だけボタンを出す」といった切り替えを行います。

```jsx
function LoginButton({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <button>ログアウト</button>
      ) : (
        <button>ログイン</button>
      )}
    </div>
  );
}
```
**使い所:** ログイン状態、データの読み込み中表示（Loading）、エラー表示。

---

**学びのアドバイス:**
すべてを暗記する必要はありません。「こういう時はこう書く」というレシピとして手元に置き、必要に応じてコピペして改造することから始めてください。
