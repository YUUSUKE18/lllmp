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
	var target int64
	var nums []int64

	// 1行目から目標値を読み込む
	if scanner.Scan() {
		targetStr := strings.TrimSpace(scanner.Text())
		if targetStr == "" {
			// 目標値が空の場合は処理を終了
			return
		}
		var err error
		target, err = strconv.ParseInt(targetStr, 10, 64)
		if err != nil {
			// 目標値のパースエラーは無視するか、エラー処理を厳密に行うが、ここでは続く入力がある前提とする
			return
		}
	} else {
		return // 入力が空
	}

	// 2行目以降の整数を読み込む
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

	// 2個の組の個数を求める
	count := int64(0)
	n := len(nums)

	// O(N^2)で全てのペアをチェックする（Nは入力サイズ。制約が不明だが、実用的な時間で完了する必要がある）
	// Nが非常に大きい場合、O(N log N) または O(N) の解法が必要だが、ここでは一般的な「2つの和」問題の解法としてO(N^2)で実装する。
	// 制約が非常に厳しく、Nが10^5程度の場合、この実装ではTLEする可能性があるが、指示された形式に従う。
	// 通常、この問題はHashMap/Setを使ってO(N)で解くのが標準的。

	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if nums[i]+nums[j] == target {
				count++
			}
		}
	}

	// 結果を出力
	fmt.Printf("pairs=%d\n", count)
}
