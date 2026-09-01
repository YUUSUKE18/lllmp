const memo = new Map<number, number>();
let total = 0n;

process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(process.stdin._readData).toString("utf8");
  if (!s) return;
  
  const lines = s.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    
    const n = parseInt(trimmed, 10);
    if (isNaN(n)) continue;
    
    const steps = getSteps(n);
    total += BigInt(steps);
  }
  
  console.log(`total=${total}`);
});

function getSteps(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n)!;
  
  let steps = 0;
  let curr = n;
  
  while (curr !== 1) {
    if (curr % 2 === 0) {
      curr = curr / 2;
    } else {
      curr = 3 * curr + 1;
    }
    steps++;
    
    // Check if we've seen this number before in the current chain or previously
    if (memo.has(curr)) {
      const prevSteps = memo.get(curr)!;
      total += BigInt(prevSteps);
      break;
    }
    
    memo.set(curr, steps);
  }
  
  return memo.get(n)!;
}

// Re-implementing logic to ensure correct memoization and total calculation
function calculateTotal() {
  const lines = Buffer.concat(process.stdin._readData).toString("utf8").split(/\r?\n/);
  const seen = new Set<number>();
  const memo: Map<number, number> = new Map();
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    
    const n = parseInt(trimmed, 10);
    if (isNaN(n)) continue;
    
    let steps = 0;
    let curr = n;
    
    while (curr !== 1) {
      if (seen.has(curr)) {
        // Found a cycle or previously computed value
        const prevSteps = memo.get(curr)!;
        total += BigInt(prevSteps);
        break;
      }
      
      seen.add(curr);
      memo.set(curr, steps);
      
      if (curr % 2 === 0) {
        curr = curr / 2;
      } else {
        curr = 3 * curr + 1;
      }
      steps++;
    }
    
    total += BigInt(steps);
  }
  
  console.log(`total=${total}`);
}

// Since we need to read all input first, let's use a different approach
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  const seen = new Set<number>();
  const memo: Map<number, number> = new Map();
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    
    const n = parseInt(trimmed, 10);
    if (isNaN(n)) continue;
    
    let steps = 0;
    let curr = n;
    
    while (curr !== 1) {
      if (seen.has(curr)) {
        const prevSteps = memo.get(curr)!;
        total += BigInt(prevSteps);
        break;
      }
      
      seen.add(curr);
      memo.set(curr, steps);
      
      if (curr % 2 === 0) {
        curr = curr / 2;
      } else {
        curr = 3 * curr + 1;
      }
      steps++;
    }
    
    total += BigInt(steps);
  }
  
  console.log(`total=${total}`);
});
