package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	// 64bit整数の合計を保持するため、int64を使用する
	var total int64 = 0

	// 標準入力から読み込む
	scanner := bufio.NewScanner(os.Stdin)
	
	// クエリを格納するマップ（メモ化用）
	memo := make(map[int]int64)

	for scanner.Scan() {
		line := scanner.Text()
		
		// 空行を無視
		if line == "" {
			continue
		}

		// 整数として解釈を試みる
		n, err := strconv.Atoi(line)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// nが1以上であるか確認（仕様上は1以上の整数が与えられると想定されるが、念のため）
		if n < 1 {
			continue
		}

		// 再帰的または反復的に操作を実行し、1に到達するまでの手数を計算
		// メモ化された値があるかチェック
		if _, ok := memo[n]; !ok {
			// 手数計算の実行
			count := calculateSteps(n, memo)
			memo[n] = count
		}

		// 合計に加算
		total += memo[n]
	}

	// 結果を出力
	fmt.Printf("total=%d\n", total)
}

// calculateSteps は、与えられた数 n から 1 に到達するまでの手数を計算する関数
func calculateSteps(n int, memo map[int]int64) int64 {
	if n == 1 {
		return 0
	}
	if val, ok := memo[n]; ok {
		return val
	}

	var steps int64
	current := int64(n)

	// nが1になるまで操作を繰り返す
	for current != 1 {
		if current%2 == 0 {
			// nが偶数なら n/2
			current /= 2
		} else {
			// nが奇数なら 3n+1
			current = 3*current + 1
		}
		steps++
	}

	// 1に到達したときのステップ数
	memo[n] = steps
	return steps
}
