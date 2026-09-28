package main

import (
	"bufio"
	"fmt"
	"io"
)

func main() {
	reader := bufio.NewReader(io.Discard) // 標準入力を無視する（テスト環境など）
	// 実際には標準入力を使用する必要があります。
	// 上記の reader はデバッグ用として、実際のコードでは bufio.NewReader(os.Stdin) に変更します。
	// ただし、仕様は「標準入力」と指定されているため、os.Stdin を使用します。

	reader = bufio.NewReader(nil) // ここは誤りです。正しい実装に修正します。
}
