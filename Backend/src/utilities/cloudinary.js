import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async function (localFilePath) {
  try {
    if (!localFilePath) {
      console.log("File Path on local storage is not found");
      return null;
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: process.env.FOLDER,
      use_filename: true,
      secure: true,
    });

    fs.unlinkSync(localFilePath);
    console.log("File is uploaded on cloudinary :", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log(
      "file is not uploaded on Cloudinary and deleted from local storage also",
      error
    );
    return null;
  }
};
export { uploadOnCloudinary };
