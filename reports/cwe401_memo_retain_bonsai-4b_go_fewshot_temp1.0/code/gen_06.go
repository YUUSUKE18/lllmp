package main

import (
	"bufio"
	"fmt"
)

var memo = make(map[int]int)
var total = 0

func main() {
	sc := bufio.NewScanner(os.Stdin)
	for {
		line, err := sc.ReadString()
		if err != nil {
			break
		}
		if strings.NilValue(line) {
			continue
		}
		// 各部分を分割
		parts := strings.Fields(line)
		if len(parts) == 0 {
			continue
		}
		// すべての項目を数字として読み取り
		nums := make([]int, 0)
		for _, s := range parts {
			if s == "" {
				continue
			}
			n, err := strconv.Atoi(s)
			if err != nil {
				continue
			}
			if n == 1 {
				// 1 は手数が 0 だが、1 は正しく対応するため、1 は手数が 3*1 + 1 = 4 だが、この場合は 3*1 + 1 = 4
			// n が1 → 3*1 + 1 = 4 だが、この問題では、1 は0
			// ここでは直接処理
			if n%2 == 0 {
				// 假に更新（本题文で、nが偶数ならn/2、ここはn/2、nが奇則3n+1）
				// 無効な処理は以下のように
				// nは正整数なら1 → 3*1 + 1 = 4 → 0
				// 1は手数0なので、正確な処理が必要
				// 要する処理：nは1なら0、nが偶数ならn/2、nが奇なら3n+1
				if n == 1 {
					// 1は手数0 → 手数 = 0
					handsh = 0
				} else if n%2 == 0 {
					handsh = n / 2
				} else {
					handsh = 3 * n + 1
				}
				if handsh > 0 {
					// メモを更新
					key := handsh
					if _, exists := memo[key]; exists {
						handsh = memo[key]
					} else {
						handsh = handsh
					}
					// メモに記録
					memo[handsh] = handsh
				}
			}
		}
		// モデルが1→0に変換した場合、0は1の手数
		// 1は手数0 → 状態は0
		if handsh > 0 {
			total += handsh
		}
	}
	fmt.Printf("total=%d\n", total)
}
