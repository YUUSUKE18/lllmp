const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8").trim();
  if (!s.startsWith("target=")) return;

  const target = parseInt(s.substring(7), 10);
  const pairs = 0;

  const numbers = s.substring(13).split(/\s+/).filter((n) => !isNaN(parseInt(n, 10)));
  for (let i = 0; i < numbers.length; i++) {
    const num1 = parseInt(numbers[i], 10);
    for (let j = i + 1; j < numbers.length; j++) {
      const num2 = parseInt(numbers[j], 10);
      if (num1 + num2 === target) {
        pairs++;
      }
    }
  }

  console.log(`pairs=${pairs}`);
});
