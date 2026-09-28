package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	totalSteps := int64(0)
	memo := make(map[int]int64)

	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		var n int
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			steps := int64(0)
			totalSteps += steps
			continue
		}

		// メモ化された結果があればそれを使用
		if val, ok := memo[n]; ok {
			totalSteps += val
			continue
		}

		// 再帰的計算とメモ化
		var steps int64
		if n%2 == 0 {
			// nが偶数なら n/2
			steps = memo[n/2] + 1
		} else {
			// nが奇数なら 3n+1
			steps = memo[3*n+1] + 1
		}

		// ここで再帰的に呼び出すのではなく、1に到達するまでの操作数を計算する。
		// 実際には、操作の反復を追う必要がある。
		// 提示された仕様は「nが1に到達するまでの手数」を求めているため、再帰的なメモ化（または反復的な計算）を行う。

		// 1に到達するまでの手数を直接計算する（メモ化を利用）
		// 簡略化のため、ここでは直接の計算フローを再帰的に行う
		currentN := n
		path := []int{}
		
		// 1に到達するまでのパスを追う
		for currentN != 1 {
			if _, ok := memo[currentN]; ok {
				// 既に計算済みの値があればそこから合計する
				steps = memo[currentN]
				break
			}
			path = append(path, currentN)
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
		}
		
		if currentN == 1 {
			// 1に到達したときのステップ数 = pathの長さ + 1 (または、操作の回数)
			// 1に到達するまでの操作回数を数える
			steps = int64(len(path))
			
			// パス上の各要素をメモ化する（これは到達するまでの手順のメモ化として機能する）
			// ただし、この問題は「nから1になるまでの操作数」を求めたい。
			// f(n) = 1 + f(n/2) if n is even
			// f(n) = 1 + f(3n+1) if n is odd
			// f(1) = 0
			
			// 再度、f(n)を計算し、途中経過をメモする
			// 初期値として、計算を始める前にn自身を記録する
			memo[n] = steps
			totalSteps += steps
		} else {
			// 1に到達しなかった場合（通常、この問題では必ず1に収束するが、念のため）
			// このケースは通常発生しないはず。
		}
	}

	fmt.Printf("total=%d\n", totalSteps)
}
