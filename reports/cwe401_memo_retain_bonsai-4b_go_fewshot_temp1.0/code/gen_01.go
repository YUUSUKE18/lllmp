package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	lines := 0
	for {
		n, err := sc.Scan()
		if err != nil {
			break
		}
		if err == io.EOF {
			break
		}
		if strings.Fields(n, ",") == nil || n == "" {
			continue
		}
		nInt := 0
		for _, s := range strings.Fields(n, ",") {
			if strings.TrimSpace(s) == "" {
				continue
			}
			if err := strconv.Atoi(s); err != nil {
				continue
			}
			nInt = s
		}
		if nInt == "1" {
			// 1は1をそのまま処理するが、手数は0
			continue
		}
		// nは整数として解析
		if !nInt == "" {
			n := int(nInt)
			// メモリでキャッシュ
			if memo[n] == nil {
				// 奇数なら3n+1, 偶数ならn/2
				if n%2 == 0 {
					result := n / 2
				} else {
					result := 3*n + 1
				}
				// 1で到達するまでの手数を計算
				steps := 0
				curr := result
				// 1に到達するまでの処理
				for curr != 1 {
					if curr%2 == 0 {
						curr = curr / 2
					} else {
						curr = 3*curr + 1
					}
					if memo[curr] != nil {
						// 確実にすでに計算済みなら、スキップ
						// 値をメモに記存して後処理
					} else {
						// メモ化済みならスキップ
						// 1に到達するまでの計算を行う
						steps = 0
						curr = result
						for curr != 1 {
							if curr%2 == 0 {
								curr = curr / 2
							} else {
								curr = 3*curr + 1
							}
							if curr == 1 {
								// 1に到達する前に終了
								break
							}
						}
						memo[curr] = steps
					}
				}
				if result == 1 {
					// 1に達するまでの手数は0
				}
			}
		}
		// 実際のインプut: 1～N は1〜Nの各整数を1の単位で解析
		// ここで「1」を例外として処理し、他のnは適用処理
		// もしメモに該当する場合に処理
	}
	fmt.Printf("total=%d\n", lines)
}
