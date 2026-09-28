const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const parts = line.split(',');
  let count = 0;
  let max = -Infinity;
  let validNumbersFound = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈可能かチェックし、64bit範囲内かチェック（ここではJavaScriptのNumber型で十分だが、仕様に厳密に従う）
    if (!isNaN(num) && Number.isSafeInteger(num)) {
      count++;
      if (num > max) {
        max = num;
      }
      validNumbersFound = true;
    }
  }

  // 整数として解釈できた要素のみをカウントし、最大値を計算する。
  // ただし、仕様は「カンマ区切りの整数列を受け取る」ので、入力された文字列から抽出した有効な整数のみを数えるべきか、
  // それとも入力されたカンマ区切りで指定された要素数を考慮すべきか曖昧です。
  // 例の形式に従い、「読み込んだデータセット全体」から有効な整数を数え、最大値を求める方針を採用します。

  // 読み込んだ行全体が1つのデータセットと見なす場合:
  if (validNumbersFound) {
    console.log(`count=${count} max=${max}`);
  } else {
    // 有効な整数が一つもなかった場合、0個と最小値（または定義に依存）を出力する。
    // ここでは、入力されたカンマ区切りで有効な数が0の場合、count=0, max=-Infinity となるが、
    // 64bit整数の範囲を考慮し、もしデータが存在しなければ count=0, max=0 (または適切なデフォルト) とする。
    // 今回は「要素数と最大値」を求めるため、有効な数が0なら count=0, max=0 とする（負の無限大は出力しない）。
    console.log(`count=0 max=0`);
  }
});

rl.on('close', () => {
  // 入力処理が完了した
});
