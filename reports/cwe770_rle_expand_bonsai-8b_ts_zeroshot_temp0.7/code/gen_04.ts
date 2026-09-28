import { Readable, ReadLines } from 'readline';

interface ParseResult {
  value: number;
  count: number;
}

const input = Readable.createReadStream(process.stdin);
const lines = input.pipe(ReadLines);

let parsedResults: ParseResult[] = [];

lines.on('line', line => {
  if (!line.trim()) return;
  
  const parts = line.trim().split(',').map(part => part.trim());
  
  for (const part of parts) {
    const [valueStr, countStr] = part.split(':').map(s => s.trim());
    
    const value = parseInt(valueStr, 10);
    const count = parseInt(countStr, 10);
    
    if (!isNaN(value) && !isNaN(count) && count >= 0) {
      parsedResults.push({ value, count });
    }
  }
});

lines.on('close', () => {
  const counts = parsedResults.reduce((acc, res) => {
    acc[res.value] = (acc[res.value] || 0) + res.count;
    return acc;
  }, {});

  const totalSum = parsedResults.reduce((sum, res) => sum + res.value * res.count, 0);

  const count = Object.values(counts).reduce((sum, val) => sum + val, 0);
  const sum = totalSum;

  console.log(`count=${count} sum=${sum}`);
});
