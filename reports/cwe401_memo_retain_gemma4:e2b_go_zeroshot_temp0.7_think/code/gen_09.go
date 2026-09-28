package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// calculateSteps は、与えられた数 n から 1 に到達するまでの手数を、メモ化を使用して計算する再帰関数です。
func calculateSteps(n int64, memo map[int64]int64) int64 {
	if n == 1 {
		return 0
	}

	// メモ化チェック
	if val, ok := memo[n]; ok {
		return val
	}

	var result int64
	if n%2 == 0 {
		// n が偶数の場合: n/2
		result = 1 + calculateSteps(n/2, memo)
	} else {
		// n が奇数の場合: 3n+1
		// 3n+1 が int64 の範囲に収まることを前提とする。
		result = 1 + calculateSteps(3*n+1, memo)
	}

	// 結果をメモ化
	memo[n] = result
	return result
}

func main() {
	// 標準入力からデータを読み込む
	scanner := bufio.NewScanner(os.Stdin)
	var totalSteps int64 = 0
	
	// メモ化テーブル
	memo := make(map[int64]int64)

	// 各行をクエリとして処理する
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		// 数値として解析を試みる
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視する
			continue
		}

		// n が 1 以上であることを確認
		if n < 1 {
			continue
		}

		// 計算を実行
		steps := calculateSteps(n, memo)
		totalSteps += steps
	}

	// 結果を出力
	fmt.Printf("total=%d\n", totalSteps)

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は不要だが、堅牢性のために）
	}
}
