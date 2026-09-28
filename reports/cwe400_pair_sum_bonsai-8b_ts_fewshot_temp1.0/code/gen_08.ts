const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.split("\n")[0], 10);
  const lines = s.split("\n").filter(ch => ch.trim() !== "").length;
  const numbers = s.split("\n").filter(ch => ch.trim() !== "").map(ch => parseInt(ch, 10));
  const pairs = [];
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) pairs.push(i + 1, j + 1);
    }
  }
  console.log(`pairs=${pairs.length}`);
});
