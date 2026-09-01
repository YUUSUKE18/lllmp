package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	if !sc.Scan() {
		fmt.Println("pairs=0")
		return
	}
	target, err := strconv.ParseInt(sc.Text(), 10, 64)
	if err != nil || target == 0 {
		fmt.Println("pairs=0")
		return
	}

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

	count := int64(0)
	n := len(nums)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if nums[i]+nums[j] == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
