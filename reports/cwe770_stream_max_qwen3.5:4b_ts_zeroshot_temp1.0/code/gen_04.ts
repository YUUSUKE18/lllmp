import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });

let count = 0;
let maxValue: bigint | null = null;

rl.on('line', (line) => {
    const tokens = line.split(',').map((t) => t.trim()).filter(Boolean);
    
    for (const token of tokens) {
        // tryParse が失敗する場合は無視（整数として解釈できない要素）
        if (!/^-?\d+$/.test(token)) continue;

        const value: bigint = BigInt(Number(token));
        
        count++;
        
        if (maxValue === null || value > maxValue) {
            maxValue = value;
        }
    }
});

rl.on('close', () => {
    // 10進法で出力（BigInt の標準的な表記は既に十进制）
    console.log(`count=${count} max=${maxValue?.toString() || ''}`);
});
