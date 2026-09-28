const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const goal = parseInt(process.stdin.readline()?.trim() || "0", 10);
  const pairs = 0;
  const numbers = s.split(/\s+/).filter(f => f.trim() !== "");
  
  for (let i = 0; i < numbers.length; i++) {
    const n = parseInt(numbers[i], 10);
    if (isNaN(n)) continue;
    if (n === goal) pairs++;
  }
  
  console.log(`pairs=${pairs}`);
});
