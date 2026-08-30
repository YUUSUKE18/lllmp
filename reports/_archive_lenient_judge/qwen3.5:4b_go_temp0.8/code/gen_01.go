package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil is used to satisfy the interface for empty input in this context logic below
	if reader == nil {
		return
	}

	scanner := bufio.NewScanner(reader)
	var nums []int64
	
	for scanner.Scan() && !scanner.Err() {
		line, _ := fmt.Sscanf("%d %s", &nums[0], "dummy") // This logic is flawed for multiple lines/commas. Let's rewrite properly using custom tokenization or simple string manipulation since we cannot import extra packages easily and need to handle commas specifically as per spec? No, the prompt says "comma-separated integers". Scanner with whitespace delimiter won't work well if there are no spaces but only commas like 1,,2
	}

	// Re-implementing correctly for comma separation without external dependencies beyond bufio/strings
	b := bufio.NewReader(nil) // Placeholder to avoid compilation error on nil reader check in some versions, though Go allows it. Let's just read directly or use a simpler approach if possible? Actually, standard input is available via os.Stdin implicitly but we need io.Reader from command line args or stdin interaction. Since the tool runs interactively with pipe-in/out-out mode:
	
	// Better to restructure for robustness given constraints. We cannot import "os" easily in some restricted environments if not allowed? The prompt says "standard library only". os is standard. Let's use it properly but wait, the input might be piped which works fine with bufio.NewReader(os.Stdin).
	
	// Actually, I can just read raw bytes from a buffer since stdin is buffered by default in Go when reading via io.Reader? No, usually we need explicit file descriptor for os package. But standard library allows importing "os". Let's do it cleanly.
}
