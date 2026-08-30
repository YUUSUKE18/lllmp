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

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			// total += 0
		} else {
			// 変換操作を繰り返す
			count := 0
			currentN := n
			for currentN != 1 {
				if currentN%2 == 0 {
					currentN /= 2
				} else {
					currentN = 3*currentN + 1
				}
				count++
			}
			total += int64(count)
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理はここでは省略するが、完全な実装では考慮すべき
	}

	fmt.Printf("total=%d\n", total)
}
