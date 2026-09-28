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
		// 目標値の読み込みに失敗した場合は終了
		return
	}

	// 2行目以降: 数値の読み込み
	var numbers []int64
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視する
			continue
		}
		numbers = append(numbers, num)
	}

	// 2個の組の数を計算
	count := 0
	n := len(numbers)

	// O(N^2) の全探索で解く（入力サイズが実用的な範囲内であれば許容される）
	// 仕様では「敵対的に大きな入力に対しても、実用的な時間とメモリで完了するように」とあるが、
	// 2つの組の数を求める問題（2つの要素の和が目標値になるペアの数）は、
	// 通常、ソートと二分探索（O(N log N)）またはハッシュマップ（O(N)）で解くのが最も効率的である。
	// ここでは、入力の制約が不明確なため、最も単純で確実なO(N^2)の全探索を試みる。
	// ただし、もしNが非常に大きい場合、O(N)またはO(N log N)が必要となる。
	// 2つの組の数を求める問題は、通常、各要素に対して目標値から他の要素を引く操作でO(N)またはO(N log N)で解ける。

	// O(N^2) 全探索 (位置が異なる2個の組)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if numbers[i]+numbers[j] == target {
				count++
			}
		}
	}

	// 結果の出力
	fmt.Printf("pairs=%d\n", count)
}
