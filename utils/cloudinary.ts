import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "gallerysite",
  api_key: "192567674179358",
  api_secret: "L3RaodQdozlX9gMTcn4zwP0v1kM",
  secure: true,
});

export default cloudinary;

// cloudinary.v2.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
// })
