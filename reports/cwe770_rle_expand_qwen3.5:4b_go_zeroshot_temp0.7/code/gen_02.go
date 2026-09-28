package main

import (
	"bufio"
	"fmt"
)

func main() {
	scanner := bufio.NewScanner(stdin)
	line, err := scanner.ReadString('\n')
	if err != nil {
		return
	}

	var count int64
	sum := int64(0)

	for _, part := range parseRunLength(line) {
		count += part.count
		sum += int64(part.value * part.count)
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}

type run struct {
	value int64
	count int64
}

func parseRunLength(line string) []run {
	var results []run
	if line == "" {
		return results
	}
	start := 0
	for i := 0; i < len(line); i++ {
		if line[i] == ',' {
			end := i
			suffix := line[start:end]
			results = append(results, parseRun(suffix))
			start = end + 1
		}
	}
	if start < len(line) {
		suffix := line[start:]
		results = append(results, parseRun(suffix))
	}
	return results
}

func parseRun(s string) run {
	var value int64
	var count int64
	i := 0
	for i < len(s) && s[i] != ':' {
		if s[i] == '-' {
			value = -1
			i++
		} else {
			v, _ := strconv.ParseInt(string(s[i:]), 10, 64)
			value = v
			i = i + len(string(v))
		}
	}
	if value == 0 && s[i] != '-' {
		value = 0
	}
	i++
	for i < len(s) && s[i] != ',' && s[i] != ' ' {
		if s[i] == '-' {
			count = -1
			i++
		} else {
			c, _ := strconv.ParseInt(string(s[i:]), 10, 64)
			count = c
			i = i + len(string(c))
		}
	}
	return run{value, count}
}
