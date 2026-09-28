const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let line = "";
  for (const ch of s) {
    if (ch === "\n") {
      if (line.trim() !== "") {
        const n = parseInt(line, 10);
        if (Number.isNaN(n)) continue;
        count++;
        sum += n;
        line = "";
      }
    } else {
      line += ch;
    }
  }
  if (line.trim() !== "") {
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    count++;
    sum += n;
  }
  console.log(`count=${count} sum=${sum}`);
});
