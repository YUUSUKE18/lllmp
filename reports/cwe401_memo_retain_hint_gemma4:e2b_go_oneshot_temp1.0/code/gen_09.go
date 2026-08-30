package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		// BFSまたはDFSを使って、1に到達するまでの最短経路（手数）を求める
		// ここでは、n -> n/2 (nが偶数) または n -> 3n+1 (nが奇数) の操作を逆向きに考えるか、
		// n から 1 への到達をシミュレーションする。
		// 問題の操作は、Collatz予想の操作そのものである。nから1に到達する手数を求める。

		// 逆操作を考える方が簡単ではないか？
		// n -> 1 の手数を求める。
		// nが1なら0。
		// nが偶数なら n/2
		// nが奇数なら 3n+1

		// ここでは、各クエリ n について n から 1 に到達するまでの手数を求める。
		// ただし、操作の定義が「nが偶数ならn/2、奇数なら3n+1」であり、これは通常、Collatz数列の操作であり、
		// 1に到達するまでのステップ数を問う問題（Collatz予想）である。
		// 設問の記述: "n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。"
		// これは、nからスタートし、操作を繰り返して1になるまでのステップ数を意味する。

		// memo化を事前に行うのではなく、各nに対して再帰またはDPで計算する。
		// 逆操作（n -> 1）でメモ化を適用する。

		// 逆操作を考える（n -> 1への手数を求めるため、nを1に近づける操作）
		// 逆操作:
		// 1. もし n が 1 なら、手数は 0。
		// 2. もし n が 2k (偶数) なら、元の値は 2n。
		// 3. もし n が 3k+1 (奇数) なら、元の値は (n-1)/3 (ただし n-1が3の倍数でなければならない。これは逆操作が複雑になることを示唆する。)

		// 通常、Collatz問題では、nから1への到達を直接シミュレーションする方が自然。
		// nから1への到達をシミュレーションし、中間ステップでメモ化する。

		currentN := n
		steps := 0
		path := make([]int64, 0) // 経路を記録して、ループを防ぐために使用（もしサイクルが発生するなら）
		visited := make(map[int64]int64) // 訪問済みの数と、その時点で到達した手数を記録

		for currentN != 1 {
			if currentN == 0 { // 0は1に到達しないため、不正な入力または終了条件
				break
			}
			if _, ok := visited[currentN]; ok {
				// サイクル検出 (これはCollatz問題では通常発生しないが、安全のため)
				// サイクルに入った場合、1に到達しない可能性があるため、計算を中止する
				break
			}

			visited[currentN] = steps
			path = append(path, currentN)

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}

		if currentN == 1 {
			total += int64(steps)
		}
	}

	fmt.Printf("total=%d\n", total)
}
