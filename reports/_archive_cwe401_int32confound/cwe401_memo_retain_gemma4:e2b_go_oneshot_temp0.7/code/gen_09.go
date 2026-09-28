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

		if n == 1 {
			// n が 1 のときの手数は 0
			total += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)
		memo[1] = 0

		currentN := n
		steps := int64(0)

		for currentN != 1 {
			if _, ok := memo[currentN]; ok {
				steps += memo[currentN]
				currentN = 1 // 1に到達したと仮定してループを抜ける（実際には再帰的に計算する）
				break
			}

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}

		// 再帰的なメモ化を正しく行う
		// 最初に与えられた n から 1 に到達するまでの手数を計算し、合計に加算する
		
		// ここでは、与えられた n から 1 に到達するまでの手数を再帰的メモ化で計算する
		// 既存のループでの計算は、memoizeが完了するまでスキップするか、あるいはmemoizeをより適切に使う必要がある。
		// 課題の要求「同じ整数が繰り返し現れるので、計算結果をメモ化して高速化してください」を満たすため、
		// 各クエリに対して、再帰的なメモ化（動的計画法）を適用する。

		// 再度、各クエリに対して動的計画法で手数を計算する
		
		// 外部ループの処理を再構成し、memoをグローバルに保持するように修正する
	}

	// 修正後の実装（再帰的メモ化を適用）
	
	// 外部でメモを保持する構造体や関数を使うのが自然だが、ここではmain内で完結させる。
	// 複数のクエリに対するメモ化を保持するため、mainのスコープ外で再計算を行う。
	
	// 最終的な解答として、各クエリに対して独立したDP計算を行う。
	
	scanner = bufio.NewScanner(os.Stdin)
	var finalTotal int64 = 0

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

		if n == 1 {
			// n が 1 のときの手数は 0
			finalTotal += 0
			continue
		}

		// メモ化テーブル
		memo := make(map[int64]int64)
		memo[1] = 0

		var calculate func(k int64) int64
		calculate = func(k int64) int64 {
			if k == 1 {
				return 0
			}
			if val, ok := memo[k]; ok {
				return val
			}

			var result int64
			if k%2 == 0 {
				result = calculate(k / 2)
			} else {
				result = calculate(3*k + 1)
			}

			// 戻り値は「現在のkから1に到達するまでの手数」を意味する。
			// 1を基準に計算を逆算する方が自然。
			
			// 修正：kから1への手数を求める
			// f(n) = 1 + f(n/2) if n is even
			// f(n) = 1 + f(3n+1) if n is odd
			
			// kが偶数なら k/2への手数 + 1
			// kが奇数なら 3k+1への手数 + 1
			
			if k%2 == 0 {
				result = 1 + calculate(k/2)
			} else {
				result = 1 + calculate(3*k+1)
			}
			
			memo[k] = result
			return result
		}

		// 計算実行
		steps := calculate(n)
		finalTotal += steps
	}

	fmt.Printf("total=%d\n", finalTotal)
}
