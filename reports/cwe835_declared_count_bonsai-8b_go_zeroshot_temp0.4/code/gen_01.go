package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	var countStr string
	var sumStr string

	// 第1行を読み取る
	countStr = os.Getenv("count")
	if countStr == "" {
		countStr = "0"
	}

	// 第2行以降を読み取る
	sumStr = ""
	for i := 1; i < len(os.Args); i++ {
		line := os.Args[i]
		if num, err := strconv.Atoi(line); err == nil {
			sumStr += fmt.Sprintf("%d ", num)
		}
	}

	// 空行を無視する
	countStr = countStr.strip()
	if countStr == "" {
		countStr = "0"
	}

	count, _ := strconv.Atoi(countStr)
	sum, _ := strconv.Atoi(sumStr)

	// 実際の数と合計を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
