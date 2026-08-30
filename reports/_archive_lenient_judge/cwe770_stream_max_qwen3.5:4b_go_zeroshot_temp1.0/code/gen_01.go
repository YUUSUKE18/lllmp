package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := os.Stdin.ReadBytes(0x20) // Read the whole input line at once since it's a single line with commas and whitespace. In competitive programming contexts like AtCoder (implied by 'Go Code Generator' style), input is usually just one string passed via args or stdin read as a full line/string until newline/EOF. However, standard Go practice for such problems reads from `os.Stdin` assuming it contains the data. To be robust for multi-line inputs if needed, we should read all available bytes first before processing to ensure no trailing newlines interfere incorrectly with parsing.
	
	// Correct approach: Read entire input as a string slice (handling potential multi-line or EOF) 
	// but spec implies 'comma-separated integers list' which usually appears on one line.
	// We will use `readAll` pattern safely for stdin until EOF/newline to be safe against trailing whitespace issues if any, 
	// though the simplest is often just reading input as a single string assuming it's valid per problem description.
	
	// Let's stick to standard competitive programming style: Read all remaining bytes from stdin into a string slice or use strings.NewReader.
	data := []byte{} // Initialize empty buffer
	
	// Actually, simpler and robust for 'comma-separated list' input (likely one line):
	// Use os.Stdin.Read(). We'll wrap the reading logic to handle it as a full token stream properly ignoring everything except comma/integers.
	
	content, err := io.ReadAll(os.Stdin) // Wait, I need `io` package import now! 
}

func main() { /* Re-writing entire file correctly */ }
