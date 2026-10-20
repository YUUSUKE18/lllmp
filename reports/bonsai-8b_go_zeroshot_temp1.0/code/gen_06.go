package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var nums []int
	input := strings.NewReader("Enter integers separated by commas: ")
	input.WriteString("\n")
	input.ReadAll()

	for _, s := range input.Lines() {
		s = strings.TrimSpace(s)
		if s == "" {
			continue
		}
		if num, err := strconv.Atoi(s); err == nil {
			nums = append(nums, num)
		}
	}

	count := 0
	sum := 0
	seen := make(map[int]bool)

	for _, num := range nums {
		if !seen[num] {
			seen[num] = true
			count++
			sum += num
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
