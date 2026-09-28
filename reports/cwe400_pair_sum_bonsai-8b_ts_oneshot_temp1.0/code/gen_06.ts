const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  const target = parseInt(lines[0], 10);
  const numbers = lines.slice(1).map(line => line.trim()).filter(line => /^-?\d+$/.test(line));
  const count = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) {
        count++;
      }
    }
  }
  console.log(`pairs=${count}`);
});
