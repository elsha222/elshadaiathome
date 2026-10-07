import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function optimizeImage(filePath) {
  const isSm = filePath.endsWith('-sm.webp');
  const isMd = filePath.endsWith('-md.webp');
  
  let quality = 75;
  if (isSm) quality = 40; // Extremely high compression for mobile
  else if (isMd) quality = 50; // High compression for tablet
  
  try {
    const buffer = await fs.readFile(filePath);
    const info = await sharp(buffer)
      .webp({ quality, effort: 6 })
      .toBuffer();
      
    await fs.writeFile(filePath, info);
    console.log(`Optimized ${path.basename(filePath)} (${info.length} bytes)`);
  } catch (err) {
    console.error(`Error optimizing ${filePath}:`, err);
  }
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
    } else if (entry.name.endsWith('.webp')) {
      await optimizeImage(fullPath);
    }
  }
}

async function main() {
  const publicDir = path.join(__dirname, 'public');
  console.log('Starting deep optimization of all webp images...');
  await walk(publicDir);
  console.log('Done!');
}

main().catch(console.error);
