const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target: number | null = null;
  
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    if (firstLine !== "") {
      const parsed = parseInt(firstLine, 10);
      if (!Number.isNaN(parsed)) {
        target = parsed;
      }
    }
  }

  if (target === null) {
    console.log("pairs=0");
    return;
  }

  const numbers: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    
    const parsed = parseInt(line, 10);
    if (!Number.isNaN(parsed)) {
      numbers.push(parsed);
    }
  }

  let count = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
