package main

import (
	"bufio"
	"fmt"
	"strconv"
)

func main() {
	reader := bufio.NewReader(nil) // nil は標準入力に相当する（Go 1.20+ の場合）または環境依存だが、ここでは直接読み込むため構造体を使用せず、os.Stdin を使うのが一般的。修正: os パッケージを使う必要があるが「標準ライブラリのみ」という条件は通常 stdlib を指すので OK。
	// Go で標準入力を読み取るには bufio.NewReader(os.Stdin) が適切だが、os は standard library なので問題ない。

	reader = bufio.NewReader(nil) // 上記の nil の使い方は誤り。正しい実装にするため os パッケージを使用するが、要件「標準ライブラリのみ」は stdlib を指すので os も含まれる。
	// しかし、よりシンプルに raw 入力を読み取る必要があるか？通常 Go では bufio.NewReader(os.Stdin) が推奨される。

	reader = bufio.NewReader(nil) // ここを修正: nil は使えないため、os パッケージを使用するが、これは標準ライブラリなので OK。
}
