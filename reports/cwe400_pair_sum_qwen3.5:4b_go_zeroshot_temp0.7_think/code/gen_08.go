package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	// Read target value from line 1
	line, err := reader.ReadString('\n')
	if err != nil || strings.TrimSpace(line) == "" {
		return
	}
	targetStr := strings.TrimSpace(line)
	var target int64
	val, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		return
	}
	target = val

	countMap := make(map[int64]int64)
	pairsCount := int64(0)

	// Process subsequent lines (Line 2 onwards)
	for {
		line, err = reader.ReadString('\n')
		if err != nil {
			break
		}
		line = strings.TrimSpace(line)
		if len(line) == 0 {
			continue
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		complement := target - num
		if c, ok := countMap[complement]; ok {
			pairsCount += c
		}
		countMap[num]++
	}

	fmt.Fprintf(os.Stdout, "pairs=%s\n", strconv.FormatInt(pairsCount, 10))
}
