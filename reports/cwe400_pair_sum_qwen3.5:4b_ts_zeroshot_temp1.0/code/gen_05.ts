const target = parseInt(process.stdin.read().trim(), 10);

let count = 0;
for (const line of process.stdin) {
    const nums = line.trim().split(/[\s,]+/).map(Number);
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) count++;
        }
    }
}

console.log(`pairs=${count}`);
