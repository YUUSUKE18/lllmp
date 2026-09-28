const input = process.stdin.read().trim();
if (!input) {
    console.log('pairs=0');
    process.exit(0);
}

const lines = input.split('\n').filter(line => line.trim() !== '');
if (lines.length === 0) {
    console.log('pairs=0');
    process.exit(0);
}

const target = parseInt(lines[0], 10);
if (isNaN(target)) {
    console.log('pairs=0');
    process.exit(0);
}

const nums: number[] = [];
for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '') continue;
    const num = parseInt(line, 10);
    if (!isNaN(num)) {
        nums.push(num);
    }
}

const count: number[] = new Array(nums.length).fill(0);
for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] === target) {
            count[i]++;
            count[j]++;
        }
    }
}

let total = 0;
for (const c of count) {
    total += c;
}

console.log(`pairs=${total}`);
