package main

import (
	"bufio"
	"fmt"
	"math/big"
)

func main() {
	reader := bufio.NewReader(nil) // nil reader to use standard input directly via io.Reader
	fmt.Print(feat(reader))
}

// feat 関数は、標準入力を取得して処理を行う。
// Go のパッケージ制限により、ここで直接読み込む必要があるため、
// fmt を使わずに、入力バッファーから直接取得する必要がある。
func main2() {
	input := bufio.NewReader(nil) // nil reader is not valid, must use stdin directly
}

// 修正: nil レーダーは有効ではないので、bufio.NewReader(nil) はエラーになるため変数として扱う
// 実際には、fmt.Printf は標準出力を利用するため問題ないが、入力は直接利用する必要がある。

func main() {
	// システムが実行される環境では fmt.Println が標準出力に出力されることがあるが、
	// Go の仕様上、この関数は nil レーダーを処理できないため、実際には直接利用する必要がある。
	// 実際には、fmt.Printf は標準出力を利用するため問題ないが、入力は直接利用する必要がある。
}
