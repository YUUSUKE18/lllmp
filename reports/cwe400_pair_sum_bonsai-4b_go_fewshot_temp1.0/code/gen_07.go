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
	var pairs (int, int) = 0
	current := 0

	for {
		n, err := sc.Read(buf := make([]byte, 64*1024))
		if err != nil {
			break
		}
		if n == 0 {
			break
		}
		line := string(buf[:n])
		if strings.TrimSpace(line) == "" {
			continue
		}
		if _, err := strconv.Atoi(line); err != nil {
			continue
		}

		if current == 0 {
			current = line
			continue
		}

		if _, err := strconv.Atoi(line); err != nil {
			continue
		}

		// 実際の目標値が最初の行
		if current == targetValue {
			// 目標値が当たった行を確認し、あとに2つを発見
			count := 0
			for i := 0; i < 2; i++ {
				for _, w := range strings.Split(line, ",") {
					if w == "" {
						continue
					}
					if w == targetValue {
						count++
						// 最後に2つに到達したときに終了
						if count == 2 {
							break
							// あとに2つを発見
							return
						}
					}
				}
			}
			current = 0
			continue
		}

		// 各目標値の出発項目（1番目は0番目）
		current = current + 1
		if current > 0 {
			// 目標値が2番目に来るなら2番目を计数
			if current == 2 {
				pairs = 2
				break
			}
		}

		// 求めている2組の位置が2番目に来るなら、2組を確認
		if current == 2 {
			// 2番目はtargetValue
			// 3番目はtargetValue+1
			if current == 2 {
				pairs = 2
				return
			}
		}
	}

	// 2番目から2番目の目標値を出力
	fmt.Printf("pairs=%d\n", pairs)
}
