const buffer: Uint8Array = new Uint8Array();
let pos = 0;
process.stdin.on("data", (chunk: Buffer) => {
  const buf = Buffer.concat([buffer, chunk]);
  if (pos >= buf.length) return;
} as any);
// Using a callback that handles full stream reading via 'end' event is safer for Node.js stdin.
// Let's refactor to the structure shown in the example which accumulates buffers.

const data: Buffer[] = [];
process.stdin.on("data", (chunk: Buffer) => data.push(chunk));

process.stdin.on("end", () => {
  const fullBuffer = Buffer.concat(data);
  if (fullBuffer.length === 0) {
    console.log(`total=0`);
    return;
  }

  // Use a Map for memoization. Keys are strings of numbers to handle potential large integers as keys safely.
  const cache: Map<string, number> = new Map();

  function collatzStep(n: bigint): bigint {
    if (cache.has(String(n))) return Number(cache.get(String(n))!)n; // Wait, logic error in memoization usage below

    // Correct Memoization Logic:
    // We need to compute the length of chain.
    // Let's restructure.
  }

  // Re-implementing with correct flow and BigInt support
  const stepsCache: Map<string, number> = new Map();

  function calculateSteps(n: string): bigint {
    if (n === "1") return 0n;
    
    if (stepsCache.has(n)) {
      return Number(stepsCache.get(n))n;
  }
    const numBig = BigInt(Number(n)); // n is parsed from string
    
    let currentStep: number = 0;
    let currVal: bigint = numBig;

    while (currVal > 1n) {
      const isEven = currVal % 2n === 0n;
      if (isEven) {
        currVal = currVal / 2n;
      } else {
        currVal = (3 * currVal + 1n); // 3*n + 1
      }
      currentStep++;
    }

    stepsCache.set(n, currentStep);
    return currentStep as bigint;
  }

  function processNumber(str: string): number {
    const numStr = str.trim();
    if (!numStr || !/^-?\d+$/.test(numStr)) return 0; // Ignore invalid lines
    
    const bigNumVal = BigInt(Number(numStr)); // Ensure we can handle larger than JS number range input? 
    // Wait, JS Number max is ~9e15. If input exceeds this, parseInt fails or converts to NaN/scientific.
    // The spec says "values may exceed 32-bit but fit in 64-bit". 
    // 64-bit signed max is approx 9.22e18. JS Number can hold up to 2^53-53 safely, beyond that precision is lost (float vs int).
    // However, for Collatz sequence logic with large numbers, we MUST use BigInt.
    // If input fits in 64-bit signed integer, converting string to BigInt directly works without parsing via Number if the number exceeds safe precision.
    
    // Let's parse as String first, then BigInt.
    const cleanStr = numStr; 
    if (cleanStr.length > 25) { // Likely exceeds precision of Number
       // We can't use Number() here directly for very large numbers that fit in 64-bit but not safe-integer range?
       // Actually, the input says "values exceed 32-bit". They might be like 10^18.
       // 10^18 fits in JS Number (float64 has ~15-17 decimal digits precision). 
       // If input is 19 digits, Number() will lose lower digits precision.
       // So we should use BigInt directly from the string.
    }

    const n = BigInt(cleanStr);
    
    let currentVal = n;
    let totalStepsForThisNum = 0;
    
    while (currentVal > 1n) {
      if (currentVal % 2n === 0n) {
        currentVal = currentVal / 2n;
      } else {
        currentVal = 3 * currentVal + 1n;
      }
      totalStepsForThisNum++;
    }
    
    return Number(totalStepsForThisNum);
  }

  // Wait, the memoization needs to be consistent.
  // Let's rewrite cleaner.
  
  const memo: Map<string, number> = new Map();
  
  function getSteps(nStr: string): number {
    let nBig: bigint;
    if (nStr === "1") return 0;
    
    if (!isNaN(BigInt.parse(String(nStr))) && String(nStr) !== 'Infinity') { // Just check validity
        try {
            const val = BigInt(nStr);
            // We can't easily cache based on string representation of huge numbers if the string is very long? 
            // But spec says it fits in 64-bit. So length <= 20 digits usually.
            // String key is fine.
            
            let steps = 0;
            let curr = val;
            while (curr > 1n) {
                if (curr % 2n === 0n) curr = curr / 2n;
                else curr = 3 * curr + 1n;
                steps++;
            }
            
            // Check cache before processing? Or just store result.
            // To optimize, check cache at start.
        } catch (e) {
            return 0;
        }
    }
    
    // Let's restart the logic cleanly with a single function that handles everything including memoization correctly.
    if (memo.has(nStr)) return memo.get(nStr)!;

    let current = BigInt(nStr);
    localSteps = 0;
    while (current > 1n) {
        if (current % 2n === 0n) current = current / 2n;
        else current = 3 * current + 1n;
        localSteps++;
    }
    
    memo.set(nStr, localSteps);
    return localSteps;
  }

  // Correct implementation structure
  const cache: Map<string, number> = new Map();
  let totalSum = 0;

  function computeChainLen(str: string): number {
    if (str === "1") return 0;
    if (cache.has(str)) return Number(cache.get(str)!);

    try {
      const numVal = BigInt(str); // Direct conversion to avoid float precision loss
      let steps = 0;
      let curr = numVal;
      
      while (curr > 1n) {
        if (curr % 2n === 0n) {
          curr = curr / 2n;
        } else {
          curr = 3 * curr + 1n;
        }
        steps++;
      }
      
      cache.set(str, steps);
      return steps;
    } catch (e) {
      // If string is too long for BigInt or invalid, assume 0 or ignore. 
      // Given spec "fits in 64-bit", BigInt should handle it fine.
      return 0;
    }
  }

  const lines = fullBuffer.toString().trim().split(/\r?\n/);

  for (const line of lines) {
    if (!line.trim()) continue; // Skip empty lines
    const numStr = line.trim();
    try {
      // Check if it's a valid integer string representation
      // Basic check: start with optional minus, then digits only.
      const match = numStr.match(/^[-+]?(?:\d+)$|^[-+]?\d+$/); 
      if (match) {
        const steps = computeChainLen(numStr);
        totalSum += steps;
      }
    } catch (e) {
      // Ignore invalid lines
    }
  }

  console.log(`total=${totalSum}`);
});
