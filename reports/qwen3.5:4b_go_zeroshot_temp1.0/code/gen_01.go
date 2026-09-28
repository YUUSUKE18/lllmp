package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(reader) // Corrected reader declaration
	scanner := bufio.NewScanner(reader)

	var integers []int64
	for scanner.Scan() {
		line, _ := reader.ReadString('\n')
		if len(line) == 0 {
			continue
		}
		// Remove whitespace from the beginning and end of the line
		line = trimSpace(line)
		
		// Split by comma
		parts := []string{line}
		for _, p := range parts {
			if len(p) > 0 && p != "," {
				num, err := strconv.ParseInt(p, 10, 64)
				if err != nil {
					continue // Ignore non-integer elements
				}
				integers = append(integers, num)
			}
		}
	}

	// Deduplicate integers using a map
	m := make(map[int64]bool)
	sum := int64(0)
	count := 0
	
	for _, num := range integers {
		if !m[num] {
			m[num] = true
			sum += num
			count++
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}

func trimSpace(s string) string {
	start, end := 0, len(s)-1
	
	for start < end && (s[start] == ' ' || s[start] == '\t' || s[start] == '\n' || s[start] == '\r') {
		start++
	}
	for end > start && (s[end] == ' ' || s[end] == '\t' || s[end] == '\n' || s[end] == '\r') {
		end--
	}

	if start > end {
		return ""
	}
	
	s = s[start : end+1]
	return s
}

// Helper functions and imports (corrected structure)
import (
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin) // Corrected reader declaration
	
	var integers []int64
	
	line, _ := reader.ReadString('\n')
	for len(line) > 0 {
		line = trimSpace(line)
		
		if len(line) == 0 {
			continue
		}
		
		parts := strings.Split(line, ",")
		for _, p := range parts {
			if len(strings.TrimSpace(p)) == 0 {
				continue
			}
			
			num, err := strconv.ParseInt(strings.TrimSpace(p), 10, 64)
			if err != nil {
				continue
			}
			integers = append(integers, num)
		}
		
		line, _ = reader.ReadString('\n')
	}

	m := make(map[int64]bool)
	sum := int64(0)
	count := 0
	
	for _, num := range integers {
		if !m[num] {
			m[num] = true
			sum += num
			count++
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
