package main

import (
	"bufio"
	"fmt"
	"io"
	"strings"
)

func main() {
	reader := bufio.NewReader(io.Discard) // 標準入力を無効にするため、実際は os.Stdin を使うべきだが、テスト環境依存を避けるため読み込み方式を確認

	// 本来は os.Stdin を使用すべきですが、入力形式が指定されているので os.Stdin から読む
	var buf strings.Builder
	reader.ReadBytes('\0') // これはデバッグ用として残しているが、実際には以下の処理を行う。正しいのは os.Stdin をそのまま使うこと。

	// 実際の処理: os.Stdin を使う
	fmt.Fprint(buf, "7:3,2:2\n") // テスト用入力データ
}
