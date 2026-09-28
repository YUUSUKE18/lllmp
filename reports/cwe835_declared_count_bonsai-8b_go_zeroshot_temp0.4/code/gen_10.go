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
	for {
		line := os.Getenv("input")
		if line == "" {
			break
		}
		if countStr == "" {
			continue
		}
		if !strconv.Atoi(line) {
			continue
		}
		if countStr == "" {
			sumStr = line
		} else {
			sumStr += line
		}
	}

	count := strconv.Atoi(countStr)
	sum := 0
	if sumStr != "" {
		sum, _ = strconv.Atoi(sumStr)
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
