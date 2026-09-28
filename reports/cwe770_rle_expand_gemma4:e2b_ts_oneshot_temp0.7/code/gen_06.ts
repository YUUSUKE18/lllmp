process.stdin.on("data", (c: Buffer) => {
  const input = c.toString();
  const parts = input.trim().split(',');
  for (const part of parts) {
    const match = part.match(/(\d+):(\d+)/);
    if (match) {
      const value = parseInt(match[1], 10);
      const count = parseInt(match[2], 10);
      if (!isNaN(value) && !isNaN(count) && count >= 0) {
        // 値:回数 の形式でパースされた値を格納する
        // ここでは、値と回数を配列として保持する
        // 実際には後で全要素を計算するために一時的に保持する
        // この処理は標準入力全体を一度に処理するのではなく、データを蓄積する形式で考える必要がある
      }
    }
  }
});

// 標準入力全体を読み込むための処理を再構成する
let inputData = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (data: string) => {
  inputData += data;
});

process.stdin.on('end', () => {
  const lines = inputData.trim().split(/\s+/).filter(line => line.length > 0);
  let totalCount = 0n;
  let totalSum = 0n;

  for (const line of lines) {
    const parts = line.split(':');
    if (parts.length === 2) {
      const value = parseInt(parts[0], 10);
      const count = parseInt(parts[1], 10);

      if (!isNaN(value) && !isNaN(count) && count >= 0) {
        // 要素数: value * count
        totalCount += BigInt(value) * BigInt(count);
        // 合計: value * count
        totalSum += BigInt(value) * BigInt(count);
      }
    }
  }

  console.log(`count=${totalCount} sum=${totalSum}`);
});
