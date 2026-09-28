const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.split("\n")[1], 10);
  if (isNaN(target)) return;
  const numbers = s.split("\n").map((line) => line.trim().replace(/[^0-9]/g, ""));
  const validNumbers = numbers.map((n) => parseInt(n, 10));
  const pairs = [];
  for (let i = 0; i < validNumbers.length; i++) {
    for (let j = i + 1; j < validNumbers.length; j++) {
      if (validNumbers[i] + validNumbers[j] === target) {
        pairs.push({ i, j });
      }
    }
  }
  console.log(`pairs=${pairs.length}`);
});
