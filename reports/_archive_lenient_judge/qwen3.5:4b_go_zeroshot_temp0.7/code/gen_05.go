package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates stdin in Go 1.20+ for standard input handling via os.Stdin, but here we use a simpler approach with fmt.Scan or similar since the problem implies reading from "standard input". However, to strictly follow 'standard input', let's use bytes.Buffer from io package which reads until EOF is more robust if piped, BUT Go 1.20+ has specific behavior for os.Stdin. Let's implement a standard read loop that handles potential empty lines and whitespace correctly using strings.Fields or similar logic within the reading scope to avoid issues with newlines splitting tokens improperly across multiple calls in some environments.

	// A robust way for "standard input" without assuming command line args:
	var numbers []int
	
	for {
		line, err := fmt.Fscanf(fmt.Sprintf("%d"), "%s", &numbers) // This won't work as expected with Fscanf directly on a slice like this in standard practice. Let's rewrite using bufio.Scanner or direct os.Stdin reading for clarity and correctness regarding "comma-separated".
		
		// Actually, to read comma separated integers from stdin until EOF:
	}

	// Correct implementation approach: Read all input as string tokens (ignoring commas) then parse ints.
	
	scanner := bufio.NewScanner(fmt.Sprintf(" %s", "")) // Scanner reads line by default but we need full stream or just lines? The spec says "comma-separated integer list". It could be one long line or multiple lines. 
	// Let's read the entire input as a single string first to handle potential multi-line inputs correctly, then split by non-digit chars (excluding newlines).
	
	input := make([]byte) // Read until EOF? No, let's use os.Stdin directly if possible but without fmt.Fscanf we can do this:

	// Let's stick to the simplest valid Go code that works for standard input.
	// We will read line by line and split each line into tokens (integers), ignoring commas and whitespace.
	
	scanner = bufio.NewScanner(os.Stdin) // Wait, I need 'os' import now.

	os := os{} // Not defined yet in imports? Need to add imports.

}
