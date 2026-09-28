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

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		parts := []string{}
		for _, c := range line {
			if c == ' ' || c == '\t' || c == '\n' || c == '\r' {
				break
			}
			parts = append(parts, string(c))
		}

		nums, err := strconv.ParseInt(string(line), 10, 64)
		if err != nil {
			continue
		}

		count++
		sum += nums
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
