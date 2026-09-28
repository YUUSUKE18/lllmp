const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];
let count: number = 0;
let sum: bigint = 0n;

rl.on('line', (line) => {
  if (lines.length === 0) {
    // 1行目: 読み取れた整数の個数
    const num = parseInt(line.trim(), 10);
    if (!isNaN(num)) {
      count = num;
    } else {
      // 1行目が整数でなかった場合は、読み取りを終了（あるいはエラーとして扱うが、ここでは続く行を無視する）
      return;
    }
  } else {
    // 2行目以降: 整数
    const num = parseInt(line.trim(), 10);
    if (!isNaN(num)) {
      sum += BigInt(num);
    }
  }
  lines.push(line);
});

rl.on('close', () => {
  // 読み取れた整数のみを対象とする
  // 1行目に入力された個数(count)と、実際に読み取れた整数の個数(actualCount)を比較するのではなく、
  // 仕様に従い「実際に読み取れた整数だけ」を対象とするため、sumと実際に読み取れた個数を計算する。

  // 読み取れた行を再評価して、実際に読み取れた整数と合計を再計算する
  let actualCount = 0;
  let actualSum: bigint = 0n;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;

    if (i === 0) {
      // 1行目: 期待される個数（無視）
      // 1行目の値が数として解釈できれば、それは「期待される個数」だが、今回は「実際に読み取れた整数」が対象。
      // 1行目以降が整数と見なす。
    } else {
      const num = parseInt(line, 10);
      if (!isNaN(num)) {
        actualCount++;
        actualSum += BigInt(num);
      }
    }
  }

  // 最終的な計算に基づき出力
  console.log(`count=${actualCount} sum=${actualSum}`);
});
