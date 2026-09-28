package main

import (
	"bufio"
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
		// 目標値の読み込みに失敗した場合は終了（仕様上、入力は正しく与えられることを期待する）
		return
	}

	// 2行目以降: 数値の読み込み
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

	n := len(numbers)
	if n < 2 {
		// 2個以上の要素がない場合はペアは存在しない
		println("pairs=0")
		return
	}

	count := 0

	// O(N^2) の全ペアチェック。Nが十分に大きくても、入力の制約（実用的な時間とメモリ）を考慮し、
	// 競プロ的な制約（Nが数万程度）を想定して、このアプローチで試す。
	// より高速な解法（ソートと二分探索、またはハッシュマップ）を考える。
	// 今回は、与えられた整数のうち、足して目標値になる2個の組（位置が異なる2個）の個数を求める。

	// 2つの異なるインデックス i と j (i != j) について numbers[i] + numbers[j] == target を探す。
	// 入力には「位置が異なる2個」を求められているため、元のインデックス情報が必要になる。
	// しかし、入力は単なる整数のリストであり、リスト内の要素間のペアを数えることが目的であるため、
	// 要素の出現回数やソートを用いることで効率的に数えることができる。

	// ハッシュマップ (またはソートと二分探索) を使用して、O(N^2) より高速に求める。
	// ここでは、要素の出現回数を数える問題として解く（同じ値が複数ある場合のペアリングを考慮）。

	// 1. 要素の出現回数をマッピングする
	freq := make(map[int64]int)
	for _, num := range numbers {
		freq[num]++
	}

	// 2. ペアの数を数える
	// (a + b = target) となるペア (a, b) を探す。
	// a == b の場合 (2a = target) と、a != b の場合を考慮する必要がある。

	totalPairs := 0

	// 探索対象のユニークな要素についてループする
	for a, countA := range freq {
		b := target - a

		if b == a {
			// ケース 1: a + a = target (つまり 2a = target)
			// この値 a から自分自身とのペアを数える。
			// a が出現する回数 countA から、異なる2つの位置のペアの数を計算する: countA * (countA - 1) / 2
			if 2*a == target {
				totalPairs += countA * (countA - 1) / 2
			}
		} else if b > a {
			// ケース 2: a + b = target かつ a < b
			// b が存在するか確認する
			if countB, found := freq[b]; found {
				// (a, b) のペアの数は countA * countB
				totalPairs += countA * countB
			}
		}
		// b < a のケースは、a がループするときに b が既に処理されているためスキップする (重複カウント回避のため)
	}

	// 最終的な結果を出力
	println("pairs=", totalPairs)
}
