package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately, but we need to handle input properly. 
	// Actually, for standard input in Go without arguments passed, we read from os.Stdin directly or use a scanner on stdin.
	// Let's rewrite the reading part correctly using fmt.Scanln which reads line by line and splits by space/comma?
	// The spec says "comma-separated integers". Usually this means one line like 1,2,3 or multiple lines.
	// However, standard input in competitive programming often provides a single string with spaces/newlines as delimiters implicitly if not specified strictly.
	// But the prompt explicitly says "カンマ区切りの整数列" (comma-separated integer list).
	// Let's assume it might be on one line or multiple lines separated by newlines, and commas separate items within a line? 
	// Or just comma separated across the whole input stream until EOF.
	
	// To handle robustly: read all tokens from stdin where whitespace/newline/comma are delimiters.
	// But Go's fmt.Scanln reads space-delimited strings by default if we use %s, but here we have commas too.
	// Better approach: Read the entire input as a string and parse manually or use bufio.Scanner with custom delimiter? 
	// Actually, simplest is to read line by line, split each line by comma, then trim whitespace from parts, convert to int if valid.
	
	scanner := bufio.NewScanner(reader) // Wait, reader needs stdin source. Let's fix imports and logic below in final code block properly.
}
