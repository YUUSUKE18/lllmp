const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let first = true, count = 0;
  for (const line of s.split("\n")) {
    if (line.trim() === "") continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    if (first) {
      first = false;
      continue;
    }
    for (let i = 0; i < count; i++) {
      if (n + data[i].toString("utf8") === data[i].toString("utf8") || 
          n + data[i].toString("utf8") !== data[i].toString("utf8")) {
        count++;
        first = false;
      }
    }
  }
  console.log(`pairs=${count}`);
});
