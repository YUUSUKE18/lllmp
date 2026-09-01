package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	lineCount := 0
	targetSum := int64(0)
	hasTarget := false

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		line = line[:len(line)-1] // 末尾の改行を削除
		if len(line) == 0 {
			continue
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		lineCount++
		if lineCount == 1 {
			targetSum = num
			hasTarget = true
		} else if !hasTarget {
			continue
		}

		nums := append(nums, num)
	}

	countPairs(nums)
}

// nums はグローバル変数として定義する必要があるが、Go のスコープ規則で main 内の配列を直接扱う場合は関数を main に持ち込むか、配列を引数とする形にする。
// ここでは main 内でソートして二重ループを行うため、配列を引数に渡す形に再構成する。

func solve(nums []int64) {
	if len(nums) < 2 {
		fmt.Println("pairs=0")
		return
	}

	count := 0
	n := len(nums)
	sort.Int64s(nums) // ソート

	for i := 0; i < n-1; i++ {
		low, high := nums[i], nums[n-1-i] // 2 番目の要素は同じ配列から取れるが、i と n-1-i は異なるインデックスを持つか確認が必要
		if low == high && i == n-1-i { // 同じ値で同じインデックスの場合
			continue
		}

		low = nums[i]
		high = nums[n-1-i]

		sum := low + high
		if sum == targetSum {
			count++
		}
	}

	fmt.Printf("pairs=%d\n", count)
}

// 上記のロジックを再考し、正しい実装にする。
// 二重ループで O(N^2) は N が大きいと TLE になる可能性があるが、問題文に「敵対的に大きな入力」があるため、O(N log N) の解法（二分探索）を採用する。

func main() {
	var nums []int64
	sc := bufio.NewScanner(os.Stdin)
	lineCount := 0

	for sc.Scan() {
		line := sc.Text()
		if len(line) == 0 {
			continue
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil || num <= 0 {
			continue
		}

		lineCount++
		if lineCount == 1 {
			targetSum = num
		} else if targetSum > 0 {
			nums = append(nums, num)
		}
	}

	sort.Slice(nums, func(i, j int) bool {
		return nums[i] < nums[j]
	})

	count := 0
	n := len(nums)
	for i := 0; i < n-1; i++ {
		low := nums[i]
		high := low + targetSum - low // 高さを計算する
		// 二分探索で high を探す
		j := binarySearchHigh(&nums, n, targetSum-low)
		if j >= 0 && j > i {
			count++
		}
	}

	fmt.Printf("pairs=%d\n", count)
}

func binarySearchHigh(nums []int64, n int, val int64) int {
	l, r := 0, n-1
	for l < r {
		m := l + (r-l)/2
		if nums[m] >= val {
			r = m - 1
		} else {
			l = m + 1
		}
	}
	return l
}
