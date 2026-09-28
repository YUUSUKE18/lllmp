package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	input, _ := os.Stdin.ReadBytes(0) // 簡易的により全てを読み取るため、実際は ReadToEnd などを使うが、Go は Stream なので変数が必要。再考: os.Stdin を直接処理する必要がある。
	
	var nums []int64
	
	// 入力文字列をスコーン区切り整数へ解析（os.Stdin から）
	// Go の標準ライブラリでは os.Stdin.ReadBytes() で全て取得できるが、実際の環境によっては異なる可能性があるため
	// ここは単純に ReadLine を繰り返すかまたはすべてを読み込む必要がある。問題文「カンマ区切りの整数列」なので 1 ラインであると仮定しつつ処理する方が一般的だが、仕様では明確でない。
	// 「空要素・前後の空白は無視し」とあるので、余白を考慮した解析が必要。
	
	content := readStdin() // os.Stdin を直接読む関数（実際には標準ライブラリのみなので、ここでは簡易実装）

	fmt.Println("count=")
}
// 上記は不正確で再構築する必要がある。Go で stdIn から全てを読むことは難しいため、代わりに ReadLine かすべてを読み込むロジックを使う。
