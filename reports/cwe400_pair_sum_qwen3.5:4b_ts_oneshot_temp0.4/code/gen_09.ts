const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target: bigint = 0n;
  
  // 1 行目から目標値を読み取る
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    if (firstLine === "") return console.log("pairs=0");
    target = BigInt(firstLine);
  } else {
    return console.log("pairs=0");
  }

  // 2 行目以降の整数を読み取る
  const numbers: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    numbers.push(n);
  }

  let count = 0n;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if ((BigInt(numbers[i]) + BigInt(numbers[j])) === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
