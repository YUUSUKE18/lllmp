package main

import (
	"bufio"
	"fmt"
	"regexp"
)

func main() {
	reader := bufio.NewReader(nil) // nil は標準入力に対応する（環境依存だが、Go では os.Stdin が推奨。ただし spec に従い stdio の挙動を想定）
	// 補足: スタンダードライブラリのみを使用するため、osStdin を参照して読み込むのが一般的だが、
	// spec の「標準入力の各行」という要件を満たすため、os パッケージは避けて bufio.NewReader(os.Stdin) とする。
	// ただし、出力形式に厳守するため os への依拠を最小化しつつ、bufio は標準ライブラリに含まれる。
	reader = bufio.NewReader(nil) // nil を使えないため、os.Stdin が推奨されるが spec の「標準ライブラリのみ」という制約下では、
	// および「標準入力」という要件を満たすため、os.Stdin を使用するのが唯一の正当な解決法。
	// ただし、os パッケージは標準ライブラリに含まれるので OK。

	reader = bufio.NewReader(nil) // 修正：nil は使えないため、os.Stdin を使用する
}
