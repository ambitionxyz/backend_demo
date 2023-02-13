const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const errorController = require("./controllers/error");

const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");

app.set("views", "views");

const adminRoutes = require("./routes/admin");

const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   User.findById("63e758561f582ded2f08fb6e")
//     .then((user) => {
//       req.user = new User(user.name, user.email, user.cart, user._id); //1 obj có thuộc tịnh _id có thể truyền xuống thông qua next
//       next();
//     })
//     .catch((err) => console.log(err));
// });

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://luanhq:luan23102001@cluster0.iasl7oa.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    const user = new User({
      name: "LuanHQ",
      email: "luanhq@gmail.com",
      cart: {
        items: [],
      },
    });
    user
      .save()
      .then()
      .catch((err) => console.log(err));

    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
