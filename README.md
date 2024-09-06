# Klontong, the Fullstack Project

A small general store (toko klontong) wants to enter the 21st century by selling their products online.

### Details

Basically:

> As the child of the general store owner, I need to manage the products we sell in a table.

From an engineer’s perspective, think of this as just a CRUD application.

Here is the stack you need to use for this project:

- Vue
- ~~Vuex~~ Pinia
- NestJS
- PostgreSQL
- TypeScript

### More Technical Details

The entire team has agreed on some technical specifications and limitations:

- All request and response payloads will be in JSON format.
- There will be a data schema.
- There are about 100 products that need to be managed; use pagination techniques.
- The specified pages are:
  - List all products
  - Product details
  - Add product
  - Login/Register
- State persistence, where data is not lost upon refresh, for example: using Local Storage.

- Responsive UI/UX, in Indonesia, most people buying from an online general store use mobile phones.

- Search functionality on the products page.


Example schema:

```json
{
  "id": 86,
  "CategoryId": 14,
  "categoryName": "Snacks",
  "sku": "MHZVTK",
  "name": "Ciki ciki",
  "description": "Delicious Ciki ciki, only at our general store",
  "weight": 500,
  "width": 5,
  "length": 5,
  "height": 5,
  "image": "https://cf.shopee.co.id/file/7cb930d1bd183a435f4fb3e5cc4a896b",
  "price": 30000
}
```
### Notes

KISS (Keep It Simple Stupid) - Don’t forget, the target audience might not be the most internet savvy.

### Important Notice!

- Please create instruction steps for running the program and the testing flow.

- Make sure there is a user available for testing and provide login information in your ReadMe, along with the .env file.

- Ensure that there are seeders for the products.
### What We Care About

Use any libraries you usually use if this were a real production application. Code design and cleanliness are more important than choosing the "right" library. Always strive to use best practices!

Oh, and we don't care much about Internet Explorer, so no need to build for this.

We do not accept tests created using templates. We want to see how you would go about building a product from scratch!
Happy coding!

Please submit your finished test to [bit.ly/4cWYsiX](https://bit.ly/4cWYsiX)
