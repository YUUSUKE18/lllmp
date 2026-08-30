package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func collatzStep(n int64) int64 {
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		return collatzStep(n/2) + 1
	}
	return collatzStep(3*n+1) + 1
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	mem := make(map[int64]int64)
	total := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		parts := []int64{}
		for _, s := range stringToNumbers(line) {
			parts = append(parts, s)
		}
		if len(parts) == 0 {
			continue
		}

		n := parts[0]
		steps := getSteps(n, mem)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}

func stringToNumbers(s string) []int64 {
	var nums []int64
	for _, c := range s {
		if c >= '0' && c <= '9' {
			nums = append(nums, int64(c-'0'))
		} else if c == ' ' || c == '\t' || c == '\n' {
			continue
		} else {
			break
		}
	}

	if len(nums) == 0 {
		return nil
	}

	result := []int64{}
	carry := nums[0]
	for i, n := range nums {
		if i > 0 {
			carry = carry * 10 + int64(n)
		}
		result = append(result, carry)
	}

	return result
}

func getSteps(n int64, mem map[int64]int64) int64 {
	if v, ok := mem[n]; ok {
		return v
	}
	var steps int64
	switch n % 2 {
	case 0:
		steps = getSteps(n/2, mem) + 1
	default:
		steps = getSteps(3*n+1, mem) + 1
	}
	mem[n] = steps
	return steps
}
