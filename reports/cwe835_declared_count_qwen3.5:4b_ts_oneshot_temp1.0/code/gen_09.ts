const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines: string[] = [];
  const tempLines = s.split(/\r?\n/);
  for (const t of tempLines) {
    if (t.trim() === "") continue;
    lines.push(t.trim());
  }

  let countLine = "";
  for (const l of lines) {
    try {
      const n = parseInt(l, 10);
      if (!Number.isNaN(n)) {
        countLine = l;
        break;
      }
    } catch (_) {}
  }

  if (!countLine) {
    console.log("count=0 sum=0");
    return;
  }

  const nCount = parseInt(countLine, 10);
  let actualCount = 0;
  let totalSum: bigint = 0n;

  for (const l of lines) {
    try {
      const valStr = l.trim();
      if (valStr === "") continue;
      const n = BigInt(valStr, 10);
      if (!BigInt.isBigNumber(n)) continue;
      actualCount++;
      totalSum += n;
    } catch (_) {}
  }

  console.log(`count=${actualCount} sum=${totalSum}`);
});
