package main

import (
	"fmt"
	"math"
	"strings"
	"unicode"
)

var memo = make(map[int]int)

func isInteger(s string) bool {
	for _, c := range s {
		if !unicode.IsDigit(c) && c != '-' {
			return false
		}
	}
	return true
}

func processLine(line string) int {
	if !isInteger(line) {
		return 0
	}
	n := int(line)
	if n == 1 {
		return 0
	}
	if memo[n] != 0 {
		return memo[n]
	}
	count := 0
	for n != 1 {
		if n%2 == 0 {
			n /= 2
		} else {
			n = 3*n + 1
		}
		count++
	}
	memo[n] = count
	return count
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		if isInteger(line) {
			n := int(line)
			if n == 1 {
				continue
			}
			count := processLine(line)
			fmt.Println("total=" + fmt.Sprintf("%d", count))
		}
	}
}
