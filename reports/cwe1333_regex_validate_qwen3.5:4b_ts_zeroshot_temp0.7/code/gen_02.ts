import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });
let validCount = 0;

rl.on('line', (line) => {
  const trimmed = line.trim();
  
  // 空行は妥当ではない
  if (trimmed.length === 0) {
    return;
  }

  // 数字とカンマ以外が含まれているかチェック
  // 正規表現: 文字列がすべて '0'-'9' または ',' で構成されているか
  if (!/^[0-9,]+$/.test(trimmed)) {
    return;
  }

  // カンマ区切りの整数列として妥当かどうか判定
  // 1 個以上の数字列がカンマで区切られて並んでいること (末尾のカンマも許容)
  const parts = trimmed.split(',');
  
  // すべての要素が空でないかチェック
  if (!parts.every(part => part.length > 0)) {
    return;
  }

  // 少なくとも 1 つの数字列があるかチェック (trimmed が空でないため、parts の長さは必ず 1 以上)
  validCount++;
});

rl.on('close', () => {
  process.stdout.write(`valid=${validCount}\n`);
});
