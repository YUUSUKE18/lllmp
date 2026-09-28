const input = process.stdin.read();
if (!input) {
  console.log('pairs=0');
} else {
  const lines = input.split('\n');
  let target: bigint | null = null;
  const nums: bigint[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (!trimmed) continue; 
    
    // Check if valid integer string
    if (!/^-?\d+$/.test(trimmed)) continue;

    const val = BigInt(trimmed);
    
    if (i === 0) {
      target = val;
    } else {
      nums.push(val);
    }
  }

  if (target === null || nums.length < 2) {
    console.log('pairs=0');
  } else {
    let count = 0n;
    const map = new Map<bigint, number>(); 
    
    for (const num of nums) {
      const complement = target - num;
      if (map.has(complement)) {
        count += BigInt(map.get(complement)!);
      }
      map.set(num, (map.get(num) || 0) + 1);
    }
    
    console.log(`pairs=${count}`);
  }
}
