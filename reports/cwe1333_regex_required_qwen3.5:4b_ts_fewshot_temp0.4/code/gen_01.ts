const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  for (const line of s.split(/\r?\n/)) {
    if (/^[ \t]*([0-9]+(,?[0-9]*)*)[ \t]*$/.test(line.trim())) {
      valid++;
    }
  }
  console.log(`valid=${valid}`);
});
