import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8');
const lines = input.split('\n').filter(line => line.length > 0);

const validLines: number[] = [];

for (const line of lines) {
  const trimmedLine = line.trim();
  
  if (trimmedLine === '') {
    continue;
  }

  // 正規表現の定義
  // ^ : 行の始点
  // \s* : 先頭の空白を無視
  // ([0-9]+(,\s*[0-9]+)*)? : 1 個以上の数字列がカンマで区切られて並んでいる部分 (末尾のカンマを含むパターンも許容するため、最後の数字の後にカンマが続くことも可能にするため、この構造で対応)
  // \s* : 末尾の空白を無視
  // $ : 行の終点
  const regex = /^\s*(\d+(,\s*\d+)*)?\s*$/;

  if (regex.test(trimmedLine)) {
    validLines.push(1);
  } else {
    validLines.push(0);
  }
}

const totalValid = validLines.filter(v => v === 1).length;
console.log(`valid=${totalValid}`);
