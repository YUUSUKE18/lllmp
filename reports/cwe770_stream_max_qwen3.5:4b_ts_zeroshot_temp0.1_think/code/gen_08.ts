const input = process.stdin.read();

if (!input) {
    console.log('count=0 max=0');
    return;
}

const parts = input.split(',').map(s => s.trim()).filter(s => s.length > 0);
const numbers: bigint[] = [];
let maxVal: bigint | undefined = undefined;

for (const s of parts) {
    if (/^[+-]?\d+$/.test(s)) {
        const num = BigInt(s);
        numbers.push(num);
        if (!maxVal || num > maxVal) {
            maxVal = num;
        }
    }
}

console.log(`count=${numbers.length} max=${maxVal ?? 0}`);
