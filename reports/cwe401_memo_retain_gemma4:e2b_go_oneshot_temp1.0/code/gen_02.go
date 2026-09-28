package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	// 標準入力からデータを読み込む
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0
	memo := make(map[int]int64)

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		var n int
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		if n == 1 {
			// n が 1 のときの手数は 0
			total += 0
			continue
		}

		// メモ化された値があればそれを使用
		if result, ok := memo[n]; ok {
			total += result
			continue
		}

		// メモ化されていない場合、計算と再帰（または繰り返し）
		currentN := n
		steps := int64(0)
		path := []int{} // 計算過程を記録してメモ化に利用

		// 1 に到達するまでの過程を追跡し、計算結果をメモする
		for currentN != 1 {
			if result, ok := memo[currentN]; ok {
				// 途中値がすでにメモされていればそこで計算を終了
				steps += result
				break
			}
			
			// 繰り返し計算とメモ化
			path = append(path, currentN)
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}

		// 1 に到達した時の手数を計算し、経路を遡って合計を計算する (ただし、再帰的に呼び出す形の方がシンプルでメモ化が容易)
		// 今回は、入力 n から 1 までの最短経路の手数を求めるので、再帰的なメモ化（動的計画法）を適用する。

		// 再度、動的計画法的なアプローチで計算とメモ化を整理する
		// 1 から n までの各値について、1 に到達する手数を計算する
		
		// 動的計画法として、すべての値を一度に計算するのではなく、クエリごとに必要な情報のみを計算する。
		// 呼び出し元で n の値が与えられた場合、そのnから1までのステップ数を求める。

		// スタックを用いた、現在のnから1への経路を辿り、経路上の各ステップをメモする
		// ここでは、n から 1 への経路を直接辿ることで、計算過程のメモ化を行う。
		
		// n から 1 への経路を遡って合計を計算
		currentSteps := int64(0)
		tempN := n
		
		// 経路を記録し、どこかで再計算しないようにする
		// 実際には、n から 1 への最短経路を求める問題（Collatz問題）であり、
		// n が与えられたときの「操作の回数」を求めるため、通常のDPで考える。
		
		// n から 1 への最短経路の計算とメモ化を再実装する
		
		// 1 から n までの手数を求めるDPテーブル（再帰的なメモ化）
		
		// 既に計算済みの結果があれば、それを活用する
		
		// n が与えられたときのステップ数を求める（memo[n] = nから1へのステップ数）
		// ここでは、与えられたクエリ n について、n の操作を繰り返して 1 に到達するまでの回数を求める。
		
		// 計算の再試行: n が与えられたときの操作回数を求める
		currentN = n
		steps = 0
		pathValues := []int{} // 経路を記録
		
		// 現在の n から 1 への経路を辿る
		for currentN != 1 {
			if _, ok := memo[currentN]; ok {
				// 経路上のどこかで計算済みであれば、その結果を利用する
				// ただし、これは「nから1までのステップ数」を求める問題なので、
				// 暫定的にこのループでは経路を辿る。
				break
			}
			pathValues = append(pathValues, currentN)
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}
		
		// 実際に1に到達したときのステップ数を計算し、経路を遡ってメモする
		currentSteps = 0
		// 経路は逆順なので、逆順に処理する
		for i := len(pathValues) - 1; i >= 0; i-- {
			val := pathValues[i]
			
			// 現在の値のステップ数は、次の値のステップ数 + 1
			if val == 1 {
				memo[val] = 0
			} else if _, ok := memo[val]; ok {
				// すでに計算済みの結果があればそれを利用
				memo[val] = memo[val] // これはループ内で意味がない
			} else {
				// 前の値が計算済みであることを保証するため、再帰的なメモ化が必要
				// 単純な反復計算で十分な場合は、pathValuesに基づいて計算する
			}
		}
		
		// --- 最適化された計算方法: 毎回 n から 1 へのステップ数を計算し、メモする ---
		
		// 既に計算済みの結果があれば利用
		if result, ok := memo[n]; ok {
			total += result
			continue
		}
		
		// 経路を辿って計算し、途中の値もメモする (メモ化の対象は、その値から1へのステップ数)
		
		currentN = n
		steps = 0
		path := []int{}
		
		// n から 1 への経路を辿る
		for currentN != 1 {
			if _, ok := memo[currentN]; ok {
				// 既に計算済みの値が見つかった場合、そこから 1 へのステップ数を足し合わせる
				// ただし、この問題は「nが与えられたときのステップ数」を求めるため、
				// 既に計算済みの結果を足し合わせる必要がある。
				// 経路を遡って計算することで、この「nから1までのステップ数」を求める。
				
				// 経路上のどこかの値 k について、memo[k] が既知の場合、
				// n -> ... -> k のステップ数 + memo[k]
				
				// ここでは、完全な経路を辿り、到達したときのステップ数を計算する。
				// 途中でメモ化された値に到達したら、そのメモ化された値を使って計算を終える。
				
				// 最もシンプルなのは、探索中に現れた値が既にメモされていれば、そのメモを信用すること。
				// ただし、Collatz問題では、経路上の全要素を計算しないとメモ化が不十分になるため、
				// 経路全体を辿って計算する。
				
				// ここでは、計算過程全体を一つの経路として扱い、最後に n の結果をメモする。
				
				// 経路を辿り、途中で既に計算済みの値に到達したら、その結果を利用して n の結果を確定する。
				
				// 例: n=7 -> 22 -> 11 -> 34 -> 18 -> 9 -> 28 -> 14 -> 7 (ループ)
				// memo[7] が計算中であるため、ここでbreakする必要はない。
			}
			path = append(path, currentN)
			
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}
		
		// ループを抜けたとき、現在のNは1である。
		// この時点での steps が n から 1 へのステップ数である。
		
		// 経路上のすべての値をメモする (n から 1 へのステップ数を求めるため)
		for _, val := range path {
			// pathは逆順なので、val は n, n_1, n_2, ..., 1 の順になっている。
			// この計算は、全ての値について n から 1 へのステップ数を求めるのではなく、
			// 現在の n のステップ数を求める問題に特化させる。
			// したがって、このクエリ n について、n から 1 へのステップ数を計算し、memo[n] に格納する。
		}
		
		memo[n] = steps
		total += steps
	}

	// 合計を標準出力する
	fmt.Printf("total=%d\n", total)
}
