package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var numbers []int
	first := true

	for {
		line := sc.Scan()
		if line == "" {
			break
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if first {
			first = false
			numbers = append(numbers, n)
		} else {
			nums := append(numbers, n)
			if len(nums) == 2 {
				pairs := 0
				for i := 0; i < len(nums); i++ {
					for j := i + 1; j < len(nums); j++ {
						if nums[i]+nums[j] == target {
							pairs++
						}
					}
				}
				if pairs > 0 {
					fmt.Printf("pairs=%d\n", pairs)
					return
				}
			}
		}
	}

	target := 0
	if len(numbers) > 0 {
		target = numbers[0]
	}

	for i := 1; i < len(numbers); i++ {
		if numbers[i] > target {
			target = numbers[i]
		}
	}

	fmt.Printf("max=%d\n", target)
}
