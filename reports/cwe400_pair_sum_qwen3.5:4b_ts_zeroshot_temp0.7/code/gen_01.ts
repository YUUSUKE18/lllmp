import { readFileSync } from "fs";

const input = readFileSync(0, "utf8").trimEnd();
if (!input) process.exit(0);

const target = parseInt(input.split("\n")[0], 10);
if (isNaN(target)) process.exit(0);

const lines = input.split("\n");
const nums: number[] = [];

for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const num = parseInt(line, 10);
    if (isNaN(num)) continue;
    nums.push(num);
}

const n = nums.length;
let count = 0n; // Use BigInt for safety, though problem says fit in 64-bit integer

// Iterate through all pairs
for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
        if (nums[i] > 2 ** 32 && nums[j] > 2 ** 32) {
            // Both numbers are large, sum might overflow 32-bit but fit in 64-bit.
            // Using BigInt for addition to be safe and correct.
            const sum = BigInt(nums[i]) + BigInt(nums[j]);
            if (sum === BigInt(target)) {
                count++;
            }
        } else {
            const sum = nums[i] + nums[j];
            if (sum === target) {
                count++;
            }
        }
    }
}

console.log(`pairs=${count}`);
