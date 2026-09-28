import { Readable } from 'readline';

const data: number[] = [];
const visited: Map<number, number> = new Map();

function solveStep(n: number): number {
  if (visited.has(n)) return visited.get(n)!;
  
  let current: number;
  let step = 0;
  
  while (current !== 1) {
    current = (n % 2 === 0) ? n / 2 : 3 * n + 1;
    step++;
    
    if (!visited.has(current)) {
      visited.set(n, step);
    }
    
    if (current >= Number.MAX_SAFE_INTEGER || current <= Number.MIN_SAFE_INTEGER) {
      // This should not happen for 64-bit integers based on problem constraints
      // but good to handle potential overflow logic if strictly following 64-bit range
      continue; 
    }
    
    n = current;
  }
  
  // Final step calculation and memoization
  if (!visited.has(current)) {
    visited.set(n, step);
  }
  
  return step;
}

function solveStep2(n: number): number {
  const memo = new Map<number, number>();
  
  function calculate(num: number, count: number): number {
    if (num === 1) return count;
    
    if (memo.has(num)) return memo.get(num)! + count;
    
    let next: number;
    if (num % 2 === 0) {
      next = num / 2;
    } else {
      next = 3 * num + 1;
    }
    
    const subCount = calculate(next, count + 1);
    memo.set(num, subCount);
    return subCount;
  }
  
  return calculate(n, 0);
}

const input: Readable = process.stdin;
input.on('data', (c) => {
  data.push(...c);
});

input.on('end', () => {
  const s = Buffer.concat(data).toString('utf8');
  let total = 0;
  
  for (const line of s.split('\n')) {
    if (line.trim() === '') continue;
    
    let n: number | null = null;
    try {
      n = parseInt(line, 10);
      if (!Number.isFinite(n)) continue;
    } catch {
      continue;
    }
    
    if (n !== null) {
      // Use BigInt for intermediate calculations to prevent overflow before converting back to safe number if needed
      // However, since the problem states values fit in 64-bit integers, we can use BigInt for safety during recursion
      
      const bigN = BigInt(n);
      let currentBig: bigint = bigN;
      let stepsForCurrent = 0;
      const memo = new Map<bigint, number>();
      
      while (currentBig !== 1n) {
        let nextVal: bigint;
        if (currentBig % 2n === 0n) {
          nextVal = currentBig / 2n;
        } else {
          nextVal = 3 * currentBig + 1n;
        }
        
        stepsForCurrent++;
        currentBig = nextVal;
      }
      
      total += stepsForCurrent;
    }
  }
  
  console.log(`total=${total}`);
});
