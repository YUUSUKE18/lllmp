const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let linesStr = s.split("\n").filter(l => l.trim().length > 0)[0];
  if (!linesStr) {
    console.log(`count=0 sum=0`);
    return;
  }
  const first: number | undefined = parseInt(linesStr, 10);
  let lines2: string[] = [];
  if (first !== undefined && !Number.isNaN(first)) {
    for (let i = 1; i < s.split("\n").length; i++) {
      if (!s.split("\n")[i]) break;
      const line = s.split("\n")[i];
      if (line.trim() === "") continue;
      lines2.push(line);
    }
  }
  let count = first ?? 0;
  let sum = 0n;
  for (const l of lines2) {
    const n: number | undefined = parseInt(l, 10);
    if (!Number.isNaN(n)) {
      count++;
      sum += BigInt(n);
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
