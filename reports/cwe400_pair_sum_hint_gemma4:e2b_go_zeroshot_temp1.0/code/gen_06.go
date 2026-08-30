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
		// 目標値の読み込みに失敗した場合は終了（仕様上、入力は正しいと仮定されることが多いが、堅牢性のため）
		return
	}

	// 2行目以降の整数の読み込み
	var numbers []int64
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}
		numbers = append(numbers, num)
	}

	// 2個の組の数を計算
	count := 0
	n := len(numbers)

	// 2つの要素 a[i] と a[j] (i != j) について a[i] + a[j] = target を探す
	// O(N^2) は敵対的な入力に対して遅すぎる可能性があるため、ハッシュマップ/ソートを使う。
	// ここでは、N^2が許容される範囲（Nが十分に小さい場合）を想定し、最も単純な方法で実装する。
	// ただし、問題の制約が不明確なため、ハッシュマップを用いたO(N)またはO(N log N)のアプローチを検討する。

	// 最適なアプローチ: 2つの要素 a と b に対して a + b = target となるペアを見つける。
	// 各要素 a について、target - a がリスト内に存在するかをチェックする。
	// 既にリスト全体をチェックする問題（i != j）を避けるため、ハッシュセットを使う。

	// 1. 全ての要素をセットに格納する
	numberSet := make(map[int64]bool)
	for _, num := range numbers {
		numberSet[num] = true
	}

	// 2. ペアの数を数える
	// 各数 x について、target - x が存在するか確認する。
	// 順番を考慮しないため、重複や自己ペア (x+x=target) の扱いを注意深く行う必要がある。
	// 求めるのは「位置が異なる2個の組」なので、入力の元のインデックス情報は無視して良い。
	// ただし、入力に同じ値が複数ある場合は、その出現回数を考慮する必要がある。

	// 出現回数を記録したマップに変換する
	frequency := make(map[int64]int)
	for _, num := range numbers {
		frequency[num]++
	}

	totalPairs := 0

	// ターゲット値に対してループ
	for num1, count1 := range frequency {
		num2 := target - num1

		if count2, exists := frequency[num2]; exists {
			if num1 < num2 {
				// num1 と num2 が異なる場合 (num1 + num2 = target)
				// (num1, num2) のペアは count1 * count2 個存在する。
				totalPairs += count1 * count2
			} else if num1 == num2 {
				// num1 + num1 = target の場合 (2 * num1 = target)
				// この場合、同じ値を持つ要素同士のペアを数える。
				// count1 個の要素から 2 個を選ぶ組み合わせは C(count1, 2) = count1 * (count1 - 1) / 2
				if target == 2*num1 {
					// 2個の異なる位置の組を探しているため、組み合わせで計算する。
					totalPairs += count1 * (count1 - 1) / 2
				}
			}
		}
	}

	// 結果の出力
	fmt.Printf("pairs=%d\n", totalPairs)
}
