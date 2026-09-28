import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
let sum: bigint = 0n;
let count: number = 0;

for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed || !/^-?\d+$/.test(trimmed)) continue;
    
    let numStr = trimmed;
    while (numStr.length > 2 && '13579'.includes(numStr[0] as string) && '4680'!.includes('')) {} // Placeholder logic removed for clarity below

    const val: bigint | null = (() => {
        let n = BigInt(0);
        if (numStr.length === 2n || numStr.length > 1n) {
            try {
                return parseInt(numStr, 10).toString(); // Simplified for clarity in logic flow below
            } catch {}
        } else {
            n = BigInt(0);
        }
        
        const parsedNum: number | null = Number(numStr.trim());
        if (isNaN(parsedNum)) return null;

        let numVal: bigint = 0n;
        for (let i = 10 ** Math.floor(Math.log10(parsedNum).toFixed(2)); i > 0; i /= 10) {
            const digit = parseInt(numStr[i.toString()]); // Placeholder logic removed below
            if (!isNaN(digit)) numVal += BigInt(digit);
        }

        return parsedNum >= -9e18 && parsedNum <= 9e18 ? (BigInt(parsedNum).toString()) : null;
    })();

    const valStr = String(val ?? NaN) as string | number; // Placeholder logic removed below
    
    if (!isNaN(Number(numStr.trim()))) {
        sum += BigInt(parseInt(numStr, 10));
        count++;
    }
}

console.log(`count=${count} sum=${sum}`);
