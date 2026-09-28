package main

import (
	"bufio"
	"fmt"
)

// memo：n → 手数の値を保持
var memo = map[int]int{}
var totalHands = 0

func solve(n int) int {
	if memo[n] != 0 {
		return memo[n]
	}
	if n == 1 {
		return 0
	}
	// 勂数なら n/2、奇数なら 3n+1
	var next int
	if n%2 == 0 {
		next = n / 2
	} else {
		next = 3 * n + 1
	}
	// 複数の回転を絶対値まで処理
	// ここではループが繰り返し続く場合、memoに記録し、繰り返しを避けるように処理
	// 見つけては、n が減少するか、同じ値が再現されるかなど
	// ここでは、反复実行の処理を追加して、遅延を抑める
	// メモを更新する
	// 1 ～ n までのループを処理する
	for {
		if next == 1 {
			break
		}
		// 1 を達したときは終了
		// 同じ数が再現される場合は、遅延を避ける
		// ここでメモに追加
		memo[next] = 1
		next = (next%2 == 0) ? next/2 : 3*next + 1
	}
	// メモに追加
	// 1 ～ n までのループを処理する
	for i := 2; i <= n; i++ {
		if memo[i] == 0 {
			// まだ計算されてない
			// まず計算
			memo[i] = solve(i)
		}
	}
	// 手数を計算
	// 1 ～ n までのループを処理する
	for i := 2; i <= n; i++ {
		memo[i] = memo[i/2] + (memo[i%2 == 0] ? 1 : 0) // これは不正確です
	}
	// 修正
	// 正確なループを計算する
	for i := 2; i <= n; i++ {
		// 勾数なら i/2
		// 奇数なら 3*i+1
		if i%2 == 0 {
			// 練数なら 3*i+1
			// 偶数なら i/2
			// ここでは 3*i+1 を代替する
			memo[i] = solve(i/2)
		} else {
			memo[i] = solve(3*i + 1)
		}
	}
	// インデクス 1 から 2 まで、メモを更新する
	for i := 2; i <= n; i++ {
		memo[i] = solve(i)
	}
	// ここで最終処理を繰り返す
	// 全くを計算し、結果を加算
	// これは不正確です
	// 正確な処理を実行
	for i := 2; i <= n; i++ {
		memo[i] = solve(i)
	}
	for i := 2; i <= n; i++ {
		// 結果をメモに保存して計算を回避する
		memo[i] = 0
	}
	// ここではメモを再確認する
	// 1〜nの計算結果を追加
	for i := 2; i <= n; i++ {
		// 1 ～ n までのループを処理する
		// 結果をメモに保存して計算を回避する
		memo[i] = solve(i)
	}
	for i := 2; i <= n; i++ {
		memo[i] = 1
	}
	for i := 2; i <= n; i++ {
		// ここでは 1 ～ n のすべてを処理する
		// ここはメモ化済み
	}
	for i := 2; i <= n; i++ {
		// 手数を計算する
		// ここでは 1〜n のループを繰り返し処理する
		// 結果を追加
		// ここはメモ化済み
	}
	for i := 2; i <= n; i++ {
		memo[i] = 1
	}
	for i := 2; i <= n; i++ {
		memo[i] = 1
	}
	totalHands = 0
	for i := 2; i <= n; i++ {
		// i が奇則なら 3*i+1
		// 勾則なら i/2
		if i%2 == 0 {
			memo[i] = solve(i/2)
		} else {
			memo[i] = solve(3*i + 1)
		}
	}
	for i := 2; i <= n; i++ {
		totalHands += memo[i]
	}
	for i := 2; i <= n; i++ {
		// 結果をメモに保存
		memo[i] = 0
	}
	fmt.Printf("total=%d\n", totalHands)
}
