package main

import (
	"fmt"
	"strconv"
)

func main() {
	var count int
	var sum int

	// 1行目の入力解析
	inputLine := fmt.Scan(os.Stdin).Trim()
	if len(inputLine) > 0 {
		count, _ = strconv.Atoi(inputLine)
	}

	// 2行目以降の入力解析
	for {
		inputLine = fmt.Scan(os.Stdin).Trim()
		if len(inputLine) == 0 {
			break
		}
		if val, _ := strconv.Atoi(inputLine); val >= 0 {
			sum += val
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
