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

		// 再帰的/反復的に操作をシミュレーションし、メモ化を利用する
		currentN := n
		steps := int64(0)

		// 1に到達するまでの手数を計算
		for currentN != 1 {
			if steps > 1000000 { // 安全策：無限ループや過剰な計算を防ぐための制限（実際にはこの問題は必ず収束する）
				// この問題の操作はCollatz予想に関連しており、1に収束することが保証されているため、
				// 非常に大きな値になる前に収束すると期待される。
				break
			}

			if val, ok := memo[currentN]; ok {
				steps += val
				currentN = 1 // 既に1に到達したと仮定してループを抜ける
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

		// 1に到達した後の手数をメモ化
		if currentN == 1 {
			// 1に到達するまでのステップ数を計算し、それをメモする
			// ここで、元のnから1に到達するまでのステップ数を計算し、それをメモする方が効率的。
			// 再計算を避けるため、元のnから計算したステップ数を直接加算する。
			// ただし、この問題の要求は「nが1に到達するまでの手数を求める」なので、
			// 毎回計算するのではなく、memo[n]を計算する形にする。

			// 再度、nから1までのステップ数を計算し、それをメモする
			tempN := n
			count := int64(0)
			path := []int{} // パスを記録してメモ化に利用する

			for tempN != 1 {
				if _, ok := memo[tempN]; ok {
					// 途中でメモ化された値があれば、そこから計算を続ける
					count += memo[tempN]
					tempN = 1 // 1に到達したと仮定
					break
				}

				if tempN%2 == 0 {
					tempN /= 2
				} else {
					tempN = 3*tempN + 1
				}
				count++
				path = append(path, tempN)
			}
			
			// 1に到達したときのステップ数を計算し、nに加算する
			// 実際には、nから1までのステップ数を計算し、それをmemo[n]に格納する。
			// 既に計算したステップ数を加算する。
			
			// 簡略化のため、元のnから1までのステップ数を直接計算し、それをmemo[n]に格納する。
			// 既に計算済みの値があれば、その値を利用する。
			
			// 再帰的なメモ化（DP）で再計算する
			
			// 最終的な計算結果を求めるための再帰的なヘルパー関数を導入する方が、
			// 複雑なメモ化の管理を避けるため、この問題の性質上、より適切かもしれない。
			// しかし、ここでは与えられた制約に従い、ループ内でメモ化を適用する。
			
			// 最初のループで計算したstepsをそのまま加算する（これは、nから1までのステップ数）
			total += steps
			memo[n] = steps
		}
	}

	// 最終的な合計を出力
	fmt.Printf("total=%d\n", total)
}
