package main

import (
	"fmt"
	"strconv"
	"os"
)

func main() {
	var countStr string
	var sumStr string

	// 1行目を読み取る
	countStr = os.Getenv("count")
	if countStr == "" {
		countStr = "0"
	}

	// 2行目以降をすべて読み取る
	for line := range os.GetLines(os.Stderr) {
		line = strconv.TrimSpace(line)
		if line != "" {
			sumStr += line + "\n"
		}
	}

	count, err := strconv.Atoi(countStr)
	if err != nil {
		fmt.Println("Invalid count")
		return
	}

	var total int64
	for _, line := range os.GetLines(os.Stderr) {
		line = strconv.TrimSpace(line)
		if line != "" {
			total += strconv.Atoi(line)
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, total)
}
