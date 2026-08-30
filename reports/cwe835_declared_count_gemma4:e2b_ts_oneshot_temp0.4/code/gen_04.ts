let count = 0;
let sum = 0;
let lineCount = 0;

process.stdin.resume();
process.stdin.on("data", (data: Buffer) => {
  const chunk = data.toString().trim();
  if (chunk === "") return;

  const num = parseInt(chunk, 10);
  if (!isNaN(num)) {
    // 1行目（最初の入力）は個数として扱う
    if (lineCount === 0) {
      count = num;
    } else {
      // 2行目以降の入力は整数として扱う
      sum += num;
    }
    lineCount++;
  }
});

process.stdin.on("end", () => {
  console.log(`count=${count} sum=${sum}`);
});
