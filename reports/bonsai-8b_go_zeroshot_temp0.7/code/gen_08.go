package main

import (
	"fmt"
	"strconv"
	"strings"
	"sort"
)

func main() {
	input := strings.NewReader("Enter integers separated by commas: ")
	var nums []int

	for _, s := range input.Text() {
		s = strings.TrimSpace(s)
		if s == "" {
			continue
		}
		if idx, err := strconv.Atoi(s); err == nil {
			nums = append(nums, idx)
		}
	}

	unique := make(map[int]bool)
	for _, num := range nums {
		unique[num] = true
	}

	count := len(unique)
	sum := 0
	for _, num := range unique {
		sum += num
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
