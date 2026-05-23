import fs from 'fs';
import path from 'path';

const ASSET_DIR = path.join(process.cwd(), 'public', 'asset');

// Ensure public/asset directory exists
if (!fs.existsSync(ASSET_DIR)) {
  fs.mkdirSync(ASSET_DIR, { recursive: true });
}

// Minimal valid 1x1 JPEG image base64
const MINIMAL_JPEG_BASE64 = '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=';
const jpegBuffer = Buffer.from(MINIMAL_JPEG_BASE64, 'base64');

// Minimal valid MP4 header / bytes
const mp4Buffer = Buffer.from([
  0x00, 0x00, 0x00, 0x14, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d,
  0x00, 0x00, 0x00, 0x01, 0x69, 0x73, 0x6f, 0x6d, 0x00, 0x00, 0x00, 0x08,
  0x66, 0x72, 0x65, 0x65, 0x00, 0x00, 0x00, 0x08, 0x6d, 0x64, 0x61, 0x74
]);

const IMAGES = [
  "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg",
  "a.jpg", "b.jpg", "c.jpg", "d.jpg", "e.jpg", "f.jpg", "g.jpg",
  "care 1.jpg", "care 2.jpg", "care 3.jpg", "care 4.jpg", "care 5.jpg", "care 6.jpg",
  "conclude 1.jpg", "conclude 2.jpg", "conclude 3.jpg", "conclude 4.jpg",
  "cover.jpg",
  "gss 1.jpg", "gss 2.jpg", "gss 3.jpg",
  "hon 1.jpg", "hon 2.jpg", "hon 3.jpg", "hon 4.jpg", "hon 5.jpg", "hon 6.jpg", "hon 7.jpg",
  "logo.jpg",
  "match 1.jpg", "match 2.jpg", "match 3.jpg", "match 4.jpg", "match 5.jpg", "match 6.jpg", "match 7.jpg", "match 8.jpg", "match 9.jpg", "match 10.jpg",
  "match 11.jpg", "match 12.jpg", "match 13.jpg", "match 14.jpg", "match 15.jpg", "match 16.jpg", "match 17.jpg", "match 18.jpg", "match 19.jpg", "match 20.jpg",
  "match 21.jpg", "match 22.jpg", "match 23.jpg",
  "onboard 1.jpg", "onboard 2.jpg", "onboard 3.jpg", "onboard 4.jpg", "onboard 5.jpg", "onboard 6.jpg",
  "orph 1.jpg", "orph 2.jpg", "orph 3.jpg", "orph 4.jpg", "orph 5.jpg",
  "parent 1.jpg", "parent 2.jpg", "parent 3.jpg", "parent 4.jpg", "parent 5.jpg",
  "part a 1.jpg", "part a 2.jpg",
  "part b 1.jpg", "part b 2.jpg", "part b 3.jpg", "part b 4.jpg", "part b 5.jpg",
  "part c 1.jpg",
  "part d 1.jpg", "part d 2.jpg",
  "partners.jpg",
  "rr.jpg", "ss.jpg",
  "summary 1.jpg", "summary 2.jpg", "summary 3.jpg", "summary 4.jpg", "summary 5.jpg", "summary 6.jpg", "summary 7.jpg",
  "survey 1.jpg", "survey 2.jpg", "survey 3.jpg", "survey 4.jpg",
  "tik 1.jpg", "tik 2.jpg", "tik 3.jpg", "tik 4.jpg", "tik 5.jpg", "tik 6.jpg", "tik 7.jpg",
  "vol 1.jpg", "vol 2.jpg", "vol 3.jpg"
];

const VIDEOS = [
  "vid 1.mp4", "vid 2.mp4", "vid 3.mp4", "vid 4.mp4", "vid 5.mp4"
];

let createdImages = 0;
let createdVideos = 0;

IMAGES.forEach((file) => {
  const filePath = path.join(ASSET_DIR, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, jpegBuffer);
    createdImages++;
  }
});

VIDEOS.forEach((file) => {
  const filePath = path.join(ASSET_DIR, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, mp4Buffer);
    createdVideos++;
  }
});

console.log(`Generated ${createdImages} image placeholders and ${createdVideos} video placeholders in ${ASSET_DIR}`);
