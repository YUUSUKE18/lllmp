const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = 0;
  for (const ch of s) if (ch === "\n") lines++;
  const trimmed = s.trim();
  if (!trimmed.length) {
    console.log(`count=0 sum=0`);
    return;
  }
  const firstLine = trimmed.split("\n")[0];
  let count: number | null = parseInt(firstLine, 10);
  if (isNaN(count)) count = 0;
  
  const rest = trimmed.substring(firstLine.length + 1).trim();
  const nums: number[] = [];
  for (const line of rest.split("\n")) {
    if (line.trim() === "") continue;
    const n = parseInt(line, 10);
    if (!isNaN(n)) {
      nums.push(n);
    }
  }
  
  let sum = 0;
  for (const v of nums) sum += v;
  
  console.log(`count=${nums.length} sum=${sum}`);
});
