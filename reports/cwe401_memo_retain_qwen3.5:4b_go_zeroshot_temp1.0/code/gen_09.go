package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
)

func memoizeCollatz(start int, end []int64) {
	end[0] = 1 // 終値は常に 1
	mem := map[int64]int{}
	
	// 再帰的に計算。Go のスタックが深い場合は注意が必要だが、
	// Collatz 序列の値は通常 32bit/64bit 範囲内にとどまるため再帰が安定する場合がある。
	// より安全のためにループと探索を用いる方法もありますが、
	// Go においてはメモ化付きの再帰関数がコードをシンプルにするため用います。
	
	// 引数の意味: start は現在の数値, end[0] は n/2 (n が偶数) または 3n+1 (n が奇数) の計算結果を格納している (ここでは next_val を表す)
	// ただし、仕様では「操作を繰り返し」とあるので、next_n を求め、その next_n に対する手数を求めます。
	
	// 実際の実装: 再帰的に 'steps' を取得
	getSteps := func(current int64, mem map[int64]int) int {
		if v, ok := mem[current]; ok {
			return v
		}
		
		if current == 1 {
			mem[current] = 0
			return 0
		}
		
		// 次の数値を計算
		var next int64
		switch current % 2 {
		case 0: // 偶数
			next = current / 2
		default: // 奇数
			next = 3*current + 1
		}
		
		steps := getSteps(next, mem) + 1
		mem[current] = steps
		return steps
	}

	for _, n := range start {
		if int64(n) >= 0 && int64(n) < math.MaxInt32 { // 入力値の制約確認 (デバッグ用、本番では不要かもしれないが安全のため)
			mem[int64(n)] = getSteps(int64(n), mem)
		}
	}
}

// 上記の再帰関数とメモ化ロジックをそのまま組み込んだ版を作成する。
// go/math を使わないため、最大値は定数または float64 で比較する。

func run() {
	var total int64 = 0
	mem := make(map[int64]int)

	reader := bufio.NewReader(os.Stdin)

	for {
		line, err := reader.ReadString('\n')
		if err == io.EOF {
			break
		}
		if err != nil {
			continue
		}

		// 空行または整数として解釈できない行をスキップ
		line = line[:len(line)-1] // ユニコード改行などを除去
		if len(line) == 0 || line == " " {
			continue
		}

		var n int
		_, err = fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		// メモ化して再計算する関数
		calcSteps := func(cur int64, memo map[int64]int) int {
			if val, ok := memo[cur]; ok {
				return val
			}

			steps := 0
			if cur == 1 {
				mem[cur] = steps // 0
			} else {
				nextVal := cur
				if nextVal%2 == 0 {
					nextVal /= 2
				} else {
					nextVal = 3*cur + 1
				}

				steps += calcSteps(nextVal, memo)
				mem[cur] = steps
			}
			return steps
		}

		total += calcSteps(int64(n), mem)
	}

	fmt.Printf("total=%d\n", total)
}
