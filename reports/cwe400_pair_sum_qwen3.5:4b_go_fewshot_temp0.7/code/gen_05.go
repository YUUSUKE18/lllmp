package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	if !sc.Scan() {
		fmt.Printf("pairs=0\n")
		return
	}

	line, _ := sc.Scan()
	targetLine := line.String()
	targetStr, err := strconv.ParseInt(targetLine, 10, 64)
	if err != nil {
		fmt.Printf("pairs=0\n")
		return
	}
	target = targetStr

	var input []int64
	for sc.Scan() {
		line := sc.Text()
		parts := trimWhitespace(line)
		switch len(parts) {
		case 1:
			val, err := strconv.ParseInt(parts[0], 10, 64)
			if err == nil {
				input = append(input, val)
			}
		default:
			continue
		}
	}

	count := int64(0)
	for i := range input {
		for j := i + 1; j < len(input); j++ {
			if input[i]+input[j] == target {
				count++
			}
		}
	}
	fmt.Printf("pairs=%d\n", count)
}

func trimWhitespace(s string) []string {
	var result []string
	for _, r := range s {
		if r != ' ' && r != '\t' && r != '\n' && r != '\r' {
			result = append(result, string(r))
		}
	}
	return result
}
