# Telegram Mini Apps Demo

Welcome to our guide on developing Telegram Mini Apps! Telegram Mini Apps offer a seamless way to enhance user interaction within the Telegram ecosystem, allowing businesses, developers, and creators to integrate custom web applications directly into Telegram chats. These lightweight, highly interactive web apps can be accessed through special menu buttons or inline buttons in messages, providing users with a rich and immersive experience without ever leaving the chat interface. 

Reach out if you need custom telegram mini app development or support. 
<p align="left">

  <a href="https://t.me/yannikheinze" alt="Telegram" target="_blank">
    <img src="https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=WhatsApp&logoColor=%231c1914" />
  </a>

  <a href="mailto:hello@softstack.io" alt="mail" target="_blank">
    <img src="https://img.shields.io/badge/-Mail-f5f1ea?style=for-the-badge&logo=gmail&logoColor=%231c1914" />
  </a>

  <a href="https://www.linkedin.com/company/softstack" alt="LinkedIn" target="_blank">
    <img src="https://img.shields.io/badge/-LinkedIn-f5f1ea?style=for-the-badge&logo=Linkedin&logoColor=%231c1914" />
  </a>
  
  <a href="https://softstack.io" alt="Website" target="_blank">
    <img src="https://img.shields.io/badge/-Website-f5f1ea?style=for-the-badge&logo=nextdotjs&logoColor=%231c1914" />
  </a>
</p>

## Why Telegram Mini Apps?

Telegram Mini Apps are an innovative way to engage with your audience, offering various benefits:

- **Seamless Integration**: Directly integrate your services into Telegram, one of the most popular messaging platforms with millions of active users.
- **Enhanced User Experience**: Provide users with interactive and sophisticated web apps without the need for separate downloads or installations.
- **Versatility**: From e-commerce and customer support to games and quizzes, the possibilities are endless.
- **Rapid Development**: With the support for web technologies, developers can quickly create and deploy Mini Apps.

## Getting Started

This repository serves as a starter guide for anyone looking to develop Telegram Mini Apps. Whether you're a seasoned developer or just starting out, our resources will help you understand the essentials and best practices for creating engaging Mini Apps within Telegram.

## Links
* Official docs: [https://core.telegram.org/bots/webapps](https://core.telegram.org/bots/webapps)
* Telegram Promo Bot: [Durger King](https://t.me/durgerkingbot)
  
## Quick setup

#### 0. Host the Web App in GitHub Pages

The Web App must be hosted somewhere. Hosting it on a GitHub repository is a quick, free way to do it:

1. Create a repository (or fork this one)
2. On the repository: Settings > Pages:
    - Source: Deploy from a branch
    - Branch: master, / (root), Save
3. Wait a few minutes for the web to be deployed. It will be available at: `https://{github-username}.github.io/{repository-name}/{location-inside-repository}`

#### 1. Show the user a button to open a Web App. There are two ways:

1. Show the user a special menu button (near the message input field):
    1. Go to [Bot Father](https://t.me/BotFather)
    2. Select your bot
    3. `Bot Settings` — `Menu Button` — `Specify..`/`Edit menu button URL`
    4. Send a URL to your Web App (in this case, `https://{github-username}.github.io/{repository-name}/index.html`)

2. The second way is to send a button with the data that contains field `web_app` with a URL to a Web App:
    ```json
    {
        "text": "Test web_app",
        "web_app": {
            "url": "https://{github-username}.github.io/{repository-name}/index.html"
        }
    }
    ```

#### 2. Add script to your Web App

To connect a Web App to the Telegram client, place the script `telegram-web-app.js` in the `<head>` tag before any other scripts, using this code ([more info](https://core.telegram.org/bots/webapps#initializing-web-apps)):
```html
<script src="https://telegram.org/js/telegram-web-app.js"></script>
```

Once the script is connected, a `window.Telegram.WebApp` object will become available.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


### Support and Custom Development

Need custom development or have questions about Telegram Mini Apps? Softstack is here to help. Reach out to us for bespoke development services, consultation, or any inquiries related to Telegram Mini Apps and the TON ecosystem. Our team is committed to providing the support and expertise you need to succeed.

Let's build something great together.

<p align="left">

  <a href="https://t.me/yannikheinze" alt="Telegram" target="_blank">
    <img src="https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=WhatsApp&logoColor=%231c1914" />
  </a>

  <a href="mailto:hello@softstack.io" alt="mail" target="_blank">
    <img src="https://img.shields.io/badge/-Mail-f5f1ea?style=for-the-badge&logo=gmail&logoColor=%231c1914" />
  </a>

  <a href="https://www.linkedin.com/company/softstack" alt="LinkedIn" target="_blank">
    <img src="https://img.shields.io/badge/-LinkedIn-f5f1ea?style=for-the-badge&logo=Linkedin&logoColor=%231c1914" />
  </a>
  
  <a href="https://softstack.io" alt="Website" target="_blank">
    <img src="https://img.shields.io/badge/-Website-f5f1ea?style=for-the-badge&logo=nextdotjs&logoColor=%231c1914" />
  </a>
</p>
