const input = process.stdin.read();
if (!input) {
  // No input provided
} else {
  const lines = input.split('\n');
  
  let target: bigint;
  try {
    target = BigInt(lines[0].trim());
  } catch (e) {
    // Invalid target line
  }

  const numbers: bigint[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    try {
      numbers.push(BigInt(line));
    } catch (e) {
      // Ignore invalid integer lines
    }
  }

  let count = 0n;
  const seen: Map<bigint, bigint> = new Map();

  for (const num of numbers) {
    const complement = target - num;
    if (seen.has(complement)) {
      count += seen.get(complement)!;
    }
    seen.set(num, (seen.get(num) || 0n) + 1n);
  }

  console.log(`pairs=${count}`);
}
