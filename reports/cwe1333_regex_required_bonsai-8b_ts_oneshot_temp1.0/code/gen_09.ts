const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8").trim();
  const validLines = s.split(/\r?\n+/).filter(line => line.trim().match(/^[\d,]+$/));
  console.log(`valid=${validLines.length}`);
});
