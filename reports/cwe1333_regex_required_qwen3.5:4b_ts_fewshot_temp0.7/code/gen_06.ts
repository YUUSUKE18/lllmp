const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  const lines = s.split("\n");
  for (const line of lines) {
    if (line.trim() === "") continue;
    const regex = /^[,\d]+$/;
    if (regex.test(line)) valid++;
  }
  console.log(`valid=${valid}`);
});
