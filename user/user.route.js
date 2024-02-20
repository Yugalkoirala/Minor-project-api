import express from "express";
import { loginUser, registerUser } from "./user.service.js";
import { isUser } from "../auth/auth.middleware.js";
import bcrypt from "bcrypt";
import { User } from "./user.model.js";
import { Book } from "../book/book.model.js"; // Assuming Book model path
import { updateUserValidationSchema } from "./user.validation.js";

const router = express.Router();

// register user
router.post("/user/register", registerUser);

// login user
router.post("/user/login", loginUser);

// edit user data
// password
// firstName
// lastName
// location
// gender
// Endpoint to edit user data
router.put("/user/edit", isUser, async (req, res) => {
    // Extract new values from req.body
    const updatedValues = req.body;

    // Validate new values
    try {
        await updateUserValidationSchema.validateAsync(updatedValues);
    } catch (error) {
        // If validation fails, terminate
        return res.status(400).send({ message: error.message });
    }

    // Extract logged in user id from req.loggedInUser._id
    const userId = req.loggedInUser._id;

    // Hash password if updated
    if (updatedValues.password) {
        updatedValues.password = await bcrypt.hash(updatedValues.password, 10);
    }

    // Update userData
    await User.updateOne(
        { _id: userId },
        {
            $set: {
                password: updatedValues.password,
                gender: updatedValues.gender,
                firstName: updatedValues.firstName,
                lastName: updatedValues.lastName,
                location: updatedValues.location,
            },
        }
    );

    // Return response
    return res.status(200).send({ message: "Your profile is updated successfully" });
});

// Endpoint to delete own account
router.delete("/user/delete/account", isUser, async (req, res) => {
    // Before removing user, remove all data associated with that user

    const user = req.loggedInUser;

    // Delete all books if user has any
    await Book.deleteMany({ ownerId: user._id });

    // Delete user
    await User.deleteOne({ _id: user._id });

    return res.status(200).send({ message: "Your account has been permanently deleted." });
});

export default router;