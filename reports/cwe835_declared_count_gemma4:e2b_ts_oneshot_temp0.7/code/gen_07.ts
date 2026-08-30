let count = 0;
let sum = 0;
let lineCount = 0;
const inputLines: string[] = [];

process.stdin.setEncoding('utf8');

process.stdin.on('data', (data: string) => {
  const lines = data.trim().split('\n').filter(line => line.length > 0);
  for (const line of lines) {
    const num = parseInt(line.trim(), 10);
    if (!isNaN(num)) {
      const n = Number(line.trim());
      if (n >= 0 && n <= Number.MAX_SAFE_INTEGER) {
        count++;
        sum += n;
      }
    }
  }
});

process.stdin.on('end', () => {
  console.log(`count=${count} sum=${sum}`);
});
