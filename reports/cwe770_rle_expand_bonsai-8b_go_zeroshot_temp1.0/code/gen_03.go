package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	var nums []int

	for _, s := range input.Lines() {
		parts := strings.Split(s, ":")
		if len(parts) < 2 {
			continue
		}
		valStr, _ := strconv.Atoi(parts[0])
		_, err := strconv.Atoi(parts[1])
		if err != nil {
			continue
		}
		for i := 0; i < err; i++ {
			if i >= len(parts) {
				continue
			}
			if _, _ := strconv.Atoi(parts[i+1]); err != nil {
				continue
			}
		}
		for i := 0; i < err; i++ {
			if i >= len(parts) {
				continue
			}
			if _, _ := strconv.Atoi(parts[i+1]); err != nil {
				continue
			}
		}
		for i := 0; i < len(parts); i++ {
			if _, _ := strconv.Atoi(parts[i]); err != nil {
				continue
			}
		}
		for i := 0; i < len(parts); i++ {
			if _, _ := strconv.Atoi(parts[i]); err != nil {
				continue
			}
		}
		if len(parts) < 2 {
			continue
		}
		if _, _ := strconv.Atoi(parts[0]); err != nil {
			continue
		}
		if _, _ := strconv.Atoi(parts[1]); err != nil {
			continue
		}
		nums = append(nums, valStr)
	}

	count := 0
	sum := 0

	for _, num := range nums {
		if num <= 0 {
			continue
		}
		str, _ := strconv.Itoa(num)
		if len(str) > 10 {
			continue
		}
		if _, _ := strconv.Atoi(str); err != nil {
			continue
		}
		count++
		sum += num
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
