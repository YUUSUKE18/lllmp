process.stdin.setEncoding('utf8');

let validLines = 0;
let input = '';

process.stdin.on('data', (data: string) => {
  input += data;
});

process.stdin.on('end', () => {
  const lines = input.split('\n');
  let validCount = 0;

  for (const line of lines) {
    // 行の前後の空白を無視
    const trimmedLine = line.trim();

    if (trimmedLine === "") {
      // 空行は妥当ではない
      continue;
    }

    // カンマ区切りの整数列として妥当か判定
    // 1. 数字とカンマ以外を含まないか
    // 2. 1個以上の数字列がカンマで区切られているか (末尾のカンマは許容)
    
    // 正規表現で判定: 
    // ^[0-9,]*$: 行が数字とカンマのみで構成されているか
    // カンマで区切られた数字の列が存在すること
    
    // 妥当性の定義: 1個以上の数字列がカンマで区切られていること。末尾のカンマは許容。
    // 例: "1,2,3" -> OK, "1,2," -> OK, "," -> NG, "abc" -> NG, "1a" -> NG
    
    // 1. 行全体が数字とカンマのみで構成されているかを確認する
    const matchesPattern = line.match(/^[0-9,]*$/);
    if (!matchesPattern) {
      continue; // 数字とカンマ以外の文字が含まれている場合は不適
    }
    
    // 2. カンマで区切られた数字列が存在するかを確認する
    // カンマで区切られた要素を抽出してみる
    const parts = line.split(',');
    
    // 末尾のカンマが許容されることを考慮し、空の要素が1つ以上あるかを確認する
    // 例: "1,2,3" -> ["1", "2", "3"] (length 3)
    // 例: "1,2," -> ["1", "2", ""] (length 3)
    // 例: "," -> ["", ""] (length 2)
    
    // 妥当な行は、数字列が1つ以上存在する場合。
    // これは、カンマで区切られた要素の中に少なくとも1つ以上の数字が含まれていることを意味する。
    
    let hasNumber = false;
    for (const part of parts) {
        if (part.trim() !== "") {
            // 数字列であるかチェック
            if (/^\d+$/.test(part.trim())) {
                hasNumber = true;
            }
        }
    }

    if (hasNumber) {
      validCount++;
    }
  }

  console.log(`valid=${validCount}`);
});
