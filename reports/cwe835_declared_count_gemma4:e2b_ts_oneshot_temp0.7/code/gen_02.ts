let count = 0;
let sum = 0;
let lineIndex = 0;

process.stdin.on("data", (data: Buffer) => {
  const chunk = data.toString().trim();
  if (chunk === "") {
    return;
  }

  if (lineIndex === 0) {
    // 1行目：整数が読み取れた個数
    const num = parseInt(chunk, 10);
    if (!isNaN(num)) {
      count = num;
    }
    lineIndex++;
    return;
  }

  // 2行目以降：整数
  const num = parseInt(chunk, 10);
  if (!isNaN(num)) {
    sum += num;
  }
  lineIndex++;
});

process.stdin.on("end", () => {
  // 読み取れた整数のみを対象とするため、countは最初に読み取った値になる。
  // sumは読み取れた整数の合計値。
  console.log(`count=${count} sum=${sum}`);
});
