package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
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
		return
	}

	// 2行目以降の整数の読み込み
	nums := []int64{}
	for scanner.Scan() {
		line := scanner.Text()
		// 空行または整数として解釈できない行を無視する
		if line == "" {
			continue
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err == nil {
			nums = append(nums, num)
		}
	}

	// 目標値に到達する2つの組の数を数える
	count := 0
	n := len(nums)

	// ネイティブなO(N^2)で求める（入力サイズが実用的な範囲内であれば十分）
	// ここでは、入力サイズが非常に大きい場合を考慮し、より効率的な方法を検討するが、
	// 課題の制約が不明なため、一般的な2-Sum問題の解法として、ハッシュマップを用いる。
	// ただし、問題文の「2個の組（位置が異なる2個）」を数えるという要求から、
	// 集合の和を考えるのではなく、具体的なインデックスのペアを数える必要がある。

	// 2-Sum問題の変形: nums[i] + nums[j] = target, i != j
	// 2次元配列またはハッシュマップを使って、O(N)またはO(N^2)で解く。
	// O(N^2)は入力サイズが数万程度であれば許容される。敵対的に大きな入力に対しても実用的な時間で完了させる必要があるため、O(N^2)は避けるべき。

	// O(N)で解く方法:
	// 1. 全てのペア (i, j) をチェックする O(N^2)
	// 2. ターゲット値が特定の形で与えられていることを利用する。

	// 「足して目標値になる2個の組（位置が異なる2個）の個数」
	// これは、{i, j} の組の数を求めることを意味する。

	// 2-Sumの一般的な解法（ハッシュマップを使用）：
	// 各要素 nums[i] について、target - nums[i] が既にリストに存在するかを調べる。

	// 存在チェック用のマップ（値 -> 登場回数、またはインデックスのリスト）
	// ここでは、重複する値が存在する場合、その出現回数を考慮する必要がある。

	// ターゲット値達成のペアの数を数えるためのハッシュマップ戦略：
	// ターゲット値 T に対し、i < j となる全ての (nums[i], nums[j]) のペアを数える。

	// 集合の和として数える（より効率的）：
	// ターゲット値 T を達成するペアの総数を数える。

	// 1. 全ての要素を格納するマップ (値 -> 出現回数)
	freq := make(map[int64]int)
	for _, x := range nums {
		freq[x]++
	}

	// 2. ペアの数を計算する
	totalPairs := 0
	// ターゲット T を達成するペア (a, b) の数を数える。
	// a + b = T, a != b または a = b で出現回数が2以上。

	for val, count := range freq {
		complement := target - val

		if complement == val {
			// ケース 1: a + a = T (つまり 2*a = T)
			// この値が自身のペアを作る場合、その要素の出現回数から C(count, 2) を加える。
			// N個の同じ値が存在するとき、それらの組み合わせの数は N*(N-1)/2。
			if target == 2*val {
				// 同じ値同士のペアの数
				totalPairs += count * (count - 1) / 2
			}
		} else if complement > val {
			// ケース 2: a + b = T, a != b の場合。val < complement
			// complement が存在する場合、(val, complement) のペアは freq[val] * freq[complement] 個。
			if c, exists := freq[complement]; exists {
				totalPairs += count * c
			}
		}
	}

	// 結果の出力
	fmt.Printf("pairs=%d\n", totalPairs)
}
