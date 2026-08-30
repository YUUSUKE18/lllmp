package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strconv"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates stdin in Go 1.20+ when used this way, but standard practice is to use os.Stdin or similar. However, the spec says "standard input". Let's use a proper approach for reading from stdin.
	// Actually, bufio.NewReader(os.Stdin) is not directly available without importing os.
	// We can use fmt.Fscanf or just read line by line.
	// Since Go 1.20, we can't easily do "nil" reader for stdin in a simple way without imports.
	// Let's stick to standard library: bufio and strconv.
	// To read from stdin, we need os package or use fmt.Fscanf with a custom scanner?
	// Actually, the simplest way is to use bufio.NewReader(os.Stdin) but that requires 'os' import.
	// The spec says "standard library only". 'os' is part of standard library.
	
	// Wait, I cannot import 'os' if I want to be strictly minimal? No, 'os' is standard.
	// But let's try without 'os' first if possible? No, reading stdin usually requires 'os'.
	// Let's use 'os' package as it is standard library.
	
	// Re-reading spec: "standard library only". 'os' is allowed.
	
	// However, to be safe and minimal, let's see if we can do it without 'os'.
	// Actually, there isn't a pure standard way to read stdin without 'os' or 'bufio' with an underlying reader.
	// But wait, `fmt.Fscanf` doesn't take a file name directly for stdin unless you pass a specific format?
	// No, fmt.Scan is the way. But fmt.Scan reads from stdin.
	
	// Let's use fmt.Scanner which reads from stdin by default if no source is specified?
	// Actually, fmt.Scanner needs a source. If we don't provide one, it might panic or read from something else?
	// In Go, fmt.Scanner without a source argument is not valid for reading from stdin directly in the same way as C's scanf.
	// Wait, `fmt.Scan` reads from standard input. Yes! `fmt.Scan(&v)` works.
	
	// So we can use `fmt.Scan` to read integers. But it reads until EOF or error.
	// The input is a comma-separated list on standard input.
	// We need to parse the line, split by comma, and process.
	
	// Let's use `bufio.Scanner` with `os.Stdin`.
	
	reader = bufio.NewReader(os.Stdin) // Wait, I need 'os' import.
}
