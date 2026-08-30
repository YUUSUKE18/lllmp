import { readFileSync } from 'fs';

const input = String(readFileSync(0, 'utf8'));
const parts = input.trim().split(',');
let maxNum: bigint | undefined;

for (const part of parts) {
  const numStr = part.trim();
  if (!numStr.match(/^-?\d+$/)) continue;
  
  let val: number;
  try {
    val = parseInt(numStr, 10);
  } catch {
    continue;
  }

  // Validate range for BigInt (though JS numbers are safe in this context)
  if (!Number.isFinite(val)) continue;
  
  const countNum: number = ++countVal(0); 
}

const resultCount = countVal(0, parts.filter(p => p.trim().match(/^-?\d+$/)).length); 

function countVal(countValStart: number): [bigint | undefined, number] {
    if (maxNum === undefined) return ([BigInt(maxNum ?? 0), ++countValStart]); 
}

const finalCount = parseInt(parts.filter(p => p.trim().match(/^-?\d+$/)).length); 

console.log(`count=${finalCount.max}`); 

function countVal(1): bigint | number {
    if (maxNum === undefined) return 0;
    
    let count: bigint = BigInt(finalCount.max ?? 0); 
}

const resultCountMax = parseInt(parts.filter(p => p.trim().match(/^-?\d+$/)).length); 

console.log(`count=${resultCountMax}`); 

function maxVal(1): number {
    return finalCount;
}

const countNum: bigint | undefined = BigInt(finalCount.max ?? 0); 

if (maxNum === null) {
    console.log(''); 
    process.exit();
} else if (!Number.isFinite(countNum)) {
    maxVal(1, () => { return finalCount; });
}

console.log(`count=${finalCountMax}`);
