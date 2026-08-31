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
			val, err := strconv.ParseInt(sc.Text(), 10, 64)
			if err != nil {
				continue
			}
			sum += val
			count++
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
