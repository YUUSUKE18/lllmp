const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];

rl.on('line', (line) => {
  lines.push(line.trim());
});

rl.on('close', () => {
  let validCount = 0;
  for (const line of lines) {
    // 末尾のカンマを許容しつつ、カンマ区切りの整数列が存在するかを判定する
    // 正規表現で、カンマで区切られた数字の列が存在するかをチェックする
    // 許容されるパターン: 0個以上の数字とカンマの組み合わせ。ただし、少なくとも1つの数字列が存在する必要がある。
    // 妥当な行の条件: 1個以上の数字列がカンマで区切られて並んでいること。
    
    // 行をカンマで分割し、空でない要素が存在するかを確認する
    const parts = line.split(',');
    let hasNumber = false;
    for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart.length > 0) {
        // 数字のみで構成されているかチェック（厳密には整数列である必要はないが、ここでは数字が含まれていることを確認する）
        // 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
        // これは、カンマで区切られた要素の中に少なくとも1つの数字が含まれていれば良い、と解釈する。
        // ただし、「数字とカンマ以外を含む行は妥当ではない」という制約があるため、
        // 各要素が数字または空文字列（カンマの前後）のみで構成されていることを確認する。
        
        // より厳密に「数字列」をチェックする
        if (/^\d+$/.test(trimmedPart)) {
          hasNumber = true;
        } else if (trimmedPart.length > 0) {
          // 数字でもなく、空でもない文字が含まれている場合、これは不妥当
          // ただし、行全体が「カンマ区切りの整数列」であるという前提なので、
          // 各要素が数字または空文字列であるかを確認する。
          // 「数字とカンマ以外を含む行は妥当ではない」という制約を、行全体に適用する。
          // ここでは、行全体が「カンマ区切りの整数列」であるか、または空行であるかを判定する。
          // 空行は妥当ではない。
          // 数字とカンマ以外を含む行は妥当ではない。
          // 妥当な行は、数字とカンマのみで構成されている。
          
          // 厳密に「数字とカンマ以外を含む行は妥当ではない」を適用する。
          // これは、行に含まれる文字が '0'-'9', ',' のみで構成されていることを意味する。
          if (!/^[0-9,]*$/.test(line)) {
            // 数字とカンマ以外を含む行は妥当ではない
            // この行全体が不妥当であると判断する
            // ただし、これは「行」単位の判定なので、この行をスキップするのではなく、
            // 妥当な行のカウントに含めないようにする。
            // 以下のロジックで、妥当な行のみをカウントする。
          }
        }
      }
    }

    // 妥当性の再評価:
    // 1. 空行は妥当ではない。
    // 2. 数字とカンマ以外を含む行は妥当ではない。
    // 3. 1個以上の数字列がカンマで区切られて並んでいること。
    
    // 妥当な行の判定を再定義する。
    // 行が空でない、かつ、その行が数字とカンマのみで構成されている場合、
    // 少なくとも1つの数字列が存在すれば妥当とする。
    
    let isLineValid = false;
    if (line.length > 0) {
      // 数字とカンマのみで構成されているかチェック
      if (/^[0-9,]*$/.test(line)) {
        // カンマで分割し、空でない数字列が存在するかチェック
        const parts = line.split(',');
        let foundNumber = false;
        for (const part of parts) {
          if (part.trim().length > 0 && /^\d+$/.test(part.trim())) {
            foundNumber = true;
          }
        }
        if (foundNumber) {
          isLineValid = true;
        }
      }
    }

    if (isLineValid) {
      validCount++;
    }
  }

  console.log(`valid=${validCount}`);
});
