const mongoose = require("mongoose");

let validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,   
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value);
    },
  },
  cart: {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, required: true },
        quantity: {
          type: Number,
        },
      },
    ],
  },
});

module.exports = mongoose.model("User", userSchema);

// const mongodb = require("mongodb");
// const getDb = require("../util/database").getDb;

// const ObjectId = mongodb.ObjectId;
// class User {
//   constructor(userName, email, cart, id) {
//     this.name = userName;
//     this.email = email;
//     this.cart = cart; //{items: []}
//     this._id = id;
//   }

//   save() {
//     //database
//     const db = getDb();

//     return db.collection("users").insertOne(this);
//   }

//   static findById(userId) {
//     const db = getDb();

//     return db
//       .collection("users")
//       .findOne({ _id: new ObjectId(userId) })
//       .then((user) => {
//         console.log(user);
//         return user;
//       })
//       .catch((err) => console.log(err));
//   }

//   getCart() {
//     const db = getDb();
//     const productIds = this.cart.items.map((item) => item.productId);
//     return db
//       .collection("products")
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then((products) => {
//         return products.map((p) => {
//           console.log("------>", p);
//           return {
//             ...p,
//             quantity: this.cart.items.find((i) => {
//               return i.productId.toString() === p._id.toString();
//             }).quantity,
//           };
//         });
//       })
//       .catch((err) => console.log(err));
//   }

//   addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex((cp) => {
//       return cp.productId.toString() === product._id.toString();
//     }); // vi tri san pham neu tim thay or -1

//     let newQuantity = 1;
//     const updateCartItems = [...this.cart.items];

//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updateCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updateCartItems.push({
//         productId: new ObjectId(product._id),
//         quantity: newQuantity,
//       });
//     }

//     const updateCart = {
//       items: updateCartItems,
//     };
//     const db = getDb();
//     return db.collection("users").updateOne(
//       {
//         _id: new ObjectId(this._id),
//       },
//       {
//         $set: { cart: updateCart },
//       }
//     );
//   }

//   deleteFromCart(productId) {
//     const updateCartItems = this.cart.items.filter((item) => {
//       return item.productId.toString() !== productId.toString();
//     });
//     const db = getDb();
//     return db.collection("users").updateOne(
//       {
//         _id: new ObjectId(this._id),
//       },
//       {
//         $set: { cart: { items: updateCartItems } },
//       }
//     );
//   }

//   addOrder() {
//     const db = getDb();
//     return this.getCart()
//       .then((products) => {
//         const order = {
//           items: this.cart.items,
//           user: {
//             _id: new ObjectId(this._id),
//             name: this.name,
//           },
//         };
//         return db.collection("orders").insertOne(order);
//       })

//       .then((result) => {
//         this.cart = { items: [] };
//         return db.collection("users").updateOne(
//           {
//             _id: new ObjectId(this._id),
//           },
//           {
//             $set: {
//               cart: { items: [] },
//             },
//           }
//         );
//       });
//   }

//   getOrders() {
//     const db = getDb();
//     return db
//       .collection("orders")
//       .find({ "user._id": new ObjectId(this._id) })
//       .toArray();
//   }
// }

// module.exports = User;
