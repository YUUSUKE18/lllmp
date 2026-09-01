import { readAllLines } from 'https://deno.land/std@0.178.0/ffi/util/read_all_lines.ts';

async function main() {
  const lines = await readAllLines(Deno.stdin);
  
  if (lines.length === 0) return;

  // 目標値を取得（1 行目から）
  const target = parseInt(lines[0].trim(), 10);
  if (isNaN(target)) {
    console.log('pairs=0\n');
    return;
  }

  // 整数の配列を作成（空白を含む行を除く）
  const numbers: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const trimmedLine = lines[i].trim();
    if (trimmedLine === '') continue;
    const num = parseInt(trimmedLine, 10);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }

  // パaired数を計算
  let count = 0n;
  for (let i = 0n; i < BigInt(numbers.length); i++) {
    for (let j = BigInt(i + 1n); j < BigInt(numbers.length); j++) {
      const sum = numbers[i] + numbers[j];
      if (sum === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}\n`);
}

main();
