package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	lineNum := 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		if lineNum == 0 {
			target = val
		} else {
			countPairs(val, target)
			lineNum++
		}
	}
	fmt.Printf("pairs=%d\n", countPairs(0, target))
}

func countPairs(current int64, target int64) int64 {
	if current == 0 {
		return 0
	}
	count := int64(0)
	for i := int64(1); i < len(current); i++ {
		j := i - 1
		sum := current[i] + current[j]
		if sum == target {
			count++
		}
	}
	return count
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	nums := make([]int64, 0)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		nums = append(nums, val)
	}

	if len(nums) < 2 {
		fmt.Printf("pairs=0\n")
		return
	}

	var count int64
	m := make(map[int64]int)
	for _, v := range nums {
		d := target - v
		if c, ok := m[d]; ok {
			count += c
		}
		m[v]++
	}

	fmt.Printf("pairs=%d\n", count)
}
