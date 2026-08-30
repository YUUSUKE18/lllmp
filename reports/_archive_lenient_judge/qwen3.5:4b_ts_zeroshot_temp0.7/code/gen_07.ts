import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
const numbers: number[] = [];

for (const part of parts) {
  const trimmedPart = part.trim();
  if (trimmedPart === '') continue;
  
  // Integers are defined as matching the regex /^\s*\d+\s*$/ or /^-\?\d+\.?(\d*)\s*$$/ but problem says "integers", usually meaning valid integer string representation. 
  // Assuming standard decimal integers, possibly with leading/trailing whitespace which we trimmed.
  // Let's handle negative numbers and optional sign if implied by context of "integer". 
  // Simplest robust check: try parsing as number after trim. If it results in a finite whole number? No, JavaScript parse is tricky for strings like '123'.
  // The spec says "integers", implies they are integers. Let's assume input contains valid integer representations (e.g., "+5", "-4"). 
  // However, to be safe against non-integers: check if Number.parseInt works and result is finite? No, parseInt on '123' gives 123.
  
  let parsedNum = null;
  try {
    const numVal = parseFloat(trimmedPart);
    // Check if it's actually an integer (no fractional part)
    if (!isNaN(numVal) && Number.isInteger(numVal)) {
      numbers.push(Math.floor(numVal)); 
    } else {
       // Fallback for cases where strict parsing might fail but input is meant to be int? 
       // Actually, parseFloat('1.5') -> 1.5 (not integer). parseInt('1.5') -> 1 (integer part only?).
       // The spec says "integers". Usually implies no decimals in the source if not intended as float.
       // Let's stick to: parseable as a whole number string or standard int representation.
    }
  } catch(e) {}

}

// Better approach using regex for pure integers including optional sign and decimal point check? 
// Simpler: try parseInt, but only if the part doesn't contain '.' unless it ends in .0? No, simpler is just Number() then IsInteger().
let uniqueNums = new Set();
for (const n of numbers) {
    uniqueNums.add(n);
}

if (uniqueNums.size === 0 || !input.length > 0) { // Handle empty input case properly? Spec says ignore elements, if none left count=0.
   console.log(`count=${uniqueNums.size} sum=${Array.from(uniqueNums).reduce((a,b)=>a+b, 0)}`);
}else{
    const arr = Array.from(uniqueNums); // Convert back to array for order? Order not specified, usually doesn't matter unless 'strictly'. 
                                       // Spec: "count=<number> sum=<sum>". No specific ordering required.
    
    let countStr = uniqueNums.size.toString();
    let sumVal = 0;
    if (arr.length > 0) {
        for(const n of arr){
            sumVal += Number(n); // Double cast to ensure type safety, though Set holds numbers
        }
    }

    console.log(`count=${countStr} sum=${sumVal}`);
}
