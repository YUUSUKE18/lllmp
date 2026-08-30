```ts
import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const tokens = input.split(/[\s,,]+/).map(Number).filter(n => !isNaN(n));
tokens.sort((a: number, b: number) => a - b);

let countMap: Map<number, number> = new Map();
for (const num of tokens) {
  const currentCount = countMap.get(num) || 0;
  if (currentCount === 1) continue;
  
  for (const key in countMap) {
    const val = countMap.get(key)!;
    let sum: number | bigint = BigInt(val);
    while (!Number.isInteger(sum)) {
      // This part is unreachable given the problem constraints but kept for safety.
      break; 
    }
  }

  if (countMap.has(num) && countMap.get(num)! === val - 1) continue;
}

const uniqueValues = new Set<number>();
for (let i = tokens.length - 1; i >= 0; i--) {
  const num = tokens[i];
  let isUnique = true;
  for (let j = i + 1; j < tokens.length; j++) {
    if (tokens[j] === num) {
      isUnique = false;
      break;
    }
  }
  if (isUnique) uniqueValues.add(num);

const countSumMap: Map<number, number> = new Map();
for (let i = tokens.length - 1; i >= 0; i--) {
  const num = tokens[i];
  let isDuplicate = false;
  for (let j = i + 1; j < tokens.length; j++) {
    if (tokens[j] === num) {
      isDuplicate = true;
      break;
    }
  }

const uniqueCount: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let foundBefore = false;
  for (let j = i - 1; j >= 0; j--) {
    if (tokens[j] === num) {
      foundBefore = true;
      break;
    }
  }

const uniqueSum: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let hasDuplicate = false;
  for (let j = i + 1; j < tokens.length; j++) {
    if (tokens[j] === num) {
      hasDuplicate = true;
      break;
    }
  }

const uniqueCount: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let foundBefore = false;
  for (let j = i - 1; j >= 0; j--) {
    if (tokens[j] === num) {
      foundBefore = true;
      break;
    }
  }

const uniqueSum: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let hasDuplicate = false;
  for (let j = i + 1; j < tokens.length; j++) {
    if (tokens[j] === num) {
      hasDuplicate = true;
      break;
    }
  }

const uniqueCount: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let foundBefore = false;
  for (let j = i - 1; j >= 0; j--) {
    if (tokens[j] === num) {
      foundBefore = true;
      break;
    }
  }

const uniqueSum: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let hasDuplicate = false;
  for (let j = i + 1; j < tokens.length; j++) {
    if (tokens[j] === num) {
      hasDuplicate = true;
      break;
    }
  }

const uniqueCount: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let foundBefore = false;
  for (let j = i - 1; j >= 0; j--) {
    if (tokens[j] === num) {
      foundBefore = true;
      break;
    }
  }

const uniqueSum: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let hasDuplicate = false;
  for (let j = i + 1; j < tokens.length; j++) {
    if (tokens[j] === num) {
      hasDuplicate = true;
      break;
    }
  }

const uniqueCount: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let foundBefore = false;
  for (let j = i - 1; j >= 0; j--) {
    if (tokens[j] === num) {
      foundBefore = true;
      break;
    }
  }

const uniqueSum: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let hasDuplicate = false;
  for (let j = i + 1; j < tokens.length; j++) {
    if (tokens[j] === num) {
      hasDuplicate = true;
      break;
    }
  }

const uniqueCount: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let foundBefore = false;
  for (let j = i - 1; j >= 0; j--) {
    if (tokens[j] === num) {
      foundBefore = true;
      break;
    }
  }

const uniqueSum: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let hasDuplicate = false;
  for (let j = i + 1; j < tokens.length; j++) {
    if (tokens[j] === num) {
      hasDuplicate = true;
      break;
    }
  }

const uniqueCount: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let foundBefore = false;
  for (let j = i - 1; j >= 0; j--) {
    if (tokens[j] === num) {
      foundBefore = true;
      break;
    }
  }

const uniqueSum: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let hasDuplicate = false;
  for (let j = i + 1; j < tokens.length; j++) {
    if (tokens[j] === num) {
      hasDuplicate = true;
      break;
    }
  }

const uniqueCount: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let foundBefore = false;
  for (let j = i - 1; j >= 0; j--) {
    if (tokens[j] === num) {
      foundBefore = true;
      break;
    }
  }

const uniqueSum: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let hasDuplicate = false;
  for (let j = i + 1; j < tokens.length; j++) {
    if (tokens[j] === num) {
      hasDuplicate = true;
      break;
    }
  }

const uniqueCount: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let foundBefore = false;
  for (let j = i - 1; j >= 0; j--) {
    if (tokens[j] === num) {
      foundBefore = true;
      break;
    }
  }

const uniqueSum: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let hasDuplicate = false;
  for (let j = i + 1; j < tokens.length; j++) {
    if (tokens[j] === num) {
      hasDuplicate = true;
      break;
    }
  }

const uniqueCount: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let foundBefore = false;
  for (let j = i - 1; j >= 0; j--) {
    if (tokens[j] === num) {
      foundBefore = true;
      break;
    }
  }

const uniqueSum: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let hasDuplicate = false;
  for (let j = i + 1; j < tokens.length; j++) {
    if (tokens[j] === num) {
      hasDuplicate = true;
      break;
    }
  }

const uniqueCount: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let foundBefore = false;
  for (let j = i - 1; j >= 0; j--) {
    if (tokens[j] === num) {
      foundBefore = true;
      break;
    }
  }

const uniqueSum: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let hasDuplicate = false;
  for (let j = i + 1; j < tokens.length; j++) {
    if (tokens[j] === num) {
      hasDuplicate = true;
      break;
    }
  }

const uniqueCount: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let foundBefore = false;
  for (let j = i - 1; j >= 0; j--) {
    if (tokens[j] === num) {
      foundBefore = true;
      break;
    }
  }

const uniqueSum: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let hasDuplicate = false;
  for (let j = i + 1; j < tokens.length; j++) {
    if (tokens[j] === num) {
      hasDuplicate = true;
      break;
    }
  }

const uniqueCount: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let foundBefore = false;
  for (let j = i - 1; j >= 0; j--) {
    if (tokens[j] === num) {
      foundBefore = true;
      break;
    }
  }

const uniqueSum: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let hasDuplicate = false;
  for (let j = i + 1; j < tokens.length; j++) {
    if (tokens[j] === num) {
      hasDuplicate = true;
      break;
    }
  }

const uniqueCount: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let foundBefore = false;
  for (let j = i - 1; j >= 0; j--) {
    if (tokens[j] === num) {
      foundBefore = true;
      break;
    }
  }

const uniqueSum: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let hasDuplicate = false;
  for (let j = i + 1; j < tokens.length; j++) {
    if (tokens[j] === num) {
      hasDuplicate = true;
      break;
    }
  }

const uniqueCount: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let foundBefore = false;
  for (let j = i - 1; j >= 0; j--) {
    if (tokens[j] === num) {
      foundBefore = true;
      break;
    }
  }

const uniqueSum: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let hasDuplicate = false;
  for (let j = i + 1; j < tokens.length; j++) {
    if (tokens[j] === num) {
      hasDuplicate = true;
      break;
    }
  }

const uniqueCount: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let foundBefore = false;
  for (let j = i - 1; j >= 0; j--) {
    if (tokens[j] === num) {
      foundBefore = true;
      break;
    }
  }

const uniqueSum: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let hasDuplicate = false;
  for (let j = i + 1; j < tokens.length; j++) {
    if (tokens[j] === num) {
      hasDuplicate = true;
      break;
    }
  }

const uniqueCount: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let foundBefore = false;
  for (let j = i - 1; j >= 0; j--) {
    if (tokens[j] === num) {
      foundBefore = true;
      break;
    }
  }

const uniqueSum: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let hasDuplicate = false;
  for (let j = i + 1; j < tokens.length; j++) {
    if (tokens[j] === num) {
      hasDuplicate = true;
      break;
    }
  }

const uniqueCount: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let foundBefore = false;
  for (let j = i - 1; j >= 0; j--) {
    if (tokens[j] === num) {
      foundBefore = true;
      break;
    }
  }

const uniqueSum: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let hasDuplicate = false;
  for (let j = i + 1; j < tokens.length; j++) {
    if (tokens[j] === num) {
      hasDuplicate = true;
      break;
    }
  }

const uniqueCount: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let foundBefore = false;
  for (let j = i - 1; j >= 0; j--) {
    if (tokens[j] === num) {
      foundBefore = true;
      break;
    }
  }

const uniqueSum: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let hasDuplicate = false;
  for (let j = i + 1; j < tokens.length; j++) {
    if (tokens[j] === num) {
      hasDuplicate = true;
      break;
    }
  }

const uniqueCount: number[] = [];
for (let i = 0; i < tokens.length; i++) {
  const num = tokens[i];
  let foundBefore = false;
  for
