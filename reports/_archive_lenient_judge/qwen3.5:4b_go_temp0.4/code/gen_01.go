package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil causes EOF immediately, simulating empty input or redirecting to stdin if needed. However, for standard input usage in Go, we should read from os.Stdin properly but the spec says "standard input". Let's use a Scanner on stdin directly as it handles whitespace and tokens well.
	// Actually, bufio.Scanner is better because it reads token by token (splitting by whitespace).

	scanner := bufio.NewScanner(nil) // This will fail if we don't provide an io.Reader. 
	// Correct approach: Use os.Stdin but since I cannot import "os" explicitly in the thought process to avoid external deps?
	// Wait, standard library includes "fmt", "bufio". To read from stdin properly without extra imports like 'os', we can use a custom reader or just assume input is piped. 
	// However, Go's bufio.Scanner requires an io.Reader. The only way with pure stdlib and no os import (if restricted) is tricky but usually 'os' is allowed as standard library.
	// Re-reading spec: "標準ライブラリのみ使う" -> This implies any package in the standard lib is fine, including 'os'. 
	// But to be safe and minimalistic without assuming imports like os if not strictly needed (though reading stdin usually needs it), let's use a trick or just import os.
	// Actually, I can create an io.Reader from bytes? No input given yet.
	// Let's assume the environment provides stdin via Go's default behavior when running with `go run`. 
	// To be robust: Import "os" is standard library. It's allowed.

	reader = bufio.NewReader(os.Stdin) // Wait, I need to import os now.
}
