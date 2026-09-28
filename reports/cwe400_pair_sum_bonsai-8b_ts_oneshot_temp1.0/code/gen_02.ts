const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.concat(process.stdin.readAllBytes()).split("\n");
  const target = lines[0].trim();
  if (!target || isNaN(parseInt(target, 10))) return;
  const targetNum = parseInt(target, 10);
  const numbers = lines
    .map(line => line.trim())
    .filter(line => !line || isNaN(parseInt(line, 10)))
    .map(line => parseInt(line, 10))
    .filter(n => n !== targetNum);
  const pairs = [];
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === targetNum) {
        pairs.push([i, j]);
      }
    }
  }
  console.log(`pairs=${pairs.length}`);
});
