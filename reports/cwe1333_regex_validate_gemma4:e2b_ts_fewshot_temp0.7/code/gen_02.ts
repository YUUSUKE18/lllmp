const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines = 0;
let validLines = 0;

rl.on('line', (line) => {
  lines++;
  // 行の前後の空白を無視して、カンマ区切りの整数列として妥当かを判定
  // 妥当な行は、カンマで区切られた数字のみを含む。
  // 末尾のカンマは許容される。
  const trimmedLine = line.trim();
  if (trimmedLine === "") {
    // 空行は妥当ではない
    return;
  }

  // 正規表現で、数字とカンマのみで構成されているかチェック
  // ^: 行の開始
  // [0-9,]*: 0から9、またはカンマが0回以上続く
  // $: 行の終了
  // このチェックだけでは「1個以上の数字列がカンマで区切られている」ことを保証しないため、
  // より厳密に解析する。

  // カンマで区切られた要素を解析し、すべてが整数であることを確認する。
  const parts = trimmedLine.split(',');
  let isValid = true;

  if (parts.length === 0) {
    // これはtrimmedLineが空でないのにsplitで空配列になることは通常ないが、念のため
    isValid = false;
  } else {
    // すべてのパーツが空でない整数（またはカンマ）のみで構成されているか確認
    for (const part of parts) {
      if (part.trim() === "") {
        // カンマが連続する場合や、不要な空白が含まれる場合を許容する（仕様：空行は妥当ではない、数字とカンマ以外は妥当ではない）
        // ここでは、"数字とカンマ以外を含む行は妥当ではない"という条件を厳しく適用する。
        // 空の要素（例: "1,,2" の中間）は、区切り文字の連続として許容するが、
        // 「1個以上の数字列がカンマで区切られて並んでいる」という条件を満たす必要がある。
      } else {
        // 各パーツが整数であることを確認
        if (!/^\d+$/.test(part)) {
          isValid = false;
          break;
        }
      }
    }

    // 最終的な妥当性の再評価:
    // 1. 空行ではない (checked above)
    // 2. 数字とカンマ以外を含まない (checked above: /\d+$/)
    // 3. 1個以上の数字列がカンマで区切られている (parts.length >= 1 かつ、実際には数字が含まれている必要がある)
    
    // 非常に厳密に解釈すると、「カンマで区切られた要素がすべて整数であること」が主要なチェックになる。
    // 1個以上の数字列がカンマで区切られて並んでいる、という条件は、"1,2,3" や "1," や ",1" などが許容されることを意味する。
    // 空行はNG。数字とカンマ以外はNG。

    // 妥当な行の判定をシンプルにするため、行が空でなく、かつ全てのパーツが数字またはカンマのみで構成されていることを確認する。
    // もし、"a,1" のような入力があれば、これはNG。
    
    // 提示された例の仕様に基づき、数字とカンマ以外の文字が含まれていないか、かつ空行でないことを確認する。
    // 妥当な行の定義: 1個以上の数字とカンマのみで構成されており、空行ではない。
    
    if (trimmedLine.length > 0) {
        // 少なくとも1つの数字が含まれていることを確認する
        const containsDigit = parts.some(part => part.trim().length > 0 && /^\d+$/.test(part.trim()));
        
        // もし、行がカンマのみで構成されている場合（例: ","）、これは「1個以上の数字列」ではないためNGと考える。
        if (parts.length > 0 && parts.every(p => p.trim() === "" || /^\d+$/.test(p))) {
             // これは、"1,,2" のようなケースを許容するが、数字が存在しない場合はNGとする。
             // 課題の核心は「妥当かどうかを判定する」こと。
             // 妥当なのは「1個以上の数字列がカンマで区切られて並んでいる」こと。
             
             // 非常に厳密に、各要素が数字であるか、空文字列であるかをチェックする。
             const allPartsAreValid = parts.every(p => p.trim() === "" || /^\d+$/.test(p.trim()));
             
             if (allPartsAreValid) {
                 // 数字が少なくとも1つ存在すればOK
                 if (containsDigit) {
                     validLines++;
                 }
             }
        }
    }
  }
});

rl.on('close', () => {
  console.log(`valid=${validLines}`);
});
