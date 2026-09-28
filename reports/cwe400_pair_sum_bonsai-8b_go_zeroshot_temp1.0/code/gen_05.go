package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var targetStr string
	var nums []int

	// 第1行を目標値として読み込む
	lines := strings.Split(os.Getenv("input"), "\n")
	if len(lines) > 0 {
		targetStr = lines[0]
	}

	// 第2行以降を処理する
	for i := 1; i < len(lines); i++ {
		if len(lines[i]) == 0 {
			continue
		}
		s := strings.TrimSpace(lines[i])
		if s == "" {
			continue
		}
		if idx, err := strconv.Atoi(s); err != nil {
			continue
		}
		nums = append(nums, idx)
	}

	// パイアス（2つの値の合計がtarget）を取得
	pairs := 0
	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			if nums[i]+nums[j] == targetStr {
				pairs++
			}
		}
	}

	fmt.Println("pairs=" + strconv.Itoa(pairs))
}
