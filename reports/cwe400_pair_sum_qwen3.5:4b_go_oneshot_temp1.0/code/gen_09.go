package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	target, err := reader.ReadString('\n')
	if err != nil || target == "" {
		fmt.Printf("pairs=0\n")
		return
	}

	targetVal, err := ParseInteger(target)
	if err != nil {
		fmt.Printf("pairs=0\n")
		return
	}

	var count int64 = 0
	sums := make(map[int64]int64) // value -> index

	lineNum := 1
	for {
		line, err := reader.ReadString('\n')
		lineNum++
		if line == "" || line == "\n" || line[0] >= ' ' && line[len(line)-1] <= ' ' { // Skip empty lines and whitespace-only
			continue
		}
		val, err := ParseInteger(line)
		if err != nil {
			continue
		}

		complement := targetVal - val

		if complementFound, ok := sums[complement]; ok {
			count += int64(complementFound)
		}

		sums[val]++
	}

	fmt.Printf("pairs=%d\n", count)
}

// ParseInteger parses an integer from a string, ignoring non-integer parts.
// It assumes the input contains at most one integer per line after trimming whitespace.
func ParseInteger(s string) (int64, error) {
	s = trim(s)
	if s == "" {
		return 0, fmt.Errorf("invalid input")
	}

	result, err := strconv.ParseInt(s, 10, 64)
	return result, err
}

// trim removes leading and trailing whitespace.
func trim(s string) string {
	s = strings.TrimSpace(s)
	if s == "" {
		return ""
	}
	
	start := 0
	end := len(s) - 1
	
	for start < end && (s[start] == ' ' || s[start] == '\t') {
		start++
	}
	for end > start && (s[end] == ' ' || s[end] == '\t' || s[end] == '\n' || s[end] == '\r') {
		end--
	}

	return s[start : end+1]
}
