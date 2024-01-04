---
status: new
---

# Routing



## Dynamic Routes

To use dynamic routes, simply follow the pattern of being in a directory, following the `[parameter]` convention.

For example, I have a listing of products and I want to access a specific product page.

``` title="File Structure"
src/views/
├── Product
│   ├── [id].js
│   └── [id].jsx
└── Products
    ├── Products.js
    └── Products.jsx
```

Where the id will be our parameter, and to navigate to the product with id 12345, just follow the format `/(Relative path in the view)/:PARAMETER`, in our example our route will be `/Product/:id`

```js title="Call in Eitri-app"
Eitri.navigation.navigate({
  path: "/Product/12345",
});
```