const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  for (let i = 0; i < s.length; ) {
    if (s[i] === "\n") {
      const line = s.slice(i + 1);
      if (line.trim() === "") continue;
      const trimmed = line.trim();
      if (!trimmed.match(/^[0-9]+(,[0-9]+)*$/)) continue;
      valid++;
      i += line.length + 1;
      continue;
    }
    break;
  }
  console.log(`valid=${valid}`);
});
