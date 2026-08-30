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
    // 正規表現で、カンマで区切られた数字の塊が存在するかをチェックする
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
                console.log(`valid=0`); // 妥当でない行が見つかった時点で終了（ただし、ここでは行ごとに判定する必要があるため、後で集計する）
                // このロジックでは、行ごとに判定し、最後に集計する
            }
        }
    }

    // 妥当な行の判定ロジックを再構築
    // 妥当な行: 1個以上の数字列がカンマで区切られて並んでいる。末尾のカンマは許容。
    // 空行は妥当ではない。数字とカンマ以外を含む行は妥当ではない。
    
    let is_valid = false;
    if (line.length > 0) {
        // 末尾のカンマを取り除いた文字列を処理する
        const trimmedLine = line.trim();
        if (trimmedLine.length > 0) {
            // カンマで分割し、空でない要素が1つ以上存在するか確認する
            const parts_trimmed = trimmedLine.split(',');
            
            // 末尾のカンマが許容されるため、最後の要素が空でも良い。
            // 妥当なのは、少なくとも1つの数字列が存在する場合。
            let foundNumber = false;
            for (const part of parts_trimmed) {
                const trimmedPart = part.trim();
                if (trimmedPart.length > 0 && /^\d+$/.test(trimmedPart)) {
                    foundNumber = true;
                } else if (trimmedPart.length > 0 && !/^\d+$/.test(trimmedPart)) {
                    // 数字とカンマ以外を含む行は妥当ではない
                    is_valid = false;
                    break;
                }
            }
            
            if (foundNumber) {
                is_valid = true;
            } else if (parts_trimmed.length > 0) {
                // 数字が含まれていないが、カンマで区切られている場合（例: "," や ",," など）
                // 仕様では「1個以上の数字列がカンマで区切られて並んでいること」が条件。
                // 数字列が0個の場合、妥当ではない。
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
