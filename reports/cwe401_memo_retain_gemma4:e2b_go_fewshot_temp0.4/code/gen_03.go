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

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			memo[1] = 0
		} else if _, ok := memo[n]; !ok {
			// 再帰または反復計算で手数を求める
			currentN := n
			steps := int64(0)
			path := []int{}
			
			// 1に到達するまでのパスを追跡し、メモ化する
			for currentN != 1 {
				if currentN == 0 {
					// 0は入力として想定されていないが、念のため
					break
				}
				
				if _, ok := memo[currentN]; ok {
					// 既にメモがあればそこから計算を続ける
					steps += memo[currentN]
					currentN = 1 // 既に1に到達したと仮定してループを抜ける
					break
				}

				if currentN%2 == 0 {
					currentN /= 2
				} else {
					currentN = 3*currentN + 1
				}
				path = append(path, currentN)
				steps++
			}

			// パスを遡ってメモ化する
			// 最後のステップで計算した値から逆算して、各ステップの手数を計算する
			// ここでは、nから1に到達するまでのステップ数を直接計算する方が効率的
			
			// 再計算してメモ化する（より安全な方法）
			tempN := n
			steps = 0
			path = []int{}
			
			// 探索中にメモにヒットするまで繰り返す
			for tempN != 1 {
				if val, ok := memo[tempN]; ok {
					steps += val
					tempN = 1 // 既に1に到達したと仮定
					break
				}
				
				if tempN%2 == 0 {
					tempN /= 2
				} else {
					tempN = 3*tempN + 1
				}
				path = append(path, tempN)
				steps++
			}
			
			// 逆順にメモをセットする
			// pathは [n, n_1, n_2, ..., 1] の順になっている
			// path[0] = n, path[1] = nの操作後の値, ...
			
			// 実際には、nから1に到達するまでの総ステップ数を求めるので、
			// nからスタートして1に到達するまでのパスを追跡する
			
			// 再度、nから1へのパスを追跡してメモする
			current := n
			count := int64(0)
			history := []int{}
			
			for current != 1 {
				if _, ok := memo[current]; ok {
					// 既に計算済みの値に到達した場合、その手数を加算して終了
					count += memo[current]
					current = 1 // 終了
					break
				}
				
				history = append(history, current)
				if current%2 == 0 {
					current /= 2
				} else {
					current = 3*current + 1
				}
				count++
			}
			
			// 1に到達したときのステップ数（0）を考慮して、最後のステップを追加
			if current == 1 {
				// 1に到達する直前のステップで、memo[1]=0 を加算する
				if len(history) > 0 {
					// 最後の要素は1になる直前の値
					if _, ok := memo[current]; ok {
						count += memo[current]
					}
				}
			}
			
			// 最終的な手数をメモに追加
			memo[n] = count
		}

		if err := scanner.Err(); err != nil {
			break
		}
	}

	// すべてのクエリの手数の合計を計算
	for _, n := range memo {
		total += memo[n]
	}

	fmt.Printf("total=%d\n", total)
}
