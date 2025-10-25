# naria

[![npm version](https://img.shields.io/npm/v/naria-ui?style=flat-square)](https://www.npmjs.com/package/naria-ui)
[![npm downloads](https://img.shields.io/npm/dm/naria-ui?style=flat-square)](https://www.npmjs.com/package/naria-ui)
[![GitHub](https://img.shields.io/badge/github-JanardanPethani%2Fnaria-blue?logo=github&style=flat-square)](https://github.com/JanardanPethani/naria)

<!-- Add a license badge if you add a LICENSE file, e.g. MIT:
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
-->

Generate emojis, GIFs, and stickers as per user mood.

---

## ✨ Features

- Generate mood-based emojis, memes, and slogans
- React component for easy integration
- No configuration required

---

## 📦 Installation

```bash
npm install naria-ui
```

---

## 🚀 Usage

Here's a simple example using the main `Chat` component in your React app:

```tsx
import React from "react";
import { Chat } from "naria-ui";

function App() {
  return (
    <div>
      <h1>naria Demo</h1>
      <Chat />
    </div>
  );
}

export default App;
```

The `Chat` component provides a floating button. Click it, enter your mood, and get relevant emojis, memes, and slogans instantly!

---

## 📚 API

- **`<Chat />`**  
  A ready-to-use React component for mood-based emoji, meme, and slogan generation.

- **`generateResponse(input: string): Promise<{ memes: string[], emojis: string[], slogans: string[] }>`**  
  Utility function to generate content programmatically.

---

## 🛠 Configuration

No configuration or environment variables are required.

---

## 🤝 Contributing & Support

Maintained by [Janardan Pethani](https://janardanpethani.in)  
Email: jpethani11@gmail.com  
GitHub: [JanardanPethani/naria](https://github.com/JanardanPethani/naria)

Feel free to open issues or pull requests!

---

## 📄 License

_This project currently does not specify a license. To make your project open source, add a LICENSE file and badge!_

---

> _Generated with ❤️ by [Janardan Pethani](https://janardanpethani.in)_
