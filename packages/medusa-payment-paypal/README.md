# PayPal

Receive payments on your Ninja commerce application using PayPal.

[PayPal Plugin Documentation](https://docs.ninjajs.com/plugins/payment/paypal) | [Ninja Website](https://ninjajs.com/) | [Ninja Repository](https://github.com/ninjajs/ninja)

## Features

- Authorize payments on orders from any sales channel.
- Capture payments from the admin dashboard.
- View payment analytics through PayPal's dashboard.
- Ready-integration with [Ninja's Next.js starter storefront](https://docs.ninjajs.com/starters/nextjs-ninja-starter).
- Support for Webhooks.

---

## Prerequisites

- [Ninja backend](https://docs.ninjajs.com/development/backend/install)
- [PayPal account](https://www.paypal.com)

---

## How to Install

1\. Run the following command in the directory of the Ninja backend:

  ```bash
  npm install ninja-payment-paypal
  ```

2\. Set the following environment variables in `.env`:

  ```bash
  PAYPAL_SANDBOX=true
  PAYPAL_CLIENT_ID=<CLIENT_ID>
  PAYPAL_CLIENT_SECRET=<CLIENT_SECRET>
  PAYPAL_AUTH_WEBHOOK_ID=<WEBHOOK_ID>
  ```

3\. In `ninja-config.js` add the following at the end of the `plugins` array:

  ```js
  const plugins = [
    // ...
    {
      resolve: `ninja-payment-paypal`,
      options: {
        sandbox: process.env.PAYPAL_SANDBOX,
        client_id: process.env.PAYPAL_CLIENT_ID,
        client_secret: process.env.PAYPAL_CLIENT_SECRET,
        auth_webhook_id: process.env.PAYPAL_AUTH_WEBHOOK_ID,
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

2\. Enable PayPal in a region in the admin. You can refer to [this User Guide](https://docs.ninjajs.com/user-guide/regions/providers) to learn how to do that. Alternatively, you can use the [Admin APIs](https://docs.ninjajs.com/api/admin#tag/Region/operation/PostRegionsRegion).

3\. Place an order using a storefront or the [Store APIs](https://docs.ninjajs.com/api/store). You should be able to use Stripe as a payment method.

---

## Additional Resources

- [PayPal Plugin Documentation](https://docs.ninjajs.com/plugins/payment/paypal)
