const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0, line = "";
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "\n") {
      if (line.trim() !== "") valid++;
      line = "";
    } else {
      line += s[i];
    }
  }
  if (line.trim() !== "") valid++;
  console.log(`valid=${valid}`);
});
