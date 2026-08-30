import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });

let count = 0;
let maxVal: number | null = null;

rl.on('line', (line) => {
    const parts = line.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    
    if (parts.length > 0 && count === 0) {
        maxVal = Math.min(maxVal ?? Infinity, ...parts); // Wait, logic error in thought process. Let's rewrite cleanly below.
    }

    for (const num of parts) {
        if (count === 0 || num < maxVal!) {
            count++;
            maxVal = num;
        } else if (!maxVal && num > -Infinity) { // Actually, just track min/max properly.
             // Let's restart the logic mentally for correctness before writing code.
             // Logic: Find length of array and maximum value? 
             // Wait, "要素数" usually means count of elements found in input.
             // But looking at typical problems like this (e.g., AtCoder), sometimes it asks for min/max or something else if context is missing.
             // Re-reading spec: "それらの『要素数』と『最大値』を求めます。" -> Count and Max Value.
        }
    }

});

// Wait, the logic above was incomplete in thought trace. Let's do a clean pass.
// 1. Read stdin line by line (or all at once via readline).
// The spec says "標準入力から...受け取ります". It implies potentially multiple lines or one big string. 
// rl.on('line') handles streaming correctly.

rl.on('close', () => {
    // Calculate results based on collected data? No, we can calculate on the fly if we store them.
    // But wait, "要素数" (count) and "最大値". If input is empty after filtering invalids, count=0. Max value would be undefined or 0 depending on interpretation. 
    // Usually in such problems without a specific number N given at start, it's the size of the parsed array.
    
    let finalCount = 0;
    let finalMax: number | null = null;

    for (let i = 0; i < count; i++) { /* This loop structure is wrong because I didn't store values */ }

    // Correct approach: Store valid numbers in an array first, then process. Or track min/max on the fly?
    // Spec says "最大値" (Max Value). 
    // Let's re-read carefully: "それらの『要素数』と『最大値』". 
    // It doesn't say minimum. Just count and max.

    // Okay, let's rewrite the logic inside rl.on('line') to accumulate valid numbers into a buffer/array?
    // Or simpler: Since we need final output after reading everything (or line by line if it's one stream), buffering is safer unless specified otherwise. 
    // However, "1 行だけを出力" suggests single run per input or continuous processing until EOF. Node.js stdin usually closes at end of file redirection.
    
    // Let's implement a robust solution that reads all lines, parses integers, filters valid ones, then outputs count and max.
});

// Actually, the previous rl setup was incomplete in my thought block. 
// I will write the complete code now inside the block.
