const cors = require("cors");
const express = require("express");
const Router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const { mongoConnect } = require("./configs/mongoConnection");
const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(Router);


// Jadi sekarang sebelum masuk ke routing di bawah,
// kita harus koneksi ke db kita terlebih dahulu
(async () => {
    try {
      await mongoConnect();
      app.listen(port, (_) => console.log(`Apps is listening at port ${port}`));
    } catch (err) {
      console.log(`Failed to connect to mongodb`);
    }
  })();





