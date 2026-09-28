const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.map(b => b.toString("utf8").trim()).split('\n');
  const target = parseInt(lines[0], 10) || 0;
  const numbers = lines
    .filter(line => line && !isNaN(parseInt(line, 10)))
    .map(line => parseInt(line, 10));
  const pairs = [];
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) {
        pairs.push({ i, j });
      }
    }
  }
  console.log(`pairs=${pairs.length}`);
});
