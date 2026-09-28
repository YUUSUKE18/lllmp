package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	lineCount, err := strconv.Atoi(sc.Scan())
	if err != nil {
		fmt.Println("count=0 sum=0")
		return
	}

	var actualCount int
	sum := int64(0)

	for sc.Scan() {
		text := sc.Text()
		if text == "" {
			continue
		}

		val, err := strconv.ParseInt(text, 10, 64)
		if err != nil {
			continue
		}

		actualCount++
		sum += val
	}

	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
