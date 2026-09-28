const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let goal = parseInt(process.stdin.read().toString("utf8"), 10);
  let pairs = 0;
  let currentNum = 0;
  const tokens = s.split(/\s+/);
  for (const token of tokens) {
    const n = token.trim() === "" ? 0 : parseInt(token, 10);
    if (n === goal) {
      currentNum += 1;
      if (currentNum >= 2) pairs += 1;
      currentNum = 0;
    } else if (n !== 0) {
      currentNum += 1;
    }
  }
  console.log(`pairs=${pairs}`);
});
