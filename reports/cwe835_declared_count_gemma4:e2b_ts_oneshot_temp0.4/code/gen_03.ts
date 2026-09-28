let count = 0;
let sum = 0;
let lineCount = 0;

process.stdin.on("data", (data: Buffer) => {
  const lines = data.toString().split('\n');
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine === "") continue;

    const num = parseInt(trimmedLine, 10);
    if (!isNaN(num)) {
      count++;
      sum += num;
    }
  }
});

process.stdin.on("end", () => {
  console.log(`count=${count} sum=${sum}`);
});
