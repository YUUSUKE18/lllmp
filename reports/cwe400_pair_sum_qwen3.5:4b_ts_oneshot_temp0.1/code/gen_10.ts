const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target: number | null = null;
  const nums: number[] = [];

  for (const line of lines) {
    if (line.trim() === "") continue;
    const parts = line.trim().split(/\s+/);
    if (parts.length === 1 && !isNaN(Number(parts[0]))) {
      target = Number(parts[0]);
    } else if (parts.length > 1 || (!isNaN(Number(parts[0])) && parts.some(p => isNaN(Number(p)))) {
      // 目標値行は 1 つの整数のみ、それ以外は数値列とみなす（ただし問題文より「2 行目以降」なので、最初の行が目標値）
      // しかし、仕様は「1 行目に目標値」「2 行目以降に整数」とある。
      // したがって、最初の有効な行が目標値、それ以降が数値列とする。
    }
  }

  // より堅牢な解析：最初の非空行が目標値、その後の非空行が数値
  let lineIndex = 0;
  while (lineIndex < lines.length && lines[lineIndex].trim() === "") {
    lineIndex++;
  }
  if (lineIndex >= lines.length) {
    console.log("pairs=0");
    return;
  }
  const targetLine = lines[lineIndex];
  const parts = targetLine.trim().split(/\s+/);
  if (parts.length === 1 && !isNaN(Number(parts[0]))) {
    target = Number(parts[0]);
    lineIndex++;
  } else {
    // 目標値が見つからない場合、エラーまたは 0 とする。ここでは 0 とする。
    target = null;
  }

  const nums: number[] = [];
  while (lineIndex < lines.length) {
    const line = lines[lineIndex];
    if (line.trim() === "") {
      lineIndex++;
      continue;
    }
    const parts = line.trim().split(/\s+/);
    for (const p of parts) {
      const n = Number(p);
      if (!isNaN(n)) {
        nums.push(n);
      }
    }
    lineIndex++;
  }

  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
