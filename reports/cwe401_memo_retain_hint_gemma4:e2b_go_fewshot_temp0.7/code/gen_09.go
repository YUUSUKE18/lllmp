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

		// 再帰的な操作（またはループ）による手数の計算
		var steps int64 = 0
		current := n
		
		// 1に到達するまでの手数を計算
		for current != 1 {
			if current == 1 {
				break
			}
			
			// メモ化チェック
			if val, ok := memo[current]; ok {
				steps += val
				current = 1 // 1に到達したと仮定してループを抜ける (これは誤り。メモ化された値が到達までの手数そのものであるため、再帰的な考え方に変更する)
				break
			}

			// 操作の適用
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			
			// 1に到達するまでの総ステップ数を計算するため、現在のステップ数を加算する
			// この問題は、nから1に到達するまでの操作回数を求める問題であり、
			// 1に到達するまでの操作回数を求めるのではなく、操作を繰り返す過程で何ステップかかったかを求める。
			// 課題の意図を再解釈する：nを1にするまでの操作の総回数を求める。
			// この操作はコネルの問題（3n+1問題）に似ている。
			
			// 実際には、nが1になるまでの操作回数を求める。
			// n=4: 4 -> 2 (1回) -> 1 (2回)
			// n=3: 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7回)
			
			// 1に到達するまでの手数を求めるので、ループ内でステップ数をカウントする。
			steps++
		}
		
		// 1に到達した後の処理
		if current == 1 {
			// 1に到達するまでのステップ数をステップ変数に格納
			// ループ内で既に steps が更新されている
		} else {
			// 意図通り1に到達しなかった場合（例：入力が負の数など、問題の制約外の場合）
			// この問題設定では、n>=1なので必ず1に収束すると仮定する。
		}


		// メモ化の更新
		// ここで memo[n] には、nから1に到達するまでのステップ数が格納されるべき。
		// しかし、上記ループの実装では、元のnからスタートして1に到達するまでのステップ数を計算している。
		// 別の解釈が必要。
		
		// 修正：nが与えられたときの「nが1になるまでの手数」を求める。
		// nが与えられたときの計算を再実行し、その結果をメモ化する。
		
		// 現在のnから1に到達するまでの手数を再計算し、メモ化する。
		
		current = n
		tempSteps := 0
		path := []int{} // 経路を追跡するためにリストを使用
		
		for current != 1 {
			path = append(path, current)
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
		}
		
		// 1に到達した後の最後のステップ（操作）を数える
		tempSteps = len(path)
		
		// 経路の逆順に辿り、各ステップが何回繰り返されたかを考えるのは複雑すぎる。
		// 課題は「n が1になるまでの手数」なので、nからスタートして1になるまでの操作回数を数える。
		
		// 最初の試行に戻る。nから1になるまでの操作回数を数える。
		
		current = n
		steps = 0
		for current != 1 {
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			steps++
		}
		
		// 計算結果を合計に加算
		total += int64(steps)

		// メモ化 (nから1へのパスの長さ)
		memo[n] = int64(steps)
	}

	fmt.Printf("total=%d\n", total)
}
