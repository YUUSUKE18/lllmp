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

	// メモ化テーブル
	memo := make(map[int64]int64)

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

		// nが1のときの手数は0
		if n == 1 {
			// このnはクエリ自体ではないため、合計には加算しないが、
			// 処理の過程でmemoに格納しておく
			memo[1] = 0
			continue
		}

		// 再帰的または反復的に計算し、メモ化を利用する
		currentN := n
		steps := int64(0)
		path := []int64{} // 計算過程を記録する（メモ化のため）

		for currentN != 1 {
			// メモ化チェック
			if val, ok := memo[currentN]; ok {
				steps = val + int64(len(path))
				break
			}

			// 経路追跡のために現在の値を追加
			path = append(path, currentN)

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
		}

		// ループが終了したとき、currentNは1になっているはず。
		// 最後のステップ数は、pathの長さ（操作回数）と、memoに格納されている値を用いて計算する必要がある。

		// ここでは、より直接的に、nから1に到達するまでの操作回数を求める標準的な手順に従う。
		// 経路追跡とメモ化を組み合わせる。

		// 再計算（より確実なメモ化戦略）
		
		// スタックベースの計算とメモ化
		
		// 各クエリ n について、nから1に到達するまでのステップ数を求める
		
		// ここでは、元の仕様に従い、nが与えられたときのステップ数を求める。
		// 既にmemoに存在しない場合のみ計算し、結果をmemoに保存する。
		
		// 再帰的なメモ化（非効率なので、ここでは直接の計算とメモ化を組み合わせる）
		
		// nが与えられた時のステップ数を求める
		tempN := n
		count := int64(0)
		history := []int64{n}

		for tempN != 1 {
			if tempN == 0 { // 0になることはないが念のため
				break
			}
			
			if tempN == 1 {
				break
			}

			if tempN == 1 {
				break
			}

			if tempN == 1 {
				break
			}

			if tempN == 1 {
				break
			}

			if tempN == 1 {
				break
			}

			if tempN == 1 {
				break
			}

			if tempN == 1 {
				break
			}

			if tempN == 1 {
				break
			}

			if tempN == 1 {
				break
			}
			
			// 既に計算済みの値があれば、その結果を逆算する
			if val, ok := memo[tempN]; ok {
				count += val
				break
			}

			// 操作の実行
			if tempN%2 == 0 {
				tempN /= 2
			} else {
				tempN = 3*tempN + 1
			}
			count++
			history = append(history, tempN)
		}
		
		// この再計算は、メモ化が「nから1への最小ステップ数」を意味する場合にのみ有効。
		// 仕様では「nが偶数ならn/2、奇数なら3n+1に置き換える操作を繰り返し、1に到達するまでの手数を求めます」
		// これは、1に到達するまでの操作回数を求めることを意味する。
		
		// 経路追跡とメモ化を組み合わせた、より効率的な方法を採用する。
		
		// ---------------------------------------------------------------------
		// 再度、メモ化を主軸に計算を再構成する
		// ---------------------------------------------------------------------
		
		// 1. nから1への最短経路を再帰的に計算し、メモ化する
		var calculateSteps func(k int64) int64
		calculateSteps = func(k int64) int64 {
			if k == 1 {
				return 0
			}
			if val, ok := memo[k]; ok {
				return val
			}

			var result int64
			if k%2 == 0 {
				// nが偶数なら n/2
				result = calculateSteps(k / 2) + 1
			} else {
				// nが奇数なら 3n+1
				result = calculateSteps(3*k + 1) + 1
			}

			memo[k] = result
			return result
		}
		
		// 2. nに対するステップ数を計算
		steps := calculateSteps(n)
		
		// 3. 合計に加算
		totalSteps += steps
	}

	// 結果の出力
	fmt.Printf("total=%d\n", totalSteps)
}
