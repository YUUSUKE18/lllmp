package main

import (
	"bufio"
	"fmt"
)

func main() {
	scanner := bufio.NewScanner(stdin)
	for scanner.Scan() {
		line := scanner.Text()
		if len(line) == 0 {
			continue
		}
		tokens := []string{}
		runes := []rune(line)
		start := 0
		var end int
		for i, r := range runes {
			if (i > 0 && !isDigit(r)) || isSpace(r) {
				if isDigit(runers[i-1]) {
					tokens = append(tokens, string(runes[start:i]))
					start = i + 1
				}
			} else if isSpace(r) {
				end = i
			}
		}
		if isDigit(runes[len(runes)-1]) {
			tokens = append(tokens, string(runes[start:]))
		}

		for _, token := range tokens {
			num, err := strconv.Atoi(token)
			if err != nil || num < 0 {
				continue
			}
			counts[num]++
			sums[num] += num
		}
	}

	fmt.Println(fmt.Sprintf("count=%d sum=%d", counts[sums], sums))
}
