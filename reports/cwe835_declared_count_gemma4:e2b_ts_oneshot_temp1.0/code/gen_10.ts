let count = 0;
let sum = 0;
const lines: string[] = [];

process.stdin.setEncoding("utf8");

process.stdin.on("data", (data: string) => {
  lines.push(data.trim());
});

process.stdin.on("end", () => {
  if (lines.length === 0) {
    console.log(`count=0 sum=0`);
    return;
  }

  // 1行目から整数として読み取れるものを処理する
  let actualCount = 0;
  let currentSum = 0;

  for (const line of lines) {
    if (line.trim() === "") continue;

    const num = parseInt(line, 10);

    // 整数として解釈でき、かつ64bit整数範囲内（JavaScriptの安全な整数範囲内）にあるかを確認
    if (!isNaN(num) && line.trim() !== "") {
      // 実際に入力された行を数としてカウントし、合計を計算する
      actualCount++;
      currentSum += num;
    }
  }

  // 実際に読み取れた整数のみを対象とするため、読み取れた個数と合計を出力する
  console.log(`count=${actualCount} sum=${currentSum}`);
});
