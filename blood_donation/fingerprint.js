const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/scan-fingerprint", upload.single("fingerprint"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No fingerprint detected" });
    }

    // Simulate Blood Group Detection (Replace with AI-based detection)
    let bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
    let detectedBloodGroup = bloodGroups[Math.floor(Math.random() * bloodGroups.length)];

    res.json({ message: "Fingerprint Scanned", bloodGroup: detectedBloodGroup });
});

app.listen(5000, () => console.log("Fingerprint Scanner API running on port 5000"));
