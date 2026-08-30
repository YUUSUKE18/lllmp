import { readFileSync } from 'fs'; // Actually process.stdin is requested, but for Node.js completeness let's stick to stdin directly via readline or just reading all at once if possible? 
// Spec says: "process.stdin から入力を読む" -> Read from standard input.
// Reading entire buffer is easiest in NodeJS without external packages like readline.

const rawInput = process.stdin.read();
if (!rawInput) {
    console.log('count=0 sum=');
} else {
    const parts: number[] = [];
    
    // Split by comma or whitespace, then map to Number. 
    // If a part is empty string -> NaN after mapping? No, split might return empty strings if multiple delimiters adjacent.
    let tokens = rawInput.split(/[\s,]+/); 
    
    for (const token of tokens) {
        const num = Number(token.trim());
        if (!isNaN(num)) {
            parts.push(num);
        } else {
             // Ignore non-integers as per spec "整数として解釈できない要素も無視します"
             continue; 
        }
    }

    // Get unique integers using Set (which automatically handles duplicates)
    const uniqueSet = new Set(parts.map(n => n)); 
    
    let count: bigint = BigInt(uniqueSet.size);
    let sumVal: number | bigint = 0n; 

    for (const num of parts) { 
        if (!isNaN(num)) { // Double check validity just in case, though Set logic handles unique ones.
            const valNum = Number(num);
            sumVal += BigInt(valNum);
        } else continue;
    }

    console.log(`count=${count} sum=${sumVal}`);
}
