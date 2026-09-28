const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let goal = 0, pairs = 0;
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== "");
  let parsedNumbers = [];
  for (let line of lines) {
    const parts = line.split(/\s+/);
    if (parts.length < 1) continue;
    const value = parseInt(parts[0], 10);
    if (isNaN(value) || value === 0) continue;
    parsedNumbers.push(value);
  }
  const goalNum = parseInt(s.split(/\s+/).first(), 10);
  if (goalNum === 0) goal = 0;
  let pairsFound = 0;
  for (let i = 0; i < parsedNumbers.length; i++) {
    for (let j = i + 1; j < parsedNumbers.length; j++) {
      if (parsedNumbers[i] + parsedNumbers[j] === goalNum) pairsFound++;
    }
  }
  console.log(`pairs=${pairsFound}`);
});
