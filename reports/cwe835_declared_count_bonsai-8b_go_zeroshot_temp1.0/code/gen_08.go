package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	var countStr string
	var sumStr string

	// 第1行からcountを読み取る
	firstLine, _ := os.ReadFile("input.txt")
	firstLine = firstLine[:len(firstLine)-1] // センダリルインの終了符を削除
	countStr, _ = strconv.Atoi(firstLine)

	// 后続の行から整数を読み取る
	for {
		line, _ := os.ReadFile("input.txt")
		if len(line) == 0 {
			break
		}
		line = line[:len(line)-1]
		parts := line.split(",")
		for _, part := range parts {
			_, err := strconv.Atoi(part)
			if err == nil {
				sumStr += part + ", "
			}
		}
	}

	// 最適化：partsを分割して処理するのではなく、split後に処理する
	parts := line.split(",")
	for _, part := range parts {
		_, err := strconv.Atoi(part)
		if err == nil {
			sumStr += part + ", "
		}
	}

	// 結果を出力
	fmt.Println("count=" + countStr + " sum=" + sumStr)
}
