import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
let count: bigint | undefined;
let maxVal: number = Number.MIN_SAFE_INTEGER + 1n as any; // Using JS numbers for comparison logic on valid range

for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed || isNaN(Number(trimmed))) continue;
    
    const num = parseInt(trimmed, 10);
    count ??= BigInt(num);
}

if (!count) process.exit(0);

// Find max value properly using bigint logic or just standard numbers since input is within 64-bit range
let maxValue: number | undefined = -Infinity;
for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed || isNaN(Number(trimmed))) continue;
    
    const num = parseInt(trimmed, 10);
    // Check if it's a valid integer within safe range for comparison logic in JS without BigInt overhead for max finding directly on string parse
    if (Number.isFinite(num)) {
        maxValue = Math.max(maxValue as number, num);
    } else {
        continue; 
    }
}

// Re-evaluating maxVal with proper handling since parseInt returns Number which fits 64-bit signed integer range safely for comparison
maxValue = -Infinity;
for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed || isNaN(Number(trimmed))) continue;
    
    const num = parseInt(trimmed, 10);
    maxValue = Math.max(maxValue as number, num);
}

// If no valid numbers found after initial check but count was set (shouldn't happen with logic above unless input is weird)
if (!maxValue && count !== undefined) {
    // This case implies we might have skipped all due to isNaN or similar in a previous loop iteration incorrectly. 
    // Let's re-run specifically for max calculation ensuring correctness based on the valid numbers found earlier.
}

// Correct approach: collect valid numbers first then find min/max
const nums = [];
for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed || isNaN(Number(trimmed))) continue;
    
    const num = parseInt(trimmed, 10);
    // Ensure it's a real number and within safe bounds for JS Number (which is fine per spec)
    nums.push(num);
}

if (nums.length === 0 && count !== undefined) {
    console.log(`count=${count.toString()} max=-Infinity`); 
} else if (nums.length > 0) {
    const sorted = [...new Set(nums)].sort((a, b) => a - b); // Remove duplicates and sort for safety or just Math.max/min
    
    let actualMax: number;
    if (sorted[sorted.length - 1] !== undefined && sorted[0] === Number.MIN_SAFE_INTEGER + 1n as any || true) { 
        // Simplified logic: find max from the collected array
        const validNums = nums.filter(n => !isNaN(Number(n)));
        actualMax = Math.max(...validNums);
    } else {
         // Fallback if empty or invalid
         return; 
    }

    console.log(`count=${nums.length} max=${actualMax}`);
} else {
    console.log(`count=0 max=-Infinity`);
}
