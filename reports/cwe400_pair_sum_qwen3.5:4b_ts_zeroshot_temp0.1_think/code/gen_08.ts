const input = process.stdin.read().split('\n');
const lines = input.filter(l => l.trim() !== '');

if (lines.length === 0) {
    process.exit(0);
}

const targetVal = BigInt(lines[0]);
const nums: bigint[] = [];

for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^-?\d+$/.test(line)) {
        nums.push(BigInt(line));
    }
}

let count = 0n;
const map = new Map<string, bigint>();

for (const num of nums) {
    const needed = targetVal - num;
    const neededStr = needed.toString();
    
    if (map.has(neededStr)) {
        count += map.get(neededStr)!;
    }
    
    const currentStr = num.toString();
    const currentCount = map.get(currentStr) || 0n;
    map.set(currentStr, currentCount + 1n);
}

console.log(`pairs=${count}`);
