# Segment

Track essential commerce analytics with Segment.

[Segment Plugin Documentation](https://docs.ninjajs.com/plugins/analytics/segment) | [Ninja Website](https://ninjajs.com) | [Ninja Repository](https://github.com/ninjajs/ninja)

## Features

- Automatic analytics tracking for events related to Orders, Swaps, and Claims.
- Flexibility to track analytics for custom events or operations.

---

## Prerequisites

- [Ninja backend](https://docs.ninjajs.com/development/backend/install)
- [Segment account](https://app.segment.com/signup)

---

## How to Install

1\. Run the following command in the directory of the Ninja backend:

  ```bash
  npm install ninja-plugin-segment
  ```

2\. Set the following environment variable in `.env`:

  ```bash
  SEGMENT_WRITE_KEY=<YOUR_SEGMENT_WRITE_KEY>
  ```

3\. In `ninja-config.js` add the following at the end of the `plugins` array:

  ```js
  const plugins = [
    // ...
    {
      resolve: `ninja-plugin-segment`,
      options: {
        write_key: process.env.SEGMENT_WRITE_KEY,
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

2\. Place an order using a storefront or the [Store APIs](https://docs.ninjajs.com/api/store). You should see the event tracked in Segment.

---

## Additional Resources

- [Segment Plugin Documentation](https://docs.ninjajs.com/plugins/analytics/segment)
