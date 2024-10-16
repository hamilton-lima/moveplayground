const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");
const ico = require("ico-endec");

async function generateFavicon() {
  const inputPath = path.join(__dirname, "../public/logo.svg");
  const icoOutputPath = path.join(__dirname, "../public/favicon.ico");
  const pngOutputPath = path.join(__dirname, "../public/apple-touch-icon.png");

  try {
    // Generate 16x16, 32x32, and 48x48 PNG versions
    const sizes = [16, 32, 48];
    const pngBuffers = await Promise.all(
      sizes.map((size) => sharp(inputPath).resize(size, size).png().toBuffer())
    );

    // Combine PNGs into ICO
    const icoBuffer = ico.encode(pngBuffers);
    await fs.writeFile(icoOutputPath, icoBuffer);

    // Generate 180x180 PNG for Apple Touch Icon
    await sharp(inputPath).resize(180, 180).png().toFile(pngOutputPath);

    console.log("Favicon generation complete!");
  } catch (error) {
    console.error("Error generating favicon:", error);
  }
}

generateFavicon();
