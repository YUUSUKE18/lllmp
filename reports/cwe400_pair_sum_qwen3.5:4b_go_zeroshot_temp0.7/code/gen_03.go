package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil creates a reader from /dev/null or standard input depending on context, but we need stdin.
	// Correct approach: use os.Stdin or just read directly if we assume input is available.
	// Since the problem says "standard input", we should use bufio.NewReader(os.Stdin).
	// However, to avoid importing "os", we can rely on the fact that standard Go programs usually import os for stdin.
	// But the spec says "standard library only". os is part of standard library.
	// Let's use bufio and os properly.
	
	// Re-evaluating: The prompt says "standard library only". os, bufio, fmt are all in std lib.
	// So we will import them.
}

// Actually, I need to write the full code inside main or helper functions.
// Let's refactor slightly to fit the requirement perfectly without external dependencies beyond standard lib.

import (
	"bufio"
	"fmt"
	"os"
)
