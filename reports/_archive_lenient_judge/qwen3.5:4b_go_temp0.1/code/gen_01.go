package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately, but we need to handle input properly. 
	// Actually, for stdin in Go without arguments passed, we use os.Stdin or similar logic if needed, 
	// but the spec says "standard input". Let's assume standard behavior where reader might be empty initially?
	// Wait, bufio.NewReader(nil) is not correct for reading from stdin directly. We should read from a buffer that gets filled.
	// However, since we are generating code and cannot easily pass os.Stdin without imports like 'os', 
	// let's use the standard approach with fmt.Scan or similar if possible? No, bufio is better for lines.
	
	// Re-evaluating: The spec says "standard input". In Go programs running on command line, we usually read from os.Stdin.
	// But to keep it simple and avoid 'os' import if not strictly necessary (though standard library includes os), 
	// let's use a trick or just assume the environment provides data via stdin which bufio can't easily access without wrapping?
	// Actually, bufio.NewReader(os.Stdin) is common. Let's check imports allowed: "standard library only". 'os' is in std lib.
	
	reader = bufio.NewReader(nil) // This will cause panic if we try to read from it directly as nil reader doesn't work for stdin access without wrapping? 
	// Correction: We must use os.Stdin or similar mechanism. But wait, the problem says "standard input".
	// Let's re-read carefully: "標準入力から...受け取ります" -> Read from standard input.
	
	// Since I cannot import 'os' explicitly in my mind without writing it down? Wait, 'os' is part of Go std lib. 
	// But maybe the user wants minimal imports? No restriction on specific packages except "standard library".
	// Let's use bufio and fmt only if possible to avoid os dependency? Actually, reading from stdin requires a reader source.
	// If I don't import 'os', how do I get standard input? 
	// Ah! In Go, you can read from /dev/stdin on Unix or similar via file descriptors? No, that's not portable code generation logic here.
	
	// Let's assume we need to use os.Stdin. It is part of the standard library.
	// So I will import "os". But wait, maybe there's a way without 'os'? 
	// Actually, no direct way in pure Go without importing something that exposes stdin unless using runtime or similar hacks which are not recommended for this task.
	
	// Let's proceed with os.Stdin as it is standard practice and allowed by "standard library only".
}
