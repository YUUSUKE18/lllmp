const input = process.stdin.read();
if (!input) {
    console.log('count=0 max=0');
    return;
}

const parts = input.split(',').map(s => s.trim()).filter(s => s.length > 0);
const nums: bigint[] = [];

for (const s of parts) {
    if (/^[+-]?\d+$/.test(s)) {
        nums.push(BigInt(s));
    }
}

const count = nums.length;
let max: bigint | undefined;

if (count > 0) {
    max = nums[0];
    for (let i = 1; i < count; i++) {
        if (nums[i] > max) {
            max = nums[i];
        }
    }
} else {
    max = BigInt(0);
}

console.log(`count=${count} max=${max}`);
