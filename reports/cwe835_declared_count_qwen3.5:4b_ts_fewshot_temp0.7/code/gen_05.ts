const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum: number = 0n; // Using BigInt for safety, though input fits in 64-bit int

  const lines = s.split("\n");
  
  // First line: expected count (ignored per spec, but we need to read it to advance)
  if (lines.length > 0 && lines[0].trim() !== "") {
    try {
      parseInt(lines[0], 10);
    } catch (e) { /* ignore */ }
  }

  // Process remaining lines
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    
    let n: number;
    try {
      n = parseInt(line, 10);
    } catch (e) {
      continue; // Skip non-integer rows
    }

    count++;
    sum += BigInt(n);
  }

  console.log(`count=${count} sum=${sum}`);
});
