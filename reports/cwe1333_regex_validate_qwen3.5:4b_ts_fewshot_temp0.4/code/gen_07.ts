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
      let j = 0;
      while (j < trimmed.length) {
        if (!/\d/.test(trimmed[j])) break;
        j++;
      }
      if (j > 0) {
        valid++;
      } else {
        const rest = trimmed.slice(j);
        if (rest === "" || rest.startsWith(",")) continue;
      }
    } else {
      break;
    }
  }
  console.log(`valid=${valid}`);
});
