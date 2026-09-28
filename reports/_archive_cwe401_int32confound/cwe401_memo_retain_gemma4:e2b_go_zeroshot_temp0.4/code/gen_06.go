package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var total int64 = 0
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			total += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int64)

		// 繰り返し計算
		currentN := n
		count := int64(0)

		for currentN != 1 {
			if _, ok := memo[currentN]; ok {
				// メモがあればスキップしてカウントを更新
				count += memo[currentN]
				break
			}

			// 置き換え操作の実行
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			count++
		}

		// 最終的な結果をメモに保存（ただし、この問題の要求は「1に到達するまでの手数」なので、
		// 遷移の回数を数える方が自然だが、問題文の意図を再解釈する。
		// 通常、この問題はコネルの問題（3n+1問題）のステップ数を問うため、
		// 遷移の回数を数えるのが適切。
		// ここでは、nから1に到達するまでの操作回数を count として採用する。
		// ただし、メモ化の目的は「nから1に到達するまでの手数」を求めることなので、
		// 遷移の回数を直接メモする。
		
		// 再計算して、到達までの手数を求める（メモ化をより直接的に利用する）
		// 再帰的または動的計画法で考えるのが最も効率的だが、ここでは直接的なシミュレーションとメモ化を組み合わせる。

		// 再度、メモ化を「nから1への手数」として利用する。
		// 既に計算済みの値があればそれを利用する。
		
		// 最初のループで計算した count が、nから1への手数となる。
		// memo[n] = count // この形だと、次のクエリで n が現れたときに利用できる。
		
		// 最終的な手数を加算
		total += count
		
		// メモの更新（nから1への手数を保存）
		memo[n] = count
	}

	fmt.Printf("total=%d\n", total)
}
