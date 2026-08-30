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
		if len(line) == 0 {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			totalSteps += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int64)

		var steps int64 = 0
		currentN := n

		// 1に到達するまでの過程を追跡
		for currentN != 1 {
			if val, found := memo[currentN]; found {
				steps += val
				currentN = 1 // 1に到達したと仮定してループを抜ける
				break
			}
			
			// 計算の実行
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++

			// メモ化
			memo[n] = steps
			
			// 再帰的な呼び出しをシミュレーションするために、現在の値で再度チェック
			// ここでは、直接再帰ではなく、現在の経路を追跡し、ゴールに到達するまでのステップ数を数える
			// ただし、仕様は「nが1に到達するまでの手数を求めよ」なので、元のnからスタートして1になるまでの過程を数える必要がある。
			// これは、元の問題（コネルの問題）の解法に基づき、現在の値が既に計算済みでない場合にのみ再帰的に処理する方式が適切。
			// ただし、この問題はクエリごとに独立しているため、nが1に到達するまでのステップ数を直接計算する。
		}
		
		// 仕様の解釈の再確認:
		// 「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」
		// これは、特定の数nから開始して、操作を繰り返した結果が1になるまでのステップ数を求める、というタスク。
		// 一般的に、この操作（3n+1, n/2など）が「1」に到達する最短経路を問う問題（コネルの問題）として定式化されるが、ここでは「nから始まり操作を繰り返して1になるまでの手数」を求める。
		
		// 最初のnからスタートして1になるまでの手数を計算し直す（メモ化を適用）
		
		memoReset := make(map[int]int64)
		var finalSteps int64 = 0
		currentN = n
		
		if currentN == 1 {
			finalSteps = 0
		} else {
			// 再帰的/メモ化再帰でステップ数を求める
			var calculateSteps func(current int) int64
			calculateSteps = func(curr int) int64 {
				if curr == 1 {
					return 0
				}
				if val, ok := memoReset[curr]; ok {
					return val
				}

				var result int64
				if curr%2 == 0 {
					// 偶数 -> n/2
					result = calculateSteps(curr / 2) + 1
				} else {
					// 奇数 -> 3n+1
					result = calculateSteps(3*curr + 1) + 1
				}

				memoReset[curr] = result
				return result
			}
			
			finalSteps = calculateSteps(n)
		}
		
		totalSteps += finalSteps
	}

	fmt.Printf("total=%d\n", totalSteps)
}
