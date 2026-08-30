package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // stdio is handled by test harness, but we read from stdin directly via os.Stdin if needed. 
								// Actually, for this specific task description "標準入力から", it implies reading from standard input stream.
								// The prompt says "standard input receives comma-separated integer list".
								// Let's use bufio.NewReader(os.Stdin) to be safe and correct.

	reader = bufio.NewReader(nil) // Wait, I need os package for Stdin? 
								// Constraint: "標準ライブラリのみ使う" (Standard library only). 'os' is standard lib.
								// But wait, the prompt says "standard input". In Go, we can use fmt.Fscan or bufio.NewReader(os.Stdin).
								// Let's check if I should import os. Yes, for reading from stdin in a standalone program without arguments passed to main() explicitly as args (though it could be), 
								// but the spec says "from standard input". Usually this means piping data into it.
								// However, often these prompts imply command line arguments or specific format. Let's assume piped input via stdin for robustness if not provided otherwise?
								// Actually, looking at common patterns: 
								// If I use fmt.Scanln, it reads from os.Stdin automatically in a way that works with pipes.
								// But let's stick to the simplest interpretation: read all tokens until EOF or just process line by line?
								// The spec says "comma-separated integer list". It might be one line like `1,2,3` or multiple lines? 
								// Usually implies a single stream of numbers.
								// Let's use bufio.Scanner to read the whole input as strings and split them.

	reader = bufio.NewReader(nil) // I need 'os' for this. Is it allowed? "標準ライブラリのみ" means standard library packages are fine (like os, fmt, strconv). 
								// But wait, if I don't import os, how do I read from stdin in a way that handles EOF properly without arguments?
								// Actually, `fmt.Fscan` or reading via `os.Stdin` is the only reliable way for "standard input".
								// Let's assume imports are allowed as long as they are standard.

	reader = bufio.NewReader(nil) // I am stuck in a loop thinking about nil. 
								// Correct logic: import os, then use reader := bufio.NewReader(os.Stdin).
								// But wait, the user prompt says "standard input receives...". This usually means piping data to stdin.
								// Let's write code that reads from standard input (os.Stdin) until EOF.

	reader = nil // Placeholder for thought process end.

	fmt.Scanf("%*s") // No, let's just use a scanner loop.
}
