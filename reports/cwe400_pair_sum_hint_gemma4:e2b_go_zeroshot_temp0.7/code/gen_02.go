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
		return // 入力が空の場合
	}
	targetStr := strings.TrimSpace(scanner.Text())
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		return // 目標値の解析エラー
	}

	// 2行目以降: 数値の読み込みと処理
	var numbers []int64
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}
		numbers = append(numbers, num)
	}

	// 2個の組の個数を計算
	count := 0
	n := len(numbers)

	// 2つの値 a と b について、a + b = target となるペア (a, b) を数える。
	// 実際には、与えられたリストの異なる2つの要素 a_i と a_j (i != j) の和が target になるペアの数を数える。
	// ここでは、リスト内の要素を順番に見ていき、すでに登場した要素との組み合わせを数える。

	// 各要素 i に対して、target - numbers[i] と等しい値がリスト内に存在するかを調べる。
	// 順序が異なる2個の組を数えるため、i < j のペアのみを数えるように考える。

	// Hash set (map) を使用して、出現した値を記録する。
	// 後の要素とのペアを数えるために、リスト全体を走査する。
	// 2つの異なるインデックス i と j (i != j) について numbers[i] + numbers[j] = target となるペアを数える。
	// 効率的な方法として、各要素を処理する際に、それまでに現れた要素とのペアを数える。

	// 集合 (Set) を使用して、すでに現れた数値を記録する。
	// これは、リストのインデックスが異なる2つの要素を考慮する必要があるため、
	// 以下の方法が最もシンプルで正しい解釈（異なる位置の2つの個数）に合致する。

	// 1. すべてのペア (i, j) で i < j を満たすものを数える。
	// O(N^2) の計算量になるが、入力サイズが実用的であるという制約を考慮すると、
	// 敵対的に大きな入力に対しても実用的な時間とメモリで完了する必要があるため、
	// O(N log N) や O(N) の解法が望ましい。

	// O(N) または O(N log N) の解法:
	// 各要素 numbers[i] について、target - numbers[i] がリスト内に存在するかを調べる。
	// 2つの位置が異なることを保証するため、リストを走査しながらセットで管理する。

	// 集合を保持する
	seen := make(map[int64]bool)
	pairCount := 0

	for i := 0; i < n; i++ {
		numI := numbers[i]
		complement := target - numI

		// 補数がリスト内に既に存在するかチェックする (i番目の要素を除く)
		if seen[complement] {
			// complement が既に登場した要素であるため、(complement, numI) のペアが見つかった。
			// このアプローチでは、インデックスが異なることを保証するために、
			// 補数が i よりも前に現れたことを確認する必要がある。
			// 今回は、リスト内の値の出現回数ではなく、インデックスのペアを数えるため、
			// 集合を使って「どの値が過去に出現したか」を追跡する。
			pairCount++
		}
		// 現在の要素を seen に追加する
		seen[numI] = true
	}

	// 上記の O(N) アプローチは、リスト内の要素の出現回数が複数ある場合、
	// 実際には「位置が異なる2個の組」の数を正確に数えるためには複雑になる。
	// 問題文の意図を再解釈する:
	// 「2行目以降の整数のうち、足して目標値になる2個の組（位置が異なる2個）の個数」
	// これは、リスト内のインデックス i と j (i != j) について numbers[i] + numbers[j] = target となるペアの数を意味する。

	// 頻度マップ (Frequency Map) を使用する O(N) 解法を採用する。
	freq := make(map[int64]int)
	for _, num := range numbers {
		freq[num]++
	}

	finalCount := 0
	// すべてのユニークな値についてペアを数える
	for num1, count1 := range freq {
		num2 := target - num1

		if count2, found := freq[num2]; found {
			if num1 < num2 {
				// num1 と num2 が異なる場合、(num1, num2) のペアを数える。
				// 各ペアの組み合わせは count1 * count2 通り。
				finalCount += count1 * count2
			} else if num1 == num2 {
				// num1 + num1 = target の場合 (2 * num1 = target)
				// この場合、リスト内の異なる2つの位置の要素のペアを数える必要がある。
				// count1 個の要素から 2 つを選ぶ組み合わせは C(count1, 2) = count1 * (count1 - 1) / 2。
				if count1 >= 2 {
					finalCount += count1 * (count1 - 1) / 2
				}
			}
		}
	}

	// 最終結果の出力
	fmt.Printf("pairs=%d\n", finalCount)
}
