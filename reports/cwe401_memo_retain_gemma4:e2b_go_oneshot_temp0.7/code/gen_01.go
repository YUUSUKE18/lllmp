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

		// 空白区切りの整数列を処理するのではなく、1行1個のクエリとして処理する
		// 仕様に従い、各行を個別のクエリとして扱う
		n, err := strconv.Atoi(line)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		if n == 1 {
			// nが1のときの手数は0
			total += 0
			continue
		}

		// メモ化された値があればそれを使用
		if result, ok := memo[n]; ok {
			total += result
			continue
		}

		// 計算プロセス
		currentN := n
		steps := int64(0)
		path := []int{} // 経路を記録してメモ化に利用する

		// 1に到達するまでの経路を探索し、計算コストを抑えるため、
		// 往復処理（再帰または反復）で経路を特定する
		// ただし、ここでは「1に到達するまでの手数」を求めるため、
		// nから1への逆方向の探索ではなく、nから1への順方向の操作をシミュレーションする。

		// 1に到達するまでの手数を求める
		// 経路を記録し、サイクル検出のためにセットを使う
		visited := make(map[int]int64)
		queue := []int{n}
		visited[n] = 0

		found := false
		for len(queue) > 0 {
			curr := queue[0]
			queue = queue[1:]
			steps = visited[curr]

			if curr == 1 {
				total += steps
				memo[n] = steps
				found = true
				break
			}

			var next int
			if curr%2 == 0 {
				next = curr / 2
			} else {
				next = 3*curr + 1
			}

			// 遷移先のチェックと追加
			if next >= 1 {
				if _, visitedExists := visited[next]; !visitedExists {
					visited[next] = steps + 1
					queue = append(queue, next)
				}
			}
		}

		// もし到達できなかった（理論上は到達するはずだが、念のため）
		if !found {
			// これは通常発生しないはずだが、もし発生した場合はエラー処理やデフォルト値を設定する
			// 今回は問題の制約上、必ず到達するため、このブロックは到達しないと仮定する。
		}
	}

	fmt.Printf("total=%d\n", total)
}
