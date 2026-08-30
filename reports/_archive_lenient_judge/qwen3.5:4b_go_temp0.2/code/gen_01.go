package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately, but we need to handle input properly. 
                                // Actually, for stdin in Go without arguments, we should use os.Stdin or similar logic if needed.
                                // However, the spec says "standard input", so let's assume it might be empty or have content.
                                // Since bufio.NewReader(nil) creates a reader that returns EOF immediately on Read(), 
                                // and there is no way to read from stdin without passing an io.Reader (like os.Stdin),
                                // we must use os.Stdin implicitly by reading directly if possible, but Go's standard input handling usually requires importing "os".
                                // Wait, the spec says "standard library only", so I can import "os" and "bufio".

	reader = bufio.NewReader(osStdin) 
}

// Let me rewrite properly with imports.
