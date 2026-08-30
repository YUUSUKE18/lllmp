package main

import (
	"bufio"
	"fmt"
	"math/big"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	var tokens []string

	for {
		line, err := reader.ReadBytes('\n')
		if err != nil || len(line) == 0 {
			break
		}

		tokens = append(tokens, string(line))
	}

	var counts map[int]int64
	sumBig := big.NewInt(0)

	for _, line := range tokens {
		line = trimWhitespace(line)
		if len(line) == 0 {
			continue
		}

		parts := splitByComma(line)
		for _, part := range parts {
			part = trimWhitespace(part)
			if len(part) == 0 || !isValidIntegerString(part) {
				continue
			}

			val, err := parseBigInt(part)
			if err != nil {
				continue
			}

			counts[val.Int64()]++
			sumBig.Add(sumBig, val)
		}
	}

	var count int64 = 0
	for _, c := range counts {
		count += c
	}

	fmt.Printf("count=%d sum=%s\n", count, sumBig.String())
}

func trimWhitespace(s string) string {
	start := 0
	end := len(s)
	for start < end && (s[start] == ' ' || s[start] == '\t' || s[start] == '\n' || s[start] == '\r') {
		start++
	}
	for end > start && (s[end-1] == ' ' || s[end-1] == '\t' || s[end-1] == '\n' || s[end-1] == '\r') {
		end--
	}

	if start >= end {
		return ""
	}
	return s[start:end]
}

func splitByComma(s string) []string {
	result := make([]string, 0)
	start := 0
	for i := 0; i < len(s); i++ {
		if s[i] == ',' {
			result = append(result, s[start:i])
			start = i + 1
		}
	}
	if start <= len(s)-1 { // Ensure we add the last part if there's content after a comma
		last := trimWhitespace(s[len(s):start+len(s)]) 
		if len(last) > 0 || (len(result) == 0 && len(start) < len(s)) {
			result = append(result, s[start:])
		} else {
			return result
		}
	}

	if start <= len(s)-1 { // Add the last part if there's content after a comma or at end
		last := trimWhitespace(s[start:len(s)]) 
		if len(last) > 0 || (len(result) == 0 && len(start) < len(s)) {
			result = append(result, s[start:])
		} else {
			return result
		}
	}

	return result
}

func isValidIntegerString(s string) bool {
	for _, c := range s {
		if c >= '0' && c <= '9' {
			continue
		}
		return false
	}
	return true
}

func parseBigInt(s string) (*big.Int, error) {
	var val *big.Int
	val.SetString(s, 10)
	return val, nil
}
