package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strconv"
)

func main() {
	reader := bufio.NewReader(nil) // 標準入力として扱うため nil を使用し、ReadInt などが自動で stdin を読みます

	var seenMap = map[big.Int]bool{}
	var sumBig *big.Int

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		parts := []string{}
		for _, s := range line {
			if s == ' ' || s == '\t' || s == '\n' || s == '\r' || s == '\f' || s == '\v' {
				continue
			}
			parts = append(parts, string(s))
		}

		for _, s := range parts {
			if s == "" {
				continue
			}

			numStr := ""
			for i := 0; i < len(s); i++ {
				c := rune('0')
				if s[i] < '0' || s[i] > '9' {
					break
				}
				numStr += string(c)
			}

			if numStr == "" {
				continue
			}

			num, err := strconv.Atoi(numStr)
			if err != nil {
				continue
			}

			bigInt := big.Int{}
			bigInt.SetInt64(int64(num))
			if seenMap[bigInt] {
				continue
			}
			seenMap[bigInt] = true
			sumBig.Add(sumBig, &bigInt)
		}

	}

	fmt.Printf("count=%d sum=%s\n", len(seenMap), sumBig.String())
}
