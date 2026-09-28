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

	parts := strings.Split(string(data), ",")
	var nums []int64

	for _, part := range parts {
		s := strings.TrimSpace(part)
		if s == "" {
			continue
		}
		val, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue
		}
		nums = append(nums, val)
	}

	count := len(nums)
	var maxVal int64 = 0
	if count > 0 {
		maxVal = nums[0]
		for i := 1; i < count; i++ {
			if nums[i] > maxVal {
				maxVal = nums[i]
			}
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
