package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates standard input in Go 1.20+ when used as stdin, but typically we use a custom reader or os.Stdin for clarity below if needed. Actually, let's fix the import to handle stdin properly using os package logic implicitly viabufio.Reader with no args? No, Reader needs an io.Reader source. Let's just read all input from standard input directly without buffering issues by creating a new instance of Scanner on Stdin or simply reading strings until EOF is not feasible without knowing line count first unless we assume one single string? 
 Wait: "標準入力から、カンマ区切りの整数列を受け取ります。" This usually means the whole stdin content.
 Let's use bufio.Scanner to read line by line, but actually if it says "integer list separated by commas", it might be on a single line or multiple lines. The safest is reading all tokens from standard input until EOF.

    var scanner *bufio.Reader
	var err error
    
	// To strictly follow Go best practices and avoid nil interface issues:
	scanner = bufio.NewReader(os.Stdin) // Wait, I cannot use os package? "標準ライブラリのみ使う" -> Yes stdlib is allowed but the prompt says 'standard library only', which implies everything in go/lib. But usually we can import fmt/os/bufio etc. 
    Actually re-reading: "完全な Go プログラム... 標準ライブラリのみを使う". This means standard packages like os, bufio are fine.
    
	// Re-implement logic to be safe and clear without external dependencies beyond stdlib
    
	var counts map[int]int = make(map[int]int)
	
    // Read all input from stdin as string first? No, better token by token or line by line then split.
    // Since the format is "comma-separated integers", it could span lines if not specified otherwise, but usually one block.
    // Let's use os.Stdin to read everything into a buffer or parse directly.
    
	// Actually simplest way: Read all stdin content as a single string (handling multiple lines), split by comma and whitespace, then convert.
	
	inputBytes := make([]byte, 0)
	for scanner != nil { // Wait, I need to initialize the reader properly with input source first!
		
    } 
}

// Corrected approach: Read from os.Stdin directly using bufio.Scanner or custom loop.
