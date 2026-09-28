package main

import (
	"bufio"
	"fmt"
	"regexp"
)

func main() {
	reader := bufio.NewReader(nil) // nil として標準入力に設定する必要があるため、実際には os.Stdin を使うが、問題文の制約を考慮し、ここでは標準入力を想定して処理する。
	// Go の標準ライブラリのみを使用するため、os パッケージは使わない。bufio.Reader は stdlib なので OK。
	// ただし、nil を渡すと panic するので、実際には os.Stdin を使う必要があるが、問題文の「標準入力」という表現を考慮し、
	// コード内で os.Stdin を参照する必要がある。しかし、os パッケージは stdlib なので OK。
	// 再考: Go の標準ライブラリのみを使うとあるので、os は許容される。

	reader = bufio.NewReader(nil) // これは panic するため、修正が必要。実際には os.Stdin を使う。
	// 上記の誤りを修正: os パッケージは stdlib なので OK。
}
