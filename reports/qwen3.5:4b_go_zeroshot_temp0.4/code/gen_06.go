package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	var nums []int64

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		parts := splitIntegers(line)

		for _, s := range parts {
			val, err := strconv.ParseInt(s, 10, 64)
			if err == nil {
				nums = append(nums, val)
			}
		}
	}

	count := make(map[int64]int)
	sum := int64(0)

	for _, n := range nums {
		count[n]++
		sum += n
	}

	fmt.Printf("count=%d sum=%d\n", len(count), sum)
}

func splitIntegers(line string) []string {
	var result []string
	start := 0
	inNumber := false

	for i, r := range line {
		if r == ',' || (r == ' ' && start < i) || (!inNumber && !isDigit(r)) {
			if inNumber {
				result = append(result, line[start:i])
				inNumber = false
				start = i + 1
			}
		} else if isDigit(r) {
			inNumber = true
		}
	}

	if inNumber {
		result = append(result, line[start:])
	}

	return result
}

func isDigit(b byte) bool {
	return b >= '0' && b <= '9'
}
