const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    photoURL: String,
    username: String,
    email: String,
    password: String,
    status: { type: String, enum: ["Pending Confirmation", "Active"], default: "Pending Confirmation" },
    confirmationCode: { type: Schema.Types.Mixed, unique: true },
    address: String,
    character_favorites: [String],
    comics_favorites: [String],
    series_favorites: [String],
}, {
    timestamps: true
})
   
userSchema.index({ location: "2dsphere" });
const User = mongoose.model("User", userSchema);

module.exports = User;
