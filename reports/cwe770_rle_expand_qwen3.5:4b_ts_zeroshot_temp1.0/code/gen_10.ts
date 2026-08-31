import { readFileSync } from 'fs';

function main() {
  const input = readFileSync(0, 'utf8').trim();
  
  // 空文字列の処理 (要件: 空要素・前後の空白は無視)
  if (!input || input.trim().length === 0) {
    console.log('count=0 sum=0');
    return;
  }

  let totalElements = BigInt(0);
  let totalCount = 0n;

  // 行ごとに分割 (もし複数行の場合の対応も含むが、仕様は単一列と想定)
  for (const line of input.trim().split('\r\n')) {
    // 各要素をカンマ区切りで分割
    const parts = line.split(',');
    
    for (const part of parts) {
      if (!part || /^\s*$/.test(part)) continue; // 空白無視
      
      const [valStr, countStr] = part.split(':');
      
      if (valStr === undefined || countStr === undefined) continue; // : の形がない場合無視
      
      // 64bit 整数チェックとパース
      const val = Number(valStr);
      const count = Number(countStr);
      
      if (!Number.isInteger(val) || !Number.isInteger(count)) continue;
      
      if (count < 0) continue; // 回数は 0 以上
      
      totalElements += BigInt(count);
      totalCount += BigInt(count);
    }
  }

  console.log(`count=${totalElements} sum=${totalCount}`);
}

main();
