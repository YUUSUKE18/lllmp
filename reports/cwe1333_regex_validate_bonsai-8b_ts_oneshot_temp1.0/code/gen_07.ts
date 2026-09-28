const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0, first = true;
  for (const line of s.split("\n")) {
    line = line.trim();
    if (line === "") continue;
    if (/[^0-9,]/.test(line)) continue;
    const parts = line.split(",");
    let count = 0;
    for (const part of parts) {
      part = part.trim();
      if (part === "") continue;
      if (isNaN(parseInt(part, 10))) continue;
      count++;
    }
    if (count >= 1) valid++;
  }
  console.log(`valid=${valid}`);
});
