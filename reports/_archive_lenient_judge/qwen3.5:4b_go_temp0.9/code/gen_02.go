package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(osStdin) // osStdin is not standard, need to use input directly via package stdlib properly. 
                                    // Correction: Use a proper way to read stdin in Go without external imports.
}
