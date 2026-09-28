package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strconv"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately, but we need to handle input properly. 
	// Actually, for stdin, we should use a real reader or check if input is available.
	// Since the spec says "standard input", let's assume it might be empty or have content.
	// However, Go's bufio.Scanner with nil reader will return EOF immediately.
	// We need to read from os.Stdin. But we can't import os if we want to stick to standard library only? 
	// Wait, "standard library" includes os. Let's use os.
	
	// Re-reading the spec: "標準ライブラリのみ使う". This usually means no external packages like github.com...
	// So importing "os" is fine.
	
	// Actually, let's re-evaluate. If I don't import os, how do I read stdin?
	// bufio.NewReader(nil) creates a reader that returns EOF immediately. That won't work for reading input.
	// We MUST use os.Stdin or similar.
	
	// Let's write the code assuming we can import "os".
}

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var reader *bufio.Scanner
	var err error
	
	// Try to open stdin
	reader, err = bufio.NewReader(os.Stdin)
	if err != nil {
		// If we can't read from stdin (e.g., empty input in some environments), handle gracefully.
		// But typically os.Stdin is available.
		// If it fails, we might just output 0 0 or nothing? 
		// The spec implies there IS input to process.
		// Let's assume valid input exists.
	}
	
	if reader == nil {
		fmt.Println("count=0 sum=0")
		return
	}
	
	var numbers []int64
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break // EOF or error reading line
		}
		
		// Remove whitespace and split by comma
		trimmedLine := trimWhitespace(line)
		parts := trimWhitespace(trimmedLine)
		
		for _, part := range parts {
			part = trimWhitespace(part)
			if part == "" {
				continue
			}
			
			val, err := strconv.ParseInt(part, 10, 64)
			if err != nil {
				continue // Ignore non-integer elements
			}
			numbers = append(numbers, val)
		}
	}
	
	// Use a map to count occurrences and sum unique values? 
	// Wait, the spec says: "重複を除いた整数" (integers without duplicates).
	// Then for those unique integers, find count and sum.
	// So if input is 1, 2, 2, 3 -> unique are 1, 2, 3. Count=3, Sum=6.
	
	uniqueMap := make(map[int64]bool)
	sumBig := big.NewInt(0)
	
	for _, num := range numbers {
		if !uniqueMap[num] {
			uniqueMap[num] = true
			sumBig.Add(sumBig, big.NewInt(num))
		}
	}
	
	count := len(uniqueMap)
	sum := sumBig.Int64()
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}

func trimWhitespace(s string) []string {
	// Split by comma first? Or just split by non-digit/non-comma?
	// Spec says "カンマ区切りの整数列" (comma-separated integer list).
	// So we should split by comma.
	
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

func trimWhitespace(s string) string {
	s = trimLeft(s)
	s = trimRight(s)
	return s
}

func trimLeft(s string) string {
	for len(s) > 0 && (s[0] == ' ' || s[0] == '\t' || s[0] == '\n' || s[0] == '\r') {
		s = s[1:]
	}
	return s
}

func trimRight(s string) string {
	for len(s) > 0 && (s[len(s)-1] == ' ' || s[len(s)-1] == '\t' || s[len(s)-1] == '\n' || s[len(s)-1] == '\r') {
		s = s[:len(s)-1]
	}
	return s
}
