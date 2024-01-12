// File: processFiles.ts
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

interface FileRequest {
    fileName: string;

    replacements: { [id: string]: string };
}

const processFile = (fileRequest: FileRequest) => {
    const sourceDir = 'simnet-contracts';
    const targetDir = 'mainnet-contracts';

    const fileName = fileRequest.fileName;

    const sourcePath = join(sourceDir, fileName);
    const targetPath = join(targetDir, fileName);

    // Check if source file exists
    if (!existsSync(sourcePath)) {
        console.error(`File not found: ${sourcePath}`);
        return;
    }

    // Read the file
    const data = readFileSync(sourcePath, 'utf8');

    let result = data;

    for (let key in fileRequest.replacements) {
        if (fileRequest.replacements.hasOwnProperty(key)) {
          let value = fileRequest.replacements[key];
          console.log(`Replacing ${key} with ${value}`);
          result = data.replace(/\key/g, value);
          console.log(result);
        }
      }

    // Replace occurrences

    // Ensure target directory exists
    if (!existsSync(targetDir)) {
        mkdirSync(targetDir);
    }

    // Write the file
    writeFileSync(targetPath, result);
    console.log(`File ${fileName} processed and saved to ${targetPath}`);
};

const main = () => {

    const fileRequests: FileRequest[] = [
        {
            fileName: 'taral-bank.clar',
            replacements: {
                "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.token-susdt": "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.token-susdt"
            }
        },
        {
            fileName: 'taral-bank-storage.clar',
            replacements: {}
        },
    ];

    // List of files to process
    fileRequests.forEach(file => {
        processFile(file);
    });
};

main();
