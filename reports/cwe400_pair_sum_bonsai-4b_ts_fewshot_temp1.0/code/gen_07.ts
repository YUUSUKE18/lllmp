const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter((line) => line.trim() !== "");
  const numbers = lines
    .split(",")
    .map((str) => str.trim())
    .filter((n) => n !== "")
    .map((n) => parseInt(n, 10));
  
  let pairs = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === 0) {
        pairs++;
      }
    }
  }
  
  console.log(`pairs=${pairs}`);
});
