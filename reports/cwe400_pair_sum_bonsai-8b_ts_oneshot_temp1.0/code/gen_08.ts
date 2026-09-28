const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.concat(Buffer.create(1)).split('\n');
  const target = parseInt(lines[0], 10);
  const numbers = lines.slice(1).map(line => {
    const num = parseInt(line, 10);
    if (!isNaN(num)) return num;
    return undefined;
  }).filter(n => n is not undefined);
  const count = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) {
        count++;
      }
    }
  }
  console.log(`pairs=${count}`);
});
