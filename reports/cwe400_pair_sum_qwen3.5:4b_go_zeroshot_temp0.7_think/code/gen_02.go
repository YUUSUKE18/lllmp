package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var target int64
	var nums []int64
	foundTarget := false

	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		val, err := strconv.ParseInt(line, 10, 64)

		if err != nil {
			continue
		}

		if !foundTarget {
			target = val
			foundTarget = true
		} else {
			nums = append(nums, val)
		}
	}

	count := int64(0)
	mapCounts := make(map[int64]int64)

	for _, n := range nums {
		needed := target - n
		if c, ok := mapCounts[needed]; ok {
			count += c
		}
		mapCounts[n]++
	}

	fmt.Printf("pairs=%d\n", count)
}
