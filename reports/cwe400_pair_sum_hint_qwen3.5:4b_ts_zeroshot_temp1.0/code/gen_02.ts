import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin });

let targetValue: number | null = null;
let inputQueue: string[] = [];
let lineIndex = 0;
let isReadingTarget = true;

rl.on('data', (data) => {
  const lines = data.toString().trim().split('\n');
  for (const line of lines) {
    if (lineIndex === 0) {
      if (targetValue !== null && line.trim() !== '') {
        targetValue = Number(line);
        if (!Number.isNaN(targetValue)) {
          isReadingTarget = false;
        } else {
          targetValue = null;
        }
      }
    } else if (!isReadingTarget) {
      const parts = line.split(/\s+/);
      for (const part of parts) {
        if (part !== '') {
          inputQueue.push(Number(part));
        }
      }
    }
  }
  
  if (!isReadingTarget && inputQueue.length > 0) {
    process();
  } else {
    rl.close();
  }
});

rl.on('close', () => {
  if (targetValue !== null && inputQueue.length >= 2) {
    const result = solve(targetValue, inputQueue);
    console.log(`pairs=${result}`);
  }
});

function process() {
  if (lineIndex > 0 && !isReadingTarget) {
    process();
  }
}

function solve(target: number, arr: number[]): number {
  const n = arr.length;
  let count = 0n; // Use BigInt for safety with large counts
  
  // To optimize, we can use a Map to store the frequency of numbers seen so far.
  // This allows O(N) time complexity instead of O(N^2).
  
  const freqMap = new Map<number, number>();
  let currentSum = 0n;

  for (let i = 0; i < n; i++) {
    const val = arr[i];
    
    // Calculate target complement using BigInt math to avoid overflow issues
    // though input is within 64-bit, sums might exceed if not careful, 
    // but problem statement says result fits in 64-bit, inputs also fit.
    // Standard arithmetic should be fine, but let's stick to JS numbers as they handle 2^53 safely, 
    // and input fits in signed 64-bit. JS numbers are double precision, safe enough for 2^53.
    // The target sum itself might be up to 2*64-bit max which exceeds JS safe integer limit?
    // Actually, "values and count" fit in 64-bit. Values themselves also fit in 64-bit.
    // Sum of two 64-bit integers can exceed 2^53-1. We must use BigInt for the sum check.

    const targetComp = BigInt(target) - val;
    
    // Check if we have seen this complement before
    if (freqMap.has(Number(targetComp))) {
      const timesSeen = freqMap.get(Number(targetComp)) as number;
      count += BigInt(timesSeen);
    }
    
    // Add current value to map
    if (freqMap.has(val)) {
      const prev = freqMap.get(val) as number;
      freqMap.set(val, prev + 1);
    } else {
      freqMap.set(val, 1);
    }
  }

  return Number(count);
}
