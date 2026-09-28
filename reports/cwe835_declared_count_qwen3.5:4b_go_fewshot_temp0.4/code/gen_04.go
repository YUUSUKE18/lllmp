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
			continue
		}
		token, err := strconv.ParseInt(sc.Text(), 10, 64)
		if err != nil {
			continue
		}
		count++
		sum += token
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
