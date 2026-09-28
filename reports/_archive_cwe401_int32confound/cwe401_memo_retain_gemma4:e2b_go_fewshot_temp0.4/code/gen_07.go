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
			// total += 0
		} else {
			// 繰り返し操作をシミュレーションし、メモ化を行う
			// 1に到達するまでの手数を求める
			
			// メモ化のためのマップ
			memo := make(map[int]int64)
			memo[1] = 0

			var count int64 = 0
			current := n
			
			// BFSまたは再帰で最短経路を求めるが、ここでは操作の逆を考えるか、
			// 単純に操作を繰り返して到達時間を求める。
			// 問題文の操作は、コナーの数列（3n+1問題）に関連している。
			// nが偶数なら n/2, 奇数なら 3n+1。これは通常、nを1に到達させる操作を考える。
			// ここでは「nが1に到達するまでの手数」を求める。

			// 逆操作を考える方が効率的かもしれないが、ここでは与えられた操作を直接適用する。
			// ただし、同じ整数が繰り返し現れるので、メモ化が必須。

			// 探索とメモ化
			queue := []int{n}
			visited := map[int]int64{n: 0}
			
			for len(queue) > 0 {
				currentN := queue[0]
				queue = queue[1:]
				
				if currentN == 1 {
					// 1に到達したときのステップ数を加算
					total += visited[currentN]
					continue
				}

				var nextN int
				if currentN%2 == 0 {
					nextN = currentN / 2
				} else {
					nextN = 3*currentN + 1
				}

				if _, ok := visited[nextN]; !ok {
					visited[nextN] = visited[currentN] + 1
					queue = append(queue, nextN)
				}
			}
		}
	}

	fmt.Printf("total=%d\n", total)
}
