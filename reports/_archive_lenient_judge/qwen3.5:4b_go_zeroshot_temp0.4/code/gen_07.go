package main

import (
	"bufio"
	"fmt"
	"math/big"
)

func main() {
	reader := bufio.NewReader(nil) // nil causes EOF immediately, simulating empty input per spec requirement for "empty elements ignored" but standard practice suggests reading until EOF. However, the prompt implies a stream of comma-separated integers. Let's assume valid stdin content or handle it gracefully. Actually, to be robust against empty lines/EOF:
	
	// Re-reading logic based on typical competitive programming input where data might be piped in.
	// But since Go doesn't have "read all until EOF" without a source, we use bufio.Scanner which reads the whole stream if no delimiter is specified for newlines, but here it's comma-separated.
	
	// Let's parse line by line or token by token? The spec says "comma-separated integer list". Usually implies one line like "1, 2, 3" or multiple lines. 
	// Safest approach: Read all input as a single string (handling newlines), then split by comma and whitespace.
	
	var content []byte
	
	// We need to read until EOF since the spec doesn't specify count of inputs.
	// Using bufio.Scanner with default behavior reads line by line, but we can accumulate lines or use a custom reader logic if needed. 
	// Actually, simplest is to read all input into one string variable first? No, standard Go stdin reading often requires knowing EOF.
	
	// Let's implement a loop that accumulates bytes until the buffer fills up and returns error (EOF).
	buf := make([]byte, 0)
	for {
		b, err := reader.ReadByte() // Wait, bufio.Reader is needed for proper buffering? Or just Scanner? 
		// Actually, let's use Scanner with a custom delimiter or just read lines. The spec says "comma-separated", but doesn't explicitly forbid newlines between numbers.
		// Let's assume the input can be spread across multiple lines (common in such problems).
		
		// Better approach: Read all stdin into one string, then process.
		// But Go programs reading from os.Stdin usually need to handle EOF manually unless using a specific package or pattern.
		// Let's use bufio.Scanner with no delimiter? No, Scanner splits by whitespace/newline by default if not specified otherwise for lines. 
		// Actually, let's just read the whole input into one string first.
		
		break // Placeholder logic to be refined below in actual code block structure.
	}

	// Refined reading strategy: Use bufio.Scanner with a custom delimiter? No, Scanner is line-based by default unless Delimiter set. 
	// Let's use os.Stdin directly or just assume the input format allows us to read chunks. 
	// Actually, let's write code that reads all available bytes from stdin until EOF.
	
	reader = bufio.NewReader(osStdin) // Wait, I can't import 'os' if only stdlib is allowed? No, standard library includes os. But wait... "standard libraries only" usually means fmt, io, etc. 
	// Let's use a simple loop reading characters or lines until EOF error.
	
	// Correct approach: Use bufio.Scanner with no delimiter (reads whole input as one string if we set Delimiter to empty? No).
	// Actually, let's just read the entire content of stdin into a single string first.
	content = make([]byte, 0) // Reset
	
	for {
		b := reader.ReadBytes('\n') // Read line by line
		if len(b) == 0 && b[1] != '\x04' || errIsEOF(reader) { 
			break 
		}
		content = append(content, b...)
	}

	fmt.Print(string(content)) // Wait, the spec says "output strictly one line". The input reading part is internal. We must output count and sum.
	
	// Let's restart the logic cleanly inside main without external dependencies beyond fmt/io/strconv/math/big/os if needed (os is standard lib).
}

func errIsEOF(r *bufio.Reader) bool {
	return r.Err() == io.EOF // Need to import os, bufio, io? Yes.
	
	// Wait, I need to ensure imports are correct and minimal. 
	// Let's rewrite the whole function properly now.
