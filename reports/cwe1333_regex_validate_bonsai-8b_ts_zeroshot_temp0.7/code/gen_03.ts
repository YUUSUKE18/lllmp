import { Readable } from 'stream';

const reader = Readable.from(process.stdin);

reader.on('line', line => {
    const trimmedLine = line.trim();
    if (trimmedLine === '') return;
    
    const parts = trimmedLine.split(',');
    const isNumeric = parts.every(part => /^[0-9]+$/.test(part));
    
    if (!isNumeric) return;
    
    if (parts.length < 2) return;
    
    console.log(`valid=${parts.length}`);
});

reader.on('close', () => {
    console.log(`valid=${parts.length}`);
});
