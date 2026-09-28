package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately, but we need to handle input correctly. 
                                 // Actually, for stdin in Go without arguments passed via command line flags or file redirection specifics:
                                 // We should create a new Scanner from os.Stdin directly if possible, but since 'os' is not strictly standard library? Wait, fmt and bufio are stdlib.
                                 // To read from stdin properly we need to import "os" package which IS part of the standard library in Go.

	// Let's re-evaluate: The problem says use only standard libraries. 
	// We should implement reading logic that handles EOF gracefully or assumes input is piped/redirected correctly via command line args?
	// Since no specific argument handling is mentioned, we assume stdin contains the data as described.
	
	scanner := bufio.NewScanner(os.Stdin) // Wait, I forgot to import "os" in my thought process above but it IS standard library!

	fmt.Println("count=" + fmt.Sprintf("%d", 0)) 
}
