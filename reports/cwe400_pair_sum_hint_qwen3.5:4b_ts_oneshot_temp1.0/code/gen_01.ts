const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  if (s.length === 0) {
    console.log(`pairs=0`);
    return;
  }
  
  const lines = s.split(/\r\n|\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) {
    console.log(`pairs=0`);
    return;
  }

  let target: bigint = BigInt(0);
  try {
    target = BigInt(lines[0].trim());
  } catch (_) {
    console.log(`pairs=0`);
    return;
  }

  const numbers: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    try {
      const n = Number(line);
      if (!Number.isNaN(n)) {
        numbers.push(n);
      }
    } catch (_) {
      // 整数として解釈できない行は無視
    }
  }

  if (numbers.length < 2) {
    console.log(`pairs=0`);
    return;
  }

  let count = 0n;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const sum = BigInt(numbers[i]) + BigInt(numbers[j]);
      if (sum === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
