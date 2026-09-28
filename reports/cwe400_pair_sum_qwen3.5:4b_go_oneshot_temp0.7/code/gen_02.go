package main

import (
	"bufio"
	"fmt"
)

func main() {
	scanner := bufio.NewScanner(nil) // Initialize scanner, will use os.Stdin via ReadAll or similar logic if needed, but standard pattern is better.
	// Actually, let's use os.Stdin directly for robustness in a single file without extra imports if possible, 
	// but bufio is fine. Let's restructure to read all lines properly.
	
	sc := bufio.NewScanner(nil) // Wait, Scanner needs an io.Reader. Must use os.Stdin.
	
	// Correct approach: Read stdin line by line until EOF.
	// Since the problem says "2行目以降", we need to handle line 0 (goal) and then subsequent lines.
	// However, standard input might not have a fixed number of lines known beforehand easily without reading all.
	// But the spec says "標準入力の1行目に目標値が与えられます。2行目以降には整数...".
	
	// We can use bufio.Scanner with os.Stdin.
	sc = bufio.NewScanner(nil) // Wait, Scanner takes Reader. Must fix this.
	
	// Let's restart the import and structure correctly.
}
