package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)

	// Read target value from first line
	if !scanner.Scan() {
		return
	}
	target, err := strconv.ParseInt(scanner.Text(), 10, 64)
	if err != nil {
		return
	}

	var nums []int64
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
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
	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			if nums[i] + nums[j] == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
