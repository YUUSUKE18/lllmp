package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	target := scanner.Scan()
	if err := strconv.Atoi(target); err != nil {
		fmt.Println("0")
		return
	}

	var nums []int
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		if err := strconv.Atoi(line); err != nil {
			continue
		}
		nums = append(nums, line)
	}

	pairs := 0
	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			if i, j := strconv.Atoi(nums[i]), i, j := strconv.Atoi(nums[j]); i + j == target {
				pairs++
			}
		}
	}

	fmt.Println("pairs=", pairs)
}
