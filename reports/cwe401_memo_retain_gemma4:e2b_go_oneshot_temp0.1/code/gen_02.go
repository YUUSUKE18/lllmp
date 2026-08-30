package main

import (
	"bufio"
	"fmt"
	"os"
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

		var n int
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			total += 0
			continue
		}

		// メモ化された値があればそれを使用
		if val, ok := memo[n]; ok {
			total += val
			continue
		}

		// 再帰または反復計算で手数を求める
		currentN := n
		steps := int64(0)
		path := []int{} // 計算過程を記録してメモ化に利用する

		for currentN != 1 {
			path = append(path, currentN)
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}

		// 1に到達するまでの手数は、現在のステップ数 + 1 (最後の1への遷移)
		// ただし、問題文の「1に到達するまでの手数」を、操作の回数として解釈する。
		// n=1のとき0手数。n=2のとき2->1 (1回)。n=3のとき3->10->5->16->8->4->2->1 (7回)。
		// ここでは、操作を繰り返して1に到達するまでの操作回数を数える。
		// n=1のとき0手数。
		// n=2: 2/2=1 (1回)
		// n=3: 3*3+1=10 (1回), 10/2=5 (2回), 3*5+1=16 (3回), 16/2=8 (4回), 8/2=4 (5回), 4/2=2 (6回), 2/2=1 (7回)
		
		// 実際の手数 (steps) は、nから1に到達するまでの操作回数。
		// 1に到達するまでの手数は、ループが終了したときの steps。
		
		memo[n] = steps
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
