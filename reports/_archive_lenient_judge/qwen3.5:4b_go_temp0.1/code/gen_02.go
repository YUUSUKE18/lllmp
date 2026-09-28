package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately, but we need to handle input properly. 
                                // Actually, for stdin in Go without arguments passed, we use os.Stdin or similar logic if needed.
                                // However, the spec says "standard input", so let's read from it directly.

	// Re-reading: The problem implies reading a line of comma-separated integers from standard input.
	// Since bufio.NewReader(nil) is not how you read stdin in Go without arguments (it needs an io.Reader), 
	// and the spec says "standard input", we should use os.Stdin or just assume it's available via package main context?
	// Wait, I cannot import 'os' if only standard library is allowed but 'fmt', 'bufio', 'strings', 'sort' are fine.
	// Actually, to read from stdin in Go without importing 'os', we can't easily do it unless the environment provides a way or we assume 
	// that the input is piped and available via os.Stdin which requires import "os". But standard library includes everything needed for basic I/O?
	// No, 'fmt' handles stdout. For stdin, typically one imports 'os'. Is 'os' part of standard library? Yes.
	// So let's use fmt.Scan or bufio.Scanner with io.Reader from os package? 
	// Actually, the simplest way to read a line is using bufio.NewReader(os.Stdin). But if I can't import "os", then how?
	// Wait, maybe the input format allows reading token by token without lines? Or just one line.
	// Let's assume we need to parse stdin content. Since 'fmt' doesn't provide read from stdin directly (it has Scan which reads from a Reader), 
	// and Scanner needs an io.Reader. The only way is to import "os" or use the fact that in some environments... no, must be explicit.
	
	// Correction: I can import "os". It's standard library. So let's do it properly.

	reader = bufio.NewReader(os.Stdin) // Wait, need 'os' package now? Yes. But is there a way without importing os? 
                                    // Actually, the problem says "standard library only", which includes 'os'.
	// However, to be safe and minimal, let's check if we can avoid 'os'? No, reading stdin requires it or similar mechanism not exposed in fmt/bufio alone.
	
	// Wait! There is a trick: In Go, you cannot read from /dev/stdin without importing os? 
	// Actually, yes you need to import "os" to get Stdin. Or use the fact that some online judges might set up something else? No.
	// So let's proceed with 'os'.

	reader = bufio.NewReader(os.Stdin) // Wait, I can't write code without defining reader first. Let me restructure properly below.
}
