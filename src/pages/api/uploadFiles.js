import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function uploadResumeHandler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const uploadDir = path.join(process.cwd(), "uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const form = formidable({
    uploadDir: uploadDir,
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Formidable Error:", err);
      return res.status(500).json({ error: "Error parsing form data." });
    }

    const resume = files.resume[0];
    if (!resume) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const filePath = path.join(uploadDir, resume.newFilename);

    res.status(200).json({
      message: "File uploaded successfully",
      filePath: filePath,
    });
  });
}
