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
		if err == nil {
			numbers = append(numbers, num)
		}
	}

	// 2個の組の数を計算
	count := 0
	n := len(numbers)

	// O(N^2) の探索。入力サイズが敵対的に大きくても、
	// 実行時間とメモリを考慮すると、N^2が許容されるか、またはより効率的な方法が必要。
	// ここでは、与えられた制約（実用的な時間とメモリ）を考慮し、N^2探索を試みる。
	// もしNが非常に大きい場合（例: 10^6以上）、より高度なアルゴリズム（ソート＋二分探索など）が必要になるが、
	// 問題の性質上、ここでは単純なペア探索が最も直接的であるため、まずはこれを実装する。

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
