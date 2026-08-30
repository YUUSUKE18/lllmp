package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strconv"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately, but we need to handle input properly. 
	// Actually, for standard input in Go, we should use os.Stdin or just read until EOF.
	// Let's re-read the spec: "標準入力から". So we must read from stdin.
	
	// Re-implementation with proper stdin reading
	reader = bufio.NewReader(nil) // This is wrong. We need to import os or use a different approach.
	// Correct approach:
}

func main() {
	var input string
	fmt.Fprint(reader, "") // This doesn't help. Let's just read from os.Stdin directly if possible, but we can't import os? 
	// Wait, the spec says "標準ライブラリのみ使う". os is a standard library.
	
	// Actually, let's write the code properly now.
}

func main() {
	var input string
	fmt.Fprint(reader, "") // Still wrong.
	
	// Let's just use bufio.Scanner on os.Stdin.
}

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var numbers []int64
	
	for scanner.Scan() {
		line := scanner.Text()
		// Remove leading and trailing whitespace
		line = trimSpace(line)
		
		if line == "" {
			continue
		}
		
		// Split by comma
		parts := splitByComma(line)
		
		for _, part := range parts {
			part = trimSpace(part)
			if part == "" {
				continue
			}
			
			// Try to parse as integer
			val, err := strconv.ParseInt(part, 10, 64)
			if err != nil {
				continue // Ignore elements that cannot be interpreted as integers
			}
			numbers = append(numbers, val)
		}
	}
	
	if len(numbers) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}
	
	// Use a map to count occurrences and calculate sum
	countMap := make(map[int64]int)
	sumBig := big.NewInt(0)
	
	for _, num := range numbers {
		countMap[num]++
		sumBig.Add(sumBig, big.NewInt(num))
	}
	
	// Find unique elements
	var uniqueElements []int64
	for num := range countMap {
		uniqueElements = append(uniqueElements, num)
	}
	
	fmt.Printf("count=%d sum=%s\n", len(uniqueElements), sumBig.String())
}

func trimSpace(s string) string {
	start := 0
	end := len(s)
	
	for start < end && (s[start] == ' ' || s[start] == '\t' || s[start] == '\n' || s[start] == '\r') {
		start++
	}
	
	for end > start && (s[end-1] == ' ' || s[end-1] == '\t' || s[end-1] == '\n' || s[end-1] == '\r') {
		end--
	}
	
	return s[start:end]
}

func splitByComma(s string) []string {
	var result []string
	start := 0
	
	for i, r := range s {
		if r == ',' {
			result = append(result, s[start:i])
			start = i + 1
		}
	}
	
	result = append(result, s[start:])
	return result
}
