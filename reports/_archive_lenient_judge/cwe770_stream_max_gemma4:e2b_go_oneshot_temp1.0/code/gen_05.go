package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, _ := os.ReadFile(0) // 標準入力全体を読み込む（ここでは文字列として扱うため）
	data := strings.TrimSpace(string(input))
	if data == "" {
		fmt.Println("count=0 max=0")
		return
	}

	// カンマで分割して整数列を取得
	parts := strings.Split(data, ",")
	var count int = 0
	var max int64 = -1 // 64bit整数の範囲を考慮し、初期値は非常に小さい値（または最初の要素で上書きされるように工夫）

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if n > max {
			max = n
		}
	}

	// データが存在しない場合は count=0 max=0 とする（または仕様に厳密に従い、読み取れた要素のみを考慮）
	if count == 0 {
		fmt.Println("count=0 max=0")
	} else {
		fmt.Printf("count=%d max=%d\n", count, max)
	}
}
