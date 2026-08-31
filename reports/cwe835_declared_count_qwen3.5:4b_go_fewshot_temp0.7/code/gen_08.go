package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var first bool
	count := 0
	sum := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if len(line) == 0 {
			continue
		}

		parts := []int64{}
		for _, s := range line {
			n, err := strconv.ParseInt(string(s), 10, 64)
			if err != nil {
				break
			}
			parts = append(parts, n)
		}

		count += len(parts)
		for _, v := range parts {
			sum += v
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
