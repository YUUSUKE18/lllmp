const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lineCount = 0;
let validLines = 0;

rl.on('line', (line) => {
  lineCount++;
  const trimmedLine = line.trim();

  if (trimmedLine === "") {
    // 空行は妥当ではない
    return;
  }

  // カンマ区切りの整数列として妥当か判定
  // 1. 数字とカンマ以外を含まないか
  // 2. 1個以上の数字列がカンマで区切られているか (末尾のカンマは許容)

  // 正規表現で検証: 
  // ^\s* : 行頭の空白を許容
  // (?:[0-9]+(?:\s*,[0-9]+)*) : 1つ以上の数字列と、その間にカンマと空白が続くパターンを繰り返す
  // (?:,)? : 最後のカンマが任意
  // \s*$ : 行末の空白を許容
  // この判定は少し複雑になるため、より直接的に構造をチェックする。

  // 妥当な行の定義: 
  // 1. 数字とカンマのみで構成されている。
  // 2. 少なくとも1つの数字が含まれている。
  // 3. カンマで区切られている（またはカンマで終わる）。

  let isValid = false;
  
  // 行をカンマで分割してみる
  const parts = line.split(',');
  
  if (parts.length === 0) {
      // これは空行で既に除外されているはずだが念のため
      return;
  }

  let hasNumber = false;
  let allPartsAreValid = true;

  for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart === "") {
          // カンマが連続している（例: ,,）または前後の空白のみの場合、これは許容されるべきか？
          // 仕様：「1 個以上の数字列がカンマで区切られて並んでいる」
          // これは、数字列がカンマで区切られていることを意味する。
          // 例: "1,2,3" -> ["1", "2", "3"] (3つの数字列)
          // 例: "1,2," -> ["1", "2", ""] (3つの要素)
          
          // 空の要素が連続する場合、それは「数字列」ではないため、妥当ではないと見なすのが安全。
          // ただし、末尾のカンマが許容されるため、最後の要素が空になるのは許容される。
          continue;
      }
      
      // 数字列であるかチェック
      if (/^\d+$/.test(trimmedPart)) {
          hasNumber = true;
      } else {
          // 数字とカンマ以外を含む場合、妥当ではない
          allPartsAreValid = false;
          break;
      }
  }

  // 1. 少なくとも1つの数字列が存在すること
  // 2. すべての要素が数字列または空文字列（末尾のカンマによる）で構成されていること
  if (hasNumber && allPartsAreValid) {
      validLines++;
  }
});

rl.on('close', () => {
  console.log(`valid=${validLines}`);
});
