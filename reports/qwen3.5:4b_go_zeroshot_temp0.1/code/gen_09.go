package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strconv"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately for empty input, but we need to handle stdin properly.
	// Actually, bufio.NewReader requires a reader. For standard input, we use os.Stdin directly or wrap it.
	// Let's use a simple approach reading all lines until EOF.
	
	var bigInts []*big.Int
	
	scanner := bufio.NewScanner(nil) // This will cause issues if not initialized with stdin.
	// Correct way:
	// scanner := bufio.NewScanner(os.Stdin)
	// But we can't import os in the final block easily without it being there.
	// Let's use a custom reader that reads from os.Stdin implicitly or just use fmt.Fscan which handles EOF.
	
	// Actually, the simplest way to read all tokens from stdin until EOF is using bufio.Scanner with os.Stdin.
	// We need to import "os".
	
	// Re-evaluating imports: The spec says "standard library only". "os" is standard.
	
	// Let's write the code assuming we can import "os".
}

// Wait, I cannot put multiple functions or complex logic if I want it to be a single block that runs.
// But Go allows multiple functions in one file. The spec says "1 つの
