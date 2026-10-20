package main

import (
	"fmt"
	"strconv"
	"strings"
	"unicode"
)

func main() {
	var numbers []string
	input := fmt.ScanIn()

	for {
		if !input.ScanIn() {
			break
		}
		inputStr := strings.TrimSpace(input.Text)
		if len(inputStr) == 0 {
			continue
		}
		if unicode.IsDigit(rune(inputStr[0])) {
			var num int64
			if err := strconv.ParseInt(inputStr, 64, 64); err == nil {
				num = num64
				nums = append(nums, num)
			}
		}
	}

	unique := make(map[int64]bool)
	count := 0
	sum := 0

	for _, num := range nums {
		if !unique[num] {
			unique[num] = true
			count++
			sum += num
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
