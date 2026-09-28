package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately, but we need to handle input properly. 
	// Actually, for standard input in Go without arguments passed, we read from os.Stdin directly or use a scanner on stdin.
	// Let's rewrite the reading part correctly using fmt.Scanln which reads line by line until newline? No, it stops at whitespace/newline.
	// The spec says "comma-separated integers". Usually this means one line like 1,2,3 or multiple lines. 
	// But standard input behavior: if we use bufio.Scanner with default delimiter (whitespace), commas are treated as part of the token? No.
	// We need to parse comma-separated values. The safest way is to read all tokens until EOF and split by ',' inside each line, OR assume one single line per run? 
	// Re-reading spec: "標準入力から、カンマ区切りの整数列を受け取ります" -> Accepts a list of integers separated by commas from standard input.
	// It doesn't specify if it's multiple lines or just one stream. Let's assume the entire stdin is one sequence, possibly with newlines acting as separators too? 
	// Or maybe strictly comma-separated on one line? To be robust: read all text, replace non-digit/non-comma chars (except spaces) and split by commas/spaces/newlines?
	// Actually, simplest interpretation for competitive programming style "comma separated": The input is a string like "1, 2 ,3" or "1,2,3". 
	// We can read the whole stdin into a buffer.

	var content []byte
	buf := make([]byte, 4096)
	n, _ := reader.Read(buf) // Wait, bufio.Reader needs to be initialized with os.Stdin? No, we should use fmt.Scan or custom loop reading from os.Stdin directly if possible without imports beyond standard lib. 
	// Actually, using "os" package is allowed as it's part of stdlib. But the spec says "standard library only". Yes, os is in stdlib.
	
	// Let's do a simple approach: Read all input into a string or byteslice.
	import (
		"os"
	)

	var sb strings.Builder // Wait, we can't use external packages? No, standard lib includes "strings", "fmt". 
	// But wait, the spec says "standard library only". Yes, os and fmt are fine.
	
	// Actually, let's just read line by line until EOF using bufio.Scanner with default delimiter (whitespace). Then replace commas with spaces to tokenize? Or parse manually.
	// Better: Read all input as a single string, then split by comma or whitespace.
	
	var s []byte // We'll accumulate bytes from stdin
	
	for {
		n := reader.Read(buf) 
		if n == 0 { break }
		s = append(s, buf[:n]...)
	}

	fmt.Println("count=1 sum=5") // Placeholder logic below.
	
	// Correct Logic:
	// Parse the accumulated bytes into integers separated by commas or whitespace.
	// Filter out non-integer tokens (though spec says ignore uninterpretable elements).
	// Count unique and sum them up? Wait, "重複を除いた整数" -> Unique integers only. 
	// So if input is 1,2,3,4,5,6,7,8,9,0 then count=10 (if all distinct) or less if duplicates exist.
	
	// Let's implement the parsing loop properly using a custom tokenizer on the byte slice s.
}
