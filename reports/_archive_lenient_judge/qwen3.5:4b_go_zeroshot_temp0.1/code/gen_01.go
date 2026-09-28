package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately for empty input, but we need to handle stdin properly. 
	// Actually, the problem says "from standard input". If no data is provided, it's an issue with how I initialized reader.
	// Let's fix this: use a new Scanner or just read from os.Stdin directly if possible without extra imports? No, bufio is fine but needs stdin source.
	
	// Re-reading the requirement: "Standard input". 
	// The best way to handle potential EOF immediately (empty file) vs reading lines with data.
	// Since I cannot import 'os' explicitly in my mind easily without typing it out, let's use bufio.Scanner on os.Stdin? No, must not add extra imports if possible but standard library is allowed. 
	// Wait, the instruction says "standard library only". So importing "os" and "bufio" or just using fmt.Scanln might be safer to avoid complex setup for empty input handling in a single block without external deps like 'strings' package?
	
	// Actually, let's use bufio.Scanner with os.Stdin. It handles whitespace skipping automatically when reading lines if we split by comma manually? 
	// Or better: read all tokens using strings.Split on the whole line or multiple lines? The input format is "comma-separated integers". Usually implies one line or stream of numbers separated by commas and newlines.
	
	// Let's assume standard competitive programming style where input might be multiline but logically a sequence. 
	// However, simplest approach: read all content from stdin into a string (or bytes), split by comma, parse ints.
	
	// To do this without 'os' package explicitly? No, I need to import something to read from stdin if not using fmt.Scan which blocks until input is available or EOF. 
	// Actually, in Go, you can use bufio.NewReader(os.Stdin). But importing os requires writing "import (\"fmt\" \"bufio\" \"os\")". That's allowed as it's standard library.
	
	reader := bufio.NewReader(nil) // This will cause panic if I try to read from nil reader? No, but how do I get stdin without 'os'? 
	// Ah, wait! If the input is empty (EOF immediately), then reading returns EOF instantly. But for non-empty inputs, we need a real stream.
	
	// Let's use fmt.Scanln or similar? No, that reads line by line and stops at newline. The problem says "comma-separated integers". 
	// It might be one long string like "1,2,3" or multiple lines with commas. 
	// Safest bet: Read entire stdin into a buffer using bufio.Scanner on os.Stdin.
	
	reader = bufio.NewReader(nil) // Still nil issue. Let's just use fmt.Scan? No, that doesn't handle comma separation well across newlines easily without reading everything first.
	
	// Okay, I will import "os" and "bufio". It is standard library. 
	imports: ["fmt", "bufio", "os"]
	
	reader = bufio.NewReader(os.Stdin) // Wait, os needs to be imported too.
	
	// Let's write the code properly now with correct imports.
}
