package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	countLine, err := sc.Scan()
	if err != nil {
		return
	}

	countStr := sc.Text()
	expectedCount, err := strconv.Atoi(countStr)
	if err != nil || countStr == "" {
		fmt.Printf("count=0 sum=0\n")
		return
	}

	var actualCount int
	var total int64 = 0
	sc.Scan() // skip empty line or read next line as number of integers
	for i := 0; i < expectedCount; i++ {
		line, err := sc.Scan()
		if err != nil {
			break
		}
		text := sc.Text()
		if text == "" || (text[0] == '\n' && len(text) > 0) {
			continue
		}
		val, parseErr := strconv.ParseInt(text, 10, 64)
		if parseErr != nil {
			continue
		}
		actualCount++
		total += val
	}

	fmt.Printf("count=%d sum=%d\n", actualCount, total)
}
