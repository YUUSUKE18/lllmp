const target = parseInt(process.stdin.readline().trim(), 10);
let count = 0;

for (let i = 1; i <= target; i++) {
  const line = process.stdin.readline().trim();
  if (line.length === 0 || isNaN(line)) continue;

  for (let j = i + 1; j <= target; j++) {
    const num = parseInt(line, 10);
    const num2 = parseInt(process.stdin.readline().trim(), 10);
    if (num + num2 === target) {
      count++;
      break;
    }
  }
}

console.log(`pairs=${count}`);
