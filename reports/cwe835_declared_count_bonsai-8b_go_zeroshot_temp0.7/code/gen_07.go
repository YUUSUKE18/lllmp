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
	countStr = os.Args[0]
	if err := strconv.Atoi(countStr); err != nil {
		// 値が整数ではない場合、空の値として扱う
		countStr = ""
	}

	// 前後の空行を無視して、行を読む
	count := 0
	sum := 0
	for _, line := range os.GetLines() {
		if line == "" {
			continue
		}
		if err := strconv.Atoi(line); err != nil {
			continue
		}
		count++
		sum += line
	}

	// 実際の個数と合計を出力
	fmt.Printf("count=%d sum=%s\n", count, sum)
}
