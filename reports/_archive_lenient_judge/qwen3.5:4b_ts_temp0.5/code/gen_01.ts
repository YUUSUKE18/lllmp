import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();

if (!input) {
    console.log('count=0 sum=');
} else {
    const numbers: number[] = [];
    
    for (const token of input.split(',')) {
        if (/^-?\d+$/.test(token.trim())) {
            numbers.push(parseInt(token, 10));
        }
    }

    const seen = new Set<number>();
    let countSum = 0;

    // Count unique elements and sum them up. 
    // Note: The spec asks for "count of the integers after removing duplicates" (個数) 
    // AND "sum". Based on standard interpretation in such problems, it usually means:
    // 1. How many *unique* numbers are there?
    // 2. What is the sum of those unique numbers?
    
    for (const num of numbers) {
        if (!seen.has(num)) {
            seen.add(num);
            countSum += num;
        }
    }

    console.log(`count=${seen.size} sum=${countSum}`);
}
