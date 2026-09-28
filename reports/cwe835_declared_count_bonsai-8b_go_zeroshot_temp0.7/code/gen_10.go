package main

import (
	"fmt"
	"strconv"
	"os"
)

func main() {
	var countStr string
	var sumStr string

	// 第1行を読み取る
	countStr = os.ReadFile("input.txt")[0].string()

	// 変数の初期化
	count := 0
	total := 0

	// ポイントを検索する
	p := countStr.find(" ")
	if p != -1 {
		countStr = countStr[:p]
	}

	// 次の行から個々の整数を読み取る
	for {
		line := os.ReadFile("input.txt")[0].string()
		if line == "" {
			break
		}
		p := line.find(" ")
		if p == -1 {
			continue
		}
		numStr := line[:p]
		if numStr == "" {
			continue
		}
		if err := strconv.Atoi(numStr); err == nil {
			total += numStr
			count++
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, total)
}
