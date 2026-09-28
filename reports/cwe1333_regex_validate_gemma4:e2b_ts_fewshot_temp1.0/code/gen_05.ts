const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  crlfDelay: Infinity
});

let validLines = 0;

rl.on('line', (line) => {
  // 行の前後の空白を無視して処理
  const trimmedLine = line.trim();

  // 1. 空行のチェック
  if (trimmedLine === "") {
    // 空行は妥当ではない
    return;
  }

  // 2. 数字とカンマ以外の文字が含まれているかチェック
  // 許容されるのは数字、カンマ、およびそれらの間の空白のみ
  // 厳密に「数字とカンマ以外を含む行は妥当ではない」という制約を満たすため、
  // 正規表現で検証するのではなく、行を分解して検証する方が安全。

  // 妥当性の判定ロジック:
  // 1. 行が数字とカンマのみで構成されているか？
  // 2. カンマで区切られていて、少なくとも1つの数字列が存在するか？
  
  // 末尾のカンマは許容する。
  const parts = trimmedLine.split(',');

  // 数字列が存在するか確認する (少なくとも1つ以上の非空の要素があるか)
  const hasNumber = parts.some(part => part.trim() !== "");
  
  // 妥当性の判定：
  // 1. 空行でないこと (既にチェック済み)
  // 2. 数字とカンマ以外を含まないこと (split(',')で分割した結果が、数字とカンマのみで構成されているか)
  // 3. 1個以上の数字列がカンマで区切られていること (hasNumberがtrue)

  // ここでは、'数字とカンマ以外を含む行は妥当ではない'という制約を、
  // splitの結果が全て数字またはカンマ（と空白）で構成されているか、
  // または、数字列が存在するという点に絞って解釈します。

  // 課題の要求「1 個以上の数字列がカンマで区切られて並んでいること」と
  // 「空行、および数字とカンマ以外を含む行は妥当ではない」を統合すると、
  // 「カンマで区切られた要素が、すべて数字であること」が最も厳密です。

  let isStrictlyValid = true;
  
  for (const part of parts) {
      // 各部分が数字のみ（または空文字列、末尾のカンマによる空文字列）であるかをチェック
      if (part.trim() !== "" && !/^\d+$/.test(part)) {
          // 数字以外の文字が含まれている場合、それは妥当ではない
          isStrictlyValid = false;
          break;
      }
  }

  if (isStrictlyValid && hasNumber) {
      validLines++;
  }
});

rl.on('close', () => {
  console.log(`valid=${validLines}`);
});
