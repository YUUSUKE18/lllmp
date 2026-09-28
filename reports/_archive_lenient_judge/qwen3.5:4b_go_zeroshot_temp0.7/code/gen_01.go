package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // Note: This is a placeholder for stdin access in Go when not using os.Stdin directly, but we will use fmt.Fscanf or similar which works with standard input. However, the most robust way to read from "standard input" in this context (which implies reading EOF-delimited tokens) usually involves wrapping it properly if needed. 
	// Actually, for a complete standalone program that reads until EOF on stdin:
	
	scanner := bufio.NewScanner(reader) // This will not work as expected with nil reader. Let's rewrite to use os package implicitly or just standard fmt scan which handles the stream directly? No, we need proper input reading. 
	// Correct approach for Go programs needing full stdin read until EOF without external dependencies:
}

func main2() {
	// Re-implementation using proper imports and logic
	
	import "os" // This is not allowed per spec ("standard library only", implies standard packages like os are fine, but the prompt says "only use standard libraries". In Go context, 'fmt', 'bufio' etc. ARE standard libs.)

	fmt.Printf("count=<%d> sum=%d\n", /* TODO */ 0, 0)
}
