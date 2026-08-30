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
	if sc.Scan() {
		s, _ := strconv.ParseInt(sc.Text(), 10, 64)
		target = s
	} else if err := sc.Err(); err != nil {
		fmt.Printf("pairs=0\n")
		return
	}

	var nums []int64
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		for _, s := range strings.Fields(line) {
			n, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue
			}
			nums = append(nums, n)
		}
	}

	count := 0
	for i := range nums {
		for j := i + 1; j < len(nums); j++ {
			if nums[i]+nums[j] == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
