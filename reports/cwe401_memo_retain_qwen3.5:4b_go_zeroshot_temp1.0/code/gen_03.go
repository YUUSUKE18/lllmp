package main

import (
	"bufio"
	"fmt"
)

const max32bit = 2147483647

func solve() {
	memo := make(map[int64]int64)

	var reader *bufio.Scanner
	reader = bufio.NewReader(nil)

	var inputScanner *bufio.Scanner
	inputScanner = bufio.NewScanner(reader)

	// リアクト: nil の scanner は使えないので、別の方法で入力を読み取る。
	// 実際には標準入力を直接読めばよいが、問題文の「1 行に 1 個ずつ」は意味不明だが、
	// スタンダードなコンテスト形式（標準入力の各行を数値として読む）を採用する。

	type line struct {
		text string
	}

	inputScanner = bufio.NewScanner(bufio.NewReader(os.Stdin))
	if err := fmt.Scan(&inputScanner); err != nil {
		return
	}

	var result int64
	for scanner := bufio.NewScanner(os.Stdin); scanner.Scan(); {
		line := scanner.Text()
		if len(line) == 0 {
			continue
		}
		num, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		n := int64(num)

		if val, ok := memo[n]; ok {
			result += val
			continue
		}

		count := 0
		for n > 1 {
			switch n % 2 {
			case 0:
				n /= 2
			default:
				n = int64(int32(n) * 3 + 1)
			}

			if val, ok := memo[n]; ok {
				count += 1 + count
				break
			}
			memo[n] = count + 1
		}

		memo[n] = count
		result += count
	}

	fmt.Printf("total=%d\n", result)
}

func main() {
	solve()
}
