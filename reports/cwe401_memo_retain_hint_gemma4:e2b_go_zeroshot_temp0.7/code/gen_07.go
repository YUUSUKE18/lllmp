package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	// 入力を読み込む
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		// 空行を無視
		if line == "" {
			continue
		}

		// 整数として解釈を試みる
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// n が 1 の場合、手数は 0
		if n == 1 {
			// メモ化された結果があればそれを使う（ここではメモ化構造体を使用する）
			// ただし、この構造体はメインループの外で定義し、再帰的に呼び出す形にするため、
			// ここでは直接計算とメモ化の仕組みを構築する。
			// 実際には、再帰的な計算にメモ化を適用する。
			// 以下の関数内でメモ化を管理する。
			// 今回は、クエリごとに計算を行い、その結果をメモ化テーブルに保存する。
		}

		// メモ化のためのマップを保持（グローバルまたは関数スコープで管理）
		// 外部で関数を定義し、その中でメモ化を管理する方がGo的だが、
		// 競技プログラミングの文脈では、メイン関数内で必要な処理を完結させる。

		// ここでは、再帰とメモ化を組み込んだ関数を定義する。
		// メインループは入力の読み込みと合計の計算に専念する。
	}

	// 実際には、上記ループ内で計算を行う必要がある。
	// 入力された各数に対して、メモ化付きの計算を実行する。
	// 読み込みループを再構成する。
	// ---------------------------------------------------------
	// 再度、入力処理を、メモ化された関数を呼び出す形に修正する。
	// ---------------------------------------------------------
}

// memo は計算結果を保存するためのマップ
var memo = make(map[int64]int64)

// countSteps は、与えられた数 n から 1 に到達するまでの手数を計算し、メモ化する関数。
func countSteps(n int64) int64 {
	if n == 1 {
		return 0
	}
	if result, ok := memo[n]; ok {
		return result
	}

	var steps int64

	if n%2 == 0 {
		// n が偶数なら n/2
		steps = countSteps(n / 2)
	} else {
		// n が奇数なら 3n+1
		steps = countSteps(3*n + 1)
	}

	// メモ化
	memo[n] = steps
	return steps
}

func main() {
	// 入力を読み込む
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	// 標準入力から1行ずつ読み込む
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		// 各クエリに対して countSteps を呼び出す
		// countSteps は内部で memo を利用して高速化する
		steps := countSteps(n)
		total += steps
	}

	// 結果を出力
	fmt.Printf("total=%d\n", total)
}
