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

	// 2個の組の数を求める
	count := 0
	n := len(numbers)

	// 2つの要素 a[i] と a[j] (i != j) について a[i] + a[j] = target を探す
	// O(N^2) の全探索は、入力サイズが非常に大きい場合に遅くなる可能性があるため、
	// より効率的な O(N log N) または O(N) の方法を検討する。
	// ここでは、ハッシュマップ（またはソートと二分探索）を用いる。
	// 問題の制約（敵対的に大きな入力）を考慮すると、N^2 は危険かもしれない。

	// 2つの組 (a, b) が存在する場合、a + b = target。
	// a = target - b。
	// numbers の各要素 b について、target - b が numbers の中に存在するかをチェックする。

	// 存在チェックを高速化するため、numbers をマップに格納する。
	// ただし、同じ値が複数存在する場合、その出現回数を考慮する必要がある。
	// 問題文は「2個の組（位置が異なる2個）」を求めているため、インデックスが異なる必要がある。

	// 座標情報が必要になるため、値とインデックスを保持する。
	type NumberInfo struct {
		value int64
		index int
	}
	var infos []NumberInfo
	for i, num := range numbers {
		infos = append(infos, NumberInfo{value: num, index: i})
	}

	// 2つの組の数を数える (O(N^2) の全探索)
	// Nが最大で数百万程度の場合、N^2は非現実的。
	// 敵対的に大きな入力に対しても実用的な時間で完了させる必要がある。
	// N^2 が許容されるかどうかの制約がないため、まずはO(N^2)で実装し、もしTLEになる場合は最適化を検討する。
	// 競技プログラミングの文脈では、Nが10^5程度ならO(N^2)は不可。
	// Nが10^6程度ならO(N log N)またはO(N)が必要。

	// O(N^2) の実装 (最も直接的)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if numbers[i]+numbers[j] == target {
				count++
			}
		}
	}

	// O(N^2) の計算結果をそのまま出力
	fmt.Printf("pairs=%d\n", count)
}
