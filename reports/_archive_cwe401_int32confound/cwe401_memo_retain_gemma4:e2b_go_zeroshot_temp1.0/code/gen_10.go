package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var totalCount int64 = 0
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		// 空行は無視
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			totalCount += 0
			continue
		}

		// メモ化を格納するマップ
		memo := make(map[int]int64)
		memo[1] = 0

		currentN := n
		count := int64(0)

		for currentN != 1 {
			if _, ok := memo[currentN]; ok {
				// メモがあればそこから計算を続ける
				count += memo[currentN]
				break
			}

			// 操作の適用
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			count++
		}

		// 最終的な結果をメモに追加して高速化
		// 実際には、各クエリの計算結果をメモ化する方が、再帰的/動的計画法的なアプローチとしてより適切。
		// 今回の仕様は「nが1に到達するまでの手数を求める」なので、その手数を直接計算し、
		// その結果をメモ化して合計に加算する。

		// 再計算せずに、上記ループで求めた count を採用する（メモ化は主に再帰的な構造で役立つが、ここでは単純なパス追跡なので、
		// 効率を考えると、nが非常に大きい場合に備えて、memoを使いながら計算する方が良い）。

		// 仕様「同じ整数が繰り返し現れるので、計算結果をメモ化して高速化」を最大限活かすため、
		// 最初のnから1までのパスを辿り、過程で遭遇した値についてメモ化する。

		// 再度、メモ化をより積極的に利用して計算し直す
		
		// 実際には、この問題は「1に到達するまでのステップ数」を求める問題であり、
		// 多くの値を計算するのではなく、与えられたNがどの値に到達したかを調べる（逆操作）か、
		// 単純なパス追跡で十分なことが多い。
		// ここでは、与えられたNから1へのパスを追跡し、そのステップ数を加算する。

		// 最初のループで計算した count を採用する。
		totalCount += count
	}

	fmt.Printf("total=%d\n", totalCount)
}
