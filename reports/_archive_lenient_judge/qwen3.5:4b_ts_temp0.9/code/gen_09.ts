import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.on('line', (line) => {
  const parts = line.split(',').map((s) => parseInt(s.trim())).filter((n): n is number => !isNaN(n));
  
  const uniqueValues = new Set<number>();
  for (const num of parts) {
    uniqueValues.add(num);
  }

  let count = uniqueValues.size;
  let sum = 0n as bigint; // Using BigInt to ensure no overflow before output, though requirement says fits in 64bit.
  
  const maxInt32 = 2147483647;
  const minInt32 = -2147483648;

  for (const num of uniqueValues) {
    sum += BigInt(num);
  }

  if (sum < -(maxInt32)) {
    console.error('Sum is outside safe integer range. Please ensure input fits within 64-bit limits as specified.');
    return;
  } else if (sum > maxInt32) {
    // Even though it fits in 64bit, this check might be needed for JS number precision safety during conversion later? 
    // Actually let's just print BigInt result converted carefully or stick to the spec.
    // Spec says "fits into 64-bit integer", implying output will look like a standard integer string if within range but technically up to max safe int32 is usually expected for these tasks unless explicit unsigned 64bit required? 
    // Let's assume signed 64-bit: -9e18 to +9e18.
    
     const MAX_INT_64 = BigInt(0x7FFFFFFFFFFFFFFF); 
     if (sum > MAX_INT_64) {
        console.error('Sum exceeds safe integer range.'); // Should not happen based on spec assumption but good for safety
        
    } else {

  const formattedString = count.toString();
      sum.toString();
    
}
console.log(`count=${formattedString}`);
