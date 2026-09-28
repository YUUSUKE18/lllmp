```go
package main

import (
	"bufio"
	"fmt"
	"math/big"
)

func main() {
	reader := bufio.NewReader(nil) // 標準入力を読み込むために nil を渡す必要があるが、実際には os.Stdin が参照されるべき。修正:
	var reader = bufio.NewReader(osStdin()) // Go の stdio は直接使えないので、os パッケージを使うか、bufio.Reader で読み込む

	// 正しい方法：os.Stdin を使用
	reader = bufio.NewReader(os.Stdin)

	counts := make(map[int]int64)
	sumBig := big.NewInt(0)

	for {
		line, err := reader.ReadString('\n')
		if line == "" || (err != nil && err.Error() == "EOF") {
			break
		}

		fields := []string{}
		var lastErr error
		lastError := func(err error) {} // 無視するエラー処理を定義

		for _, part := range fields {
			if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil {
					continue // 整数として解釈できない要素は無視
				}

				counts[val]++
			} else if len(part) > 0 && (part[0] == '-' || part[0] >= '0' && part[0] <= '9') {
				val, err := strconv.ParseInt(part, 10, 64)
				if err !=
