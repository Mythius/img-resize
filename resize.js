// npm i sharp
const sharp = require("sharp");
const fs = require("fs");

const err = (e) => {
  if (e) console.error(e);
};

async function downsizeImage(inputPath, outputPath, maxWidth) {
  try {
    // Load image metadata to get original dimensions
    const metadata = await sharp(inputPath).metadata();
    const aspectRatio = metadata.height / metadata.width;

    const newWidth = Math.min(metadata.width, maxWidth); // Ensure we don't upscale
    const newHeight = Math.round(newWidth * aspectRatio);

    // Resize and save
    await sharp(inputPath).resize(newWidth, newHeight).toFile(outputPath);

    console.log(`Image resized and saved to ${outputPath}`);
  } catch (error) {
    console.error("Error resizing image:", error);
  }
}

async function downsize(path, maxWidth = 1000) {
  let new_path = path.split(".");
  new_path[new_path.length - 2] += "-r";
  new_path = new_path.join(".");
  await downsizeImage(path, new_path, maxWidth);
  return new_path;
}

async function downsizeReplace(path, maxWidth) {
  let np = await downsize(path, maxWidth);
  fs.rename(np, path, err);
}

exports.downsizeImage = downsizeImage;
exports.downsize = downsize;
exports.downsizeReplace = downsizeReplace;