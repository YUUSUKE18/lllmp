const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const validLines = s.trim().split(/\r\n+/).filter(line => line.trim().match(/^(.+),?)+/.test(line));
  console.log(`valid=${validLines.length}`);
});
