import express from "express";
import { dbConnect } from "./dbConnect.js";
import userRoutes from "./user/user.route.js"
import bookRoutes from "./book/book.route.js"
import cors from "cors";

const app = express();

app.use(cors({ origin: "*" }));
// to make app understand json
app.use(express.json());

// db connection
dbConnect();

// register routes
app.use(userRoutes);
app.use(bookRoutes);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});