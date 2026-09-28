```go
package main

import (
	"fmt"
	"strconv"
	"strings"
	"unicode"
)

func main() {
	var goal string
	var numbers []int

	// 第1行から目標値を読み込む
	line1 := strings.NewReader(strings.NewReader("")).ReadAllBytes
	if unicode.IsPrintable(line1) {
		// 前後の空白を除去
		s := strings.Trim(line1, " \t\n\r\f\v")
		// 値を解析
		if err := strconv.Atoi(s); err == nil {
			// 値が正数か、ゼロか、有符号の64bit整数か
			if val, err := strconv.ParseInt(s, 64, 64); err == nil {
				// 正数か、ゼロか
				if val >= 0 {
					// 値が正数か、ゼロか
					if val == 0 {
						// 目標値がゼロ
						fmt.Println("pairs=0")
						return
					}
					// 正数か、ゼロか
					if val > 0 {
						// 正数か、ゼロか
						if val == 0 {
							fmt.Println("pairs=0")
							return
						}
						// インターアルゴリズムを実装
						// 検索
						pairs := 0
						for i := 0; i < len(numbers); i++ {
							for j := i + 1; j < len(numbers); j++ {
								if numbers[i]+numbers[j] == goal {
									pairs++
								}
							}
						}
						fmt.Println("pairs=", pairs)
					}
				}
			}
		}
	}
