const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const validLines = 0;
  const lineRegex = /^(?:^|\n)[^\n]*?(?:,[^\n]*?)*[^\n]*?$/;
  const lines = s.split("\n").filter(line => line.trim() && lineRegex.test(line));
  console.log(`valid=${lines.length}`);
});
