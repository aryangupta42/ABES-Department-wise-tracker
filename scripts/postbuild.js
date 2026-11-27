import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');
const notFoundPath = path.join(distDir, '404.html');

if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, notFoundPath);
  console.log('✓ Successfully created dist/404.html fallback for SPA client-side routing');
} else {
  console.warn('⚠️ Warning: dist/index.html not found, skipping 404.html copy');
}
