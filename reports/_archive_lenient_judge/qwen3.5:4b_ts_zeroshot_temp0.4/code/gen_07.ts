import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim().split(/\s*,\s*/).map(Number);

if (input.length === 0) {
    console.log('count=0 sum=');
} else {
    const uniqueNumbers = new Set<number>(input.filter(n => !isNaN(n)));
    
    let count = 0;
    let sum = BigInt(0); // Use BigInt to ensure safety, though spec says fits in 64-bit
    
    for (const num of uniqueNumbers) {
        count++;
        if (!Number.isSafeInteger(Number(num))) continue; 
        sum += Number(num);
    }

    console.log(`count=${count} sum=${sum}`);
}
