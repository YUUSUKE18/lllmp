package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var count int64
	sum := int64(0)
	lineNum := 0

	for sc.Scan() {
		lineNum++
		if lineNum == 1 {
			n, err := strconv.ParseInt(sc.Text(), 10, 64)
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
			count++
			sum += v
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
