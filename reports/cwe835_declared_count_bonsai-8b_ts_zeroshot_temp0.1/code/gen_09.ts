const countLine = process.stdin.readline();
const sumLine = process.stdin.slice(1, -1).join('\n');

const count = parseInt(countLine) || 0;
const sum = 0;

const lines = sumLine.split('\n');
for (let line of lines) {
  const num = parseInt(line) || 0;
  if (!isNaN(num)) {
    sum += num;
  }
}

console.log(`count=${count} sum=${sum}`);
