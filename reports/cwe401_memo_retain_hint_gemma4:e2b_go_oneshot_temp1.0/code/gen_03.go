package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		var count int64 = 0
		current := n

		for current != 1 {
			if _, ok := memo[current]; ok {
				// 既に計算済みの場合、メモ化された値を加算して終了
				count += memo[current]
				break
			}
			
			// 既に再帰的に計算中の値（サイクル検出）
			if _, ok := memo[current]; ok && memo[current] == -1 {
				// サイクル検出。この場合、他のパスで処理されるべきだが、
				// この問題は1に収束するため、通常は発生しないか、計算ミスを意味する。
				// 今回は、上記ループで計算が完了する前提で進める。
				break
			}

			// 再帰呼び出しまたはメモ化された値の利用
			if current == 1 {
				count += 0 // 1に到達した
				break
			}
			
			if current == 0 { // 0は入力の制約外だが、念のため
				break
			}

			if current > 0 {
				if current % 2 == 0 {
					current /= 2
				} else {
					current = 3*current + 1
				}
				
				// 遷移時のコストは1
				count++
			}
			
			// メモ化
			memo[n] = count
			
			// サイクル検出とループ制御のための追加のロジックは、
			// 厳密には、入力されたnから1までのパスを追跡し、
			// 1に到達するまでのステップ数を数える必要があります。
			// 各クエリ n について、nから1に到達するまでのステップ数を求めるため、
			// 単純なメモ化（nから1への最短経路）ではなく、nが辿る経路を追跡し、
			// サイクルを検出しながら合計を計算する必要があります。
			
			// ここでは、標準的な「3n+1問題」の計算をメモ化で実現します。
			// 質問の意図を「nが1になるまでのステップ数」と解釈し、
			// 1回のクエリに対するコストを計算します。
			
			// nから1へのパスを追跡し、メモ化を適用します。
			// nが1になるまでのステップ数を計算
			
			// 再計算のためのループに戻る（サイクル処理のため）
			if current == n {
				// サイクルが発生した場合、このnは1に収束しない可能性がある。
				// しかし、3n+1問題は必ず1に収束するため、これは発生しないはず。
				break 
			}
		}
		
		// 厳密なメモ化と合計計算のロジックを再構築（サイクル検出とメモ化を適用）
		
		// 毎回クエリごとに独立したメモ化が必要なため、ループの外で管理する。
		// nが非常に大きくなるため、再帰や深層探索の代わりに、
		// 1に収束するまでのパスを追跡してメモ化します。
		
		// 各クエリ n について、nから1への最短経路の長さを計算します。
		
		
		// --------------------------------------------------------------
		// 再度、クエリごとにコストを計算し、メモ化を適用します。
		// ここでは、外部のメモ化テーブル（全体で共有）を使用します。
		
		var currentN int64 = n
		var steps int64 = 0
		
		// 各クエリ n の計算
		// 1に到達するまでのステップ数を求める。
		// スタックまたは再帰とメモ化を用いる。
		
		// 呼び出しスタックとメモ化テーブルをクエリごとに初期化する。（制約上、全体で共有する方が効率的）
		
		// 外部でメモ化テーブルを定義し、クエリごとにアクセスする。
		// 構造体やグローバル変数を使ってメモ化を管理します。
		
		// --------------------------------------------------------------
		// 最終的な構造: 外部メモ化テーブルを持つ。
		
		// 繰り返し処理を行うため、本処理を再構成します。
		// 処理を分けるため、この内側のループは削除し、全体構造を再構築します。
	}
	
	// --------------------------------------------------------------
	// 最終的な実装（外部メモ化を伴う）
	
	memo := make(map[int64]int64)
	
	// 入力を全て読み込む処理を最初に行う (標準入力全体をメモリに保持する)
	inputLines := []string{}
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		inputLines = append(inputLines, line)
	}
	
	for _, line := range inputLines {
		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			total += 0
			continue
		}
		
		// メモ化テーブルは、nから1への到達ステップ数を保持する
		
		// 再帰関数（メモ化再帰）で計算
		var calculate func(current int64) int64
		calculate = func(current int64) int64 {
			if current == 1 {
				return 0
			}
			if val, ok := memo[current]; ok {
				return val
			}
			
			// サイクル検出（計算中の値が自分自身に戻ってくる）
			// 探索中にすでに計算中の値があれば、それは無限ループ（サイクル）
			// この問題では必ず1に収束するため、サイクルは発生しないと仮定する。
			
			var result int64
			if current%2 == 0 {
				result = 1 + calculate(current/2)
			} else {
				result = 1 + calculate(3*current+1)
			}
			
			memo[current] = result
			return result
		}
		
		// nが大きな値に対して、再帰の深さ制限やオーバーフロー対策が必要だが、
		// 64bit整数で十分であり、問題の制約を考慮すると、この再帰で十分と判断する。
		
		steps := calculate(n)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
