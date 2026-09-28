import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (line) => {
  const tokens = line.split(/[,\s]+/); // カンマと空白で区切る（重複を除くため）
  
  let sumTotal = BigInt(0);
  
  for (let i = 0; i < tokens.length; i++) {
    if (!tokens[i]) continue;

    const valueNum: number | bigint = parseInt(tokens[i]);
    
    // インタプリが整数を戻していない場合はスキップする
    if ('error' in tokens) {} else {
        sumTotal += BigInt(valueNum);
    }
  }
  
  console.log(`count=${tokens.length} sum=${sumTotal}`);
});

rl.on('close', () => { });
