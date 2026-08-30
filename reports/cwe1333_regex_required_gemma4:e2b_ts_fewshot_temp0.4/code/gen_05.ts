const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  let validCount = 0;
  const regex = /^[\d,]+(?:,[\d,]+)*$|^[,]*$/;

  for (const line of lines) {
    const trimmedLine = line.trim();

    // 空行は妥当ではない
    if (trimmedLine === "") {
      continue;
    }

    // 末尾のカンマのみの行は妥当（例: "," または ",,"）
    if (/^,+$/.test(trimmedLine)) {
      validCount++;
      continue;
    }

    // 1個以上の数字とカンマのみで構成されているか、または数字とカンマの組み合わせ
    // 正規表現の解釈:
    // ^[\d,]+ : 行が数字またはカンマで始まっている
    // (?:,[\d,]+)* : カンマと数字のペアが0回以上繰り返される
    // $ : 行の終わり
    // この正規表現は、数字とカンマのみで構成されていることを確認します。
    // 例: "1,2,3" -> マッチ
    // 例: "1,2," -> マッチ (末尾のカンマは許容される)
    // 例: "1,2,3," -> マッチ
    // 例: "abc" -> マッチしない
    // 例: "1,a" -> マッチしない
    
    // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
    // 1個以上の数字列がカンマで区切られている、または末尾のカンマが許容される。
    // 以下の正規表現は、数字とカンマのみで構成され、少なくとも1つの数字が含まれていることを確認します。
    const isValidFormat = /^[0-9,]+(?:,[0-9,]+)*$|^[,]*$/.test(trimmedLine);

    if (isValidFormat) {
      // 妥当な行としてカウントする。空行は除外済み。
      validCount++;
    }
  }

  console.log(`valid=${validCount}`);
});
