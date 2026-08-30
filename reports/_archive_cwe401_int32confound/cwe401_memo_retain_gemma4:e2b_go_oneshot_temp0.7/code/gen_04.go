package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	var total int64 = 0
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		if n == 1 {
			total += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		var count int64 = 0
		current := n
		
		// サイクル検出と計算
		path := make([]int64, 0)
		visited := make(map[int64]int) // 値 -> 発生したステップ数
		
		for current != 1 {
			if current == 0 {
				// 0 に到達した場合、無限ループまたは不正な遷移だが、問題の制約上発生しないはず
				break
			}
			if _, ok := visited[current]; ok {
				// サイクル検出
				// サイクル内のステップ数を計算
				cycleStartStep := visited[current]
				cycleLength := count - cycleStartStep
				
				// サイクル内の移動回数を計算
				remainingSteps := 0
				temp := current
				for i := 0; i < cycleLength; i++ {
					temp = (temp % (current - cycleStartStep)) + cycleStartStep // サイクル内での相対位置を維持
					remainingSteps++
				}
				
				// サイクルを飛び越える計算
				stepsToSkip := (count - cycleStartStep) / cycleLength
				current = current
				for i := 0; i < stepsToSkip; i++ {
					current = (current / 2) % (current % 2) + (current % 2) // サイクル内での遷移をシミュレートする必要があるが、ここでは単純にサイクルをスキップする
				}
				
				// サイクル検出後の処理は複雑になるため、ここでは単純な再帰的なメモ化で十分とする (問題文の制約から、この問題はCollatz予想の特殊なケースであり、通常はメモ化で十分)
				// 再度、単純なメモ化に戻る
				break
			}
			
			visited[current] = count
			path = append(path, current)
			count++

			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
		}
		
		// 単純なメモ化による計算 (サイクル検出の複雑さを避けるため、ここでは再帰的メモ化を適用する)
		
		// メモ化を再実装（よりクリーンに）
		
		memo = make(map[int64]int64)
		
		var calculateSteps func(start int64) int64
		calculateSteps = func(start int64) int64 {
			if start == 1 {
				return 0
			}
			if result, ok := memo[start]; ok {
				return result
			}

			current := start
			steps := int64(0)
			path := []int64{}
			
			// サイクル検出のための追跡
			visited := make(map[int64]int64)
			
			for current != 1 {
				if current == 0 {
					// 0に到達した場合、これは通常ありえないが、念のため終了
					break
				}
				if _, ok := visited[current]; ok {
					// サイクル検出
					cycleStartStep := visited[current]
					cycleLength := steps - cycleStartStep
					
					// サイクル内の移動回数を計算
					// サイクルを検出した時点で、現在のステップ数 (steps) とサイクル開始位置 (cycleStartStep) が分かっている
					
					// サイクル内の移動回数を計算し、残りのステップを計算
					remainingSteps := steps - cycleStartStep
					
					// サイクルを完全にスキップするための移動回数
					numCycles := remainingSteps / cycleLength
					steps += numCycles * cycleLength
					
					// サイクルを検出した時点で、計算を終了し、サイクル開始点に戻る
					current = path[cycleStartStep] // サイクル開始点に戻る
					break
				}
				
				visited[current] = steps
				path = append(path, current)
				
				if current%2 == 0 {
					current /= 2
				} else {
					current = 3*current + 1
				}
				steps++
			}
			
			// 最終的な結果の格納
			memo[start] = steps
			return steps
		}
		
		// 最終的な計算（再帰的メモ化）
		steps := calculateSteps(n)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
