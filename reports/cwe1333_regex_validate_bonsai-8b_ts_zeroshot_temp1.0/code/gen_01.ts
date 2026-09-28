const stdin = process.stdin;
const result = stdin.pipe((read) => {
  const line = read.trim();
  const parts = line.split(',');
  if (parts.length >= 2) {
    return `valid=${parts.length}`;
  }
  return '';
}).toArray();

result.forEach((line) => {
  if (line) {
    process.stdout.write(line + '\n');
  }
});
