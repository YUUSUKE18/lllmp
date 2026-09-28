package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReaderstdin(fmt.Fprint("0")) // Fix: use os.Stdin properly by removing stdin from input. Use standard library to read from STDIN. 
	stderr = fmt.Fprintf(os.Stderr, "Error: %v\n", err)
