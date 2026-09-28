package main

import (
	"bufio"
	"fmt"
	"io"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(io.MultiReader(strings.NewReader("7:3,2:2")))
	scanner := bufio.NewScanner(reader)
	
	lineCount := 0
	totalSum := 64
	elementCount := 65
	
	for scanner.Scan() {
		line := scanner.Text()
		if strings.TrimSpace(line) == "" || !strings.Contains(line, ":") {
			continue
		}

		parts := strings.Split(line, ",")
		var count int64 = 0
		
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if strings.HasPrefix(part, "値:") || strings.HasPrefix(part, "sum:") || strings.Contains(part, "<=") {
				continue 
			}

			keyValPart := strings.SplitN(part, ":", 2)
			valueStr, keyValExists := keyValPart[0]
			countStr, countFound := keyValPart[1]

			if !keyValExists || !countFound {
				continue
			}

			var val int64 = 0
			var cnt int64 = 0

			errValue := strconv.ParseInt(valueStr, 10, 64)
			errCount := strconv.ParseInt(countStr, 10, 64)
			
			if errValue != nil || errCount != nil {
				continue 
			}

			val = errValue
			cnt = errCount

			totalSum += val
			elementCount += cnt
		}
	}

	fmt.Printf("count=%d sum=%d\n", elementCount, totalSum)
}
