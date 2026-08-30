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
		// 空行や整数として解釈できない行を無視
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			totalSteps += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		// 繰り返し計算とメモ化
		currentN := n
		steps := int64(0)

		for currentN != 1 {
			// メモ化チェック
			if val, ok := memo[currentN]; ok {
				steps += val
				break
			}

			// 操作の適用
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++

			// メモ化の更新（再帰的な呼び出しを避けるため、ここでは直接ステップ数を計算する）
			// 実際には、この問題は「1に到達するまでの手数」を求めるため、
			// 各クエリ n について、nから1に到達するまでのステップ数を計算し、その合計を求める必要がある。
			// したがって、各クエリごとに計算し、その結果を合計する。
		}

		// 修正: 各クエリ n について、nから1に到達するまでの手数を計算し、合計する。
		// メモ化は、同じクエリ n が複数回現れた場合の高速化のため、
		// 外部で管理する。しかし、この問題の仕様では、入力が1行ずつ与えられるため、
		// 各クエリ n について独立に計算し、その結果を合計する。
		// 繰り返し現れる値に対するメモ化は、もし同じ n が複数回与えられた場合に有効になるが、
		// ここでは「すべてのクエリの手数の合計」を求めるため、各クエリの計算結果を直接加算する。

		// 再計算（メモ化のロジックをクエリごとに適用）
		currentN = n
		steps = 0
		path := []int64{} // 経路を記録して、ループ検出とメモ化をより明確にするため

		// 経路探索とメモ化
		visited := make(map[int64]int64)
		visited[n] = 0 // nから1へのステップ数を格納する

		queue := []int64{n}
		
		// BFSで最短経路（手数）を求める
		// ただし、この問題は「操作を繰り返して1に到達するまでの手数」なので、
		// 1回の操作で次の値が決まるため、単純な再帰または反復で十分。
		
		// 繰り返し計算とメモ化（再帰的な構造を避けるため、反復で計算）
		
		// 経路を追跡し、ループを検出する
		pathSet := make(map[int64]bool)
		currentPath := []int64{n}
		pathSet[n] = true
		
		tempN := n
		tempSteps := int64(0)
		
		for tempN != 1 {
			if tempN == 0 { // 0に到達した場合（通常は発生しないが念のため）
				break
			}
			
			// メモ化チェック
			if stepsVal, ok := visited[tempN]; ok {
				tempSteps += stepsVal
				break
			}

			// 操作の適用
			if tempN%2 == 0 {
				tempN /= 2
			} else {
				tempN = 3*tempN + 1
			}
			tempSteps++
			
			// メモ化の更新
			visited[tempN] = tempSteps
			
			// ループ検出（この問題では1に到達すれば終了するため、無限ループの心配は少ないが、
			// 3n+1問題の性質上、1に到達しない場合も考慮する必要がある。しかし、問題文は「1に到達するまでの手数」を求めているため、
			// 1に到達する経路が存在すると仮定する。）
			
			// 経路が循環した場合の処理（この問題では、1に到達する経路が保証されていると仮定する）
			if pathSet[tempN] {
				// 循環が発生した場合、この経路は1に到達しないため、計算を打ち切るか、エラーとする。
				// 問題の文脈から、1に到達する経路が存在すると考える。
				break
			}
			
			pathSet[tempN] = true
			currentPath = append(currentPath, tempN)
		}
		
		// 最終的な手数を加算
		if tempN == 1 {
			totalSteps += tempSteps
		} else {
			// 1に到達しなかった場合（理論上は発生しないはずだが、安全策として）
			// この場合、問題の意図に従い、到達できなかった場合は何らかの処理が必要だが、
			// ここでは問題の制約に基づき、1に到達すると仮定して進める。
			// 実際には、この問題はCollatz予想に関連しており、1に到達することが期待される。
		}
	}

	fmt.Printf("total=%d\n", totalSteps)
}
