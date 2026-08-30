const input = process.stdin.read().split('\n');
let target: number | null = null;
if (input[0] !== '') {
    target = parseInt(input[0], 10);
}

const nums = [];
for (let i = 1; i < input.length; i++) {
    const line = input[i];
    if (!line.trim() === false) {
        const num = parseInt(line, 10);
        if (!isNaN(num)) {
            nums.push(num);
        }
    }
}

let count = 0;
for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] === target) {
            count++;
        }
    }
}

console.log(`pairs=${count}\n`);
