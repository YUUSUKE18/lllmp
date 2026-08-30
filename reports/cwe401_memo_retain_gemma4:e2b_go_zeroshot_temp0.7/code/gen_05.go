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
	var total int64 = 0

	// 読み込んだクエリを格納するマップ（メモ化用）
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

		// n=1 の場合は手数は 0
		if n == 1 {
			memo[1] = 0
		} else if _, ok := memo[n]; !ok {
			// メモ化されていない場合は計算を実行
			
			// 再帰的な計算とメモ化
			var count int64 = 0
			currentN := n
			
			// 1に到達するまでの手数を計算
			for currentN != 1 {
				if currentN%2 == 0 {
					currentN /= 2
				} else {
					currentN = 3*currentN + 1
				}
				count++
			}
			memo[n] = count
		}
	}

	// すべてのクエリの結果を合計する（ここで、入力された各行がクエリであると仮定し、その結果を合計する）
	// 仕様の解釈に基づくと、「すべてのクエリの手数の合計を求めます」は、入力された各数 n について、その n から 1 に到達するまでの手数を合計することを意味します。
	// 上記のループ内で、入力された各 n について計算を行い、その結果を total に加算します。
	
	// 再度、入力された値に基づいて合計を計算し直す（仕様の解釈を厳密にするため、入力処理を修正）

	// 再度、入力処理を、入力された各数に対する計算とその合計を求める形に修正します。
	// 入力された各行が独立したクエリ n であると解釈します。

	// 最初の読み取りをクリアし、再計算を行うための構造に変更します。
	// 実際には、入力ストリームが一度しか読み取れないため、最初のループで計算した結果を合計します。

	// 最初のループで計算されたすべての値の合計を求める
	for _, count := range memo {
		total += count
	}

	// 結果を出力
	fmt.Printf("total=%d\n", total)
}
