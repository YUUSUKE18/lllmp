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
	
	// 1行目を読み込み、目標値を設定
	if !scanner.Scan() {
		return
	}
	targetStr := scanner.Text()
	target, err := strconv.ParseInt(strings.TrimSpace(targetStr), 10, 64)
	if err != nil {
		return
	}

	count := 0
	nums := make([]int64, 0)

	// 2行目以降を読み込み
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		nums = append(nums, num)
	}

	// 2個の組の個数を求める (Two Sum problem)
	// 2個の組 (i, j) が i != j かつ nums[i] + nums[j] == target を満たすものの個数を数える。
	// 効率のため、ハッシュマップ（またはソートと二分探索）を使用する。
	// ここでは、効率と制約を考慮し、ハッシュマップを使用する。
	
	// ターゲット値に到達するペアの数を数えるために、出現回数を格納するマップを用意
	// ただし、問題文の「位置が異なる 2 個の組」を求めるため、元の配列のインデックスを考慮する必要がある。
	// 単純なTwo Sum問題（値のペア）であれば、出現回数を数えるだけで良いが、
	// ここでは入力された数列そのものからペアを数えるため、各要素の出現回数を管理する。

	// 効率的な方法として、ハッシュマップを使って、ターゲット値から必要な値を検索する。
	// 各要素の出現回数を記録する。
	freq := make(map[int64]int)
	for _, num := range nums {
		freq[num]++
	}

	totalPairs := 0

	// 各ユニークな値についてペアを数える
	for val, count := range freq {
		// val + other = target => other = target - val
		other := target - val

		if other == val {
			// 同じ値同士のペアを数える (例: target=10, val=5, other=5)
			// これらは異なる位置にあるペアとして (count * (count - 1) / 2) 個存在する。
			totalPairs += count * (count - 1) / 2
		} else if other > val {
			// val と other のペアを数える (val < other)
			if c, ok := freq[other]; ok {
				totalPairs += count * c
			}
		}
	}

	// 出力
	fmt.Printf("pairs=%d\n", totalPairs)
}
