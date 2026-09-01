package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target := 0
	lineNum := 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		if lineNum == 0 {
			var err error
			target, err = strconv.ParseInt(line, 10, 64)
			if err != nil {
				continue
			}
			lineNum++
			continue
		}

		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		nums := append([]int64(nil), nums...)
		nums = append(nums, val)

		count := 0
		for i := 0; i < len(nums); i++ {
			for j := i + 1; j < len(nums); j++ {
				if nums[i]+nums[j] == target {
					count++
				}
			}
		}

		fmt.Printf("pairs=%d\n", count)
		break
	}

	if sc.Err() != nil {
		os.Exit(1)
	}
}
