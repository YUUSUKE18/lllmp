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
	memo[1] = 0

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
			continue
		}

		// 再帰とメモ化による計算
		if _, ok := memo[n]; !ok {
			current := int64(n)
			steps := int64(0)
			// BFSまたは再帰で最短経路を探索するが、今回はnから1への操作なので、
			// 逆操作（n/2または(n-1)/3）で1に到達するまでの回数を数える方が効率的だが、
			// 問題文の操作はn->n/2 (偶数) または n->3n+1 (奇数) の順に適用し、1に到達するまでの手数を求める。
			// これは通常、Collatzプロブレムの手数（3n+1問題）を指していると解釈する。

			// Collatzプロブレムの計算をメモ化を用いて行う
			path := []int{n}
			visited := map[int]bool{n: true}
			currentN := n
			steps = 0

			for currentN != 1 {
				var next int
				if currentN%2 == 0 {
					next = currentN / 2
				} else {
					next = 3*currentN + 1
				}

				if visited[next] {
					// 循環が発生した場合（ここでは到達しないはずだが安全のため）
					break
				}

				visited[next] = true
				path = append(path, next)
				currentN = next
				steps++
			}

			// すべてのステップでメモ化を更新
			for i := 0; i < len(path); i++ {
				memo[path[i]] = int64(steps - i)
			}

			total += int64(steps)
		} else {
			total += memo[n]
		}
	}

	fmt.Printf("total=%d\n", total)
}
