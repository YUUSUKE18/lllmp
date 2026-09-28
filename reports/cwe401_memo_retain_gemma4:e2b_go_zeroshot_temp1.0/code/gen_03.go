package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	// メモリ化を格納するマップ
	memo := make(map[int]int)
	totalSteps := 0

	// 標準入力から読み込む
	scanner := bufio.NewScanner(os.Stdin)
	
	for scanner.Scan() {
		line := scanner.Text()
		
		// 空行や整数として解釈できない行を無視
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			// 整数として解釈できない場合は無視
			continue
		}

		// 再帰/メモ化による操作の実行
		currentN := n
		steps := 0
		
		// 1に到達するまでの手数を計算
		for currentN != 1 {
			if _, ok := memo[currentN]; ok {
				// メモがあれば、メモした結果を利用
				steps += memo[currentN]
				break
			}
			
			// メモがない場合は計算を実行
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
			
			// 計算途中の値が大きくなる可能性があるため、メモを更新
			// ここでは、現在のNから1に到達するまでのステップ数を計算するのではなく、
			// nが1になるまでの全過程の手数でメモを更新する。
			// 仕様上は「nが1になるまでの手数」を求めるので、再帰的に計算する。
			// ただし、この問題は、各クエリnに対して「nから1に到達するまでの操作回数」を求めるものであり、
			// 複数のクエリ間で共有される構造（Collatz予想）を利用してメモ化を行う。
			// ここでは、memo[n] = nから1までのステップ数として定義する。
		}
		
		// 1に到達したときのステップ数をメモに追加
		// 最終的に求めたstepsをメモする
		memo[n] = steps
		totalSteps += steps
	}

	// 結果の出力
	fmt.Printf("total=%d\n", totalSteps)
}
