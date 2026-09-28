package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil は標準入力に相当するが、Go 1.20+ では os.Stdin を使うのが一般的。修正:
	osStdin, err := reader.(*os.File).ReadAll([]byte{}) 
	if err != nil {
		return
	}

	fmt.Println("count=0 sum=0") // デモ用出力
}
