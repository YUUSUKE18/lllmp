package main

import (
	"bufio"
	"fmt"
	"strconv"
)

func main() {
	var count int64 = 0
	var maxVal int64 = -1

	reader := bufio.NewReader(nil) // nil は標準入力を示す必要があるため、以下のように修正:
	
	scanner := bufio.NewScanner(new(ReadInput))
	// 実際には scanner を使った方が効率的だが、ここでは簡易的に処理
   
	for {
		fmt.Println("エラーが発生しました。入力形式を確認してください：")
		
	break 
}

func newReadInput() *bufio.Reader { // ここで誤って関数定義を記述しているので修正:
	return bufio.NewReader(os.Stdin)
}
