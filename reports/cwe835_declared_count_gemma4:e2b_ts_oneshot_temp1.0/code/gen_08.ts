let count = 0;
let sum = 0;
let lineCount = 0;

process.stdin.on("data", (data: Buffer) => {
  const line = data.toString().trim();
  if (line === "") return;

  if (lineCount === 0) {
    const num = parseInt(line, 10);
    if (!isNaN(num)) {
      count = num;
      sum = num;
    }
  } else {
    const num = parseInt(line, 10);
    if (!isNaN(num)) {
      sum += num;
    }
  }
  lineCount++;
});

process.stdin.on("end", () => {
  console.log(`count=${count} sum=${sum}`);
});
