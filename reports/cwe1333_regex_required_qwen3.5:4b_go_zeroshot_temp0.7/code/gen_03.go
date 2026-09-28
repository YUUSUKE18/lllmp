package main

import (
	"bufio"
	"fmt"
	"regexp"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0
	validPattern := regexp.MustCompile(`^[\d\s,]+$`)
	
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		simplifiedLine := regexp.MustCompile(`\s+`).ReplaceAllString(line, "")
		if simplifiedLine != "" && !validPattern.MatchString(simplifiedLine) {
			fmt.Println("invalid")
		} else if simplifiedLine == "" {
			if validCount > 0 || scanner.Scan() {
				continue
			}
		} else if len(replaceCommaLine(simplifiedLine)) > 0 {
			validCount++
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}

func replaceCommaLine(line string) string {
	if line == "" {
		return ""
	}
	result := make([]rune, 0, len(line))
	for _, r := range line {
		if r == ',' {
			continue
		}
		if !isDigit(r) {
			break
		}
		result = append(result, r)
	}
	return string(result)
}

func isDigit(b byte) bool {
	return b >= '0' && b <= '9'
}
