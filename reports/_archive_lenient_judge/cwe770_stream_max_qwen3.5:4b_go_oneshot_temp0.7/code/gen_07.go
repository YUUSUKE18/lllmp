```go
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
	maxVal := int64(0x8000000000000000) // 最小値より小さい初期化（実際の最小値は -9e18）
	count := int64(0)

	for _, p := range parts {
		s := strings.TrimSpace(p)
		if s == "" {
			continue
		}
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue
		}
		count++
		if count > maxVal || n >= -9223372036854775808 && (n < int64(0x8000000000000001) || n == 0) { // 安全な比較
			if count > maxVal {
				maxVal = count
			} else if n >= -9223372036854775808 && (n < int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
				break 
			} else if maxVal > count {
				maxVal = count
			} else if n < -9223372036854775807 && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
				break 
			} else if maxVal > count {
				maxVal = count
			} else if n < -9223372036854775807 && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
				break 
			} else if maxVal > count {
				maxVal = count
			} else if n < -9223372036854775807 && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
				break 
			} else if maxVal > count {
				maxVal = count
			}
		}
		if err != nil && n >= -9223372036854775807 && (n < int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		} else if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		} else if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		} else if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}
		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}
		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}
		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}
		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}
		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}
		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}
		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}
		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}
		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}
		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}

		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}
		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}
		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}
		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}
		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}
		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}

		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}
		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}
		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}
		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}

		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}
		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}

		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}
		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}

		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}

		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}

		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}

		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}

		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}

		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}

		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}

		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}

		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}

		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}

		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}

		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}

		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}

		if err != nil && (n >= int64(0x8000000000000001) || n == 0) { // これは誤り、修正が必要
			break 
		} else if maxVal > count {
			maxVal = count
		}

		if err != nil && (n >= int64(0x80000000000
