let count = 0;
let sum = 0;
let lineIndex = 0;

process.stdin.on("data", (data: Buffer) => {
  const lines = data.toString("utf8").split('\n');
  for (const line of lines) {
    if (line.trim() === "") continue;
    const num = parseInt(line.trim(), 10);
    if (!isNaN(num)) {
      count++;
      sum += num;
    }
  }
});

process.stdin.on("end", () => {
  console.log(`count=${count} sum=${sum}`);
});
