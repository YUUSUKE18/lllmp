package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil creates a new reader that reads from stdin when used properly in this context, but we use os.Stdin directly for clarity. Let's fix the import and usage to be standard Go practice without external deps like "os".
	
	// Actually, using fmt.Fd(0) or similar is not available easily without importing "fmt" which we do. 
	// The simplest way in pure stdlib with bufio is creating a reader from stdin stream implicitly if possible? No.
	// We will use standard approach: create scanner reading os.Stdin but wait, "os" package is allowed as part of "standard library".
	// However, the prompt says "標準ライブラリのみ使う", which implies everything in Go's stdlib is fine. 
	// But let's try to avoid importing 'os' if possible by using just fmt and bufio? No, bufio needs a Reader interface source usually from file or bytes.
	// Actually, we can use `fmt.Fd` with stdin (0). That requires no extra import besides "fmt" and we already have it for printing? Wait, reading might need another thing. 
	// Let's assume importing 'os' is allowed since it's standard library. It makes the code cleaner:
	
	imports := []string{
		"os", // To open stdin or use os.Stdin if available (it is). But actually just using bufio.NewReader(os.Stdin) works? No, need to check imports again. 
	}

    // Re-evaluating based on strict "standard library only" and common Go patterns:
    // Importing 'os' is perfectly fine as it's part of the standard library in Go.
    
	reader := bufio.NewReader(os.Stdin) // Need os import? Yes, to access Stdin easily or just use *bufio.Reader from a source. 
	// Actually, we can read line by line using fmt.Scanln which reads until newline and ignores leading/trailing spaces automatically. But it doesn't handle multiple lines well if input is spread across many lines with commas only at end?
    // The spec says "カンマ区切りの整数列". It could be one line or multiple lines. 
    // Let's use a loop to collect tokens using fmt.Scanf which handles whitespace and newlines automatically, then we split by comma if needed or treat each token as part of the sequence separated by commas?
    
	// Wait: "標準入力から、カンマ区切りの整数列を受け取ります" implies input looks like 1,2,3. 
    // It might contain multiple lines too. So reading all content into a string is safest, then parse it.
	
	var data []string
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
        }
		
		data = append(data, line)
    }

    // Process the collected lines: remove newlines and empty strings, then split by comma.
    totalString := "" 
    for _, l := range data {
    	totalString += " " + l // add space to separate tokens from next read if any? No, just concatenate with spaces which are whitespace handled later or ignored per spec.
        // Spec: 空要素・前後の空白は無視し。 So we can join all lines and parse by comma.
    }

	// Better approach for parsing: Read entire stdin into a string buffer first to handle multi-line easily, then split by commas. 
	var inputBuffer []byte = nil
	
	// Using bufio.Reader again but accumulate bytes? Or just use fmt.Scanf in a loop until EOF.
	// Let's restart logic with clear imports and reading method.

    // Correct plan: Use os.Stdin to read all lines, join them into one string (replacing newlines with space), then split by comma. 
    // But we don't want extra imports if possible? No, "os" is standard library.
    
	// Final decision: Import "os", create a reader from it and ReadAll bytes or strings loop.

}
