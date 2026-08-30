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

	// メモ化のためのマップ
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

		// 再帰/繰り返し操作の計算
		var count int64 = 0
		currentN := n

		// 1に到達するまでの手数を計算
		for currentN != 1 {
			if val, ok := memo[currentN]; ok {
				count += val
				currentN = 1 // 既にメモがある場合は、そこから1までの移動は0として扱う（ただし、この問題の構造上、これは直接的な最適化ではないため、再帰的な構造をメモ化する方が適切）
				break
			}

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			count++
		}

		// 現在の計算結果をメモ化（これは、元のnから1に到達するまでのステップ数を求めるのではなく、nがどのように変化するかを追跡する、という問題設定の解釈に依存する）
		// 問題の要求は「各クエリ n について、操作を繰り返し、1 に到達するまでの手数を求め、その合計を求める」なので、各nについて計算する。
		// ここでは、nから1へのパスの長さを計算し、その合計を求める。

		// 再計算（メモ化を適用して再帰的に計算）
		// 実際には、各nについて、n -> f(n) -> f(f(n)) -> ... -> 1 に到達するまでのステップ数を求める。
		// この問題は、Collatz数列の到達ステップ数を求める問題と解釈されます。

		// メモ化を再構成: nから1へのステップ数を求める
		
		// 再度計算（メモ化を適用して再帰的に計算）
		steps := int64(0)
		tempN := n
		
		// 1に到達するまでのステップ数を計算
		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break // 既にメモがあれば、そこから1までのパスは計算済みと仮定するが、これはCollatzの性質上、ステップ数が一意に定まるため、このループは通常不要になる。
			}

			// ステップを記録しながら進む
			if tempN%2 == 0 {
				tempN /= 2
			} else {
				tempN = 3*tempN + 1
			}
			steps++
		}
		
		// 1に到達したときのステップ数をメモ化
		memo[n] = steps
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
