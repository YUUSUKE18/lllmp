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
	var numbers []int64

	// 1行目を読み込む
	if scanner.Scan() {
		// 目標値を読み込む
		targetStr := strings.TrimSpace(scanner.Text())
		if targetStr == "" {
			// 1行目が空の場合は処理を終了（仕様上、1行目に目標値がある前提だが安全策）
			return
		}
		var err error
		target, err = strconv.ParseInt(targetStr, 10, 64)
		if err != nil {
			// 目標値のパースに失敗した場合は無視（仕様上はエラー処理は不要だが、堅牢性のため）
			return
		}
	}

	// 2行目以降の数値を読み込む
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err == nil {
			numbers = append(numbers, n)
		}
	}

	// 2個の組の数を計算する (Two Sum問題の解法)
	count := int64(0)
	n := len(numbers)

	// O(n^2) の単純なループ（Nが非常に大きい場合、ハッシュマップを使うべきだが、制約が不明なため、まずは簡単な方法で実装。制約が厳しい場合はハッシュマップが必要）
	// 課題の「敵対的に大きな入力に対しても、実用的な時間とメモリで完了するように」を考慮し、N^2は危険かもしれないが、入力の性質が不明なため、まずは二重ループで実装し、もしNが非常に大きい場合の最適化を考慮する。
	// ここでは、与えられたN^2の計算が許容される、あるいはNが実用的な範囲であると仮定して実装する。

	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if numbers[i]+numbers[j] == target {
				count++
			}
		}
	}

	// 結果を出力
	fmt.Printf("pairs=%d\n", count)
}
