import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf-8').split('\n');

const isValidLine = (line: string): boolean => {
  const trimmed = line.trim();
  
  // 空行は無効とする要件に従う
  if (trimmed.length === 0) return false;

  // 正規表現：整数列の開始と終わりを区切る、または末尾カンマのみを許容する
  // ^[0-9]+(,[0-9]+)*$ なら厳密な形式。
  // 空行は既にチェック済み。
  const pattern = /^\s*[0-9]+\s*(,\s*[0-9]+\s*)*$/;
  
  return pattern.test(trimmed);
};

const validLines = input.filter(line => isValidLine(line));
const count = validLines.length;

console.log(`valid=${count}`);
