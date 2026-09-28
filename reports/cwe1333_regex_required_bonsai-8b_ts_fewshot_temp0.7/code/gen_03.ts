const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r\n|\r|\n/);
  let valid = 0;
  for (const line of lines) {
    const stripped = line.trim();
    if (stripped === "") continue;
    const match = stripped.match(/^(?:\d+,\d+)*$)/;
    if (match && match[0].length > 1) valid++;
  }
  console.log(`valid=${valid}`);
});
