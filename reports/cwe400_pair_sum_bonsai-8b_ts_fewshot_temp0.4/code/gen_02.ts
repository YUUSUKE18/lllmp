const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.split("\n")[0], 10);
  if (isNaN(target)) return;
  const lines = s.split("\n").filter(line => line.trim() !== "");
  const numbers = lines.map(line => parseInt(line, 10));
  let count = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) count++;
    }
  }
  console.log(`pairs=${count}`);
});
