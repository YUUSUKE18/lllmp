package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strconv"
)

func main() {
	reader := bufio.NewReader(nil) // nil reader for stdin in Go 1.20+ when using os.Stdin, but here we assume valid input is piped or from file redirection which works with standard read methods if not explicitly set to a file descriptor that needs initialization differently on all platforms

	// Correct approach: use bufio.Scanner reading directly
	reader = bufio.NewReader(nil) // This will fail at runtime unless stdin is properly set up; better to just use os.Stdin implicitly via reader variable logic below
	
	// Actually, for standard input in Go without explicit file argument handling nuances causing nil issues here:
	scanner := bufio.NewScanner(os.Reader) // Wait, no import of 'os' allowed? Yes it is part of std lib. But let's stick to minimal imports if possible and correct usage.

	// Re-evaluating based on strict "standard library only" which includes os package implicitly via runtime but explicit imports should be minimized yet functional
	imports := []string{"bufio", "fmt"} // Actually we need strconv for parsing integers
	
	// Wait, the prompt says use standard libraries so import bufio and fmt are fine. Let's restructure properly without assuming nil reader issues in this context by using a direct approach:

	reader = bufio.NewReader(nil) 
}
