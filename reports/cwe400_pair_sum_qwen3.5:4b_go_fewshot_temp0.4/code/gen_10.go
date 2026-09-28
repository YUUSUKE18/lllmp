package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	target, err := parseInt(r)
	if err != nil {
		fmt.Printf("pairs=0\n")
		return
	}

	type num struct {
		val int64
		idx int
	}
	var nums []num
	lineNum := 0

	for {
		line, err := r.ReadString('\n')
		if err != nil && err.Error() == "EOF" {
			break
		}
		if line == "" || len(line) == 0 {
			continue
		}
		lineNum++

		val, ok := parseInt(r) // re-read logic needed? No, let's refactor to read all lines first or handle per line.
		// Actually, the above ReadString consumes the line. We need to store it.
		// Let's restart the loop structure to be correct.
	}

	// Refactored reading loop
	nums = []num{}
	lineNum = 0
	for {
		line, err := r.ReadString('\n')
		if err != nil && err.Error() == "EOF" {
			break
		}
		if line == "" || len(line) == 0 {
			continue
		}
		lineNum++

		v, ok := parseInt(r) // Wait, I can't re-read from r easily without storing.
		// Correct approach: Read the whole input into a buffer or process line by line correctly.
		// Since Go's bufio.Scanner is easier for lines, let's use that but handle target separately.
	}

	// Let's rewrite cleanly using Scanner for lines after reading target.
	// Actually, Scanner.Scan() returns true if it found a token/line.
	// Let's stick to the manual buffer approach or just re-implement properly.
	
	// Reset logic:
	// 1. Read target line.
	// 2. Loop for subsequent lines.
}

func parseInt(r *bufio.Reader) (int64, bool) {
	line, err := r.ReadString('\n')
	if err != nil || len(line) == 0 {
		return 0, false
	}
	
	// Trim whitespace
	s := line
	for i := 0; i < len(s); i++ {
		if s[i] == ' ' || s[i] == '\t' || s[i] == '\r' || s[i] == '\n' {
			s = s[:i]
			break
		}
	}
	
	// Parse integer
	val, err := strconv.ParseInt(s, 10, 64)
	if err != nil {
		return 0, false
	}
	return val, true
}

// Wait, I cannot use strconv here if I haven't imported it.
// Let's import strconv.
