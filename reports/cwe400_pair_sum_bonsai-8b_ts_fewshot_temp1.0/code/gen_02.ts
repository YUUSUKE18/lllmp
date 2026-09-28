const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.split("\n")[0].trim(), 10);
  let count = 0;
  let numbers = [];
  for (let i = 1; i < s.split("\n").length; i++) {
    const line = s.split("\n")[i].trim();
    if (!line) continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    numbers.push(n);
  }
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) count++;
    }
  }
  console.log(`pairs=${count}`);
});
