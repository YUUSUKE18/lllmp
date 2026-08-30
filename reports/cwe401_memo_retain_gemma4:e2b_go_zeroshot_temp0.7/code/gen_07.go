package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	// 標準入力からデータを読み込む
	scanner := bufio.NewScanner(os.Stdin)
	var totalSteps int64 = 0

	// メモ化のためのマップ
	memo := make(map[int]int64)

	for scanner.Scan() {
		line := scanner.Text()
		// 空行や整数として解釈できない行を無視
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		// 1 の場合は手数は 0
		if n == 1 {
			// 1 はすでに計算済みだが、念のため
			if _, ok := memo[1]; !ok {
				memo[1] = 0
			}
			continue
		}

		// 再帰的または反復的に手数を計算
		currentN := n
		steps := int64(0)
		
		// 再帰とメモ化を組み合わせた計算
		for currentN != 1 {
			if val, ok := memo[currentN]; ok {
				steps += val
				currentN = 1 // 1 に到達したと仮定してループを抜ける
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
		// ここで、元のnから1に到達するまでの手数を格納する。
		// ただし、この問題は「クエリ n について、n が 1 に到達するまでの手数を求めよ」なので、
		// n自体がクエリの対象であり、その過程で発生する操作の回数を数える。
		// 実際には、nから1への経路上のステップ数を数える必要がある。
		
		// 再度、クエリ n が 1 に到達するまでの手数を計算する（メモ化を利用して）
		
		// 1. n から 1 への経路を計算し、その手数を求める
		current := n
		pathSteps := int64(0)
		
		// 経路を追跡しながら計算し、メモ化を更新する
		path := []int{}
		visited := make(map[int]bool)
		
		// 経路探索（nから1への経路）
		for current != 1 {
			if _, ok := memo[current]; ok {
				// 既にメモがあれば、そのメモを利用して計算を終了する
				// ただし、これはnから1への経路の合計を求めるため、現在の経路のステップ数を加算する
				pathSteps += memo[current]
				current = 1 // 1に到達したと見なす
				break
			}

			if visited[current] {
				// 無限ループを防ぐ（通常、Collatz問題では3n+1が大きくなるが、ここでは1に到達することを期待する）
				// もし同じ値に戻ったら、これは通常ありえないが、安全のため停止する
				break
			}
			
			visited[current] = true
			path = append(path, current)

			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			pathSteps++
		}
		
		// 経路計算が完了したら、その結果をメモ化する（nが到達するまでの手数を保存）
		// この問題の意図は「nから1への経路上の操作回数」と解釈する。
		// nから1への経路上の操作回数を pathSteps に格納する。
		memo[n] = pathSteps
		
		// 合計に加算
		totalSteps += pathSteps
	}

	// 結果の出力
	fmt.Printf("total=%d\n", totalSteps)
}
