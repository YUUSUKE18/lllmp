const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  // カンマで分割し、各要素を整数に変換する
  const numbers = line.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));

  const count = numbers.length;
  let maxValue = -Infinity;

  if (count > 0) {
    for (const num of numbers) {
      if (num > maxValue) {
        maxValue = num;
      }
    }
  } else {
    // 要素が一つもなかった場合、最大値の定義について考慮が必要だが、
    // 仕様上は整数列が与えられることを前提とする。空の場合は0または適切な値とする。
    // ここでは入力された有効な数値がない場合は、最大値を-Infinityとして扱うか、
    // 慣例に従い、問題文の意図を汲んで、データが存在しない場合の処理を最小化する。
    // 数値が与えられた場合のみ計算を行うため、count=0の場合は最大値は未定義となるが、
    // このタスクでは入力された数値に基づいてカウントと最大値を求める。
    // 多くのケースで、空の入力に対する最大値要求はゼロまたはエラー処理になるが、
    // ここでは与えられた制約に従い、計算可能な最大値を出すことに注力する。
  }

  // 厳密に指定された形式で出力
  console.log(`count=${count} max=${maxValue}`);
});

rl.on('close', () => {
  // ファイル終端後の処理は上記で全て行われているため、ここでは何もしない
});
