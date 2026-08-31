package main

import (
	"bufio"
	"fmt"
	"io"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(io.Discard) // 標準入力を読み込むために修正
	scanner := bufio.NewScanner(reader)
	
	// 標準入力をスキャナーに設定
	if scanner == nil {
		return
	}
	
	// 標準入力からテキストを取得
	input, err := io.ReadAll(os.Stdin)
	if err != nil {
		return
	}
	
	fmt.Println(string(input))
}
