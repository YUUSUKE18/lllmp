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
			n, err := strconv.Atoi(sc.Text())
			if err != nil {
				continue
			}
			count = n
		} else {
			text := sc.Text()
			parts := []string{text} // 1 つの文字列で処理

			for _, part := range parts {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue
				}
				count++
				sum += val
			}
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
