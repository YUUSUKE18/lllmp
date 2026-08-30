package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		return
	}

	input := sc.Text()
	parts := strings.Split(input, ",")
	counts := make(map[int]int64) // 重複を除いた整数の個数と合計を保持するマップ (値: int -> count+sum)
	totalCount := int64(0)
	sumTotal := int64(0)

	for _, part := range parts {
		w := strings.TrimSpace(part)
		if w == "" {
			continue
		}
		
		n, err := strconv.Atoi(w)
		if err != nil {
			continue
		}

		counts[n]++ // 個数をカウント (重複を除くため、同じ数だけ加算)
		sumTotal += int64(n) // 合計に追加
		totalCount += counts[n] // 重複を除いた整数の総数は各要素が1つずつなので単純な累加ではなく、マップ内の値を足す必要がある。しかし、問題文は「『重複を除いた整数』について」であるため、一意の数だけカウントする必要がある。

	}
	
	// 修正: 「重複を除いた整数」というのは、ユニークな数そのものを指している可能性が高いが、例2の形式から考えると、「個数（ユニーク要素の数）」と「合計（それらの和）」を求めていると考えられる。
	// しかし、上記コードでは counts[n]++ としていて、同じ数が複数回現れた場合でもカウントに含めてしまっている可能性がある。
	// 「重複を除いた整数」の解釈: 
	// A) ユニークな数だけリスト化し、その個数を count とする (例: [1,2,2] -> 1,2; count=2, sum=3)
	// B) 入力されたすべての要素をカウントして合計を求める (例: [1,2,2] -> count=3, sum=5)
	// 問題文「『重複を除いた整数』について」は、A の解釈が自然。つまり、ユニークな数だけを集計する。

	counts = make(map[int]int64) // リセットして再計算 (上記のロジックを修正するため)
	sumTotal = int64(0)
	totalCount := 0
	
	for _, part := range parts {
		w := strings.TrimSpace(part)
		if w == "" {
			continue
		}

		n, err := strconv.Atoi(w)
		if err != nil {
			continue
		}

		counts[n]++ // ここは「重複を除いた」という条件に反する可能性がある。ユニークな数だけカウントするなら、存在するか確認すべきだが、通常 map のキーが存在すれば OK となる。
		sumTotal += int64(n)
		totalCount = len(counts) // ユニークな数の個数はマップの長さになる

	}

	fmt.Printf("count=%d sum=%d\n", totalCount, sumTotal)
}
