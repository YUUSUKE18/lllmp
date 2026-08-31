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
	n, err := strconv.Atoi(countLine)
	if err != nil {
		return
	}

	var sum int64 = 0
	actualCount := 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		sum += val
		actualCount++
	}

	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
