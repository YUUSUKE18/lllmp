const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0, first = true;
  for (const line of s.split(/\r?\n+/)) {
    if (line.trim() === "") continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    count++;
    sum += n;
    if (!first) {
      first = false;
      if (n > 0) {
        console.log(`sum=${sum}`);
        console.log(`count=${count}`);
        return;
      }
    }
    first = false;
  }
  if (!first) {
    console.log(`sum=${sum}`);
    console.log(`count=${count}`);
  }
});
