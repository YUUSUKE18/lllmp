const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  for (let i = 0; i < s.length; ) {
    if (s[i] === "\n") {
      i++;
      continue;
    }
    const line = s.substring(i);
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;
    
    if (!/^\d+(,\d+)*$/.test(trimmed)) {
      continue;
    }
    valid++;
    i += line.length + 1;
  }
  console.log(`valid=${valid}`);
});
