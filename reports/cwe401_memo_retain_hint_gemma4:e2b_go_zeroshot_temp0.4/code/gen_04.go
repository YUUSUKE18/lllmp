package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var totalSteps int64 = 0
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		// 空行は無視
		if line == "" {
			continue
		}

		// 整数として解釈を試みる
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		// 繰り返し操作をシミュレーション
		currentN := n
		steps := int64(0)

		// 1に到達するまで繰り返す
		for currentN != 1 {
			// メモ化チェック
			if val, ok := memo[currentN]; ok {
				steps += val
				currentN = 1 // 1に到達したと仮定してループを抜ける
				break
			}

			// 既に計算済みの値があれば、その結果を足し合わせる
			// 実際には、再帰的な構造や、到達した値の合計を管理する方が効率的だが、
			// ここでは単純に現在の経路を辿る。
			
			// 操作の適用
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++

			// 再帰的なメモ化の考え方（ここでは直接的なメモ化として扱う）
			// 1に到達するまでの手数を求める問題なので、
			// 遷移を辿りながら、既に計算済みの値があればそれを加算する。
			// ただし、この問題は「1に到達するまでの手数」を求めるものであり、
			// 各クエリ n について、その n から 1 への経路の長さを求める問題である。
			// したがって、各 n について、その経路を辿り、途中で同じ値が現れたらメモ化する、というアプローチが適切。
		}

		// 1に到達したときのステップ数を記録
		// 1に到達するまでのステップ数は、現在の経路の長さ。
		// 途中でメモ化された値があれば、そこから1へのステップ数を加算する。
		
		// 再計算（より正確なメモ化戦略）
		// 1に到達するまでの手数を求める問題は、通常、各 n から 1 への経路の長さを求める。
		// ここでは、各クエリ n に対して、n から 1 への経路の長さを計算する。
		
		// 経路を辿りながら、メモ化された値があればそれを加算する
		pathSteps := int64(0)
		tempN := n
		
		// 経路を辿る
		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				pathSteps += val
				break // 既にメモ化された値から1への経路を計算したと仮定
			}

			// 操作の適用
			if tempN%2 == 0 {
				tempN /= 2
			} else {
				tempN = 3*tempN + 1
			}
			pathSteps++
		}
		
		// 1に到達したときのステップ数をメモ化
		memo[n] = pathSteps
		
		// 合計に加算
		totalSteps += pathSteps
	}

	// 結果の出力
	fmt.Printf("total=%d\n", totalSteps)
}
