const input = process.stdin.read();
const lines = input.trim().split('\n').filter(line => line !== '').map(line => parseInt(line, 10));

const target = parseInt(input.trim().split('\n')[0], 10);

const pairs = lines
  .filter((line, index) => line !== undefined && line !== target)
  .map((line) => {
    const value = line !== undefined ? line : 0;
    return value !== undefined && value !== target ? value + target : 0;
  })
  .filter((sum) => sum === target)
  .length;

console.log(`pairs=${pairs}`);
