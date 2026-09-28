package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0
	re := regexp.MustCompile(`^(\d+)(,\s*\d+)*$`)

	for sc.Scan() {
		line := sc.Text()
		stripped := stripSpaces(line)
		if stripped == "" {
			continue
		}
		matches := re.FindStringSubmatch(stripped)
		if len(matches) != 1 {
			continue
		}
		firstNum := matches[0]
		parts := []string{firstNum}
		lastIdx := 0
		for i, ch := range stripped {
			if (ch == ',') || (ch == ' ') {
				if ch == ',' {
					lastIdx = i + 1
				} else {
					start := lastIdx
					end := i
					partsStr := stripped[start:end]
					for j, ch := range partsStr {
						if !isdigit(ch) {
							break
						}
					}
					lastIdx = end + 1
				}
			}
		}
		i := lastIdx
		validCount++
	}
	fmt.Printf("valid=%d\n", validCount)
}

func isdigit(ch byte) bool {
	return '0' <= ch && ch <= '9'
}

func stripSpaces(s string) string {
	r := []byte{}
	for _, c := range s {
		if c != ' ' && c != '\t' && c != '\r' && c != '\n' {
			r = append(r, byte(c))
		}
	}
	return string(r)
}
