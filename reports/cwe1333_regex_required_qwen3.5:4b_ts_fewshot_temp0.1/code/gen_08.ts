const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  for (const line of s.split(/\r?\n/)) {
    if (/^\s*([0-9]+(\,[0-9]+)*)\s*$/.test(line)) valid++;
  }
  console.log(`valid=${valid}`);
});
