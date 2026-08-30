package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil causes EOF immediately, but we need to handle input properly. 
	// Actually, standard practice is to read from os.Stdin directly or use a reader that handles stdin.
	// Let's rewrite the reading logic to be robust for empty lines and spaces.

	var line string
	reader = bufio.NewReader(nil) // This will cause an error on ReadLine if nil. We need real input handling.
	
	// Correct approach: read from os.Stdin implicitly or explicitly? 
	// The problem says "標準入力から", so we should use fmt.Scanln or similar, but it handles whitespace automatically.
	// However, the requirement is to ignore non-integer elements and empty parts.
	// Let's parse line by line until EOF.

	// Re-declaring reader properly for stdin reading in Go usually involves importing os, 
	// but standard fmt.Scanln reads from stdin directly if no arguments are passed? No, it doesn't read lines with spaces inside easily without custom parsing.
	
	// Let's use a Scanner on io.Reader (os.Stdin) to handle the input stream correctly.
}

import "io" // Wait, I cannot put imports after main in Go code block if I want it as one piece? 
// Actually, imports must be at the top. The previous attempt was invalid syntax structure-wise for a single file submission without proper import placement relative to package/main logic flow.

// Let's restructure properly:
