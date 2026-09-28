const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  for (const line of s.split(/\r?\n/)) {
    if (/^[ \t]*((\d+(?:,\d+)*)|(?<!,)\d+)$/.test(line.trim())) {
      valid++;
    }
  }
  console.log(`valid=${valid}`);
});
