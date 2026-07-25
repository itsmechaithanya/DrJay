import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.resolve('src/assets');
const srcDir = path.resolve('src');

async function run() {
    // 1. Get all image files in assets
    const files = fs.readdirSync(assetsDir);
    const imagesToConvert = files.filter(f => {
        const ext = path.extname(f).toLowerCase();
        return ext === '.png' || ext === '.jpg' || ext === '.jpeg';
    });

    console.log(`Found ${imagesToConvert.length} images to convert.`);

    const fileMap = {}; // Maps original basename to new WebP basename

    for (const file of imagesToConvert) {
        const ext = path.extname(file);
        const baseName = path.basename(file, ext);
        const inputPath = path.join(assetsDir, file);
        const outputPath = path.join(assetsDir, `${baseName}.webp`);

        console.log(`Converting: ${file} -> ${baseName}.webp`);

        try {
            await sharp(inputPath)
                .webp({ quality: 80 })
                .toFile(outputPath);
            
            // Delete original file
            fs.unlinkSync(inputPath);
            fileMap[file] = `${baseName}.webp`;
            console.log(`Successfully converted and removed original: ${file}`);
        } catch (err) {
            console.error(`Failed to convert ${file}:`, err);
        }
    }

    // 2. Scan and replace references in source files
    console.log('\nUpdating source references...');
    
    function walkDir(dir) {
        const list = fs.readdirSync(dir);
        for (const file of list) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                walkDir(fullPath);
            } else {
                const ext = path.extname(file).toLowerCase();
                if (ext === '.jsx' || ext === '.js' || ext === '.css') {
                    updateFileReferences(fullPath);
                }
            }
        }
    }

    function updateFileReferences(filePath) {
        let content = fs.readFileSync(filePath, 'utf8');
        let updated = false;

        // Replace each mapping in the file
        for (const [orig, webp] of Object.entries(fileMap)) {
            // Find occurrences of orig (e.g. "image.png") and replace with webp ("image.webp")
            // Escape dots in the original filename for regex
            const escapedOrig = orig.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const regex = new RegExp(escapedOrig, 'g');

            if (regex.test(content)) {
                content = content.replace(regex, webp);
                updated = true;
                console.log(`  Updated reference to ${orig} in ${path.relative(srcDir, filePath)}`);
            }
        }

        if (updated) {
            fs.writeFileSync(filePath, content, 'utf8');
        }
    }

    walkDir(srcDir);
    console.log('\nAll done!');
}

run().catch(console.error);
