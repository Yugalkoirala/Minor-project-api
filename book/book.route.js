import express from "express";
import { isUser } from "../auth/auth.middleware.js";
import { Book } from "./book.model.js";
import { addBookValidationSchema, paginationDetailsValidationSchema } from "./book.validation.js";
import mongoose from "mongoose";

const router = express.Router();

// add book
router.post("/book/add", isUser, async (req, res) => {

    // extract book from req.body
    const newBook = req.body;

    // newBook.ownerId = req?.loggedInUser?._id;

    // Append image URL to newBook object
    // newBook.image = req.file.filename;

    // validate book using Joi
    try {
        await addBookValidationSchema.validateAsync(newBook);
    } catch (error) {
        // if validation fails, terminate
        return res.status(400).send({ message: error.message });
    }

    // add owner id
    newBook.ownerId = req?.loggedInUser?._id;

    // create new book
    await Book.create(newBook);

    // send response
    return res.status(201).send({ message: "Book is added successfully" });
});

// delete book
router.delete("/book/delete/:id", isUser, async (req, res) => {
    // id is the book id
    const bookId = req.params.id;

    // validate id for MongoDB ObjectId validity
    const isValidMongoId = mongoose.Types.ObjectId.isValid(bookId);

    // if not valid MongoDB ObjectId, terminate
    if (!isValidMongoId) {
        return res.status(400).send({ message: "Invalid MongoDB ObjectId" });
    }

    // find book
    const book = await Book.findOne({ _id: bookId });

    // if book does not exist, terminate
    if (!book) {
        return res.status(404).send({ message: "Book does not exist" });
    }

    // check if the logged-in user is the owner of the book
    const isOwnerOfBook = book.ownerId.equals(req.loggedInUser._id);

    if (!isOwnerOfBook) {
        return res.status(401).send({ message: "You are not the owner of this book" });
    }

    // delete book
    await Book.deleteOne({ _id: bookId });

    return res.status(200).send({ message: "Book is deleted successfully" });
});

// get book details
router.get("/book/details/:id", isUser, async (req, res) => {
    // extract id from params
    const bookId = req.params.id;

    // check for MongoDB ObjectId validity
    const isValidMongoId = mongoose.Types.ObjectId.isValid(bookId);

    // if not valid, terminate
    if (!isValidMongoId) {
        return res.status(400).send({ message: "Invalid MongoDB ObjectId" });
    }

    // find book
    const book = await Book.findOne({ _id: bookId });

    // if book does not exist, terminate
    if (!book) {
        return res.status(404).send({ message: "Book does not exist" });
    }

    // return book
    return res.status(200).send(book);
});

// Endpoint to get all books

router.post("/book/all", isUser, async (req, res) => {
    // Extract pagination details from req.body
    const paginationDetails = req.body;

    // Validate pagination details
    try {
        await paginationDetailsValidationSchema.validateAsync(paginationDetails);
    } catch (error) {
        // If not valid, terminate
        return res.status(400).send({ message: error.message });
    }

    // Calculate skip
    const skip = (paginationDetails.page - 1) * paginationDetails.limit;

    // Find all books
    const books = await Book.aggregate([
        {
            $sort: {
                createdAt: -1,
            },
        },
        {
            $skip: skip,
        },
        {
            $limit: paginationDetails.limit,
        },
        {
            $project: {
                image: 1,
                title: 1,
                author: 1,
                genre: 1,
                publicationYear: 1,
                condition: 1,
            },
        },
    ]);
    const totalMatchingBooks = await Book.countDocuments();

    // Total pages
    const totalPages = Math.ceil(totalMatchingBooks / paginationDetails.limit);

    return res.status(200).send({ books, totalMatchingBooks, totalPages });
});

export default router;
