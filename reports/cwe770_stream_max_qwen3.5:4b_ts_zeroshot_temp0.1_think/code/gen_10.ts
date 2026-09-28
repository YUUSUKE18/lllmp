const input = process.stdin.read();

if (!input) {
  console.log('count=0 max=0');
} else {
  const trimmedInput = input.trim();
  const parts = trimmedInput.split(',');

  const numbers: bigint[] = [];

  for (const part of parts) {
    const trimmedPart = part.trim();
    
    if (trimmedPart.length === 0) continue;
    
    // Check if it is a valid integer string (optional +/- sign followed by digits)
    if (/^[+-]?\d+$/.test(trimmedPart)) {
      numbers.push(BigInt(trimmedPart));
    }
  }

  let count = numbers.length;
  let maxVal: bigint = 0n;

  if (count > 0) {
    let currentMax = numbers[0];
    for (const num of numbers) {
      if (num > currentMax) {
        currentMax = num;
      }
    }
    maxVal = currentMax;
  } else {
    maxVal = 0n; 
  }

  console.log(`count=${count} max=${maxVal}`);
}
