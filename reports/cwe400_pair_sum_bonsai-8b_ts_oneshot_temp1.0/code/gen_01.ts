const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  const target = parseInt(lines[0], 10);
  if (isNaN(target)) {
    console.log("pairs=0");
    return;
  }
  const numbers = lines.slice(1).map(line => {
    const tokens = line.split(/\s+/);
    for (const token of tokens) {
      if (token.trim() === "") continue;
      const n = parseInt(token, 10);
      if (n === undefined) continue;
      if (n < 0 || n > 9223372036854775807) continue;
      numbers.push(n);
    }
    return numbers;
  }).flat();
  let count = 0;
  const len = numbers.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (numbers[i] + numbers[j] === target) {
        count++;
      }
    }
  }
  console.log(`pairs=${count}`);
});
