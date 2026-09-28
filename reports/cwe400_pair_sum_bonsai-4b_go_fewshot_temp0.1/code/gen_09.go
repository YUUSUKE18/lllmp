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
		// 1行目目：目標値
		if lines == 1 {
			// 1行目目：目標値を読み
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		// 2行目目以降：整数
		// 1行目目：目標値を読み
		for lines > 1 {
			n, err := sc.Scan(&goal)
			if err != nil {
				break
			}
			// 2行目目以降：整数
			if err != nil {
				break
			}
			// 1行目目：目標値を読み
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		}
		// 2行目目以降の整数を读む
		for lines > 1 {
			n, err := sc.Scan(&goal)
			if err != nil {
				break
			}
			// 2行目目以降の整数を读む
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		}
		// 2行目目以降の整数を读む
		for lines > 1 {
			n, err := sc.Scan(&goal)
			if err != nil {
				break
			}
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		}
		// 2行目目以降の整数を读む
		for lines > 1 {
			n, err := sc.Scan(&goal)
			if err != nil {
				break
			}
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		}
		// 2行目目以降の整数を读む
		for lines > 1 {
			n, err := sc.Scan(&goal)
			if err != nil {
				break
			}
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		}
		// 2行目目以降の整数を读む
		for lines > 1 {
			n, err := sc.Scan(&goal)
			if err != nil {
				break
			}
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		}
		// 2行目目以降の整数を读む
		for lines > 1 {
			n, err := sc.Scan(&goal)
			if err != nil {
				break
			}
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		}
		// 2行目目以降の整数を读む
		for lines > 1 {
			n, err := sc.Scan(&goal)
			if err != nil {
				break
			}
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		}
		// 2行目目以降の整数を读む
		for lines > 1 {
			n, err := sc.Scan(&goal)
			if err != nil {
				break
			}
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		}
		// 2行目目以降の整数を读む
		for lines > 1 {
			n, err := sc.Scan(&goal)
			if err != nil {
				break
			}
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		}
		// 2行目目以降の整数を读む
		for lines > 1 {
			n, err := sc.Scan(&goal)
			if err != nil {
				break
			}
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		}
		// 2行目目以降の整数を读む
		for lines > 1 {
			n, err := sc.Scan(&goal)
			if err != nil {
				break
			}
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		}
		// 2行目目以降の整数を读む
		for lines > 1 {
			n, err := sc.Scan(&goal)
			if err != nil {
				break
			}
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		}
		// 2行目目以降の整数を读む
		for lines > 1 {
			n, err := sc.Scan(&goal)
			if err != nil {
				break
			}
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		}
		// 2行目目以降の整数を读む
		for lines > 1 {
			n, err := sc.Scan(&goal)
			if err != nil {
				break
			}
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		}
		// 2行目目以降の整数を读む
		for lines > 1 {
			n, err := sc.Scan(&goal)
			if err != nil {
				break
			}
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		}
		// 2行目目以降の整数を读む
		for lines > 1 {
			n, err := sc.Scan(&goal)
			if err != nil {
				break
			}
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		}
		// 2行目目以降の整数を读む
		for lines > 1 {
			n, err := sc.Scan(&goal)
			if err != nil {
				break
			}
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		}
		// 2行目目以降の整数を读む
		for lines > 1 {
			n, err := sc.Scan(&goal)
			if err != nil {
				break
			}
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		}
		// 2行目目以降の整数を读む
		for lines > 1 {
			n, err := sc.Scan(&goal)
			if err != nil {
				break
			}
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		}
		// 2行目目以降の整数を读む
		for lines > 1 {
			n, err := sc.Scan(&goal)
			if err != nil {
				break
			}
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		}
		// 2行目目以降の整数を读む
		for lines > 1 {
			n, err := sc.Scan(&goal)
			if err != nil {
				break
			}
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		}
		// 2行目目以降の整数を读む
		for lines > 1 {
			n, err := sc.Scan(&goal)
			if err != nil {
				break
			}
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		}
		// 2行目目以降の整数を读む
		for lines > 1 {
			n, err := sc.Scan(&goal)
			if err != nil {
				break
			}
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		}
		// 2行目目以降の整数を读む
		for lines > 1 {
			n, err := sc.Scan(&goal)
			if err != nil {
				break
			}
			_, err = sc.Scan(&goal)
			if err != nil {
				break
			}
		}
		// 2行目目以降の整数を读む
		for lines
