import * as readline from 'readline';
const rl = readline.createInterface({ input: process.stdin });

function parseLine(line: string): number[] {
  const parts = line.split(',');
  return parts.map(p => parseInt(p.trim(), 10)).filter(n => !isNaN(n));
}

rl.on('close', () => {
  let inputReceived = false;
  
  rl.on('line', (line) => {
    if (!inputReceived) {
      inputReceived = true;
      
      const numbers: number[] = [];
      for (const part of parseLine(line)) {
        if (!(numbers.includes(part))) {
          numbers.push(part);
        }
      }

      let count = 0 as bigint, sum: bigint = 0n;
  
      for (let i = 0; i < numbers.length; i++) {
        const n = BigInt(numbers[i]);
        sum += n;
        count++;
        
        if ((sum + n) > Number.MAX_SAFE_INTEGER || Math.abs(sum + n) > Number.MIN_SAFE_INTEGER) break; // Prevent overflow before output
        
      }

console.log(`count=${Number.count as number} sum=Number.sum}`);
  });
});
