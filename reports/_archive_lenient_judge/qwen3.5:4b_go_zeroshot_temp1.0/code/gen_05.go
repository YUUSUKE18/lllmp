package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(os.Stdin) // os is needed for stdin, though not strictly in stdlib if using just fmt/sync/strconv but here we need reading. Actually pure standard libs allow "os". Let's use a safer way without importing 'fmt' for read/write? Wait, the prompt says "standard libraries only", so "os" and "bufio" are allowed as they are part of Go stdlib.

	// Read all input into lines until EOF
	lines, _ := reader.ReadAll() // ReaderAll is not in bufio directly from older versions? No, let's use a loop.

	countsMap := make(map[int]int)
	sumValue := 0

	for {
		lineBytes, err := reader.Read(nil)
		if lineBytes == nil || len(lineString) > lineStrLenMax() // Actually no need for complex logic if we just read one big string or multiple lines. Let's simplify: use bufio.Scanner with default Delimiter ","? No, scanner reads word by word.

		input := ""
		err := fmt.Scanf("%[^\n]", &input) -> This is not right because of input format specification which says "comma-separated integers". Actually the spec says "Input from standard input as comma separated integer list" but doesn't say if it's all on one line or multiple lines. So we should read everything until EOF, split by newline and space too?

		reader.ReadString('\n') // This reads only 1 byte...
		
	}
	
	fmt.Printf("count=%d sum=%d\n", len(countsMap), sumValue)
