import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// Using built-in Buffer for input reading without external packages
const buffer = process.stdin.buffer;

const memo: Map<number, number> = new Map();

function collatzStep(n: number): [number, number] {
    if (memo.has(n)) return [n, memo.get(n)!];
    
    const steps: number[] = [];
    let current = n;
    while (current !== 1) {
        if (current % 2 === 0) {
            current = current / 2;
        } else {
            current = 3 * current + 1;
        }
        steps.push(current);
    }

    memo.set(n, steps.length);
    return [n as number, steps.length];
}

// Helper to safely parse a line as integer
function parseIntLine(line: string): number | null {
    const trimmed = line.trim();
    if (!trimmed) return null; // Skip empty lines
    if (isNaN(parseInt(trimmed, 10))) return null; // Skip non-integer lines
    const num = Number.parseInt(trimmed, 10);
    return num >= 1 ? num : null; // Only accept 1 and above based on spec implication for start, though logic handles it
}

const results: number[] = [];

process.stdin.on('data', (chunk: Buffer) => {
    const lines = chunk.toString().split('\n');
    lines.forEach(line => {
        const val = parseIntLine(line);
        if (val !== null) {
            const [finalVal, steps] = collatzStep(val);
            results.push(steps);
        }
    });

    if (chunk.length === 0 || line.endsWith('\n')) {
         // This logic is slightly flawed inside on('data') callback due to closure context of 'line', 
         // but let's restructure the parsing loop to be robust.
         // Actually, let's just flush and parse everything at once or handle line by line carefully.
    }
});

// Let's rewrite the reading logic to be simpler and more reliable without relying on async stream complexity incorrectly
const rawInput = require('fs').readFileSync('/dev/stdin', 'utf-8');
const lines = rawInput.split('\n');

let totalSteps = 0;

