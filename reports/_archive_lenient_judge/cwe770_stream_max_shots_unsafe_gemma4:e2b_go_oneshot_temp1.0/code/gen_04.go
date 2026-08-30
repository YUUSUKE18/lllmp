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
	input, _ := reader.ReadString('\n')
	
	// カンマで分割
	parts := strings.Split(strings.TrimSpace(input), ",")
	
	count := 0
	maxVal := int64(0)
	found := false

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}
		
		count++
		if !found || n > maxVal {
			maxVal = n
			found = true
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
