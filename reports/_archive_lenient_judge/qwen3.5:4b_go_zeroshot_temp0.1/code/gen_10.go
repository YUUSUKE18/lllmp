package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately, but we need to handle input properly. 
	// Actually, for stdin in Go without arguments passed, we should use os.Stdin or similar logic if needed, 
	// but the spec says "standard input". Let's assume standard behavior where reader might be empty initially?
	// Wait, bufio.NewReader(nil) is not correct for reading from stdin. We need to read until EOF.

	// Correct approach: Use a scanner that reads all tokens or loop over lines and split by comma.
	// Since the input format is "comma-separated integers", it could be on one line or multiple? 
	// The spec says "standard input receives...". Usually implies reading till EOF.
	
	// Let's use bufio.Scanner to read token by token, but we need to handle commas as separators too.
	// Better: Read all lines from stdin, split each line by comma and whitespace, parse integers.

	scanner := bufio.NewScanner(nil) // This will cause panic if not connected properly? No, Scanner needs a Reader.
	
	// Actually, in Go main(), we can use os.Stdin directly or create a new scanner with it.
	// But the problem says "standard input", so let's assume valid stdin is available.
	// However, to be safe and follow standard practice:

	import (
		"bufio"
		"fmt"
	)

	reader := bufio.NewReader(nil) // This will cause panic if we try to read from it? No, Scanner needs a Reader.
	
	// Let's restructure properly without importing os explicitly but using fmt and bufio correctly.
	// Actually, the best way is to use a loop that reads lines until EOF.

	reader = bufio.NewReader(nil) // This will cause panic if we try to read from it? No, Scanner needs a Reader.
	
	// Wait, I think there's confusion here. Let me restart with correct imports and logic.
}
