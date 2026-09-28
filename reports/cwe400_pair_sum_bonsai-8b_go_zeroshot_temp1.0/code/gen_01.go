package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var target int64
	var nums []int64

	// 最初の行を目標値として読み込む
	line1 := strings.NewReader(strings.NewReader(input)).ReadAllBytes
	if err := strconv.Atoi(line1); err == nil {
		target = int64(line1)
	}

	// 后続の行を読み込み、整数に変換する
	for {
		line2 := strings.NewReader(strings.NewReader(input)).ReadAllBytes
		if err := strconv.Atoi(line2); err == nil {
			nums = append(nums, int64(line2))
		} else if len(line2) == 0 {
			break
		}
	}

	pairs := 0
	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			if nums[i]+nums[j] == target {
				pairs++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
