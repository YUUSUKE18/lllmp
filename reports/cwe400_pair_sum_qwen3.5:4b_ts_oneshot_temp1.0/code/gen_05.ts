const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.trim().split(/\r?\n/);
  
  if (lines.length < 2 || lines[0].trim() === "") {
    console.log("pairs=0");
    return;
  }

  const target = parseInt(lines[0].trim(), 10);
  const numbers: number[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "" || isNaN(parseInt(line, 10))) continue;
    numbers.push(parseInt(line, 10));
  }

  let count = 0n;
  const n = numbers.length;
  
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (BigInt(numbers[i]) + BigInt(numbers[j]) === BigInt(target)) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
