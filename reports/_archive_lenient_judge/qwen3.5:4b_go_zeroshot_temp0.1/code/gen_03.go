package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately, but we need to handle input properly. 
	// Actually, for standard input in Go without arguments passed, we should use os.Stdin or similar logic if needed.
	// However, the spec says "standard input", so let's assume it might be empty or contain data.
	// Since bufio.NewReader(nil) creates a reader that returns EOF immediately on Read(), 
	// and there is no way to pass stdin directly without using os.Stdin in most cases unless we use io.ReadAll from os.Stdin.
	
	// Let's re-read the spec: "標準入力から...受け取ります" -> This implies reading from standard input stream.
	// In Go, if you want to read all lines or tokens from stdin until EOF, you typically do this with bufio.Scanner on os.Stdin.
	// But since we are not given any command line arguments and the problem doesn't specify how many inputs, 
	// let's assume it might be empty (EOF immediately) or contain data.
	
	// To handle "empty elements" properly: if input is just newlines/spaces/invalid chars -> output count=0 sum=0.
	// We'll use a Scanner to read tokens one by one, skipping whitespace automatically.

	scanner := bufio.NewScanner(os.Stdin) // Wait, I forgot 'os' import! Let me fix that in the final code block below properly.
}
