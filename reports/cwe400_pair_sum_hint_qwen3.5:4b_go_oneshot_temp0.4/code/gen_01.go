package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target := 0
	var found bool
	lineNum := 1

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		if lineNum == 1 {
			n, err := strconv.ParseInt(line, 10, 64)
			if err != nil {
				continue
			}
			target = n
			found = true
		} else if found {
			val, err := strconv.ParseInt(line, 10, 64)
			if err != nil {
				continue
			}
			if val > target {
				break
			}

			count := 0
			for i := 0; i < len(nums); i++ {
				if nums[i] == val {
					continue
				}
				sum := nums[i] + val
				if sum == target {
					count++
				}
			}

			fmt.Printf("pairs=%d\n", count)
			return
		}

		lineNum++
		nums = append(nums, val)
	}

	if !found {
		fmt.Println("pairs=0")
		return
	}

	count := 0
	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			if nums[i]+nums[j] == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
