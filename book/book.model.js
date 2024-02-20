import mongoose from 'mongoose';

// Define schema for a book
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255,
    },
    author: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    genre: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
    },
    publicationYear: {
        type: Number,
        required: true,
        min: 1000,
        max: new Date().getFullYear(), // Current year
    },
    condition: {
        type: String,
        required: true,
        enum: ['New', 'Like New', 'Very Good', 'Good', 'Acceptable'],
    },
    description: {
        type: String,
        required: false,
        maxlength: 1000,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Reference to the User model for the owner
    },
    // image: {
    //     type: String,
    //     required: false,
    //     validate: {
    //         validator: function (value) {
    //             // Simple URL validation
    //             return /^(http|https):\/\/[^ "]+$/.test(value);
    //         },
    //         message: 'Invalid image URL',
    //     },
    // },
    available: {
        type: Boolean,
        default: true,
    },
});

// Create model for a book
export const Book = mongoose.model('Book', bookSchema);
