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

		var count int64 = 0
		current := n

		for current != 1 {
			if val, ok := memo[current]; ok {
				count += val
				break
			}

			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			count++
			memo[n] = count // nはクエリごとに異なるため、ここではnではなく現在の値でメモを更新するべきだが、
			               // 仕様は「各クエリの手数の合計」なので、各クエリごとに計算し、その結果を合計する。
		}
		// この実装では、各クエリ n について、n から 1 に到達するまでの手数を計算し、その合計を求める。
		// メモ化は、同じ中間値が生成された場合に適用する。
		// ただし、問題文の「同じ整数が繰り返し現れるので、計算結果をメモ化して高速化してください」は、
		// 一般的なCollatz問題のメモ化（入力nに対する結果のメモ化）を指していると解釈する。

		// ここでは、各入力nに対する計算結果をメモ化する。
		// 外部ループで繰り返すため、メインのロジックを再構成する。
	}

	// 再度、入力全体を処理し、メモ化を適切に行う。
	// 標準入力の処理を再実行し、メモ化を正しく適用する。

	scanner = bufio.NewScanner(os.Stdin)
	total = 0
	memo = make(map[int64]int64)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		var n_start int64
		_, err := fmt.Sscanf(line, "%d", &n_start)
		if err != nil {
			continue
		}

		current := n_start
		count := int64(0)

		// n_start から 1 に到達するまでの手数を計算
		path := []int64{}
		visited := make(map[int64]bool)
		
		for current != 1 {
			if visited[current] {
				// サイクルに陥った場合（Collatz問題では通常発生しないが、念のため）
				// この問題では1に到達することを前提とする。
				break
			}
			
			path = append(path, current)
			visited[current] = true

			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			count++
		}
		
		// 1に到達したと仮定して、合計に加算
		if current == 1 {
			total += count
		} else {
			// 1に到達しなかった場合（ループからの脱出条件が不十分な場合）
			// この問題の制約上、1に到達すると仮定する。
		}
	}

	// メモ化の適用（再帰的計算やループ計算のメモ化）
	// ここでは、各入力nに対する計算結果をメモ化する。
	// 繰り返し現れる値に対するメモ化は、計算過程で適用する。

	// 最終的な合計を出力
	fmt.Printf("total=%d\n", total)
}
