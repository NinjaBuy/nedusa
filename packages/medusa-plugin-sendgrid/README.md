# SendGrid

Handle sending emails to customers related to orders, restock notifications, users, or custom events.

[SendGrid Plugin Documentation](https://docs.ninjajs.com/plugins/notifications/sendgrid) | [Ninja Website](https://ninjajs.com) | [Ninja Repository](https://github.com/ninjajs/ninja)

## Features

- Send emails when an event related to orders, restock notifications, or users is triggered.
- Use dynamic templates in SendGrid to build the emails to be sent.
- Send emails with SendGrid for custom events.

---

## Prerequisites

- [Ninja backend](https://docs.ninjajs.com/development/backend/install)
- [SendGrid account](https://signup.sendgrid.com/)

---

## How to Install

1\. Run the following command in the directory of the Ninja backend:

  ```bash
  npm install ninja-plugin-sendgrid
  ```

2\. Set the following environment variable in `.env`:

  ```bash
  SENDGRID_API_KEY=<API_KEY>
  SENDGRID_FROM=<SEND_FROM_EMAIL>
  # IDs for different email templates
  SENDGRID_ORDER_PLACED_ID=<ORDER_PLACED_TEMPLATE_ID> # example
  ```

3\. In `ninja-config.js` add the following at the end of the `plugins` array:

  ```js
  const plugins = [
    // ...,
    {
      resolve: `ninja-plugin-sendgrid`,
      options: {
        api_key: process.env.SENDGRID_API_KEY,
        from: process.env.SENDGRID_FROM,
        order_placed_template: 
          process.env.SENDGRID_ORDER_PLACED_ID,
        localization: {
          "de-DE": { // locale key
            order_placed_template:
              process.env.SENDGRID_ORDER_PLACED_ID_LOCALIZED,
          },
        },
      },
    },
  ]
  ```

---

## Test the Plugin

1\. Run the following command in the directory of the Ninja backend to run the backend:

  ```bash
  npm run start
  ```

2\. Place an order using a storefront or the [Store APIs](https://docs.ninjajs.com/api/store). You should receive a confirmation email.

---

## Additional Resources

- [SendGrid Plugin Documentation](https://docs.ninjajs.com/plugins/notifications/sendgrid)
