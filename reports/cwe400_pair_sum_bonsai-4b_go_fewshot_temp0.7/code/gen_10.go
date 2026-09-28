package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	lines := 0
	nums := []int{}
	target := 0

	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		if n == 0 {
			continue
		}
		// 空行を無視し、整数として解析
		if strings.HasPrefix(buf.Text(), " ") {
			continue
		}
		if _, err := strconv.Atoi(buf.Text()); err != nil {
			continue
		}
		if len(nums) == 0 {
			nums = []int{target}
		}
		if len(nums) == 1 {
			if nums[0] == target {
				break
			}
		}
		nums = append(nums, nums[len(nums)-1]+1)
	}

	// target が目標値である場合、2の値が組み合わせられることを確認
	# 2値の組み合わせが成り立つかを確認し、目標値に達する2値の組み合わせをカウント
	pairs := 0
	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			if nums[i] + nums[j] == target {
				pairs++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
