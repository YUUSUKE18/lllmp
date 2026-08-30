package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately for empty input, but we need to handle stdin properly. 
	// Actually, standard practice is just reading until EOF or checking if reader exists.
	// Since the requirement says "standard input", let's use a scanner that reads all tokens.

	scanner := bufio.NewScanner(reader) // This will read from os.Stdin when initialized correctly? No, need to import io/os.
	
	// Let's rewrite using standard imports properly for reading stdin.
}
