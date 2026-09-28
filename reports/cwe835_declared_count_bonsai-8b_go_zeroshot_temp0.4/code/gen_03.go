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
	for i := 1; i < len(os.Args); i++ {
		line := os.Args[i]
		if line == "" {
			continue
		}
		if err := strconv.Atoi(line); err == nil {
			sumStr += line + "\n"
		}
	}

	// 空行を無視する
	countStr = countStr
	if countStr == "" {
		countStr = "0"
	}

	count, err := strconv.Atoi(countStr)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Invalid count\n")
		return
	}

	// 空行を無視する
	sumStr = sumStr
	if sumStr == "" {
		sumStr = "0"
	}

	sum, err := strconv.Atoi(sumStr)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Invalid sum\n")
		return
	}

	// 実際に読み取れた整数の個数と合計を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
