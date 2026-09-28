import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (line) => {
  const tokens = line.split(',').map((t) => t.trim()).filter(Boolean);
  
  let count = 0n;
  let sum = 0n;

  for (const token of tokens) {
    // '値:回数' の形式を解析し、変数が一致する場合はカウントと合計を加算します
    const parts = token.split(':');
    if (parts.length === 2) {
      const valStr = parts[0].trim();
      const countStr = parts[1].trim();

      // 数値としてパースできるか確認
      if (/^-?\d+$/.test(valStr) && /^-?\d+$/.test(countStr)) {
        const val = BigInt(valStr);
        const cnt = BigInt(countStr);
        
        // 回数は 0 以上である必要があります（仕様: "回数は 0 以上です"）
        if (cnt < 0n) continue; 

        sum += val * cnt;
        count += cnt;
      }
    }
  }

  console.log(`count=${count} sum=${sum}`);
});

rl.on('close', () => {});
