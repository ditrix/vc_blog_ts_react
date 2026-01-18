import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function saveImage(file: File): Promise<string> {
  // Ensure upload directory exists
  try {
    await fs.access(UPLOAD_DIR);
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
  
  // Save 3 versions
  // 1. Original
  await sharp(buffer).toFile(path.join(UPLOAD_DIR, `${fileName}-original.webp`));

  // 2. Middle (for Post View) - 1200px width
  await sharp(buffer)
    .resize(1200, null, { withoutEnlargement: true })
    .toFile(path.join(UPLOAD_DIR, `${fileName}-middle.webp`));

  // 3. Low (for Cards/List) - 400px width
  await sharp(buffer)
    .resize(400, null, { withoutEnlargement: true })
    .toFile(path.join(UPLOAD_DIR, `${fileName}-low.webp`));

  return fileName;
}

export async function deleteImage(fileName: string) {
  if (!fileName) return;
  const versions = ['-original.webp', '-middle.webp', '-low.webp'];
  
  for (const version of versions) {
    const filePath = path.join(UPLOAD_DIR, `${fileName}${version}`);
    try {
      await fs.unlink(filePath);
    } catch (e) {
      console.error(`Failed to delete image: ${filePath}`, e);
    }
  }
}

export function getImageUrl(fileName: string, size: 'original' | 'middle' | 'low' = 'original'): string {
  if (!fileName) return '';
  return `/uploads/${fileName}-${size}.webp`;
}
