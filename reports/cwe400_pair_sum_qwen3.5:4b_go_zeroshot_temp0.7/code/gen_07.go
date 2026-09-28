package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	var target int64
	line, err := reader.ReadString('\n')
	if err != nil || line == "" {
		return
	}
	target, _ = strconv.ParseInt(line, 10, 64)

	numbers := []int64{}
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		if line == "" {
			continue
		}
		parts := []string{}
		for _, part := range line {
			if part >= '0' && part <= '9' || part == '-' {
				parts = append(parts, string(part))
			} else if len(parts) > 0 {
				var val int64
				sVal, err := strconv.ParseInt(string(parts[len(parts)-1]), 10, 64)
				if err != nil {
					continue
				}
				numbers = append(numbers, sVal)
			}
			if part == ' ' || part == '\t' {
				continue
			}
		}
	}

	count := int64(0)
	n := len(numbers)
	for i := 0; i < n-1; i++ {
		for j := i + 1; j < n; j++ {
			if numbers[i]+numbers[j] == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
