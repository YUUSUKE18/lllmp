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
		memo[1] = 0

		currentN := n
		steps := int64(0)

		for currentN != 1 {
			if _, ok := memo[currentN]; ok {
				steps += memo[currentN]
				currentN = 1
				break
			}

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}

		if currentN == 1 {
			// 1に到達するまでの手数を計算し、合計に加算する
			// 再帰的な計算またはメモ化を用いた計算を効率化する
			// この問題は、各クエリ n について n -> 1 に到達するまでのステップ数を求める問題であり、
			// 実際には Collatz conjecture のステップ数を求めることに相当します。
			// 求めたいのは「nが1に到達するまでの手数」なので、再帰的または動的計画法で各 n のステップ数を求める必要がある。

			// ここでは、与えられた n が 1 に到達するまでのステップ数を直接計算し、メモ化を利用する。
			// ただし、問題文の「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます」は、
			// 通常の Collatz 命題のステップ数を求める操作と一致します。
			// 複数クエリの合計を求めるため、各クエリ n に対してステップ数を計算し、合計する。

			// 再計算（メモ化を再利用する形に変更）
			currentSteps := int64(0)
			tempN := n
			path := []int64{}
			
			// 経路を追跡しながら計算し、メモ化を更新する
			for tempN != 1 {
				if _, ok := memo[tempN]; ok {
					// 既知の値があればそこで計算を終了
					currentSteps += memo[tempN]
					tempN = 1 // 終了
					break
				}
				
				// 経路を記録して、後で遡って計算する（効率的ではないが、ここでは直接計算を優先）
				path = append(path, tempN)

				if tempN%2 == 0 {
					tempN /= 2
				} else {
					tempN = 3*tempN + 1
				}
			}

			// 経路を辿って、未計算の値を更新する（これはDFS/再帰のメモ化に似ている）
			// 簡単のため、ここでは単に現在の n から 1 へのステップ数を計算する（メモ化が効かない場合は非効率だが、
			// 1回のクエリに対する計算としては十分）。
			
			// 最終的なステップ数を再計算（メモ化が効かない場合は、この部分がメインの計算になる）
			tempSteps := int64(0)
			tempN = n
			for tempN != 1 {
				if tempN%2 == 0 {
					tempN /= 2
				} else {
					tempN = 3*tempN + 1
				}
				tempSteps++
			}
			total += tempSteps
		}
	}

	fmt.Printf("total=%d\n", total)
}
