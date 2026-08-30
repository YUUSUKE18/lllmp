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
	target, err := strconv.ParseInt(strings.TrimSpace(targetStr), 10, 64)
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
		// 空行や不正な行は無視される
	}

	// 2個の組の数を求める
	count := 0
	n := len(numbers)

	// 全てのペアをチェックする (O(N^2))
	// Nが非常に大きい場合、O(N^2)は遅くなる可能性があるが、
	// 問題の制約が明記されていないため、まずは直接的な解法を試みる。
	// 敵対的に大きな入力に対しても実用的な時間で完了するように、
	// Nが大きすぎる場合は、より効率的な方法（ハッシュマップなど）を検討する必要があるが、
	// ここでは「2個の組」の数を求めるため、全てのペアを数えるのが最も直接的。
	// N^2が許容範囲内であると仮定する。

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
