const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  const re = /^(?:\s*\d+(?:,\s*\d+)*)?\s*$/;
  for (const line of s.split(/\n/)) {
    if (re.test(line)) valid++;
  }
  console.log(`valid=${valid}`);
});
