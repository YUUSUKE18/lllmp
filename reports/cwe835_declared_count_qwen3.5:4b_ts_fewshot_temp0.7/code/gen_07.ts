const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = s.split("\n");
  if (lines.length > 0 && lines[0].trim() !== "") {
    const countInput: number = parseInt(lines[0].trim(), 10);
    if (!Number.isNaN(countInput)) {
      lines.shift();
    } else {
      lines.unshift("");
    }
  } else {
    lines.push("");
  }

  let c = 0;
  let sum: bigint = 0n;
  for (const line of lines) {
    if (line.trim() === "") continue;
    const parts = line.trim().split(/\s+/);
    for (const p of parts) {
      if (p === "") continue;
      const n = BigInt(p);
      if (!Number.isNaN(Number(n.toString()))) {
        sum += n;
        c++;
      }
    }
  }
  console.log(`count=${c} sum=${sum}`);
});
