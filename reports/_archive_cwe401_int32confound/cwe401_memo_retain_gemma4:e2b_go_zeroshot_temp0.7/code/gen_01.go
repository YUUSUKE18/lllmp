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
		if err != nil || n < 1 {
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int64)

		// 繰り返し操作をシミュレーション
		currentN := n
		count := int64(0)

		// 1に到達するまで繰り返す
		for currentN != 1 {
			// メモ化された値があればそれを使用
			if val, ok := memo[currentN]; ok {
				count += val
				currentN = 1 // 1に到達したと仮定してループを抜ける
				break
			}

			// 繰り返し操作の適用
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			count++
		}

		// 1に到達したときのステップ数を記録
		if currentN == 1 {
			// 1に到達するまでの手数を計算し、メモ化する
			// 注意: この問題は「1に到達するまでの手数」を求めているため、
			// 繰り返し操作の回数を数える必要がある。
			// 提示された仕様の解釈として、nから1に到達するまでの操作回数を数える。
			
			// 再計算して、実際の操作回数を正確に求める（メモ化戦略をより洗練させる）
			
			tempN := n
			steps := int64(0)
			
			// nから1に到達するまでの操作を追跡
			for tempN != 1 {
				if val, ok := memo[tempN]; ok {
					steps += val
					tempN = 1 // 1に到達したと仮定
					break
				}

				if tempN%2 == 0 {
					tempN /= 2
				} else {
					tempN = 3*tempN + 1
				}
				steps++
			}
			
			// 1に到達したときのステップ数 (これは通常、Collat数列のステップ数)
			// ここでは、元のnから始まるCollat数列のステップ数を求める。
			// 繰り返し操作を適用しながら回数を数える。
			
			// 再度、nから1へのパスを計算する。
			// メモ化の目的は、特定の数から1へのパスの長さを求めること。
			
			// 最初のループで求めた count は、nから操作を繰り返して1に到達するまでの操作回数。
			// ただし、メモ化が正しく機能するように、到達した値のメモ化を考慮する必要がある。
			
			// 単純なCollat問題として解釈し、メモ化を適用する。
			// 1に到達するまでのステップ数を求める。
			
			finalSteps := int64(0)
			currentVal := n
			
			// 1に到達するまでのパスを追跡し、メモ化を利用してステップ数を計算
			path := []int{}
			
			// 1に到達するまで、または既に計算済みの値に遭遇するまで繰り返す
			for currentVal != 1 {
				if _, ok := memo[currentVal]; ok {
					// 既に計算済みの値に遭遇した場合、その結果を足し合わせる
					// ただし、この問題は「nから1へのパス」を求めるため、
					// 既に計算済みの値が「1へのパスの長さ」を意味するなら、それを使う。
					// ここでは、メモ化は「その数から1へのパスの長さ」を格納すると仮定する。
					
					// 既に計算済みの値に遭遇した場合は、その値が1へのパスの長さであると仮定して加算する。
					finalSteps += memo[currentVal]
					currentVal = 1 // 処理終了
					break
				}
				
				// 処理を適用し、パスを記録
				path = append(path, currentVal)
				
				if currentVal%2 == 0 {
					currentVal /= 2
				} else {
					currentVal = 3*currentVal + 1
				}
			}
			
			// ループが終了した時点で、currentValが1になっているはず。
			// 最後のステップをカウントする。
			if currentVal == 1 {
				// 最後のステップをカウントする。
				// Pathの長さは操作回数 + 1 (開始点から数える場合)
				// または、操作の回数を直接数える。
				
				// 繰り返し操作の回数を直接数える方が仕様に合致する。
				// 最初の試行で求めた count が、nから1への操作回数であると解釈する。
				
				// 最初の試行の結果を採用する（メモ化の複雑さを避けるため）
				total += count
			} else {
				// 処理が正しく行われなかった場合のフォールバック（実際には発生しないはず）
				total += count
			}
		}
	}

	fmt.Printf("total=%d\n", total)
}
