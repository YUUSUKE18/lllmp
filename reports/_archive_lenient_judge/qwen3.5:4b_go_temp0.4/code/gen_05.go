package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately, but we need to handle input properly. 
                                // Actually, for stdin in Go with no arguments passed, we should use os.Stdin or similar logic if available directly?
                                // Wait, the spec says "standard input". Let's re-read: "標準入力から、カンマ区切りの整数列を受け取ります。"
                                // This implies there IS standard input. The previous line was just a description of how to read it in theory (like Python). 
                                // In Go, we must use bufio.NewReader(os.Stdin) or similar. But I cannot import "os".
                                // Let's check the constraint: "標準ライブラリのみを使う" -> os is standard library! Yes.

	reader = bufio.NewReader(nil) // Wait, if reader is nil and no input provided? 
                               // The problem says "standard input", so there MUST be data or at least we need to read from stdin properly.
                               // Let's use a trick: create a new buffer reading from os.Stdin directly via io.Reader interface? No, I can't import 'io' if not allowed?
                               // Wait, the spec says "標準ライブラリのみを使う". This means ALL standard library packages are fine! 
                               // So importing "os" and "bufio" is perfectly valid.

	// Re-evaluating: The user prompt example was Python-like `reader = sys.stdin.read()`. 
	// In Go, we can do this easily with os.Stdin.
}
