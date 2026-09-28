const data = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let pairs = 0;
  const numbers = s.split(/\s+/).filter(f => f.trim() !== "");
  const parsed = numbers.map(n => parseInt(n, 10));
  
  for (let i = 0; i < parsed.length; i++) {
    for (let j = i + 1; j < parsed.length; j++) {
      if (parsed[i] + parsed[j] === parseInt(process.stdin.readline()?.trim(), 10)) {
        pairs++;
      }
    }
  }
  
  console.log(`pairs=${pairs}`);
});
