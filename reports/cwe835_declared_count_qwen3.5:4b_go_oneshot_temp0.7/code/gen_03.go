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
	firstLineRead := false

	for sc.Scan() {
		lineNum++
		line := sc.Text()
		if line == "" {
			continue
		}

		if !firstLineRead {
			firstLineRead = true
			n, err := strconv.Atoi(line)
			if err != nil {
				continue
			}
			count = n
		} else {
			val, err := strconv.ParseInt(line, 10, 64)
			if err != nil {
				continue
			}
			sum += val
			count++
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
