package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var target int64
	lineNum := 0

	for scanner.Scan() {
		lineNum++
		text := scanner.Text()

		if lineNum == 1 {
			// 1 行目を目標値として読み込む
			fmt.Sscanf(text, "%d", &target)
			continue
		}

		// 空行や整数でない行は無視する
		if text == "" {
			continue
		}

		val := int64(0)
		fmt.Sscanf(text, "%d", &val)
		if val < 0 {
			continue
		}
	}

	if scanner.Err() != nil {
		os.Exit(1)
	}

	count := int64(0)
	sums := make([]int64, 0) // スムーズな累積和を使用する場合は必要だが、ここでは単純に配列を使う
	nums := make([]int64, 0) // 入力の整数を保持

	for scanner.Scan() {
		text := scanner.Text()
		if text == "" {
			continue
		}
		var val int64
		fmt.Sscanf(text, "%d", &val)
		if val < 0 {
			continue
		}
		nums = append(nums, val)
	}

	if len(nums) < 2 {
		fmt.Printf("pairs=%d\n", count)
		return
	}

	// 3 つの配列：値、累積和、出現回数
	values := make([]int64, len(nums))
	cumSum := make([]int64, len(nums))
	counts := make(map[int64]int64)

	for i := range nums {
		values[i] = nums[i]
		if i == 0 {
			cumSum[i] = values[i]
		} else {
			cumSum[i] = cumSum[i-1] + values[i]
		}
		counts[nums[i]]++
	}

	pairs := int64(0)

	for i := range values {
		for j := i + 1; j < len(values); j++ {
			if i == j {
				continue
			}
			valI := values[i]
			valJ := values[j]
			sumI := cumSum[i]
			sumJ := cumSum[j]

			pairSum := sumI + sumJ // 2 つの値の和は目標値になるか？
			if pairSum == target {
				pairs++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
