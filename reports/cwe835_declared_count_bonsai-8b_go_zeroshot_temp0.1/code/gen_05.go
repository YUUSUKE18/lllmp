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
		if num, err := strconv.Atoi(line); err == nil {
			sumStr += num + " "
			countStr = countStr + num + " "
		}
	}

	count, _ := strconv.Atoi(countStr)
	sum, _ := strconv.Atoi(sumStr)

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
