const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  for (let i = 0; i < s.length; i += 100) {
    let line = '';
    for (let j = i; j < i + 100; j++) {
      line += s[j];
      if (s[j] === "\n") break;
    }
    if (line.trim() !== '') {
      const parts = line.split(",");
      let validInLine = 0;
      for (const part of parts) {
        if (part.trim() === '') continue;
        const n = parseInt(part, 10);
        if (Number.isNaN(n)) continue;
        validInLine++;
      }
      if (validInLine >= 1) valid++;
    }
  }
  console.log(`valid=${valid}`);
});