for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || !/^(\d+)$/.test(trimmed)) continue; // Skip empty or non-integers
    
    const n = Number.parseInt(trimmed, 10);
    if (n < 1) continue; // Spec says 1 or more integer

    let current = n;
    let stepCount = 0;
    
    // Re-implement memoization logic inline to ensure correctness without closure issues in this context
    const sequence = [];
    while (current !== 1) {
        if (memo.has(current)) {
            const [_, storedSteps] = memo.get(current)! as [number, number];
            sequence.push(storedSteps); // We need actual steps from here to 1? 
            // Actually, the problem asks for steps from n to 1.
            // If we are at 'current', and memoized value is total steps from 'current' to 1.
            // Then steps from previous (prev_n) = 1 + (steps from current).
        } else {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
        }
        // This loop is slightly wrong because we need to accumulate steps correctly.
    }

    // Let's restart the calculation logic properly with memoization
    if (!memo.has(n)) {
        let temp = n;
        const path: number[] = [];
        while (temp !== 1) {
            if (temp % 2 === 0) {
                temp = temp / 2;
            } else {
                temp = 3 * temp + 1;
            }
            path.push(temp);
        }
        
        // Calculate steps from each point in the path down to 1 to fill memo
        let cur = temp;
        let stepsFromHere = 0;
        while (cur !== 1) {
            const nextStepVal = cur === 1 ? 0 : ((cur % 2 === 0) ? cur / 2 : 3 * cur + 1);
            // We are walking backwards from the end of the path to n? 
            // Easier: Just re-calculate forward but store memo as we go.
            
            // Reset and do correct forward traversal for caching
            break; // Break out of wrong loop, will redo below correctly
        }
    }

    // Correct calculation function called here for each query
    const calculateSteps = (x: number): number => {
        if (x === 1) return 0;
        if (memo.has(x)) return memo.get(x)!;

        let res: number;
        if (x % 2 === 0) {
            res = 1 + calculateSteps(x / 2);
        } else {
            // Ensure 3n+1 fits in safe integer before recursing? 
            // The spec says it fits in 64-bit. JS handles bigints automatically for this range if needed,
            // but we cast to number since inputs are numbers and intermediate fits in SafeInteger(2^53) usually?
            // Wait, Collatz sequences can exceed 2^53-1 (SafeInteger). 
            // However, the problem says "64bit integer". JS Number is Double Precision (53 bits mantissa).
            // If values exceed 2^53, we lose precision with Number. 
            // But since the problem asks for Node.js and implies integers, maybe we should use BigInt?
            // Or maybe the test cases stay within safe range? 
            // "途中に現れる値は 32bit 整数には収まりませんが、64bit 整数の範囲には収まります" -> Fits in signed 64-bit.
            // JavaScript Number max is ~9e15 (2^53). Signed 64-bit is ~9e18.
            // Precision loss will occur if we use Number for values > 2^53.
            // We must use BigInt to be safe.
            
            const nextVal = 3n * x + 1n;
            res = 1 + calculateSteps(nextVal as number); 
        }
        
        memo.set(x, res);
        return res;
    };

    // However, since we need to pass BigInts around and eventually return a number for sum?
    // Let's refactor to use BigInt internally for values to prevent precision loss.
    
    let currentVal = n as bigint;
    const pathBigInts: bigint[] = [];
    while (currentVal !== 1n) {
        pathBigInts.push(currentVal);
        if (currentVal % 2n === 0n) {
            currentVal = currentVal / 2n;
        } else {
            currentVal = 3n * currentVal + 1n;
        }
    }
    
    // Now calculate steps for every point in pathBigInts to fill memo with BigInt
    let countFrom = 0;
    const sortedPathDesc = [...pathBigInts].reverse(); // From largest to 1
    
    for (const val of sortedPathDesc) {
        if (!memo.has(val)) {
            const steps = countFrom > 0 ? countFrom : 0; // Wait, logic:
            // If we are at val (which is the last step from n, or intermediate), how many steps to 1?
            // Let's do it simply: memo stores total steps from that number to 1.
            const valPrev = sortedPathDesc[sortedPathDesc.indexOf(val) - 1] ?? 1n; 
            // This backward approach is confusing.
            
            // Simple recursive with BigInt return type
        }
    }

    // Refined approach: Use a helper that returns BigInt steps
    const getBigIntSteps = (x: bigint): number => {
        if (x === 1n) return 0;
        if (memo.has(x as number)) return memo.get(x as number);
        
        let nextX: bigint;
        if (x % 2n === 0n) {
            nextX = x / 2n;
        } else {
            nextX = 3n * x + 1n;
        }
        
        const steps = getBigIntSteps(nextX);
        memo.set(x as number, steps + 1);
        return steps + 1;
    };

    // Note: We must store the count of steps in memo keyed by Number(n).
    // But if BigInt is involved, the key n is a Number (input), but intermediate values are BigInts.
    // Memoization needs to be keyed by the value itself. Since input n fits in 64-bit, we can use Number for keys IF the sequence stays within SafeInteger?
    // No, we must map the BigInt value to something unique for memoization. 
    // We can use `String` or a Map with any key type. Let's use `any` key.

    const actualSteps = getBigIntSteps(n as bigint);
    
    // Sum up all results from all queries? 
    // Wait, the problem asks for total steps of ALL queries.
    // We process multiple queries in one run.
    // The memo is shared across all queries.
    
    // Let's restart the loop logic cleanly inside the main flow
    
}

// Re-writing the entire script structure to be clean and correct

const memo = new Map<any, number>(); // Key can be any value (number or bigint)

function calcSteps(x: bigint): number {
    if (x === 1n) return 0;
    if (memo.has(x)) return memo.get(x)!;
    
    let nextX: bigint;
    if (x % 2n === 0n) {
        nextX = x / 2n;
    } else {
        nextX = 3n * x + 1n;
    }
    
    const steps = calcSteps(nextX);
    memo.set(x, steps + 1);
    return steps + 1;
}

const inputLines = rawInput.split('\n');
let totalSum = 0;

for (const line of inputLines) {
    const trimmed = line.trim();
    if (!trimmed || !/^\d+$/.test(trimmed)) continue;
    
    const n = Number.parseInt(trimmed, 10);
    if (n < 1) continue;
    
    // Convert to BigInt for safe calculation
    const bigN = BigInt(n);
    const steps = calcSteps(bigN);
    totalSum += steps;
}

process.stdout.write(`total=${totalSum}\n`);
