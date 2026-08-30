package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target, sum int64
	targetLine := false

	lineNum := 0
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		lineNum++
		if !targetLine {
			// 1 行目: 目標値を読み込む
			target, err := strconv.ParseInt(line, 10, 64)
			if err != nil {
				continue
			}
			targetLine = true
			continue
		}

		// 2 行目以降: 整数を読み込み、足し算を更新
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		sum += val
	}

	count := int64(0)
	for i := int64(0); i < sum; i++ {
		if i <= 0 || (sum - i) <= 0 {
			continue
		}
		// 条件: 2 個の組で合計が目標値になる
		if i == sum-i {
			count++
		} else if i < sum-i {
			count += 2
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
