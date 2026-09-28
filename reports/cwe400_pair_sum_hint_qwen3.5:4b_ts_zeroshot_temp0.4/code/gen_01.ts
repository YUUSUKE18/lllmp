const input = process.stdin.read().trim();
if (!input) {
    console.log('pairs=0');
    process.exit(0);
}

const lines = input.split('\n');
let target: bigint | undefined;
for (const line of lines) {
    if (line.trim() === '') continue;
    const val = BigInt(line);
    if (!isNaN(val)) {
        target = val;
        break;
    }
}

if (!target) {
    console.log('pairs=0');
    process.exit(0);
}

const nums: bigint[] = [];
for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '') continue;
    const val = BigInt(line);
    if (!isNaN(val)) {
        nums.push(val);
    }
}

const count: number[] = new Array(nums.length).fill(0);
let pairs = 0n;

for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] === target) {
            pairs++;
        }
    }
}

console.log(`pairs=${Number(pairs)}`);
