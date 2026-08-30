import { readFileSync } from 'fs';

const input = new TextDecoder().decode(readFileSync(0, 'utf8'));
const parts = input.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(Number(n)));
if (parts.length === 0) return process.stdout.write('count=0 sum=0\n');

// Unique values and their sums using a Map to handle potential large counts while staying within safe integer logic for the problem constraints.
const uniqueMap = new Map<number, number>(); // Value -> Count + Sum? No, we need count and separate sum per value or total sum of all unique values? 
// Re-reading spec: "重複を除いた整数について、個数と合計を求めます" (For integers without duplicates, find the count and sum).
// This phrasing is slightly ambiguous. It could mean:
// 1. For each distinct integer X in input: output its frequency (count) and value itself? No, that would be multiple lines or a map structure.
// 2. The set of unique integers as a group: Find the count of these unique numbers, AND the sum of all original numbers? Or just the sum of the unique ones?
// Let's look at standard interpretations in such problems (e.g., AtCoder/LeetCode style).
// Usually "count" refers to how many distinct items there are.
// And "sum" usually refers to the sum of those distinct items, OR if duplicates existed originally and we ignore them for counting but include their value? 
// Wait, "重複を除いた整数について" (Regarding integers excluding duplicates) implies we look at the set {u1, u2...}.
// If input is [1, 1, 2], unique are {1, 2}. Count = 2. Sum could be sum of distinct values (3) or sum of all elements ignoring duplicate counts? 
// Given "合計" usually implies arithmetic sum of the numbers being discussed. Since we exclude duplicates to form the set, the sum is likely over this set.
// HOWEVER, a common interpretation in such contexts where you filter unique items first:
// 1. Identify unique integers U = {x | x exists}.
// 2. Count C = size(U).
// 3. Sum S = sum(x for x in U) OR sum(all original values)? 
// Let's re-read carefully: "それらのうち『重複を除いた整数』について、個数と合計を求めます" -> For the integers [after removing duplicates], find count and sum.
// This strongly suggests we take the set of unique numbers, then calculate properties on THIS SET.
// So for input 1,1,2: Unique={1,2}. Count=2. Sum=3 (since 1+2). 
// If it meant "sum of all elements", it wouldn't specify "excluding duplicates" as the condition for what is being summed. It would say "count unique items and sum total".
// Let's assume: Unique Set -> Calculate its cardinality and element-wise sum.

const uniqueValues = [...new Set(parts)]; // Array of distinct integers
let count = 0;
let sum = BigInt(0); 

for (const val of uniqueValues) {
    if (!Number.isFinite(val)) continue; 
    // Ensure it's actually a valid integer within reason, though input says "integer".
    // Using Number is fine for typical inputs unless they exceed safe int but fit in 64bit.
    count++;
    sum += BigInt(val);
}

// Wait, if the user meant: Input [1, 2, 3], Output count=3, sum=6? Yes.
// If input is [10, 10, 10]. Unique=[10]. Count=1. Sum=10. 
// This seems the most logical interpretation of "For unique integers...".

process.stdout.write(`count=${count} sum=${Number(sum)}\n`); // Output as Number since spec says 64bit integer range, JS BigInt is safer for intermediate but output format suggests standard int representation? Spec: "合計は 64bit 整数の範囲に収まります" -> fits in number.
