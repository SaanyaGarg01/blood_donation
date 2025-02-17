const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    bloodGroup: String,
    location: {
        type: { type: String, default: "Point" },
        coordinates: [Number]
    },
    isDonor: Boolean,
});

UserSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", UserSchema);
