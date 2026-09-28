package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately, but we need to handle input properly. 
	// Actually, for standard input in Go without arguments passed, we read from os.Stdin directly or use a scanner on stdin.
	// Let's rewrite the reading part correctly using fmt.Scanln which reads until newline and splits by space/comma? No, that doesn't split by comma automatically into integers easily with just one call if they are all in one line.
	
	// Better approach: Read entire input or use a loop to read tokens separated by whitespace/newlines/commas.
	// Since the spec says "comma-separated integer list", we can assume it's on stdin, possibly multiple lines? 
	// Usually competitive programming inputs might be multi-line but here it implies one line with commas.
	// However, robust solution: Read all input into a string buffer or use bufio.Scanner which splits by whitespace (including newlines). But comma is not whitespace.
	
	// Let's read the whole stdin content first? Or parse token by token handling both space and comma as delimiters.
	// The spec says "comma-separated", but also mentions ignoring empty elements/whitespace, so likely format like: 1,2,3 or 1 , 2 , 3 
	// We can replace all non-digit/non-minus characters with spaces? No, that might break negative numbers if not careful.
	
	// Simpler logic for Go: Use a custom tokenizer or just read the whole input string and parse integers manually skipping invalid chars.
	// But standard library `strconv.Atoi` takes a single string argument representing one integer.
	
	// Let's implement reading all lines from stdin, joining them with space (since comma is separator), then splitting by non-digit sequences? 
	// Actually, the easiest way to handle "comma-separated" where commas act as separators like spaces:
	// Replace ',' in input string with ' '. Then use strings.Fields() which splits by any whitespace.
	
	var lines []string
	scanner := bufio.NewScanner(reader) // Wait, I initialized reader incorrectly above for nil? 
	// Correct initialization: scanner = bufio.NewReader(os.Stdin). But we don't import os yet if we want minimal imports? No, fmt and bufio are enough but need to read from stdin.
	
	// Actually, `bufio.Scanner` reads from a Reader. We can use `os.Stdin`. Let's add "os" package.
}
