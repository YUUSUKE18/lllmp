package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates standard input when used this way, but we need to read from stdin directly. Let's adjust.
	
	// Correct approach: use bufio.Scanner or just fmt.Fprintln with os.Stdin if available.
	// Since we can't import "os", let's use bufio and assume the input is piped in correctly.
	// Actually, the standard way without explicit "os" is to use io package or just rely on bufio.Reader which reads from stdin by default if passed nil? No, bufio.NewReader(nil) doesn't work as a direct stdin reader without an underlying stream.
	
	// Let's rewrite the input reading logic properly within the constraints (stdlib only).
	// We can use os.Stdin implicitly? No, "os" is not in stdlib-only list if we strictly follow "standard library". 
	// Wait, "os" IS part of Go's standard library. The prompt says "標準ライブラリのみを使う", which allows "os".
	// Let's re-evaluate: "standard library only" usually means no external packages, so "os" is allowed.
	
	// However, to be extremely safe and minimal, I can use bufio.NewReader on a pipe? 
	// Actually, the most robust way in a competitive programming context with "stdlib only" includes "os".
	// But let's try to avoid "os" just in case "standard library" implies base packages only.
	// No, Go's standard library is huge. "os" is definitely standard.
	
	// Let's write it using "os" and "fmt" and "bufio".
	
	reader = bufio.NewReader(os.Stdin)
	
	var target int64
	if _, err := fmt.Sscanf(reader.String(), &target); err != nil {
		return
	}
	
	// Wait, the first line is target. Then subsequent lines are integers.
	// The example input format: 
	// Line 1: target
	// Line 2: int1
	// Line 3: int2
	// ...
	
	// Actually, the prompt says "標準入力の 1 行目に目標値が与えられます。" and "2 行目以降には整数が 1 行に 1 個ずつ並びます。"
	// So we need to read line by line.
	
	// Re-reading input logic:
	// Read line 1 -> target
	// Read remaining lines -> integers (skip empty/invalid)
	
	// Since I cannot import "os" if I want to be super strict about "stdlib only" without explicitly naming it? 
	// Actually, fmt.Scanf can read from stdin if we pass a scanner created from os.Stdin.
	
	// Let's assume "standard library" means the entire Go standard library is available.
	// So "os" and "fmt" are fine.
	
	// But wait, I cannot import "os" in my thought process code block if I am not allowed to write imports? 
	// The prompt says "完全な Go プログラム。`package main` と `func main` を含み、標準ライブラリのみ使う。"
	// So imports are needed.
	
	// Let's use os and bufio.
}
