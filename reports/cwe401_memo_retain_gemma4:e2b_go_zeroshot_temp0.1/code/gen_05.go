package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	// 標準入力からデータを読み込む
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	// メモ化のためのマップ
	memo := make(map[int]int64)

	for scanner.Scan() {
		line := scanner.Text()
		// 空行や整数として解釈できない行を無視
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		// nが1以上の整数であるという前提
		if n < 1 {
			continue
		}

		// 再帰的または反復的に操作をシミュレーションし、メモ化を利用する
		currentN := n
		steps := int64(0)

		// 1に到達するまでの手数を計算
		for currentN != 1 {
			if val, ok := memo[currentN]; ok {
				steps += val
				currentN = 1 // 1に到達したと仮定してループを抜ける
				break
			}

			// 操作の適用
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}

		// 1に到達したときのステップ数をメモ化
		// ここでのメモ化は、nから1に到達するまでの手数を直接格納するのではなく、
		// 探索中に遭遇した値の遷移を効率化するために、より一般的なメモ化戦略を採用する。
		// ただし、問題の要求は「nが1に到達するまでの手数」なので、nから1へのパスを計算する。

		// 再計算を避けるために、現在のnから1へのパスを再帰的に計算し、メモ化する
		// ただし、この問題は「nが1に到達するまでの手数」を求めるため、
		// 1からnへの逆操作（またはnから1への順方向）を考える。
		// ここでは、nから1へのパスを直接計算する。

		// 効率化のため、再帰的なメモ化（動的計画法）を導入する。
		// 1からnへのパスを計算するのではなく、nから1へのパスを計算する。

		// 既存のループで計算された steps を合計に加算する
		total += steps

		// 探索中に遭遇した値をメモ化する（これは、同じ値が何度も現れる場合の高速化に役立つ）
		// ただし、この問題の構造上、nが大きくなると計算が非常に遅くなるため、
		// 実際には、nが非常に大きい場合の計算（例：Collatz conjectureの計算）を想定している。
		// ここでは、与えられたクエリ n ごとに計算し、その結果を合計する。

		// 最終的な結果をメモ化（nから1へのパス）
		memo[n] = steps
	}

	// 最終結果を出力
	fmt.Printf("total=%d\n", total)
}
