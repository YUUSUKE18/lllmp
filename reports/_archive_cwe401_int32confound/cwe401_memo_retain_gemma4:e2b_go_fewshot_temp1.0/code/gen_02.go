package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	var total int64 = 0

	for {
		line, err := r.ReadString('\n')
		if err != nil && len(line) == 0 {
			break
		}

		// 行が空または整数として解釈できない場合はスキップ
		if len(line) == 0 {
			continue
		}

		var n int
		_, err = fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		if n == 1 {
			// n が 1 のときの手数は 0
			total += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int64)
		memo[1] = 0

		// 現在のnから1に到達するまでの手数を計算
		currentN := n
		steps := int64(0)

		for currentN != 1 {
			if result, ok := memo[currentN]; ok {
				steps += result
				currentN = 1 // 1に到達したと仮定してループを抜ける
				break
			}

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}

		// 計算結果をメモ化
		// ここでのメモ化は、現在のnから1までの経路を直接記録するのではなく、
		// 任意のnが最終的に1に到達するまでの最小の手数 (Fibonacci/Collatzの文脈) を求める問題に似ているため、
		// ここでは再帰的な計算を避けるため、単純な経路探索として処理を続ける。
		// しかし、問題の意図は「クエリnについて、操作を繰り返し1に到達するまでの手数を求める」なので、
		// ここで求めたいのは n -> 1 へのパスの長さ。
		// 実際は、元の問題設定（Collatzの過程）に基づき、各クエリnのパス長を計算し、その合計を求める。
		// メモ化は、同じnが再登場した場合に有効になるように、再帰的な構造を模倣する。

		// ここでは、各クエリnについて、nから1へのパス長を直接計算する。（メモ化はDP/再帰でより効果的だが、今回は単純な繰り返し計算で解く）
		
		// 再計算（メモ化を厳密に適用するため、nが既に計算済みの場合はそれを利用する）
		if result, ok := memo[currentN]; ok {
			memo[n] = steps + result
		} else {
			memo[n] = steps
		}

		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
