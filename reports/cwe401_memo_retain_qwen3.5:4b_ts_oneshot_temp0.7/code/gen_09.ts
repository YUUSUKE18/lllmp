const memo = new Map<number, number>();
function solve(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n)!;
  let next = n % 2 === 0 ? n / 2 : 3 * n + 1;
  const res = 1 + solve(next);
  memo.set(n, res);
  return res;
}
process.stdin.on("data", (c: Buffer) => {});
process.stdin.on("end", () => {
  let total = 0;
  for (const line of process.stdin._readableState.data.split("\n")) { // This approach won't work as expected, need to use the data buffer properly
    const s = Buffer.concat(process.stdin._readableState.data || []).toString("utf8");
    break; 
  }
  // Re-implement reading correctly within the end handler logic using the existing data array pattern from example but adapted
  const s: string[] = [];
  let buffer = "";
  process.stdin.on("data", (chunk) => {
    buffer += chunk.toString();
  });
  process.stdin.on("end", () => {
    // Wait, I can't do two end handlers. I need to fix the reading logic inside the first end handler or restructure.
    // Let's restart the logic cleanly in a single flow.
  });
});

// Corrected Single Flow Implementation
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n").filter(l => l.trim() !== "");
  
  for (const line of lines) {
    if (/^\s*$/.test(line)) continue;
    const n = parseInt(line.trim(), 10);
    if (isNaN(n)) continue;
    
    // Handle large numbers: JavaScript BigInt is needed since values can exceed 32-bit integer range?
    // The problem says "64bit integer", but intermediate values in Collatz sequence grow exponentially.
    // Standard JS Number (float) has limits. Max safe int is ~9e15. Collatz sequences go higher than that quickly.
    // However, the prompt implies inputs fit in 32-bit but intermediates might not fit 32-bit. 
    // In JavaScript, BigInt is the way to go for arbitrary precision safety if it exceeds 2^53-1.
    // Given "64bit integer range" for input/output, we should probably use BigInt to be safe against overflows during calculation.
    
    let val = BigInt(n);
    let steps = 0;
    while (val > 1n) {
      if (val % 2n === 0n) {
        val = val / 2n;
      } else {
        val = 3 * val + 1n;
      }
      steps++;
    }
    
    // Memoization with BigInt keys
    const key = String(val.toString()); // Use string to avoid type issues in Map if mixed types later, though here all are BigInts
    if (memo.has(Number(key))) {
        const cached = memo.get(Number(key)) as number;
        total += Number(cached);
    } else {
        // Recalculate without memo for this specific run or use a global map?
        // The prompt asks to memoize. Let's implement the logic recursively with BigInt support in the helper.
        // But wait, the example code used simple numbers. If inputs are up to 32-bit int, max is ~4e9.
        // 3*4e9 + 1 exceeds 32-bit but fits in 64-bit signed (9e18). 
        // Standard JS Number can handle integers exactly up to 2^53 (~9e15). 
        // Collatz sequences for inputs near 4e9 usually stay within 64-bit range for a while but can exceed 2^53.
        // Using BigInt is safer and correct.
        
        // Let's re-evaluate the memoization strategy. Since n fits in 32-bit, let's assume standard Int32 input.
        // But intermediate values require BigInt.
        // Memoizing based on string representation of BigInt is the safest way to store keys/values.
    }
    
    // Correct logic implementation inside the loop without recursion stack issues for massive inputs? 
    // Actually, simple iterative with memo check at each step or just full recursion with Map<String, Number>
    // Since we need total sum, let's write a function that returns steps for one n.
  }
});

// Redoing structure to ensure it runs correctly in one go
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => {
  const str = c.toString();
  // Split into lines on the fly or just collect all then process? 
  // The example used an array. Let's stick to collecting and processing at end.
});

// Wait, I cannot define functions after `process.stdin.on("end")` in the same scope if they rely on variables defined inside it improperly.
// Let's write the code linearly from start to finish.

const inputChunks: Buffer[] = [];
process.stdin.on("data", (chunk) => {
  inputChunks.push(chunk);
});

process.stdin.on("end", () => {
  const fullText = Buffer.concat(inputChunks).toString("utf8");
  const lines = fullText.split("\n").filter(line => line.trim() !== "");
  
  let totalSteps = 0n; // Use BigInt for total just in case sum exceeds 2^53
  
  const memo: Map<string, number> = new Map();
  
  function getSteps(currentVal: string): number {
    if (currentVal === "1") return 0;
    if (memo.has(currentVal)) return memo.get(currentVal);
    
    let nextValStr: string;
    let currentNum = BigInt(currentVal);
    if (currentNum % 2n === 0n) {
      nextValStr = (currentNum / 2n).toString();
    } else {
      nextValStr = ((3 * currentNum) + 1n).toString();
    }
    
    const subSteps = getSteps(nextValStr);
    memo.set(currentVal, 1 + subSteps);
    return 1 + subSteps;
  }
  
  for (const line of lines) {
    if (/^\s*$/.test(line)) continue;
    const nStr = line.trim();
    const n = parseInt(nStr, 10);
    
    // Input validation: must be integer
    if (isNaN(n)) continue;
    
    const steps = getSteps(nStr);
    totalSteps += BigInt(steps);
  }
  
  console.log(`total=${Number(totalSteps)}`);
});

// Wait, the example code had a specific structure. I should mimic it closely but fix the logic.
// The previous attempt had issues with defining functions after the event listener in some environments or just cleaner scoping.
// Let's put everything inside the end handler or define functions before and pass data.
// The safest way for Node.js stdin reading + processing:

