const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let linesContent = s.split("\n").map(line => line.trim());
  if (linesContent.length === 0) {
    console.log(`count=0 sum=0`);
    return;
  }

  const countStr = linesContent[0].trim();
  const requestedCount: number | null = parseInt(countStr, 10);
  if (!requestedCount || isNaN(requestedCount)) {
    console.log(`count=0 sum=0`);
    return;
  }

  let actualCount = 0;
  let sum: bigint = 0n;

  for (const line of linesContent.slice(1)) {
    if (line === "") continue;
    const parsed = parseInt(line, 10);
    if (Number.isNaN(parsed) || !Number.isInteger(parsed)) continue;
    actualCount++;
    sum += BigInt(parsed);
  }

  console.log(`count=${actualCount} sum=${sum}`);
});
