const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    photoURL: String,
    username: String,
    email: String,
    password: String,
    status: { type: String, enum: ["Pending Confirmation", "Active"], default: "Pending Confirmation" },
    confirmationCode: { type: Schema.Types.Mixed, unique: true },
    character_favorites: [String],
    comics_favorites: [String],
    serie_favorites: [String],
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User
