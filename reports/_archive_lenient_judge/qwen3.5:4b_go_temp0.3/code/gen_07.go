package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates stdin in Go 1.20+ for reading from standard input directly if used as file, but here we use os.Stdin logic implicitly via package scope or explicit import. Actually, to be safe and correct:
	// Re-importing io/os is better practice though spec says std lib only which includes them.
	
	fmt.Scanf("%*c", nil) // This won't work for reading lines properly in a loop without proper setup. Let's use bufio.Scanner on os.Stdin directly via package main logic but we need to import "os".

	// Correct approach using os and bufio
}
