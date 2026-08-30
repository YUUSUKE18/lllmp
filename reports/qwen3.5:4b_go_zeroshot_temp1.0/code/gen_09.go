package main

import (
	"bufio"
	"fmt"
	"math/big"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	
	var seen map[int]bool
	
	for {
		line, _ := reader.ReadString('\n')
		line = trimLine(line)
		if line == "" {
			break
		}

		parts := parseIntegers(line)

		for _, str := range parts {
			val, err := strconv.Atoi(str)
			if err != nil {
				continue
			}

			if seen[val] {
				continue
			}

			seen[val] = true
			count[val]++
		}
	}

	sum := big.NewInt(0)
	for _, c := range count {
		sum.Add(sum, big.NewInt(int64(c)))
	}

	fmt.Printf("count=%d sum=%s\n", len(count), sum.String())
}

func trimLine(s string) string {
	start := 0
	for start < len(s) && (s[start] == ' ' || s[start] == '\t') {
		start++
	}

	end := len(s)
	for end > start && (s[end-1] == ' ' || s[end-1] == '\t') {
		end--
	}

	return s[start:end]
}

func parseIntegers(line string) []string {
	result := []string{}
	current := ""

	for _, r := range line {
		if (r >= '0' && r <= '9') || r == '-' {
			current += string(r)
		} else {
			if current != "" {
				result = append(result, current)
				current = ""
			}
		}
	}

	if current != "" {
		result = append(result, current)
	}

	return result
}
