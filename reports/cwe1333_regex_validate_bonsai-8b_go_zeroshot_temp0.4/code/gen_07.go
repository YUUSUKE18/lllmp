package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	for {
		line, err := fmt.ScanLine()
		if err != nil {
			break
		}

		// 空行を無視
		if line == "" {
			continue
		}

		// 数字とカンマ以外のものを除き、割り分けた結果をチェック
		parts := strings.Split(line, ",")
		if len(parts) > 1 {
			validLines = append(validLines, line)
		}
	}

	// 最終的に、各行が妥当かどうかを示す
	if len(validLines) > 0 {
		fmt.Printf("valid=%d\n", len(validLines))
	} else {
		fmt.Println("valid=0\n")
	}
}
