import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.originalname.split(".").pop()
    );
  },
});
const upload = multer({ storage });

export default function (req, res, next) {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return next(err);
    }
    if (req.file) {
      req.body.image_path = req.file.path;
      console.log(req.body.image_path);
    }
    next();
  });
}