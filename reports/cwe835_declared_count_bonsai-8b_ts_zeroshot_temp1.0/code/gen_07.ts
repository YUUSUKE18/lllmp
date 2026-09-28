const stdin = process.stdin;
const lines = stdin.pipe(console.log).on('end').toArray();

let count = 0;
let sum = 0;

for (const line of lines) {
  const matches = line.match(/\d+/);
  if (matches) {
    const num = parseInt(matches[0], 10);
    if (!isNaN(num)) {
      count++;
      sum += num;
    }
  }
}

console.log(`count=${count} sum=${sum}`);
