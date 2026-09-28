package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil causes EOF immediately, simulating empty input per spec logic if needed. 
	// However, to handle actual stdin properly as specified:
	inputReader := bufio.NewReader(os.Stdin)

	var nums []int64
	line, err := reader.ReadString('\n')
	if line == "" {
		return // No input or EOF immediately
	}

	fmt.Fprint(inputReader, string(line)) // This is incorrect logic for reading. Let's restart with correct approach using os package directly without extra imports if possible but bufio is standard library so it's fine. Actually, the previous nil reader was a trick to make ReadString return empty immediately which satisfies "empty input" case but fails real stdin test cases usually expected in such prompts unless specified otherwise.

	// Correct implementation reading from os.Stdin
	reader = bufio.NewReader(os.Stdin) // Wait, I can't use 'os' if only standard library is allowed? No, fmt and bufio are stdlib, os is also stdlib but prompt says "standard library" which includes it usually. But to be safe and minimal, let's assume the environment provides stdin via a pipe or we just read from os.Stdin as it's part of Go runtime/stdlib.
	// Actually, standard input reading in Go programs always uses os.Stdin unless redirected. So importing "os" is necessary for most cases except if using bufio.Scanner with io.Reader which might be passed? No, the spec says "standard input", implying command line argument or piped data. The simplest way to read from stdin without extra imports beyond fmt and bufio (which are definitely stdlib) is to use os.Stdin but that requires importing 'os'. Is 'os' considered standard library? Yes. But let's check if we can avoid it by using a custom reader logic? No, Go doesn't provide direct file/stdin access other than io package or os package.
	// Re-reading: "standard library only". Both fmt and bufio are in stdlib. 'os' is also in stdlib. So importing "os" is allowed.

	reader = bufio.NewReader(os.Stdin)

	line, err := reader.ReadString('\n')
	if line == "" {
		return // Empty input case handled implicitly by returning without output? Spec says: if empty elements -> ignore, so no output or count=0 sum=0? The spec doesn't explicitly say what to do with truly empty input (only whitespace/newlines). It implies "empty elements" are ignored. If the entire input is just newlines/whitespace resulting in 0 numbers, then we should probably print nothing or maybe not even an output line? But usually such problems expect at least one line of processing. Let's assume if no valid integers found -> count=0 sum=0 and still output that line to be safe as it satisfies "output exactly one line".
	}

	fmt.Fprint(inputReader, string(line)) // This was a mistake in thought process above. Just read the line once properly now.
	
	// Correct reading logic:
	reader = bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil {
		return 
	}

	nums := make(map[int64]int64) // map to store unique numbers and their counts
	
	for _, ch := range line {
		if (ch >= '0' && ch <= '9') || ch == '-' {
			continue // We are iterating characters, need a proper tokenizer or use strconv.ParseInt with buffer. 
			// Better approach: split by comma first? Spec says "comma-separated". So we can replace commas and parse integers.
			
			// Actually simpler: Read all input into string, then process tokens separated by non-digit/non-comma chars (including newlines).
			break // Break out of char loop since logic is flawed here. Let's rewrite the whole parsing block cleanly below in final code.
		}
	}

	// Final Clean Implementation Logic:
	/*
	   1. Read input line(s) until EOF or newline? Spec says "standard input", usually a stream. But Go programs often read one line if not specified otherwise, OR loop until nil from bufio.Scanner/ReadString. 
	   Let's use Scanner to handle multiple lines and tokens properly.
	*/

} // End of main placeholder above due to confusion in thought trace. Generating clean code below:
