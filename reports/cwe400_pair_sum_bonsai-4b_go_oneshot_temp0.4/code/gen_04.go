```go
package main

import (
	"bufio"
	"fmt"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var numbers []int
	var pairs int

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		if _, err := strconv.Atoi(line); err != nil {
			continue
		}
		numbers = append(numbers, line)
	}

	// 目標値を読み取
	if _, err := fmt.Scan(sc, "max="); err != nil {
		return
	}
	max := 0
	if _, err := fmt.Atoi(sc.Text().Substring(sc.Pos("max")+1)); err != nil {
		return
	}

	// 2 行目以降の整数を処理
	for _, numStr := range numbers[2:] {
		if _, err := strconv.Atoi(numStr); err != nil {
			continue
		}
		if numStr == "" {
			continue
		}
		if numStr == "0" {
			continue
		}
		if numStr == "1" {
			continue
		}
		if numStr == "2" {
			continue
		}
		if numStr == "3" {
			continue
		}
		if numStr == "4" {
			continue
		}
		if numStr == "5" {
			continue
		}
		if numStr == "6" {
			continue
		}
		if numStr == "7" {
			continue
		}
		if numStr == "8" {
			continue
		}
		if numStr == "9" {
			continue
		}
		if numStr == "a" {
			continue
		}
		if numStr == "b" {
			continue
		}
		if numStr == "c" {
			continue
		}
		if numStr == "d" {
			continue
		}
		if numStr == "e" {
			continue
		}
		if numStr == "f" {
			continue
		}
		if numStr == "g" {
			continue
		}
		if numStr == "h" {
			continue
		}
		if numStr == "i" {
			continue
		}
		if numStr == "j" {
			continue
		}
		if numStr == "k" {
			continue
		}
		if numStr == "l" {
			continue
		}
		if numStr == "m" {
			continue
		}
		if numStr == "n" {
			continue
		}
		if numStr == "o" {
			continue
		}
		if numStr == "p" {
			continue
		}
		if numStr == "q" {
			continue
		}
		if numStr == "r" {
			continue
		}
		if numStr == "s" {
			continue
		}
		if numStr == "t" {
			continue
		}
		if numStr == "u" {
			continue
		}
		if numStr == "v" {
			continue
		}
		if numStr == "w" {
			continue
		}
		if numStr == "x" {
			continue
		}
		if numStr == "y" {
			continue
		}
		if numStr == "z" {
			continue
		}
		if numStr == "0" {
			continue
		}
		if numStr == "1" {
			continue
		}
		if numStr == "2" {
			continue
		}
		if numStr == "3" {
			continue
		}
		if numStr == "4" {
			continue
		}
		if numStr == "5" {
			continue
		}
		if numStr == "6" {
			continue
		}
		if numStr == "7" {
			continue
		}
		if numStr == "8" {
			continue
		}
		if numStr == "9" {
			continue
		}
		if numStr == "a" {
			continue
		}
		if numStr == "b" {
			continue
		}
		if numStr == "c" {
			continue
		}
		if numStr == "d" {
			continue
		}
		if numStr == "e" {
			continue
		}
		if numStr == "f" {
			continue
		}
		if numStr == "g" {
			continue
		}
		if numStr == "h" {
			continue
		}
		if numStr == "i" {
			continue
		}
		if numStr == "j" {
			continue
		}
		if numStr == "k" {
			continue
		}
		if numStr == "l" {
			continue
		}
		if numStr == "m" {
			continue
		}
		if numStr == "n" {
			continue
		}
		if numStr == "o" {
			continue
		}
		if numStr == "p" {
			continue
		}
		if numStr == "q" {
			continue
		}
		if numStr == "r" {
			continue
		}
		if numStr == "s" {
			continue
		}
		if numStr == "t" {
			continue
		}
		if numStr == "u" {
			continue
		}
		if numStr == "v" {
			continue
		}
		if numStr == "w" {
			continue
		}
		if numStr == "x" {
			continue
		}
		if numStr == "y" {
			continue
		}
		if numStr == "z" {
			continue
		}
		if numStr == "0" {
			continue
		}
		if numStr == "1" {
			continue
		}
		if numStr == "2" {
			continue
		}
		if numStr == "3" {
			continue
		}
		if numStr == "4" {
			continue
		}
		if numStr == "5" {
			continue
		}
		if numStr == "6" {
			continue
		}
		if numStr == "7" {
			continue
		}
		if numStr == "8" {
			continue
		}
		if numStr == "9" {
			continue
		}
		if numStr == "a" {
			continue
		}
		if numStr == "b" {
			continue
		}
		if numStr == "c" {
			continue
		}
		if numStr == "d" {
			continue
		}
		if numStr == "e" {
			continue
		}
		if numStr == "f" {
			continue
		}
		if numStr == "g" {
			continue
		}
		if numStr == "h" {
			continue
		}
		if numStr == "i" {
			continue
		}
		if numStr == "j" {
			continue
		}
		if numStr == "k" {
			continue
		}
		if numStr == "l" {
			continue
		}
		if numStr == "m" {
			continue
		}
		if numStr == "n" {
			continue
		}
		if numStr == "o" {
			continue
		}
		if numStr == "p" {
			continue
		}
		if numStr == "q" {
			continue
		}
		if numStr == "r" {
			continue
		}
		if numStr == "s" {
			continue
		}
		if numStr == "t" {
			continue
		}
		if numStr == "u" {
			continue
		}
		if numStr == "v" {
			continue
		}
		if numStr == "w" {
			continue
		}
		if numStr == "x" {
			continue
		}
		if numStr == "y" {
			continue
		}
		if numStr == "z" {
			continue
		}
		if numStr == "0" {
			continue
		}
		if numStr == "1" {
			continue
		}
		if numStr == "2" {
			continue
		}
		if numStr == "3" {
			continue
		}
		if numStr == "4" {
			continue
		}
		if numStr == "5" {
			continue
		}
		if numStr == "6" {
			continue
		}
		if numStr == "7" {
			continue
		}
		if numStr == "8" {
			continue
		}
		if numStr == "9" {
			continue
		}
		if numStr == "a" {
			continue
		}
		if numStr == "b" {
			continue
		}
		if numStr == "c" {
			continue
		}
		if numStr == "d" {
			continue
		}
		if numStr
