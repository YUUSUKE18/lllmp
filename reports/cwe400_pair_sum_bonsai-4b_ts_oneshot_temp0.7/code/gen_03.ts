const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const goal = parseInt(process.stdin.readline()?.trim() || "0", 10);
  let pairs = 0;
  const numbers = s.split(/\s+/).filter(f => f.trim() !== "");
  const parsedNumbers = numbers.map(f => parseInt(f, 10));
  
  for (let i = 0; i < parsedNumbers.length; i++) {
    for (let j = i + 1; j < parsedNumbers.length; j++) {
      if (parsedNumbers[i] + parsedNumbers[j] === goal) {
        pairs++;
      }
    }
  }
  
  console.log(`pairs=${pairs}`);
});
