const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.trim().split(/\r?\n/);
  
  if (lines.length < 2) {
    console.log("pairs=0");
    return;
  }

  const targetStr = lines[0].trim();
  let target: bigint;
  try {
    target = BigInt(targetStr);
  } catch {
    console.log("pairs=0");
    return;
  }

  const numbers: (bigint | null)[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    
    let n: bigint | null = null;
    try {
      n = BigInt(line);
    } catch {
      // 整数として解釈できない行は無視
    }
    
    if (n !== null) {
      numbers.push(n);
    }
  }

  const count = BigInt(0);
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const sum = numbers[i] + numbers[j];
      if (sum === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
