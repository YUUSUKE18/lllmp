const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0, first = true;
  for (const line of s.split(/\r\n+/)) {
    if (line.trim() === "") continue;
    const numStr = line.trim().split(/\s+/).find((str) => str.trim().matches(/^-?\d+$/));
    if (numStr) {
      count++;
      sum += parseInt(numStr, 10);
      first = false;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
