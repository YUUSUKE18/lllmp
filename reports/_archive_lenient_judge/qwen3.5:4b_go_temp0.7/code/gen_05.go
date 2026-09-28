package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates reading from stdin in this context via standard input handling logic if redirected, but we use fmt.Scan or similar for simplicity as per requirement. However, to strictly follow "standard input", let's parse line by line safely.
	
	// Actually, using a slice and scanning is safer. Let's read lines until EOF.
	scanner := bufio.NewScanner(reader) // Wait, reader needs stdin source properly set in typical Go env or use os.Stdin directly if allowed (standard lib). 
	// The prompt says "Standard input", so we should import fmt to handle arguments? No, let's assume the input is piped as a single string line.
	
	// Better approach: read all tokens from stdin until EOF using bufio.Scanner which reads standard input when created with os.Stdin (but 'os' might be considered external?). 
	// The prompt says "standard library only". fmt and io are part of it. But to avoid importing 'os', we can use the fact that in a Go script environment, if you run `go run main.go < input.txt`, stdin is available via standard streams?
	
	// Actually, strictly speaking without os package, how do we access stdin easily? 
	// We can simulate it by assuming input arguments are passed as string args or reading from the buffer. But usually in coding challenges for Go:
	// 1. Use fmt.Scanln() which reads until newline and is part of stdlib (fmt). It's often used when multiple lines exist, but here we have one line? 
	// Let's re-read spec: "標準入力から、カンマ区切りの整数列を受け取ります" -> Usually implies pipe or redirection.
	
	// Since 'os' package is not explicitly forbidden by the rule ("standard library only"), it IS part of standard library and provides access to stdin easily via os.Stdin. 
	// But sometimes "standard library" constraints in these prompts imply minimizing imports if possible, but for correct functionality with Stdin redirection without parsing arguments (which are file-like), 'os' is necessary or a workaround using fmt.Fprint? No, input comes from outside.
	
	// Let's try to do it purely via bufio.Scanner on the standard stream available in Go execution context which is os.Stdin by default if we use io.Reader? 
	// Wait, `fmt` package doesn't give access to stdin directly unless passed a Scanner or using ReadByte/ReadString from 'io'.
	// But actually, there's no direct way to get stdin into a function argument in Go without importing something that opens the file. 
	// The ONLY standard library item is io.Reader? No.
	
	// Let's use `os` package because it is part of "standard library". If I cannot import os, how else? Maybe using arguments slice if input was command line args (not stdin). But spec says stdin.
	// So: import ("bufio", "fmt") -> no stdin access really unless we fake or assume environment specific behavior? 
	// Wait, in Go, `os.Stdin` is the way to read from standard input using a file handle mechanism that supports redirection without needing arguments parsing loop manually if os package was allowed.
	
	// Is there ANY workaround with just bufio and fmt? No. You need an io.Reader source or access to stdin. 
	// Given "standard library only" usually allows `os`, I will use it for correctness in handling STDIN input redirection properly (e.g., passing bytes). However, if the prompt implies NO external packages other than core logic...
	
	// Let's assume we can import 'os'. It is standard. 
	// If not allowed: We might have to rely on command line arguments which are NOT stdin but usually tested via `go run main.go a b c`. But spec says "Standard Input".
	
	// Okay, let's use os.Stdin.
	import ("bufio", "fmt") // Wait, I cannot import inside func body in Go source code like this. Imports go at top of package block.

	// Final plan: Use `os` to read from stdin properly. Even if some users dislike it because they think 'stdlib' means only core math/strings? No, standard library includes os.
	
	// Re-evaluating based on common coding test constraints for "Go": 
	// Often tests provide input via args or piping into a program that uses `os.Stdin`.
	// So I will use os package to read stdin line by line until EOF.

	var scanner *bufio.Scanner
	
	scanner = bufio.NewScanner(os.Stdin) // Need 'os' import
	
	counts := make(map[int]int64) // Map integer -> count
	sumTotal := int64(0)
	
	// Wait, map is fine? We need sum of integers. 
	// Spec: "重複を除いた整数" (Unique integers). Count them and Sum them up.
	// So if input has `1 2 3`, unique are {1,2,3}, count=3, sum=6.
	// If `1 1 2`, unique {1,2}, count=2, sum=3.
	
	// Reading loop:
	for scanner.Scan() {
		line := scanner.Text() // Trimmed automatically? Scanner text trims leading/trailing whitespace but keeps internal spaces/newlines if any line has multiple tokens separated by comma or space? 
		// Spec says "Comma-separated". But usually Go programs can handle both. The prompt specifically mentions commas, so we split by ',' and then try to parse int.
		
		parts := strings.Split(line, ",") // 'strings' is standard library!
		
		for _, part := range parts {
			part = strings.TrimSpace(part) // Trim spaces around the integer if any? Spec says "ignore leading/trailing whitespace". 
			if len(part) == 0 || !isIntPart(part) { continue } // Skip empty or non-int
		
			val, err := strconv.Atoi(part) // 'strconv' is standard library!
			
			// Actually wait: Is there a simpler way without strings and strconv? fmt.Scanint skips whitespace. But we need to handle commas specifically if they are the only separator mentioned? 
			// Spec says "Comma-separated integer list". It might be `1,2,3` or ` 1 , 2 , 3 `.
			// Using 'strings' and 'strconv' is safe as they are standard.
			
			if err != nil { continue } // Ignore elements that cannot be parsed as integers
			
			counts[val]++
			sumTotal += val 
		}
		fmt.Printf("count=%d sum=%v\n", len(counts), sumTotal)
	// Wait, output format: `count=<個数> sum=<合計>` -> count is number of UNIQUE elements. So it's just the size of the set (number of distinct keys in map). 
	// And "sum" means sum of those unique integers.
	
	fmt.Printf("count=%d sum=%v\n", len(counts), sumTotal) // Wait, need to check output format again: `count=<個数> sum=<合計>` 1 line ending with newline.
}

func isIntPart(s string) bool {
	// Simple heuristic or just try parsing inside loop? 
	// Better put logic in main loop directly using strconv.Atoi and catch error.
	return true // Placeholder, will replace inline
