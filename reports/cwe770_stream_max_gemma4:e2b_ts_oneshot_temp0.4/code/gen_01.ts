const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === '') return;

  const parts = line.split(',');
  let count = 0;
  let max = -Infinity;
  let validNumbersFound = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === '') continue;

    const num = parseInt(trimmedPart, 10);

    // チェック: 整数として解釈できるか、かつ64bitの範囲内か（ここではparseIntで十分だが念のため）
    if (!isNaN(num)) {
      count++;
      if (num > max) {
        max = num;
      }
      validNumbersFound = true;
    }
  }

  // 処理が完了した時点で出力する（入力が全て読み込まれた後に出力するのが望ましいが、この形式では行ごとに処理を試みる）
  // 今回の仕様は「標準入力からカンマ区切りの整数列を受け取る」なので、通常は全ての入力を待ってから計算すべきだが、
  // 競技プログラミング的な環境では一度に与えられたデータ全体を処理する前提で、ここでは読み込んだ行に対して計算を行う。
  // もし入力が1行のみであると仮定するなら、このブロック内で完結させる。

  if (validNumbersFound) {
    console.log(`count=${count} max=${max}`);
  } else if (parts.length > 0 && parts.every(p => p.trim() === '')) {
    // 全て空要素だった場合も、何も出力しないか、あるいは仕様に合わせたデフォルト値を出すべきだが、ここではデータがない場合は何も出力しないとする。
  }
});

rl.on('close', () => {
  // 実際にはreadlineのイベントで処理が完了するが、上記のロジックは入力された行ごとに実行されるため、
  // 全ての入力を集めてから計算する方がより厳密だが、ここでは与えられた形式に従い、読み込まれたデータに基づいて最終的な結果を出力する。

  // 実際にはreadlineのイベント内で全ての処理を完結させる必要があるため、上記のロジックを修正し、
  // 全ての入力が読み込まれた後に一度だけ出力するように調整する。
});

/*
再構成: 標準入力全体を一度に読み込む方式に変更する（例1と同様のストリーム処理）
*/

let inputData = '';

process.stdin.on('data', (data) => {
  inputData += data;
});

process.stdin.on('end', () => {
  const lines = inputData.trim().split('\n').filter(line => line.length > 0);
  let count = 0;
  let max = -Infinity;

  for (const line of lines) {
    const parts = line.split(',');
    for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart === '') continue;

      const num = parseInt(trimmedPart, 10);

      if (!isNaN(num)) {
        count++;
        if (num > max) {
          max = num;
        }
      }
    }
  }

  // 全ての行を処理した後の結果を出力
  console.log(`count=${count} max=${max}`);
});
