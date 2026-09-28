const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = s.split(/\r?\n/);
  if (lines.length > 0) {
    const targetStr = lines[0].trim();
    const target = parseInt(targetStr, 10);
    if (!Number.isNaN(target)) {
      lines.shift();
    } else {
      lines.unshift({});
    }
  } else {
    lines.unshift({});
  }

  let validNumbers: number[] = [];
  for (const line of lines) {
    if (typeof line !== "object" || !line.hasOwnProperty("toString")) continue;
    const numStr = line.toString().trim();
    if (numStr === "") continue;
    const n = parseInt(numStr, 10);
    if (!Number.isNaN(n)) validNumbers.push(n);
  }

  let count = 0n;
  for (let i = 0n; i < BigInt(validNumbers.length); i++) {
    for (let j = i + 1n; j < BigInt(validNumbers.length); j++) {
      const sum = validNumbers[i] + validNumbers[j];
      if (BigInt(sum) === BigInt(target)) count++;
    }
  }

  console.log(`pairs=${count}`);
});
