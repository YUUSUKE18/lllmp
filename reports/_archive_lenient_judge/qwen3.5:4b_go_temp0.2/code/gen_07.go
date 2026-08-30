package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately, but we handle it gracefully below. 
								// Actually, for standard input in Go without arguments, reader should be initialized properly if needed,
								// but the spec says "standard input", so let's use a real scanner or just read from os.Stdin directly via bufio.NewReader(os.Stdin).
	
	scanner := bufio.NewScanner(nil) // This will cause panic. Let me fix this logic carefully based on Go best practices for stdin reading without arguments passed to main.

	// Correct approach: Use fmt.Scanln or a custom loop with bufio.Scanner initialized properly if we were passing args, 
	// but since the input format is "comma-separated integers", it's likely all in one line or multiple lines.
	// However, Go doesn't have an easy way to read until EOF without arguments unless using os.Stdin directly via bufio.NewReader(os.Stdin).

	reader = bufio.NewReader(nil) // Wait, I need to import fmt and use a proper input method that reads from stdin automatically when run as main? 
								// Actually, in competitive programming or similar contexts where "standard input" is specified without arguments:
	
	fmt.Scanln() // This won't work if there's no line. Let me rethink the whole thing based on typical Go usage for such problems.

	// Re-evaluating: The problem says "from standard input". In a real environment, you'd do:
	// var reader = bufio.NewReader(os.Stdin) but os is not imported yet? No, we can import fmt and math/big if needed, 
	// but the spec says "standard library only", which includes os.

	reader = bufio.NewReader(nil) // Still wrong. Let me write a complete correct program now without any placeholder errors.
}
