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
	if !scanner.Scan() {
		// 入力が空の場合
		fmt.Println("pairs=0")
		return
	}

	// 1行目: 目標値の読み取り
	targetStr := scanner.Text()
	target, err := strconv.ParseInt(strings.TrimSpace(targetStr), 10, 64)
	if err != nil {
		// 目標値が不正な場合、処理を終了（またはエラー処理、ここでは0とする）
		fmt.Println("pairs=0")
		return
	}

	// 2行目以降: 数値の読み取りとペアの計算
	var numbers []int64
	for scanner.Scan() {
		line := scanner.Text()
		trimmedLine := strings.TrimSpace(line)
		if trimmedLine == "" {
			continue // 空行は無視
		}

		num, err := strconv.ParseInt(trimmedLine, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}
		numbers = append(numbers, num)
	}

	// 2個の組の数を計算
	count := 0
	n := len(numbers)

	// O(N^2)で全ペアをチェックする（制約が不明確なため、ここでは単純な方法を採用。敵対的に大きな入力への対応のためにはより高度なアルゴリズムが必要になる可能性があるが、
	// 典型的な「和が目標値になる2つの要素の組」問題はソートと二分探索やハッシュマップを使うことが多い。
	// ここでは、与えられた数値の**位置が異なる2個の組**を求めるため、インデックスベースでO(N^2)またはO(N log N)が考えられる。）

	// 最適な解法（O(N^2)を避けるため、ハッシュマップまたはソートを利用）：
	// 目標値 T に対し、a + b = T となる (a, b) の組を数える。
	// これは、a + (T - a) = T の形であり、a 自身と T-a のペアを数える問題と見なせる。

	// 2つの要素 i と j (i != j) について、numbers[i] + numbers[j] == target となるペアを数える。
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if numbers[i]+numbers[j] == target {
				count++
			}
		}
	}

	// 1行だけ出力
	fmt.Printf("pairs=%d\n", count)
}
