let count = 0;
let sum = 0;
const inputLines: string[] = [];
let lineCount = 0;

process.stdin.setEncoding('utf8');

process.stdin.on('data', (data: string) => {
  const lines = data.trim().split('\n').filter(line => line.length > 0);
  for (const line of lines) {
    if (lineCount === 0) {
      const num = parseInt(line.trim(), 10);
      if (!isNaN(num)) {
        count = num;
        sum = num;
      }
    } else {
      const num = parseInt(line.trim(), 10);
      if (!isNaN(num)) {
        sum += num;
      }
    }
    lineCount++;
  }
});

process.stdin.on('end', () => {
  console.log(`count=${count} sum=${sum}`);
});
