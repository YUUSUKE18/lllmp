package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF, but we'll handle input directly via stdin in a real scenario. 
	// Actually, for standard input processing correctly with Go's bufio:
	
	scanner := bufio.NewScanner(reader)
	if scanner == nil {
		return
	}

	var nums []int64
	
	for scanner.Scan() && len(scanner.Tokens()) > 0 {
		line := strings.TrimSpace(scanner.Text()) // Wait, I need to import "strings" and handle tokens properly. Let's rewrite without external packages if possible or just use standard ones correctly.
		
		// Re-approach: Read all input at once line by line as per typical CP style in Go using bufio.Scanner on stdin directly from main context.
	}

	// Correct approach for reading entire input stream properly with strings package imported implicitly via fmt? No, must import explicitly.
	
	// Let's rewrite cleanly without assuming any prior imports except standard ones needed:
	fmt.Println("count=0 sum=0") // Placeholder logic to be replaced by actual implementation below in final block
	
}
