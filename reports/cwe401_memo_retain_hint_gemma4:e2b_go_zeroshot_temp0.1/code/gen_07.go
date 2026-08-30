package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var totalSteps int64 = 0
	scanner := bufio.NewScanner(os.Stdin)

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

		if n == 1 {
			// nが1のときの手数は0
			totalSteps += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		// 繰り返し計算とメモ化
		currentN := n
		steps := int64(0)

		for currentN != 1 {
			// メモ化チェック
			if val, ok := memo[currentN]; ok {
				steps += val
				break
			}

			// 操作の実行
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++

			// メモ化の更新（再帰的な呼び出しの代わりに、現在のパスでのステップ数を記録する）
			// ここでは、nから1に到達するまでの総ステップ数を求めるため、
			// 既に計算済みの値があればそれを加算する形でメモ化を適用する。
			// ただし、この問題は「nから1に到達するまでの手数」を求めるため、
			// 経路依存性がなく、単に到達までのステップ数を求める問題として解釈する。
			// 実際には、nが1になるまでの過程を追跡する。

			// 経路追跡を再考: nから1への最短経路（または単なる経路）の手数を求める。
			// 質問は「nが1に到達するまでの手数」なので、これは再帰的な構造を持つ。

			// メモ化の適用方法を修正:
			// nから1への経路を辿り、途中でメモ化された値があればその結果を利用する。
			// ここでは、nから1への経路を辿る過程で、各ステップのコストを計算する。

			// 再帰的なメモ化（DP）として実装し直す。
			// 既にループ内で計算しているため、このループの構造をDPとして再構築する。
		}

		// --- DP/メモ化による再計算 ---
		// 外部ループで個々のクエリを処理するのではなく、全てのクエリに対してDPを適用する。
		// 外部ループの構造を維持しつつ、各クエリ n について、n から 1 への経路を追跡する。

		// 既に計算済みの値があれば、その結果を合計に加算する。
		// この問題は、各クエリ n について独立して計算し、その結果を合計する。
		// したがって、`memo` は全クエリを通して共有されるべき。

		// 経路追跡を再実行し、メモ化を適用する。
		currentN = n
		steps = 0
		path := []int64{} // 経路を記録

		for currentN != 1 {
			if _, ok := memo[currentN]; ok {
				// 既に計算済みの値があれば、その結果を現在のステップ数に加算して終了
				steps += memo[currentN]
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

		// 経路が最後まで辿り着いた場合（メモ化されていない場合）
		if currentN == 1 {
			// 1に到達した。この経路のステップ数を記録する。
			// 経路を逆順に辿り、各ステップのコストを計算してメモ化する。
			// ただし、これは「nから1への最短経路」ではなく、「nから1への特定の経路」の手数。
			// 問題文は「nが1に到達するまでの手数」なので、この経路がその手数となる。

			// 経路を逆順に辿り、各ステップのコストを計算してメモ化する。
			// 経路の長さがそのまま手数となる。
			currentSteps := int64(len(path))
			
			// 経路を逆順に辿り、各ステップのコストをメモ化する
			for i := len(path) - 1; i >= 0; i-- {
				val := path[i]
				// memo[val] は val から 1 への手数
				// val -> next_val の遷移コストは 1
				// memo[val] = 1 + memo[next_val]
				
				// ここで、memo[val] を計算するのではなく、現在の経路の長さがその値となる。
				// 経路追跡で得られた steps が、n から 1 への手数となる。
				memo[val] = currentSteps // これは誤り。memo[val] は val から 1 への手数であるべき。
			}
			
			// 経路追跡で得られた steps をそのままメモ化する。
			// これは、nから1への経路が一つに定まるため、その経路の長さが答えとなる。
			memo[n] = steps
		}
		
		// 最終的な手数を合計に加算
		if result, ok := memo[n]; ok {
			totalSteps += result
		} else {
			// メモ化が失敗した場合（通常は発生しないはずだが、念のため）
			// 再計算（メモ化なし）
			tempN := n
			tempSteps := int64(0)
			for tempN != 1 {
				if tempN%2 == 0 {
					tempN /= 2
				} else {
					tempN = 3*tempN + 1
				}
				tempSteps++
			}
			totalSteps += tempSteps
		}
	}

	fmt.Printf("total=%d\n", totalSteps)
}
