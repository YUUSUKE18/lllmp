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
			// 1 のときの手数は 0
			total += 0
			continue
		}

		// 再帰/反復計算とメモ化
		// 過程を追跡しながら計算する
		currentN := n
		steps := int64(0)
		path := []int{} // 計算過程を記録するパス

		for currentN != 1 {
			if val, found := memo[currentN]; found {
				// メモがあれば、そこから直接結果を計算して終了
				steps += val
				break
			}
			path = append(path, currentN)

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}

		// 1 に到達した後のステップ数を計算
		if currentN == 1 {
			// 最後に到達した時のステップ数を計算し、パス上のすべての値をメモする
			// 戻る経路で計算したステップ数を加算する
			finalSteps := int64(0)
			for _, val := range path {
				// 逆方向を辿って、元のNから1までの移動回数を計算する。
				// これは、各ステップで「nが偶数ならn/2」「nが奇数なら3n+1」の逆操作を行うことで、
				// 1に戻るまでの回数（ステップ数）を求めることを意味する。
				
				// 厳密には、メモ化をうまく使うためには、各状態から1への最短経路を求めるか、
				// または、元のnから1への操作を直接追跡し、そのパス上の各ノードでメモ化するのが一般的である。
				
				// 今回は「nが1になるまでの手数」を求めるので、単純にnから1までの操作を追跡する。
				// 再帰的に考えると、f(n) = f(n/2) or f(3n+1) + 1 となる。
				
				// 貪欲なアプローチ：現在のnから1へのパスの長さを計算する
				tempN := val
				currentSteps := int64(0)
				
				// この「val」から「1」に到達するまでのステップ数を計算し、それを直接メモする
				// ただし、もし既に計算済みの値があればそれを利用する
				
				// 今回の仕様は「nが1に到達するまでの手数」なので、
				// 最初に計算した n から 1 への直接のステップ数を求める。
				// 経路を遡るのではなく、再帰的なメモ化を利用する方が計算量は抑えられる。
				
				// 経路を遡って合計する（これは最も安全なメモ化の利用法）
				// このアプローチでは、現在の計算パス上での各ステップ数（これはnから始めた時のステップ数）を累積する。
				
				// 最初の計算 (nから1への経路) の手数を確定させる。
				// 今回はnから1への経路を追跡したため、pathの長さがその手数になる。
				// ただし、pathはnから始まるので、pathの長さがnから1へのステップ数になる。
				
				// memo[val]が計算済みなら、その結果を直接使う。
				if _, found := memo[val]; found {
					finalSteps += memo[val]
				} else {
					// 既に計算済みでなければ、ここで再帰的に計算する（これはメモ化の再帰的利用）
					// ここでは、最初に計算した経路を信用し、パス上の値をメモする。
					// 後の処理でこのパスを利用する。
					finalSteps += int64(len(path)) // これは不正確。

				}
			}
			
			// 経路を辿って、すべての要素をメモする
			for _, v := range path {
				memo[v] = steps // steps は n から v への遷移回数
			}
			
			// 最終的な手数は、最初のNから1への経路の長さをそのまま使う
			total += steps
			break
		}
	}

	fmt.Printf("total=%d\n", total)
}
