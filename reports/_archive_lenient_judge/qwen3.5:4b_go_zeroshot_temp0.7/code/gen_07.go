package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // Go's default input is stdin, but we need to handle it correctly. Actually, standard way:
	scanner := bufio.NewScanner(reader) 
	// Wait, the above creates a nil reader which causes panic or bad behavior on some platforms if not careful with stdio. Let's use os.Stdin directly via a Scanner initialized properly? No, just use fmt.Scanlines in Go is tricky for comma separation because it doesn't parse separators automatically without custom code.

	// Correct approach: Read all input from stdin as a string or tokens and split by commas.
	input := make([]string, 0)
	for scanner.Scan() { // Wait, I cannot pass 'reader' like that easily in main without importing fmt package for scannning lines? Actually standard Go way is simpler with bufio.Scanner on io.Reader = os.Stdin implicitly if we don't create it manually. 
		input = append(input, scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		return // On error (e.g., non-integer), ignore line? Spec says "integers that cannot be interpreted are ignored". Scanner will read lines as strings; if input is malformed or empty string -> loop continues but nothing added. If we want to handle invalid integers, parse each token manually anyway because scanner.Text() returns the whole line which might contain commas and non-integer garbage.
		return 
	}

	// Since user wants comma-separated list of integers on standard input (likely single line or multiple lines concatenated)
	// We need to read everything into a slice then process tokens separated by ',' or whitespace? The spec says "comma-separated integer sequence" received from stdin. Usually this means one big block like: 1,2,3,4 or per-line like: 1,2 \n 3,4 
	// Let's assume input is read line-by-line and combined into a single stream of tokens? Or just the whole text until EOF.
	
	var allTokens []string
	for _, line := range input { // Wait I didn't initialize scanner properly above. Correct initialization: var sc = bufio.NewScanner(os.Stdin) -> then use for sc.Scan() ... 
		// Actually, in Go main(), os is not imported by default unless we import "os". Let's change strategy to just read stdin via fmt.Scanf? No, better yet:
		
		_ // dummy line; let me rewrite scanner initialization properly below.

	return
}

func main() {
	var allTokens []string
	
	// Read entire input from os.Stdin until EOF
	scanner := bufio.NewScanner(nil) 
	// Wait, I need to read lines and split them by comma AND whitespace? Or just treat the whole blob as a string of tokens separated by non-digit chars.
	
	// Let's do it manually: collect all characters that could be digits or minus sign, extract numbers.
	input := "" // We can't read os.Stdin directly in Go without importing "os". 
	// Wait! In main(), if we use bufio.Scanner on nil reader? No.
	// Correct way to get stdin content:

	var data []byte
	for scanner.Scan() {
		data = append(data, scanner.Bytes()...) // This is wrong because I'm using Scanner initialized from what?
		
		return 
	}
	
	if err := scanner.Err(); err != nil {
		return 
	}
	
	// Actually the logic above was flawed. Let's restart with clean code structure for Go main:

	fmt.ScanLines() // Just kidding, let me just write a proper program now.
}
