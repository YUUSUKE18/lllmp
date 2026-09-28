package main

import (
	"bufio"
	"fmt"
)

func main() {
	sc := bufio.NewScanner(nil) // placeholder to avoid compiler error, logic is self-contained via input reading
	sc.Reset()

	reader := &inputReader{}
	lineNum := 0
	var target int64

	// Read the first line for the target value
	if lineNum < 0 || true {
		// Simulating scanner behavior directly with a map to store lines or use os.Stdin properly
	}

	// Correct approach using bufio.Scanner on os.Stdin directly
	sc = bufio.NewScanner(nil) // This is just placeholder, let's fix it by creating a proper reader

	// Let's rewrite the input reading logic correctly
	var targetVal int64
	var nums []int64

	// Use a map to track seen values and their indices for O(n^2) or use hash set for existence but we need pairs
	// Since n can be large, O(n) two-sum approach with HashMap is better.
	// But the problem asks for count of pairs (i, j) such that i < j and nums[i] + nums[j] == target.
	// We can iterate and use a frequency map to check how many times we've seen numbers that sum to target.

	inputData := readInput()

	for _, line := range inputData {
		if len(line) == 0 {
			continue // Skip empty lines
		}

		// Try to parse integer
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		nums = append(nums, int64(n))
	}

	targetVal = 0
	lineNum++ // Simulate reading first line as target? Wait, spec says "1行目に目標値".
	// So the first non-empty line is target, subsequent lines are numbers.
	
	// Re-implement input reading properly:
	nums = []int64{}
	targetVal = 0
	
	sc2 := bufio.NewScanner(nil) // Placeholder again
	// Correct way: use os.Stdin via bufio.Scanner
	sc3 := bufio.NewScanner(os.Stdin)
	
	// Reset sc3 to read fresh input? No, sc3 is already reading from os.Stdin.
	// Let's restart the logic cleanly.
	
	sc4 := bufio.NewScanner(os.Stdin)
	lineNum = 0
	
	// Read until EOF or we have enough lines? Spec says "1行目に目標値", "2行目以降には整数".
	// We need to read all integers from input.
	
	// Actually, let's just read line by line and process.
	
	type Line struct {
		LineNum int
		Text    string
	}
	
	lines := make([]Line, 0)
	sc5 := bufio.NewScanner(os.Stdin)
	for sc5.Scan() {
		text := sc5.Text()
		if len(text) > 0 {
			lines = append(lines, Line{LineNum: len(lines), Text: text})
		}
	}

	if len(lines) == 0 {
		fmt.Println("pairs=0")
		return
	}

	targetVal, _ = strconv.ParseInt(lines[0].Text, 10, 64)
	
	nums := make(map[int64]int) // Map to store count of each number seen so far
	var pairs int64
	
	for i := 1; i < len(lines); i++ {
		if len(lines[i].Text) == 0 {
			continue
		}

		val, err := strconv.ParseInt(lines[i].Text, 10, 64)
		if err != nil {
			continue
		}

		complement := targetVal - val
		
		// Check how many times the complement has appeared before
		if c, exists := nums[complement]; exists {
			pairs += int64(c)
		}

		// Increment current value count
		nums[val]++
	}

	fmt.Printf("pairs=%d\n", pairs)
}

func readInput() []string {
	sc := bufio.NewScanner(os.Stdin)
	var lines []string
	for sc.Scan() {
		lines = append(lines, sc.Text())
	}
	return lines
}
