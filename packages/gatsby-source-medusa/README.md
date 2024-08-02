<p align="center">
  <a href="https://www.ninjajs.com">
    <img alt="Ninja" src="https://user-images.githubusercontent.com/7554214/129161578-19b83dc8-fac5-4520-bd48-53cba676edd2.png" width="100" />
  </a>
</p>
<h1 align="center">
  gatsby-source-ninja
</h1>
<p align="center">
Ninja is an open-source headless commerce engine that enables developers to create amazing digital commerce experiences. This is a Gatsby source plugin for building websites using Ninja as a data source.
</p>
<p align="center">
  <a href="https://github.com/ninjajs/ninja/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Ninja is released under the MIT license." />
  </a>
  <a href="https://github.com/ninjajs/ninja/blob/master/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=ninjajs">
    <img src="https://img.shields.io/twitter/follow/ninjajs.svg?label=Follow%20@ninjajs" alt="Follow @ninjajs" />
  </a>
</p>

## Note

We're not actively maintaining this repository. So, it may not work as expected with the latest versions of Ninja. Contributions are highly appreciated.**

## Quickstart

This takes you through the minimal steps to see your Ninja data in your Gatsby site's GraphiQL explorer.

### 1. Installation

Install the source plugin to your Gatsby project using your favorite package manager.

```shell
npm install gatsby-source-ninja
```

```shell
yarn add gatsby-source-ninja
```

### 2. Configuration

Add the plugin to your `gatsby-config.js`:

```js:title=gatsby-config.js
require("dotenv").config()

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-ninja",
      options: {
        storeUrl: process.env.NINJA_URL,
        authToken: process.env.NINJA_AUTH_TOKEN //This is optional
      },
    },
    ...,
  ],
}
```

The plugin accepts two options `storeUrl` and `authToken`. The `storeUrl` option is required and should point to the server where your Ninja instance is hosted (this could be `localhost:9000` in development). The `authToken` option is optional, and if you add it the plugin will also source orders from your store.

## You should now be ready to begin querying your data

You should now be able to view your stores `NinjaProducts`, `NinjaRegions`, `NinjaCollections`, and `NinjaOrders` (if enabled) in your Gatsby site's GraphiQL explorer.
