const stdin = process.stdin;
let count = 0;
let sum = 0;

for (let line of stdin) {
  const stripped = line.trim();
  if (!stripped) continue;

  const numStr = stripped.match(/\d+%/);
  if (numStr) {
    const num = parseInt(numStr[0], 10);
    if (typeof num === 'number' && !isNaN(num)) {
      count++;
      sum += num;
    }
  }
}

console.log(`count=${count} sum=${sum}`);
