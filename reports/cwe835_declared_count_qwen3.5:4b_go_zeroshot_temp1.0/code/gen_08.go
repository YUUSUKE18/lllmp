package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var count int
	sum := int64(0)

	if !scanner.Scan() {
		return
	}
	lineCount, err := strconv.Atoi(scanner.Text())
	if err != nil {
		return
	}
	count = lineCount

	for scanner.Scan() {
		text := scanner.Text()
		if len(text) == 0 {
			continue
		}
		val, err := strconv.ParseInt(text, 10, 64)
		if err != nil {
			continue
		}
		sum += val
		count++
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
