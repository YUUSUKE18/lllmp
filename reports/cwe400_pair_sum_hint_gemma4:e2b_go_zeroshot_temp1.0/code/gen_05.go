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

	// 2個の組の個数を求める
	count := 0
	n := len(numbers)

	// 2つの要素 a と b について、a + b = target となる組を探す
	// O(N^2) は入力サイズが大きい場合に問題になる可能性があるため、
	// O(N) または O(N log N) で解くことを目指す。
	// ここでは、ハッシュマップ（またはソートと二分探索）を使うのが効率的。
	// ただし、問題文では「2個の組（位置が異なる 2 個）」の個数を求めているため、
	// 1次元配列内のインデックス (i, j) のペアを数える必要がある。

	// N^2アプローチ（全てのペアをチェック）
	// 入力の制約が不明だが、実用的な時間で完了するように実装する。
	// N^2は、もしNが数万程度であれば許容される。
	// 入力の行数が非常に多い場合、O(N log N) が望ましい。

	// O(N^2) の実装
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