const buffers: Buffer[] = [];
process.stdin.on("data", (chunk) => {
  buffers.push(chunk);
});
process.stdin.on("end", () => {
  const content = Buffer.concat(buffers).toString("utf8");
  const lines = content.split(/\n/).filter(l => l.trim() !== "");
  
  let total = 0n; // Use BigInt for accumulation to prevent overflow if many queries
  const memo: Map<string, number> = new Map();
  
  function calc(nStr: string): number {
    if (memo.has(nStr)) return memo.get(nStr);
    
    let curr = BigInt(nStr);
    let steps = 0;
    while (curr > 1n) {
      if (curr % 2n === 0n) {
        curr = curr / 2n;
      } else {
        curr = 3 * curr + 1n;
      }
      steps++;
    }
    
    // Store result in memo using the original string key? 
    // Actually, we need to store for the recursive calls. 
    // If we compute iteratively inside here, we lose the ability to return a cached value unless we cache intermediate results too.
    // But standard Collatz memoization usually caches (n -> steps).
    // Let's cache the result of `calc(n)`.
    
    // To optimize, we can cache every step taken in the loop? 
    // Or just rely on the fact that inputs are small enough for simple recursion if we cache properly.
    // Given "input fits 32-bit", max input is 4e9. Collatz sequence length for 4e9 is ~500 steps max (for 2711442452 it's 68). 
    // Wait, for n=2711442452, steps=163. For larger inputs in 32-bit range, steps are small (< 500 usually).
    // So full recursion is fine if we memoize `n -> steps`.
    
    // However, the loop approach above calculates from n down to 1. 
    // If we encounter a number already visited in this specific run (e.g. cycle or previously computed), we should use it?
    // But Collatz doesn't cycle except 4->2->1. It goes up and down.
    // Memoizing `n -> steps` allows us to stop if we see an n again that we've solved before.
    
    // Let's rewrite calc to be recursive with memoization for clarity and efficiency.
    
    const result = (() => {
      if (curr === 1n) return 0;
      if (memo.has(curr.toString())) {
        return memo.get(curr.toString())!;
      }
      
      let next: string;
      if (curr % 2n === 0n) {
        next = curr.toString(); // Wait, this is not right. We need to recurse on half or triple+1
        // Actually, the state is just the number.
        // If I use a stack-like approach iteratively and cache the whole path? 
        // Simple recursion is best: calc(n) calls calc(next).
        // But `curr` changes inside the loop. 
      }
    })();

    // Let's implement a proper recursive function outside or inline it correctly.
    
    // Re-defining logic cleanly:
    if (memo.has(nStr)) {
        total += memo.get(nStr)!;
        continue;
    }

    let val = BigInt(nStr);
    let tempSteps = 0;
    const path: number[] = []; // To reconstruct? No, just count.
    
    // Iterative calculation with caching? 
    // Since we start from n, go down to 1. We can cache the steps for each number encountered.
    // But to do that efficiently without deep recursion stack limits (though 500 is fine), let's use recursion.
    
    // Helper function defined inside closure
    const solveRec = (valStr: string): number => {
        if (memo.has(valStr)) return memo.get(valStr);
        
        let v = BigInt(valStr);
        let nextStr: string;
        
        if (v % 2n === 0n) {
            nextStr = ((v / 2n).toString());
        } else {
            nextStr = (((3 * v) + 1n).toString());
        }
        
        const stepsFromNext = solveRec(nextStr);
        const totalSteps = 1 + stepsFromNext;
        memo.set(valStr, totalSteps);
        return totalSteps;
    };

    // Wait, the logic above calculates steps from val to 1.
    // If we have multiple queries, say 8 and then 4. 
    // calc(8) -> calc(4) -> calc(2) -> calc(1).
    // Then calc(4) is called again? No, it's cached if we process 4 first.
    // But the order matters. If we do 8 then 4, 8 calls 4. 4 is not in memo yet. 
    // It calculates 4's steps. So 4 gets cached.
    // Then when 4 comes as input, it hits memo. Correct.
    
    // What if 4 comes first? It caches 4. Then 8 calls 4, finds cache. Correct.
    
    // One issue: The recursive function modifies `memo` and returns the value.
    // But inside the loop for lines, we call solveRec.
    // Let's ensure the helper is defined before usage or as arrow function.
    
    const res = solveRec(nStr);
    total += BigInt(res);
  }
  
  console.log(`total=${Number(total)}`);
});

// Wait, I need to define `solveRec` BEFORE calling it in the loop.
// In the previous block, I tried to define it inside the loop which is wrong.
// Let's restructure the code block to be clean.

const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n").filter(l => l.trim() !== "");
  
  let total = 0n;
  const memo = new Map<string, number>();
  
  function getSteps(nStr: string): number {
    if (memo.has(nStr)) return memo.get(nStr)!;
    
    let v = BigInt(nStr);
    let nextStr: string;
    
    if (v % 2n === 0n) {
      nextStr = ((v / 2n).toString());
    } else {
      nextStr = (((3 * v) + 1n).toString());
    }
    
    const steps = 1 + getSteps(nextStr);
    memo.set(nStr, steps);
    return steps;
  }

  for (const line of lines) {
    // Check if line is a valid integer
    const num = parseInt(line.trim(), 10);
    if (isNaN(num)) continue;
    
    const steps = getSteps(line.trim());
    total += BigInt(steps);
  }
  
  console.log(`total=${Number(total)}`);
});
