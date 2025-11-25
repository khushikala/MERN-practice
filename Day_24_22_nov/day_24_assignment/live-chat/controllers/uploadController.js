// Challenge 1: Upload PDF and return success message

export const uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded!" });
    }

    res.json({
        message: `File uploaded successfully: ${req.file.filename}`,
        file: req.file.filename
    });
};
