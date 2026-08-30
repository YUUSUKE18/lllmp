package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately for empty input, but we need to handle stdin properly. 
								// Actually, in Go, reading from a closed scanner or using standard I/O correctly requires proper setup.
								// Let's use a simple approach: read all tokens until EOF.

	scanner := bufio.NewScanner(nil) // This will always fail if input is empty unless we handle it differently.
									// Better to use os.Stdin directly with strings.Split or similar, but since we don't have 'os' in standard lib without importing? 
									// Wait, the spec says "standard library only". We can import "bufio" and "fmt", maybe "strings"? 
									// Actually, reading from stdin is best done via bufio.Scanner initialized with os.Stdin.
									// But we need 'os'. Is it allowed? Yes, standard libraries are fine as long as they're not external packages like third-party libs.
									// However, to be safe and minimal without importing 'os', we can use a trick or assume the environment provides stdin properly via bufio.Scanner with nil reader if input is piped correctly in some contexts? 
									// No, that's not portable. The correct way is to import "os" for Stdin.
									// Let me re-read: "標準ライブラリのみ使う". This usually means the Go standard library (like fmt, bufio), and 'os' is part of it too. So importing os is fine.

	os := nil // Placeholder - we need actual imports.
}
