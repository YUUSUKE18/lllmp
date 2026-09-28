package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	count := 0
	sum := int64(0)

	for _, part := range parse(line) {
		value := int64(part[0])
		repeatCount := int64(parseInt(part[1]))
		sum += value * repeatCount
		count += repeatCount
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}

func parse(line string) []string {
	result := make([]string, 0)
	start := 0
	for i := 0; i < len(line); i++ {
		if line[i] == ':' {
			result = append(result, line[start:i])
			start = i + 1
		}
	}
	if start < len(line) && line[start-1] != ' ' {
		result = append(result, line[start:])
	}
	return result
}

func parseInt(s string) int64 {
	var val int64
	for i := 0; i < len(s); i++ {
		if s[i] >= '0' && s[i] <= '9' {
			val = val*10 + int64(s[i]-'0')
		}
	}
	return val
}
