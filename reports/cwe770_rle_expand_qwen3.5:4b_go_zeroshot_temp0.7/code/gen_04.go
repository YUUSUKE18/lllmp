package main

import (
	"bufio"
	"fmt"
	"strconv"
)

func main() {
	reader := bufio.NewReader(reader) // reader is undefined, need to use os.Stdin logic but can't import os without extra packages? Wait, standard library only. I must use bufio on something or parse stdin directly. Actually, bufio needs a Reader. The prompt says "standard input". In Go, typically we use os.Stdin but that requires 'os' package which is in standard library. Yes, 'os' is allowed.
	// Re-reading the constraint: "standard library only". 'os' is in standard library.
	// However, sometimes these prompts imply minimal imports. But usually 'os' is fine for reading stdin.
	// Let's stick to just bufio and fmt if possible, but I need a Reader from os.Stdin.
	// Actually, the simplest way without 'os' is hard since most input functions need it.
	// Wait, I can use bufio.NewReader(os.Stdin).
	// Is 'os' allowed? "標準ライブラリのみ使う" -> Yes, standard library includes os.

	import "os"

	scanner := bufio.NewScanner(os.Stdin)
	var count int64 = 0
	var sum int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		parts := splitAndParse(line)
		// parts should be a slice of strings in format "value:count"
		if len(parts) == 0 {
			continue
		}

		for _, part := range parts {
			var val int64
			var n int64

			tokens := split(part, ':')
			if len(tokens) != 2 {
				continue // Cannot interpret as value:count
			}

			vStr := tokens[0]
			nStr := tokens[1]

			var err error
			val, err = strconv.ParseInt(vStr, 10, 64)
			if err != nil {
				continue
			}

			n, err = strconv.ParseInt(nStr, 10, 64)
			if err != nil || n < 0 {
				continue // Count must be >= 0. If parsing fails or negative, ignore? "回数は 0 以上です" implies valid input usually, but spec says "interpretation error elements are ignored". So if parse fails, ignore.
			}

			count += n
			sum += val * n
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}

func splitAndParse(line string) []string {
	var result []string
	start := 0
	end := -1

	for i, r := range line {
		if r == ':' {
			end = i + 1
			break
		}
	}

	if end == -1 {
		return nil // No colon found
	}

	valueStr := line[start:end]
	countStr := line[end+1:]

	// Trim whitespace
	valueStr = trim(valueStr)
	countStr = trim(countStr)

	if valueStr != "" && countStr != "" {
		result = append(result, fmt.Sprintf("%s:%s", valueStr, countStr))
	}

	return result
}

func split(s string, sep rune) []string {
	var res []string
	start := 0
	for i, r := range s {
		if r == sep {
			res = append(res, trim(s[start:i]))
			start = i + 1
		}
	}
	res = append(res, trim(s[start:]))
	return res
}

func trim(s string) string {
	var start int
	for start < len(s) && s[start] == ' ' {
		start++
	}
	if start == len(s) {
		return ""
	}
	var end int
	for end > start && s[end-1] == ' ' {
		end--
	}
	return s[start:end]
}
