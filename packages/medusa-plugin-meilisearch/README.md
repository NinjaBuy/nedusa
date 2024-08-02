# MeiliSearch

Provide powerful indexing and searching features in your commerce application with MeiliSearch.

[MeiliSearch Plugin Documentation](https://docs.ninjajs.com/plugins/search/meilisearch) | [Ninja Website](https://ninjajs.com) | [Ninja Repository](https://github.com/ninjajs/ninja)

## Features

- Flexible configurations for specifying searchable and retrievable attributes.
- Ready-integration with [Ninja's Next.js starter storefront](https://docs.ninjajs.com/starters/nextjs-ninja-starter).
- Utilize MeiliSearch's powerful search functionalities including typo-tolerance, synonyms, filtering, and more.

---

## Prerequisites

- [Ninja backend](https://docs.ninjajs.com/development/backend/install)
- [MeiliSearch instance](https://docs.meilisearch.com/learn/getting_started/quick_start.html#setup-and-installation)

---

## How to Install

1\. Run the following command in the directory of the Ninja backend:

  ```bash
  npm install ninja-plugin-meilisearch
  ```

2\. Set the following environment variables in `.env`:

  ```bash
  MEILISEARCH_HOST=<YOUR_MEILISEARCH_HOST>
  MEILISEARCH_API_KEY=<YOUR_MASTER_KEY>
  ```

3\. In `ninja-config.js` add the following at the end of the `plugins` array:

  ```js
  const plugins = [
    // ...
    {
      resolve: `ninja-plugin-meilisearch`,
      options: {
        config: {
          host: process.env.MEILISEARCH_HOST,
          apiKey: process.env.MEILISEARCH_API_KEY,
        },
        settings: {
          products: {
            indexSettings: {
              searchableAttributes: [
                "title", 
                "description",
                "variant_sku",
              ],
              displayedAttributes: [
                "title", 
                "description", 
                "variant_sku", 
                "thumbnail", 
                "handle",
              ],
            },
            primaryKey: "id",
            transformer: (product) => ({
              id: product.id, 
              // other attributes...
            }),
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

2\. Try searching products either using your storefront or using the [Store APIs](https://docs.ninjajs.com/api/store#tag/Product/operation/PostProductsSearch).

---

## Additional Resources

- [MeiliSearch Plugin Documentation](https://docs.ninjajs.com/plugins/search/meilisearch)
