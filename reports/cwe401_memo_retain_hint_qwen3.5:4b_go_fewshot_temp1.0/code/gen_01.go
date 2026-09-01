package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	cache := make(map[int]int64)
	var total int64

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		parts := parseIntegers(line)
		for _, n := range parts {
			step := collatz(n, cache)
			total += step
		}
	}

	if err := sc.Err(); err != nil {
		return
	}

	fmt.Printf("total=%d\n", total)
}

func parseIntegers(line string) []int {
	var nums []int
	for _, s := range splitByDelimiter(line, ", ") {
		n, err := strconv.Atoi(strings.TrimSpace(s))
		if err == nil && n > 0 {
			nums = append(nums, n)
		}
	}
	return nums
}

func collatz(n int, cache map[int]int64) int64 {
	step := 0
	key := n
	for key != 1 {
		if v, ok := cache[key]; ok {
			step = v + 1 // current step is next cached value minus 1? no. let's redo logic carefully
			return step
		}
		
		newKey := newCollatzKey(n)
		cache[newKey]++ // store steps taken for this key
		
		n = newKey
	}
	
	step = cache[key] // final cached value
	return step + 1
}

func newCollatzKey(n int) int {
	if n % 2 == 0 {
		return n / 2
	}
	return (n * 3 + 1) >> 1 // Use bitwise shift for division by 2 to avoid repeated modulo
}

// Split line into segments based on whitespace or comma+space if needed, but Go's bufio.Scanner handles tokens nicely.
// Actually, the input format says "1 integer per line". 
// So we just need to extract integers from each line.

// Revised approach to handle potential multiple integers per line or extra spaces:
func main() {
	sc := bufio.NewScanner(os.Stdin)
	cache := make(map[int]int64)
	var total int64

	for sc.Scan() {
		line := sc.Text()
		
		// Parse integers from the line, ignoring empty parts and non-integers
		for i, c := range line {
			if c == '\n' || c == ' ' || c == '\t' {
				if i > 0 && i < len(line) {
					subLine := line[i:]
					if v, err := strconv.Atoi(strings.TrimSpace(subLine)); err == nil && v > 0 {
						step := collatz(v, cache)
						total += step
					}
				}
			} else if c >= '0' && c <= '9' || (c == '-' || c == '+' && i == 0 && subLine != "") {
				continue // Handled by strconv parsing
			} else if c == ',' {
				// If comma is present, treat as delimiter for multiple integers on one line
				nextIntegers(line[i+1:], cache, &total)
				return // Wait, recursive call in main might not work well. Let's restructure slightly.
			}
		}
		
		// Better parsing strategy: Use strings.Fields and then map to int
		for _, s := range strings.Fields(line) {
			if val, err := strconv.Atoi(s); err == nil && val > 0 {
				step := collatz(val, cache)
				total += step
			}
		}
	}

	if sc.Err() != nil {
		return
	}

	fmt.Printf("total=%d\n", total)
}

// Let's redefine main logic more cleanly with proper imports and structure.

func main_v2() {
	sc := bufio.NewScanner(os.Stdin)
	cache := make(map[int]int64)
	var total int64

	for sc.Scan() {
		line := sc.Text()
		
		// Extract integers from line, handling commas if they exist
		splits := strings.Split(line, ",")
		for _, s := range splits {
			s = strings.TrimSpace(s)
			if s == "" {
				continue
			}
			
			nums := strings.Fields(s)
			for _, numStr := range nums {
				val, err := strconv.Atoi(numStr)
				if err != nil || val <= 0 {
					continue
				}
				
				step := collatz(val, cache)
				total += step
			}
		}
	}

	if sc.Err() != nil {
		return
	}

	fmt.Printf("total=%d\n", total)
}

func collatz(n int, cache map[int]int64) int64 {
	key := n
	for key != 1 {
		if v, exists := cache[key]; exists {
			return v + 1
		}
		
		n = newCollatzKey(n)
		cache[n] = 1 // initial step count for this new value
	}
	
	return cache[key]
}

func newCollatzKey(n int) int {
	if n%2 == 0 {
		return n / 2
	}
	return (n * 3 + 1) >> 1
}
