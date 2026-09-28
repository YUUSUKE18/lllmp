const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);

  if (lines.length < 2) {
    console.log("pairs=0");
    return;
  }

  const target = parseInt(lines[0], 10);
  const numbers: number[] = [];

  for (let i = 1; i < lines.length; i++) {
    const num = parseInt(lines[i], 10);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }

  let count = 0;
  const n = numbers.length;

  if (n >= 2) {
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (numbers[i] + numbers[j] === target) {
          count++;
        }
      }
    }
  }

  console.log(`pairs=${count}`);
});
