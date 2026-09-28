package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var count int
	var sum int64
	lineNum := 0

	for sc.Scan() {
		lineNum++
		if lineNum == 1 {
			countStr := sc.Text()
			n, err := strconv.Atoi(countStr)
			if err != nil {
				continue
			}
			count = n
		} else {
			valStr := sc.Text()
			if valStr == "" {
				continue
			}
			v, err := strconv.ParseInt(valStr, 10, 64)
			if err != nil {
				continue
			}
			sum += v
			count++
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
