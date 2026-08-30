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
    
    // 行をカンマで分割し、各要素が数字のみ（または空文字列）であることを確認する
    const parts = line.split(',');
    let hasNumber = false;
    
    for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart.length > 0) {
        // 数字のみで構成されているかチェック
        if (/^\d+$/.test(trimmedPart)) {
          hasNumber = true;
        } else {
          // 数字とカンマ以外を含む場合は妥当ではない
          console.log(`valid=0`); // 妥当でない行が見つかった時点で終了（ただし、ここでは行ごとに判定するため、後で集計する）
          // このロジックは、行ごとに判定して最終結果を出す必要があるため、ここではフラグを立てる
        }
      }
    }

    // 妥当な行の判定ロジックを再構築
    // 妥当な行: 1個以上の数字列がカンマで区切られて並んでいる。末尾のカンマは許容。
    // 空行は妥当ではない。数字とカンマ以外を含む行は妥当ではない。
    
    let is_valid = false;
    if (line.length > 0) {
        // 末尾のカンマを削除してチェックする（末尾のカンマは許容されるため）
        const trimmedLine = line.trim();
        if (trimmedLine.length > 0) {
            // カンマで分割し、空でない要素が1つ以上存在するかチェック
            const parts_strict = trimmedLine.split(',');
            
            // 末尾のカンマが許容されるため、末尾の要素が空でも良いが、
            // 少なくとも1つの数字列が存在する必要がある。
            
            let foundNumber = false;
            for (const part of parts_strict) {
                const trimmedPart = part.trim();
                if (trimmedPart.length > 0 && /^\d+$/.test(trimmedPart)) {
                    foundNumber = true;
                } else if (trimmedPart.length > 0 && !/^\d+$/.test(trimmedPart)) {
                    // 数字とカンマ以外を含む場合
                    is_valid = false;
                    break;
                }
            }
            
            if (foundNumber) {
                is_valid = true;
            } else if (parts_strict.length > 0) {
                // カンマのみ、または空の要素のみの場合（例: "," や ",,"）
                // 1個以上の数字列が並んでいる必要があるため、数字が一つもなければ不適
                is_valid = false;
            } else {
                // 空行（trim()で空文字列になる）は妥当ではない
                is_valid = false;
            }
        } else {
            // 空行は妥当ではない
            is_valid = false;
        }
    } else {
        // 空行は妥当ではない
        is_valid = false;
    }

    if (is_valid) {
      validCount++;
    }
  }

  console.log(`valid=${validCount}`);
});
