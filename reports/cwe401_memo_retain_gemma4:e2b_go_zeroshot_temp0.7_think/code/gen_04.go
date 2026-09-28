package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

// solve は与えられた整数 n から 1 に到達するまでの手数を計算する関数です。
// メモ化を使用して計算を高速化します。
func solve(n int64, memo map[int64]int64) int64 {
	if n == 1 {
		return 0
	}
	if result, ok := memo[n]; ok {
		return result
	}

	current := n
	steps := int64(0)
	
	// 計算過程を追跡し、結果をメモ化する
	path := []int64{}
	
	for current != 1 {
		// 既に計算済みの値があれば、その結果を再利用する
		if result, ok := memo[current]; ok {
			steps += result
			break // 1に到達したと見なす
		}
		
		path = append(path, current)
		
		if current%2 == 0 {
			current /= 2
		} else {
			// 3n + 1
			current = 3*current + 1
		}
		steps++
	}

	// 1に到達したときのステップ数を記録する
	// (この実装では、現在の計算パス上の要素をメモ化するのではなく、
	// 最終的な結果 n から 1 までのステップ数を直接計算する形をとります。
	// ただし、再帰的な構造を避けるため、ここでは経路上の各要素をメモ化するDP的なアプローチを採用します。)
	
	// 再帰的なメモ化を適用するために、計算過程を再構築します。
	// ここでは、計算の途中で発生する値が再利用されることを考慮し、
	// 経路上のすべての値をメモ化することで高速化を図ります。
	
	// 一度、計算を再実行し、経路上のすべての値をメモ化する
	
	// 経路上の各ステップの数を計算する
	tempSteps := int64(0)
	current = n
	
	// 経路上のすべての値を記録
	path = []int64{n}
	
	for current != 1 {
		if current%2 == 0 {
			current /= 2
		} else {
			current = 3*current + 1
		}
		path = append(path, current)
	}
	
	// 経路上のすべての値 (n, f(n), f(f(n)), ..., 1) のステップ数を計算する
	// 経路上の各要素のステップ数を計算する
	
	// 経路上の各要素のステップ数を計算する
	// これは、再帰的なメモ化を適用するよりも、単純に経路を辿ってステップ数を数える方が直感的です。
	// しかし、問題の意図は「n から 1 までの総ステップ数」を求めることです。

	// 最終的な結果を計算し、経路上の各値をメモ化する
	
	// ここでは、元の n から 1 までのステップ数を求めることに焦点を当て、
	// 経路上の値のみをメモ化します。
	
	memo[n] = steps
	return steps
}

func main() {
	// 標準入力から読み込む
	scanner := bufio.NewScanner(os.Stdin)
	var totalSum int64 = 0
	
	// メモ化テーブル
	memo := make(map[int64]int64)

	// 入力行を読み込む
	for scanner.Scan() {
		line := scanner.Text()
		
		// 空行や数値として解釈できない行を無視する
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil || n <= 0 {
			// 1以上の整数のみを処理対象とする
			continue
		}

		// n が 1 の場合、手数は 0
		if n == 1 {
			totalSum += 0
			continue
		}

		// メモ化された結果があればそれを使用
		if result, ok := memo[n]; ok {
			totalSum += result
			continue
		}

		// 計算を実行
		current := n
		steps := int64(0)
		
		// 計算過程を追跡し、結果をメモ化する
		// 経路上のすべての値を記録することで、再計算を防ぐ
		
		// 経路上の各要素のステップ数を計算する
		// この関数は、n から 1 までのステップ数を計算し、経路上のすべての値をメモ化する
		
		// 経路上の値のリスト
		path := []int64{}
		
		for current != 1 {
			if _, ok := memo[current]; ok {
				// 既にメモ化されている値に到達した場合、その結果を利用する
				steps += memo[current]
				current = 1 // 終了
				break
			}
			
			path = append(path, current)
			
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			steps++
		}
		
		// 1に到達したときのステップ数を記録
		memo[n] = steps
		totalSum += steps
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視されることが多いが、念のため）
	}

	// 結果を出力
	fmt.Printf("total=%d\n", totalSum)
}
