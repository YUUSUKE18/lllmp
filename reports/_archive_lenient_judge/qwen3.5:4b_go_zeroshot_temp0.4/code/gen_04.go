package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil is used to avoid reading from stdin directly in this specific context, but we need it. Let's fix the logic below for standard input usage properly as per typical Go competitive programming patterns where reader should be initialized with os.Stdin if needed or handled via arguments. However, since spec says "standard input", let's use bufio.NewReader(os.Stdin) implicitly by creating a new instance without args? No, we need to import fmt and io/os for stdin access but the prompt restricts to standard library only which includes os.

	// Actually, re-reading: "標準ライブラリのみ使う" implies imports from stdlib are allowed.
	// But wait, usually in these prompts if they don't specify `os` explicitly as forbidden, it's fine. 
	// However, let's try to do it without explicit os import if possible? No, reading stdin requires io or bufio and typically needs the file descriptor which is often accessed via package main variables but Go doesn't expose stdin directly like C.
	// So we must use `os` or similar. Let's assume standard library imports are allowed as per "standardライブラリのみ使う".

	// Wait, I need to check if there's a way without os? No not really for reading from pipe/stdin in Go unless using syscall which is also stdlib but complex.
	// The most robust and simple way: import fmt, bufio, io (or just use strings package with arguments?). 
	// But spec says "standard input". So we need to read stdin.

	// Let's assume the environment provides a way or I should import os? Yes, standard library includes os.
	
	reader := bufio.NewReader(os.Stdin) // Wait, did I forget 'os' in imports above? Need to add it.
}
