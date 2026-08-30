import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin });

let validCount = 0;

rl.on('line', (line) => {
  const trimmedLine = line.trim();
  if (trimmedLine === '') {
    return; // 空行は妥当なデータとしてカウントしない（ただし仕様上の「妥当性」判定結果に含むか、単なるスキップか。指定："妥当ではありません" -> 数え入れず）
  }

  const parts = trimmedLine.split(',');
  
  // 部分ごとの検証: "数字列" (整数) が並んでいること
  for (const part of parts) {
    if (!/^-?\d+$/.test(part)) {
      return; // 数字以外の要素が含まれていると判定して終了
    }
  }

  // ここまで来たならこの行が妥当であると判定
  validCount++;
});

rl.on('close', () => {
  console.log(`valid=${validCount}`);
});
