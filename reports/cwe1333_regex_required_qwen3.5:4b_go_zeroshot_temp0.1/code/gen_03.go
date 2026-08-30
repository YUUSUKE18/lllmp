package main

import (
	"bufio"
	"fmt"
	"regexp"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates stdin in Go 1.20+
	validCount := 0

	// Compile the regex pattern
	// Pattern explanation:
	// ^$ : Start of line, end of line (empty line is invalid per spec "1個以上の数字列") -> actually empty line is invalid because it has no numbers.
	// But wait, spec says: "空行...は妥当ではありません" (Empty lines are not valid).
	// So we need at least one number.
	// Pattern for a single number: \d+
	// Pattern for comma separated list: (\d+(,\d+)*)?
	// Let's refine:
	// We need 1 or more numbers separated by commas.
	// Regex: ^\s*(\d+(?:,\s*\d+)*)\s*$
	// - ^ : Start of string
	// - \s* : Ignore leading whitespace
	// - (\d+(?:,\s*\d+)*) : One or more digits, optionally followed by comma and more digits (with optional whitespace around comma)
	// - \s* : Ignore trailing whitespace
	// - $ : End of string

	pattern := regexp.MustCompile(`^\s*(\d+(?:,\s*\d+)*)\s*$`)

	scanner := bufio.NewScanner(reader)
	for scanner.Scan() {
		line := scanner.Text()
		if pattern.MatchString(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
