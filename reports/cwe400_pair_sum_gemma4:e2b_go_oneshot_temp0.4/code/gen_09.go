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

	// 1行目: 目標値の読み込み
	if !scanner.Scan() {
		return
	}
	targetStr := scanner.Text()
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		return // 目標値の読み込みに失敗した場合は終了
	}

	count := 0
	nums := make([]int64, 0)

	// 2行目以降の読み込みと処理
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}
		nums = append(nums, num)
	}

	// 2個の組の数を求める
	n := len(nums)
	if n < 2 {
		fmt.Println("pairs=0")
		return
	}

	// 2つの要素 a と b について a + b = target となるペア (a != b) の数を数える
	// 2つの異なる位置の要素の組を数えるため、全てのペアをチェックする
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if nums[i]+nums[j] == target {
				count++
			}
		}
	}

	// 結果の出力
	fmt.Printf("pairs=%d\n", count)
}
