const input = process.stdin.read().split('\n');

if (input.length < 1) {
    return;
}

const targetStr = input[0].trim();
const target = BigInt(targetStr);

const map = new Map<bigint, bigint>();
let pairs = BigInt(0);

for (let i = 1; i < input.length; i++) {
    const line = input[i].trim();
    if (line === '') continue; 
    
    try {
        const num = BigInt(line);
        const needed = target - num;

        if (map.has(needed)) {
            const count = map.get(needed) || 0n;
            pairs += count;
        }

        const currentCount = map.get(num) ?? 0n;
        map.set(num, currentCount + 1n);
    } catch {
        continue; 
    }
}

console.log(`pairs=${pairs}`);
