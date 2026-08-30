process.stdin.on("data", (data: Buffer) => {
  const line = data.toString().trim();
  if (line === "") {
    // 空行は妥当ではないため、ここでは何もしない（後でカウントしない）
    return;
  }

  // 末尾のカンマが許容されるため、カンマで分割する前に処理する
  // 例: "1,2,3," -> ["1", "2", "3", ""]
  const parts = line.split(',');

  // 1. 空行、または数字とカンマ以外を含む行を判定する
  // parts.length が 0 でないこと、そしてすべての要素が数字（または空文字列）で構成されているかを確認する必要がある。
  // 仕様：1個以上の数字列がカンマで区切られて並んでいること。
  // 空行は妥当ではない。

  let isValid = false;

  if (parts.length > 0) {
    // parts の要素が全て数字（または空文字列）であるか確認し、少なくとも1つの数字が含まれているか確認する。
    let hasNumber = false;
    for (const part of parts) {
      // partが数字のみ（または空文字列）であるかチェック
      if (/^\d*$/.test(part)) {
        if (part.length > 0) {
          hasNumber = true;
        }
      } else {
        // 数字とカンマ以外を含む行は妥当ではない
        isValid = false;
        break;
      }
    }

    if (isValid && hasNumber) {
      // 1個以上の数字列がカンマで区切られて並んでいる。
      isValid = true;
    } else if (parts.length === 1 && parts[0] === "") {
      // 例: "," のようなケース（これは仕様上、1個以上の数字列ではないため不適）
      isValid = false;
    } else if (parts.length > 0) {
        // 形式的にはカンマで区切られているが、数字列が1つも存在しない場合（例: "," や ",,"）
        // この処理は、上記ループでhasNumberがfalseになれば、isValidがfalseになっているはず。
        // ここでは、数字が存在すればOKとする。
        if (!hasNumber) {
            isValid = false;
        }
    }
  } else {
    // parts.length === 0 は、行が完全に空白（trim()後の判定で既に除外済みだが念のため）
    isValid = false;
  }
  
  // 簡易的な再評価: 
  // 1. 空行でない。
  // 2. 数字とカンマ以外を含まない。
  // 3. 1個以上の数字列がカンマで区切られている。

  let finalIsValid = false;
  if (line.length > 0) {
      const components = line.split(',');
      let hasAtLeastOneNumber = false;
      let allValid = true;

      for (const part of components) {
          // 数字または空文字列のみを含むか
          if (!/^\d*$/.test(part)) {
              allValid = false;
              break;
          }
          if (part.length > 0) {
              hasAtLeastOneNumber = true;
          }
      }

      if (allValid && hasAtLeastOneNumber) {
          finalIsValid = true;
      }
  }

  // 最終的な妥当性の判定を反映
  if (finalIsValid) {
      // この実装では、標準出力にすぐ書き出すのではなく、全行を処理してから集計する必要がある。
      // しかし、仕様は「標準入力の各行が妥当かどうかを判定する」後に「valid=<妥当な行数>」を出すことなので、
      // 各行の判定結果を保持する配列が必要になる。
  }
});

// 処理全体を再構築して、行ごとに判定し、最後に結果を出力する形にする必要があります。
// 標準入力全体を読み込む方式に変更します。
