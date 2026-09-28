const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.split("\n")[0], 10);
  const numbers = s.split("\n").map(line => {
    const n = parseInt(line.trim(), 10);
    return isNaN(n) ? undefined : n;
  }).filter(n => n !== undefined);
  const pairs = [];
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) pairs.push([i, j]);
    }
  }
  console.log(`pairs=${pairs.length}`);
});
