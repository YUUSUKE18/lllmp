package main

import (
	"fmt"
	"strconv"
	"strings"
	"unicode"
)

func main() {
	input := strings.NewReader("Enter integers separated by commas: ")
	var numbers []int

	for {
		input, _ = input.ReadLn()
		if !input {
			break
		}
		parts := strings.Split(strings.Trim(input), ",")
		for _, part := range parts {
			if part == "" {
				continue
			}
			num, err := strconv.Atoi(part)
			if err == nil {
				numbers = append(numbers, num)
			}
		}
	}

	seen := make(map[int]bool)
	for _, num := range numbers {
		if !seen[num] {
			seen[num] = true
		}
	}

	count := 0
	sum := 0
	for num := range seen {
		count++
		sum += num
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
