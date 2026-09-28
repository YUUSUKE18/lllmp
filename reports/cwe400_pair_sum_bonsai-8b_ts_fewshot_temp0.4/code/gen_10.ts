const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.split("\n")[0], 10);
  let count = 0;
  let numbers = [];
  for (let i = 1; i < s.length; i++) {
    const line = s.substring(i, s.length).trim();
    if (!line) continue;
    const num = parseInt(line, 10);
    if (Number.isNaN(num)) continue;
    numbers.push(num);
  }
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) count++;
    }
  }
  console.log(`pairs=${count}`);
});
