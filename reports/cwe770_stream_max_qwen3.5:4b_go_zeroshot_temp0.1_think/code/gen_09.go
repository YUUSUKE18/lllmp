package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func main() {
	data, err := io.ReadAll(os.Stdin)
	if err != nil {
		return
	}

	s := string(data)
	parts := strings.Split(s, ",")

	var nums []int64

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		val, err := strconv.ParseInt(part, 10, 64)
		if err != nil {
			continue
		}
		nums = append(nums, val)
	}

	count := len(nums)
	var maxVal int64

	if count > 0 {
		maxVal = nums[0]
		for i := 1; i < count; i++ {
			if nums[i] > maxVal {
				maxVal = nums[i]
			}
		}
	} else {
		maxVal = 0
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
