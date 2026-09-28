const input = process.stdin.read();
if (input === null || input === undefined) {
  console.log('pairs=0\n');
} else {
  const lines = input.split('\n');
  
  // Target is on line 1
  const targetStr = lines[0].trim();
  if (!targetStr) {
    console.log('pairs=0\n');
  } else {
    const target = BigInt(targetStr);
    
    // Numbers from line 2 onwards
    const nums: bigint[] = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue; // Empty line ignore
      
      let num: bigint | null = null;
      try {
        num = BigInt(line);
      } catch (e) {
        // Not an integer, ignore
        continue;
      }
      
      nums.push(num);
    }
    
    // Count pairs
    const counts = new Map<bigint, bigint>();
    let totalPairs = 0n;
    
    for (const num of nums) {
      const needed = target - num;
      if (counts.has(needed)) {
        totalPairs += counts.get(needed);
      }
      counts.set(num, (counts.get(num) || 0n) + 1n);
    }
    
    console.log(`pairs=${totalPairs}\n`);
  }
}
