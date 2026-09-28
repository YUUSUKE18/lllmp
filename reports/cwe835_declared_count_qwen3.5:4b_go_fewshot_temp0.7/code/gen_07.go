package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	sum := int64(0)
	count := 0

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		parts := []string{}
		nums := []int64{}

		first := true
		for _, p := range parts {
			val, err := strconv.ParseInt(p, 10, 64)
			if err != nil {
				continue
			}
			if first || val > sum {
				sum = val
				first = false
			}
		}

		fmt.Printf("count=%d\n", count)
		fmt.Printf("sum=%d\n", sum)
		break
	}
}
