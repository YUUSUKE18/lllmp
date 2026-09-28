let data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8").trim();
  if (!s) return;
  const target = parseInt(s.split(" ")[0], 10);
  const numbers = s.split(" ").slice(1).filter(Boolean).map(Number);
  let count = 0;

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) count++;
    }
  }

  console.log(`pairs=${count}`);
});
