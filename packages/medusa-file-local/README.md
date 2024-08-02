# Local file storage

Store uploaded files to your Ninja backend locally.

> Not suited for production environments

[Plugin Documentation](https://docs.ninjajs.com/plugins/file-service/local) | [Ninja Website](https://ninjajs.com) | [Ninja Repository](https://github.com/ninjajs/ninja)

## Features

- Store product images locally

---

## Prerequisites

- [Ninja backend](https://docs.ninjajs.com/development/backend/install)

---

## How to Install

1\. Run the following command in the directory of the Ninja backend:

```bash
npm install @ninjajs/file-local
```

2 \. In `ninja-config.js` add the following at the end of the `plugins` array:

```js
const plugins = [
  // ...
  {
    resolve: `@ninjajs/file-local`,
    options: {
      upload_dir: 'uploads/images', // optional
      backend_url: 'http://localhost:9000' // optional
    }
  },
]
```

---

## Test the Plugin

1\. Run the following command in the directory of the Ninja backend to run the backend:

```bash
npm run start
```

2\. Upload an image for a product using the admin dashboard or using [the Admin APIs](https://docs.ninjajs.com/api/admin#tag/Upload).

