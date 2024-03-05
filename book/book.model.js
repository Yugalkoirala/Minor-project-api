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
        enum: [
            "Fiction",
            "Non-fiction",
            "Science fiction",
            "Mystery",
            "Fantasy",
            "Romance",
            "Thriller",
            "Horror",
            "Biography",
            "Self-help",
            "Historical fiction",
            "Poetry",
            "Drama",
            "Comedy",
            "Adventure",
            "Crime",
            "Young adult",
            "Children's",
            "Memoir",
            "Travel",
            "Cooking",
            "Art",
            "Science",
            "Technology",
            "Business",
            "Philosophy",
            "Religion",
            "Politics",
            "History",
            "Sports",
            "Health",
            "Education",
            "Finance",
            "Literary fiction",
            "Humor",
            "Graphic novel",
            "Anthology",
            "Short stories",
            "Classic",
            "Other"
        ],
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
    phoneNumber: {
        type: String,
        required: false,
        trim: true,
        minlength: 7,
        maxlength: 15,
    },
    email: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    image: {
        type: String,
        required: false,
        trim: true,
    },
    available: {
        type: Boolean,
        default: true,
    },
},
    {
        timestamps: true,
    },
);

// Create model for a book
export const Book = mongoose.model('Book', bookSchema);
