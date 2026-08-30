process.stdin.on("data", (data: Buffer) => {
  const line = data.toString().trim();
  if (line.length === 0) {
    // 空行は妥当ではないが、ここでは行ごとに判定するため、次のデータが来たときに処理する
    return;
  }

  // 行全体を処理するために、入力ストリームを一行ずつ処理するように調整する必要があるが、
  // 標準入力はチャンクで来るため、ここではデータが完全に揃うのを待つか、
  // あるいは入力全体を一度に処理するアプローチをとる。
  // 標準的なストリーム処理では、改行で区切るのが最も自然だが、ここではデータが到着した時点で判定を試みる。

  // 厳密に「各行」を判定する必要があるため、入力全体を読み込み、改行で分割する方が簡単。
  // しかし、このフレームワークではストリーム処理を維持する必要がある。

  // 一旦、読み込んだ行を処理する。
  const is_valid = checkLineValidity(line);

  // 妥当な行数をカウントする（ここでは、データがストリームで届くたびにカウントするのではなく、
  // 処理が完了した後に合計する方が正確になる。しかし、要求は「標準出力へ、厳密に valid=<妥当な行数> を出力」なので、
  // 入力全体を処理してから出力するアプローチを取る）
});

// 実際には、全入力を読み込んでから処理する方が、行単位の判定が容易。
// 標準入力全体を読み込むアプローチに変更する。

let inputData = "";
process.stdin.setEncoding("utf8");

process.stdin.on("data", (data: Buffer) => {
  inputData += data.toString();
});

process.stdin.on("end", () => {
  const lines = inputData.split(/\r?\n/);
  let validCount = 0;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.length === 0) {
      // 空行は妥当ではない
      continue;
    }

    // カンマ区切りの整数列を判定
    // 妥当な条件: 1個以上の数字列がカンマで区切られて並んでいること。
    // 末尾のカンマは許容。
    
    // 1. 数字とカンマ以外の文字が含まれていないか？
    if (!/^[0-9,]*$/.test(trimmedLine)) {
      continue; // 数字とカンマ以外を含む行は妥当ではない
    }

    // 2. カンマ区切りで、少なくとも1つの数字列が存在するか？
    // 末尾のカンマは許容されるため、カンマで分割した結果に空文字列や数字のみの要素が含まれるか確認する。

    // 末尾のカンマを取り除く（もしあれば）
    let content = trimmedLine;
    if (content.endsWith(',')) {
      content = content.slice(0, -1);
    }

    // カンマで分割
    const parts = content.split(',');
    
    // 妥当であるためには、分割された部分の中に少なくとも1つの有効な整数列が存在する必要がある。
    // また、空行でないことが前提なので、partsが空でないことを確認する。
    let hasNumber = false;
    for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart.length > 0 && /^\d+$/.test(trimmedPart)) {
        hasNumber = true;
        break;
      }
    }
    
    // 末尾のカンマのみの行（例: "," や "," の後の行）も許容されるか？
    // 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
    // 例: "1,2,3" -> 3個の数字列あり。妥当。
    // 例: "1," -> 1個の数字列あり。妥当。
    // 例: "," -> 0個の数字列。妥当ではない。
    
    if (hasNumber) {
        validCount++;
    }
  }

  console.log(`valid=${validCount}`);
});
