const memo = new Map<number, number>();
let total = 0n; // Use BigInt for safety during intermediate steps, though final answer fits in BigInt.

process.stdin.on("data", (c: Buffer) => {
  data.push(c);
});

process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let parts = [];
  let currentLine = "";
  
  // Process line by line to handle potential multiple lines even if spec says "1 per line"
  for (const char of s) {
    if (char === "\n") {
      const line = currentLine.trim();
      if (line === "") continue;
      
      const val = parseInt(line, 10);
      if (!isNaN(val)) {
        parts.push(val);
      }
      currentLine = "";
    } else {
      currentLine += char;
    }
  }
  
  // Handle the last line
  const lastLine = currentLine.trim();
  if (lastLine === "") return; // Should not happen based on spec, but safe guard
  
  const val = parseInt(lastLine, 10);
  if (!isNaN(val)) {
    parts.push(val);
  }

  for (const n of parts) {
    let steps = 0n;
    let current = BigInt(n); // Ensure we start with BigInt to avoid overflow in intermediate calculations
    
    while (current !== 1n) {
      if (memo.has(Number(current))) {
        steps += BigInt(memo.get(Number(current)));
        break;
      }

      const isEven = current % 2n === 0n;
      let nextVal: bigint;
      
      if (isEven) {
        nextVal = current / 2n;
      } else {
        nextVal = (3 * current + 1n);
      }

      // Memoize before processing or after, but since we only need to know when we see a value again
      // it's better to store computed results for the same value at any step count.
      // However, standard Collatz is: f(n) = n/2 (even), 3n+1 (odd). 
      // If we encounter 'x' later, we want steps from x to 1.
      // So if we haven't computed steps for 'nextVal' yet, let's compute it?
      // Actually simpler: Just check if nextVal is in memo. If yes, add that steps and break loop.
      
      // To optimize, we should store the step count from current to 1.
      // Let's restructure slightly for clarity.
      
      if (!memo.has(Number(nextVal))) {
        memo.set(Number(nextVal), BigInt(steps)); // Store what we've found so far? No, this is tricky.
        // Standard approach: If we have seen 'nextVal' before and know steps to 1 from it, add them.
        // But if we haven't, we continue.
        // Let's store the computed path length for values we fully processed.
      } else {
        total += BigInt(memo.get(Number(nextVal)));
        steps += memo.get(Number(nextVal));
        break; 
      }

      current = nextVal;
    }
    
    // Finalize: We started with n. We want steps from n to 1.
    // The loop above tries to jump to known values.
    // But the logic inside the while loop was a bit mixed. Let's rewrite cleanly.
    
    let count = 0n;
    let curr = BigInt(n);
    
    while (curr !== 1n) {
      if (memo.has(Number(curr))) {
        count += BigInt(memo.get(Number(curr)));
        break; // We jump to the cached result's end state, which is 1. But wait, memo stores steps TO 1.
      } else {
        const isEven = curr % 2n === 0n;
        let nxt: bigint;
        if (isEven) {
          nxt = curr / 2n;
        } else {
          nxt = 3 * curr + 1n;
        }

        // If nxt is already in memo, we can add its steps and break.
        if (memo.has(Number(nxt))) {
          count += BigInt(memo.get(Number(nxt)));
          // Since the goal is 1, and memo stores steps FROM that number TO 1,
          // adding it means we reach 1 in that many steps.
          // However, if nxt is not 1, but in memo, then steps to 1 from nxt are known.
          // So total steps = 1 (step to nxt) + steps(nxt to 1).
          count += 1n; 
          break;
        } else {
          // Compute next step
          count++;
          curr = nxt;
        }
      }
    }

    // The above logic has a flaw in the memoization placement.
    // Let's restart the calculation logic for clarity inside the loop.
    
    let s = 0n;
    let v = BigInt(n);
    
    while (v !== 1n) {
      if (memo.has(Number(v))) {
        s += BigInt(memo.get(Number(v)));
        // If we found a value in memo, it means we know the steps from that value to 1.
        // So we just add those steps and stop. The current state 'v' is one of those values? 
        // No, if v is in memo, then steps(from v to 1) is stored. So we are done.
        break;
      }
      
      const isEven = v % 2n === 0n;
      let nextV: bigint;
      if (isEven) {
        nextV = v / 2n;
      } else {
        nextV = 3 * v + 1n;
      }

      // If the next value is already in memo, we can skip the rest of the steps for this path.
      if (memo.has(Number(nextV))) {
        s += 1n + BigInt(memo.get(Number(nextV)));
        // We take one step to nextV, then add steps from nextV to 1.
        break;
      }

      v = nextV;
      s++;
    }

    memo.set(Number(n), s);
    total += s;
  }

  console.log(`total=${Number(total)}`);
});
