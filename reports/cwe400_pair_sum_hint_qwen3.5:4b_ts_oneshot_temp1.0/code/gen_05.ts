const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", (() => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let targetLineIndex = 0;
  while (targetLineIndex < lines.length && (lines[targetLineIndex].trim() === "" || isNaN(Number(lines[targetLineIndex])))) {
    targetLineIndex++;
  }
  
  if (targetLineIndex >= lines.length) {
    console.log("pairs=0");
    return;
  }

  const target = Number.parseInt(lines[targetLineIndex].trim(), 10);
  
  let valueIndex = -1;
  for (let i = targetLineIndex + 1; i < lines.length; i++) {
    if (lines[i].trim() === "") continue;
    try {
      const n = Number.parseInt(lines[i].trim(), 10);
      if (Number.isNaN(n)) continue;
      valueIndex++;
      if (valueIndex >= BigInt(2)) break;
      arr.push(BigInt(n));
    } catch {
      // Skip non-integer lines
    }
  }

  const pairs: bigint = 0n;
  for (let i = 0n; i < arr.length - 1n; i++) {
    for (let j = i + 1n; j < arr.length - 1n; j++) {
      if (arr[i] + arr[j] === target) {
        pairs++;
      }
    }
  }

  console.log(`pairs=${pairs}`);
})()).end();

const arr: bigint[] = [];
