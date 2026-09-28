const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.trim().split('\n').filter(line => line.length > 0);

  if (lines.length === 0) {
    console.log(`count=0 sum=0`);
    return;
  }

  let count = 0;
  let sum = 0;

  for (const line of lines) {
    const num = parseInt(line.trim(), 10);
    if (!isNaN(num)) {
      count++;
      sum += num;
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
