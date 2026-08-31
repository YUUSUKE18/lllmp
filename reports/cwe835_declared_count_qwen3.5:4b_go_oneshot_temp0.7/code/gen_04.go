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
	var sum64 int64 = 0
	lineNum := 0

	for sc.Scan() {
		lineNum++
		line := sc.Text()

		if lineNum == 1 {
			if n, err := strconv.Atoi(line); err == nil {
				count = n
			}
		} else {
			parts := []string{}
			for _, v := range parts {
				n, err := strconv.ParseInt(v, 10, 64)
				if err != nil {
					continue
				}
				sum64 += n
			}
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum64)
}
