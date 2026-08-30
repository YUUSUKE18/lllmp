package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0
	memo := make(map[int]int64)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		if n == 1 {
			current := int64(0)
		} else if n%2 == 0 {
			current := int64(n / 2)
		} else {
			current := int64(3*n + 1)
		}

		// メモ化と再帰的な計算（またはループ）の実行
		// ここでは、1に到達するまでの手数を求める必要があるため、再帰的な構造を考えます。
		// ただし、この問題は「操作を繰り返して1に到達するまでの手数」を求めるので、
		// 提示された操作（nが偶数ならn/2、奇数なら3n+1）を逆算して1に到達するまでの過程を考える必要があります。
		// 通常、この種のパズルは、操作を「逆操作」で考えると効率的です。

		// ここでは、nから1に到達するまでのステップ数を計算します。
		// n=1 のときの手数は 0 です。
		// n が 1 より大きい場合、
		// n が偶数なら n/2 から n に戻る操作が逆操作。
		// n が奇数なら (n-1)/3 から n に戻る操作が逆操作。

		// 問題文の意図を再解釈します:
		// 「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」
		// これは、nから始まる数列生成過程を意味します。
		// nを操作して1に到達するまでのステップ数を求める。

		// 操作を「n -> next(n)」と定義します。
		// 1 -> 0 (n=1のときの手数は0)
		// 2 -> 1 (2は偶数なので 2/2 = 1)
		// 3 -> 10 (3は奇数なので 3*3+1 = 10)
		// 10 -> 5 (10は偶数なので 10/2 = 5)
		// 5 -> 16 (5は奇数なので 3*5+1 = 16)
		// 16 -> 8 (16は偶数なので 16/2 = 8)
		// 8 -> 4 (8は偶数なので 8/2 = 4)
		// 4 -> 2 (4は偶数なので 4/2 = 2)
		// 2 -> 1 (2は偶数なので 2/2 = 1)
		// 1 に到達しました。手数は 8 ステップ。

		// この「nから1への到達時間」を求めるため、memoizeした結果を使用します。

		if _, ok := memo[n]; !ok {
			if n == 1 {
				memo[1] = 0
			} else if n > 1 {
				var steps int64 = 0
				currentN := int64(n)
				for currentN != 1 {
					if currentN%2 == 0 {
						currentN /= 2
					} else {
						currentN = 3*currentN + 1
					}
					steps++
				}
				memo[n] = steps
			}
		}

		total += memo[n]
	}

	fmt.Printf("total=%d\n", total)
}
