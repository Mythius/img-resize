if (process.argv.length != 4) {
  console.log("Invalid Arguments");
  console.log("Example Usage");
  console.log(`${process.argv[1]} image.png 300`);
  console.log(
    "This will resize image.png to a width of 300 pixels, while maintaing aspect ratio"
  );
  return;
} else {
  require("./resize.js").downsizeReplace(
    process.argv[2],
    Number(process.argv[3])
  );
}
