package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	targetSum, err := strconv.Atoi(sc.Scan())
	if err != nil || targetSum == 0 {
		fmt.Printf("pairs=0\n")
		return
	}

	var count int
	var nums []int64

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

	for i := range nums {
		for j := i + 1; j < len(nums); j++ {
			sum := nums[i] + nums[j]
			if sum == int64(targetSum) {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
