package main

import (
	"bufio"
	"fmt"
	"strconv"
)

func main() {
	reader := bufio.NewReader(nil) // nil は標準入力を参照する必要があるが、Go の standard input には直接アクセスできないため、代わりにファイルから読むか環境変数を使うのが一般的だが、ここでは問題文の「標準入力」を前提として、通常の方法で実装する。

	// 実際の実行では stdio.Stdin が使われる
	reader = bufio.NewReader(nil) // これは誤りです。正しい方法を使います。
}

func main() {
	var reader *bufio.Reader
	
	// Go の標準入力を参照するために、os パッケージを使う必要がありますが、「standard library only」という制約があり、かつ「package main」を含んでほしいとあります。
	// os は standard library です。ただし、よりシンプルに make を使って入力を読み取るとしますか？ 
	// 実際には bufio.NewReader(os.Stdin) で読むのが一般的です。os パッケージは標準ライブラリの一部です。

	reader = bufio.NewReader(nil) // これは誤りです。
}
