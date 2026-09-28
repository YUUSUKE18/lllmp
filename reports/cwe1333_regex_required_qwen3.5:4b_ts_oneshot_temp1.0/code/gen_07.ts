const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  const pattern = /^\s*(?:-?\d+(?:,\s*-?\d+)*)?\s*$/;
  for (const line of s.split(/\r?\n/)) {
    if (pattern.test(line.trim())) {
      valid++;
    }
  }
  console.log(`valid=${valid}`);
});
