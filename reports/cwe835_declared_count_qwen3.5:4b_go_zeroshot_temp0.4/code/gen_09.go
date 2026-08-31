package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}
	countStr := strings.TrimSpace(line)
	maxCount, err := strconv.Atoi(countStr)
	if err != nil {
		maxCount = 0
	}

	var sum int64
	scanner := bufio.NewScanner(reader)
	lineNum := 1
	for scanner.Scan() {
		lineNum++
		lineContent := scanner.Text()
		if lineContent == "" {
			continue
		}
		parts := strings.Fields(lineContent)
		for _, part := range parts {
			val, err := strconv.ParseInt(part, 10, 64)
			if err != nil {
				continue
			}
			sum += val
			maxCount--
			if maxCount <= 0 {
				break
			}
		}
		if maxCount <= 0 {
			break
		}
	}

	fmt.Printf("count=%d sum=%d\n", maxCount, sum)
}
