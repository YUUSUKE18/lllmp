package main

import (
	"bufio"
	"fmt"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	if sc.Scan() {
		line, _ := sc.Text()
		for _, char := range line {
			if char >= '0' && char <= '9' {
				target = target*10 + int64(char-'0')
			}
		}
	}

	var count int64
	nums := make([]int64, 0)

	for sc.Scan() {
		line, _ := sc.Text()
		if len(line) == 0 || line[0] != '-' && (line[0] < '0' || line[0] > '9') {
			continue
		}
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		nums = append(nums, val)
	}

	for i := range nums {
		for j := i + 1; j < len(nums); j++ {
			if nums[i]+nums[j] == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
