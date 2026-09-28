const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let validLines = 0;

rl.on('line', (line) => {
  const trimmedLine = line.trim();
  if (trimmedLine === "") {
    // 空行は妥当ではない
    return;
  }

  // 妥当性のチェック: カンマ区切りの整数列であること
  // 1. 数字とカンマのみで構成されているか
  // 2. 1個以上の数字列が存在するか (カンマで区切られている)

  // 正規表現でチェック: 
  // ^[0-9,]*$ : 数字とカンマのみ
  // 1個以上の数字列があることを確認するため、カンマで区切られた数字の間に少なくとも1つの数字があることを確認する必要がある。
  // 最も簡単な妥当性の定義に従う: 1個以上の数字列がカンマで区切られている。
  
  // カンマで区切られた要素を抽出して、すべてが有効な整数であることを確認する。
  const parts = trimmedLine.split(',');
  let isValid = true;
  let hasNumber = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") {
      // 末尾のカンマや連続するカンマによる空要素は許容されるが、
      // 妥当な行は「1個以上の数字列がカンマで区切られている」こと。
      continue;
    }

    // 数字のみで構成されているかチェック
    if (!/^\d+$/.test(trimmedPart)) {
      isValid = false;
      break;
    }
    hasNumber = true;
  }

  // 妥当な行の判定: 1個以上の数字列がカンマで区切られている
  // これは、空行でないこと、かつ、少なくとも1つの数字が含まれていること、という条件を満たせば良い。
  // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
  // 例: "1,2,3" -> parts=["1", "2", "3"] -> 3個の数字列
  // 例: "1," -> parts=["1", ""] -> 1個の数字列
  // 例: "," -> parts=["", ""] -> 0個の数字列 (これは空行チェックで除外されるべきだが、ここでは数字列の存在を重視)

  if (isValid && hasNumber) {
    validLines++;
  }
});

rl.on('end', () => {
  console.log(`valid=${validLines}`);
});
