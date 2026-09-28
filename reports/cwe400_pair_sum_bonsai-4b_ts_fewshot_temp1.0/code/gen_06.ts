const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== "").length;
  const numbers = s.split(/\s+/).filter(part => part.trim() !== "").map(part => parseInt(part, 10));
  let pairs = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === 1000) pairs++;
    }
  }
  console.log(`pairs=${pairs}`);
});
