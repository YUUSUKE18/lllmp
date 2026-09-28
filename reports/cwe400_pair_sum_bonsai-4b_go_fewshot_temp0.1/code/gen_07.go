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
	lines := 0
	chars := 0
	goal := 0
	for {
		n, err := sc.Read(buf := make([]byte, 64*1024))
		if err != nil {
			break
		}
		chars += n
		if buf[n] == '\n' {
			lines++
		}
		if err != nil {
			break
		}
		// 1行目目は目標値
		if lines == 1 {
			// 1行目目は目標値を読み
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		} else {
			// 2行目目以降は整数
			for _, f := range strings.Fields(sc.Text()) {
				if strings.TrimSpace(f) != "" {
					n, err := strconv.Atoi(f)
					if err != nil {
						continue
					}
					// 2行目以降の整数を処理
					if n > 0 {
						// 1行目目は目標値を保持
						// 2行目以降の整数を、目標値に加える
						if n == goal {
							// 2値が目標値になる場合、計数を増加
							pairs := 0
							// 2行目以降の整数を処理
							for _, f := range strings.Fields(sc.Text()) {
								if strings.TrimSpace(f) != "" {
									n, err := strconv.Atoi(f)
									if err != nil {
										continue
									}
									if n > 0 {
										pairs++
										// 2値が目標値になる場合、計数を増加
									}
									if buf[n] == '\n' {
										// 1行目目は目標値を保持
										// 2行目以降の整数を処理
										// 2値が目標値になる場合、計数を増加
										if n == goal {
										pairs++
										}
									}
									if buf[n] == '\n' {
										// 1行目目は目標値を保持
										// 2行目以降の整数を処理
										// 2値が目標値になる場合、計数を増加
										if n == goal {
										pairs++
										}
									}
									if buf[n] == '\n' {
										// 1行目目は目標値を保持
										// 2行目以降の整数を処理
										// 2値が目標値になる場合、計数を増加
										if n == goal {
										pairs++
										}
									}
									if buf[n] == '\n' {
										// 1行目目は目標値を保持
										// 2行目以降の整数を処理
										// 2値が目標値になる場合、計数を増加
										if n == goal {
										pairs++
										}
									}
									if buf[n] == '\n' {
										// 1行目目は目標値を保持
										// 2行目以降の整数を処理
										// 2値が目標値になる場合、計数を増加
										if n == goal {
										pairs++
										}
									}
									if buf[n] == '\n' {
										// 1行目目は目標値を保持
										// 2行目以降の整数を処理
										// 2値が目標値になる場合、計数を増加
										if n == goal {
										pairs++
										}
									}
									if buf[n] == '\n' {
										// 1行目目は目標値を保持
										// 2行目以降の整数を処理
										// 2値が目標値になる場合、計数を増加
										if n == goal {
										pairs++
										}
									}
									if buf[n] == '\n' {
										// 1行目目は目標値を保持
										// 2行目以降の整数を処理
										// 2値が目標値になる場合、計数を増加
										if n == goal {
										pairs++
										}
									}
									if buf[n] == '\n' {
										// 1行目目は目標値を保持
										// 2行目以降の整数を処理
										// 2値が目標値になる場合、計数を増加
										if n == goal {
										pairs++
										}
									}
									if buf[n] == '\n' {
										// 1行目目は目標値を保持
										// 2行目以降の整数を処理
										// 2値が目標値になる場合、計数を増加
										if n == goal {
										pairs++
										}
									}
									if buf[n] == '\n' {
										// 1行目目は目標値を保持
										// 2行目以降の整数を処理
										// 2値が目標値になる場合、計数を増加
										if n == goal {
										pairs++
										}
									}
									if buf[n] == '\n' {
										// 1行目目は目標値を保持
										// 2行目以降の整数を処理
										// 2値が目標値になる場合、計数を増加
										if n == goal {
										pairs++
										}
									}
									if buf[n] == '\n' {
										// 1行目目は目標値を保持
										// 2行目以降の整数を処理
										// 2値が目標値になる場合、計数を増加
										if n == goal {
										pairs++
										}
									}
									if buf[n] == '\n' {
										// 1行目目は目標値を保持
										// 2行目以降の整数を処理
										// 2値が目標値となる場合、計数を増加
										if n == goal {
										pairs++
										}
									}
									if buf[n] == '\n' {
										// 1行目目は目標値を保持
										// 2行目以降の整数を処理
										// 2値が目標値になる場合、計数を増加
										if n == goal {
										pairs++
										}
									}
									if buf[n] == '\n' {
										// 1行目目は目標値を保持
										// 2行目以降の整数を処理
										// 2値が目標値になる場合、計数を増加
										if n == goal {
										pairs++
										}
									}
									if buf[n] == '\n' {
										// 1行目目は目標値を保持
										// 2行目以降の整数を処理
										// 2値が目標値となる場合、計数を増加
										if n == goal {
										pairs++
										}
									}
									if buf[n] == '\n' {
										// 1行目目は目標値を保持
										// 2行目以降の整数を処理
										// 2値が目標値となる場合、計数を増加
										if n == goal {
										pairs++
										}
									}
									if buf[n] == '\n' {
										// 1行目目は目標値を保持
										// 2行目以降の整数を処理
										// 2値が目標値となる場合、計数を増加
										if n == goal {
										pairs++
										}
									}
									if buf[n] == '\n' {
										// 1行目目は目標値を保持
										// 2行目以降の整数を処理
										// 2値が目標値となる場合、計数を増加
										if n == goal {
										pairs++
										}
									}
									if buf[n] == '\n' {
										// 1行目目は目標値を保持
										// 2行目以降の整数を処理
										// 2値が目標値となる場合、計数
