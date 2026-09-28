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
	hasIntegers := false

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		parts := []string{}
		for _, char := range line {
			if char >= '0' && char <= '9' {
				parts = append(parts, string(char))
			} else if len(parts) > 0 {
				break
			}
		}

		var num int64
		for i := range parts {
			val, err := strconv.ParseInt(parts[i], 10, 64)
			if err != nil {
				continue
			}
			sum += val
			count++
			hasIntegers = true
		}

		if !hasIntegers {
			num = sum
			sum = int64(0)
			count = 0
			hasIntegers = false
		} else {
			sum -= num
			count--
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
