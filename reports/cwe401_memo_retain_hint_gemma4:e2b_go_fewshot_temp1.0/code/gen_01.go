package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	// メモ化テーブル
	memo := make(map[int]int64)

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
			result := int64(0)
			total += result
			continue
		}

		// メモ化された値があるか確認
		if val, ok := memo[n]; ok {
			total += val
			continue
		}

		// 再帰または動的計画法で計算
		var count int64

		// 偶数なら n/2
		if n%2 == 0 {
			count = count + calculate(n/2, memo)
		} else {
			// 奇数なら 3n+1
			count = count + calculate(3*n+1, memo)
		}

		// 再帰呼び出しの代わりに、直接計算とメモ化を行うように修正する
		// ここでは、nが1に到達するまでのステップ数を計算する
		// 1に到達するまでの操作数を求めるため、再帰ではなく、到達パスを追跡するDP/memoizationが必要。
		// ただし、問題文の操作は「繰り返し」なので、nが1になるまでの「操作回数」を求める。
		// 操作を繰り返す、という記述から、これはCollatz予想のステップ数を求める問題と解釈する。
		// nが1になるまでのステップ数を求める。
		
		// 再計算（Collatzステップ数計算）
		current := n
		steps := int64(0)
		path := []int{}
		
		// 1に到達するまでのステップ数を計算
		for current != 1 {
			if current <= 0 {
				// 負の数が出た場合は、計算の定義に従う（問題文では1以上の整数が与えられるが、途中で負になる可能性を考慮）
				// Collatzの標準的な問題では負の数は扱わないことが多いが、ここでは与えられたルールに従う。
				// nが1以上であるという前提なので、通常は正の数のみを考える。
				// 64bit整数範囲には収まるため、大きな値になっても問題ない。
			}
			
			if current == 1 {
				break
			}
			
			if _, ok := memo[current]; ok {
				// 途中でメモ化された値があれば、そこから計算を続ける
				// ただし、これは全体の合計を求める問題なので、ここではnから直接計算する。
			}
			
			// 遷移の記録 (メモ化のために使用)
			path = append(path, current)
			
			if current%2 == 0 {
				current = current / 2
			} else {
				current = 3*current + 1
			}
			steps++
		}
		
		// メモ化の更新（ここでは計算結果を保存する）
		// nから1に到達するまでのステップ数を保存
		memo[n] = steps
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}

// 補助関数は上記コード構造では直接呼び出されないが、ロジックを明確にするために定義する。
// 実際の実行では、メインループ内で直接計算とメモ化を行う。
func calculate(n int, memo map[int]int64) int64 {
	if n == 1 {
		return 0
	}
	if val, ok := memo[n]; ok {
		return val
	}

	var result int64
	
	// nが1になるまでのステップ数を計算
	current := n
	steps := int64(0)
	
	// 計算中にメモ化された値に依存しない、純粋なステップ数を計算する
	// 念のため、この計算は再帰的な構造ではなく、ループで完了させる必要がある。
	
	// この問題の要求は「nが1に到達するまでの手数を求め」なので、
	// 入力された各nについて、そこから1に到達するまでのステップ数を計算し、合計する。
	// したがって、メインループでのメモ化と合計が最も適切。
	
	// 補助関数は冗長になるため、メインのロジックに絞り込む。
	return 0 
}
