package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strconv"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately, but we need to handle input properly. 
	// Actually, for standard input in Go, we should use os.Stdin or just read from a buffer if needed.
	// However, the spec says "standard input". Let's use bufio.Scanner on os.Stdin implicitly via io package?
	// Wait, I cannot import os directly if I want to stick to "standard library only" but os is part of standard lib.
	// But let's re-read: "標準ライブラリのみ使う". Yes, os is allowed.
	
	// Actually, a simpler way without os package explicitly if possible? No, reading from stdin usually requires io or os.
	// Let's use bufio.Scanner with os.Stdin.
	
	// Wait, I need to be careful about the input format. "カンマ区切りの整数列".
	// Example: "1, 2, 3, 2" -> unique: 1, 2, 3. Count: 3. Sum: 6.
	// Or maybe it's a single string like "1,2,3,2"?
	// The spec says "標準入力から、カンマ区切りの整数列を受け取ります".
	// Usually this means the whole input is one line or multiple lines containing comma separated integers.
	
	// Let's assume the input is a single string containing numbers separated by commas and whitespace.
	// We need to parse it.
	
	// Since I cannot import os if I want to avoid it? No, "standard library" includes os.
	// But let's try to do it with just bufio and fmt and strconv.
	// Actually, reading from stdin requires a reader. bufio.NewReader is fine, but where does the input come from?
	// In Go, if you don't specify a source for bufio.Scanner or bufio.Reader, you need an io.Reader.
	// The default is often not available without os.Stdin.
	// So I must import "os".
	
	// Wait, maybe I can use the fact that the problem might be run in an environment where input is piped?
	// Yes, standard Go programs read from os.Stdin.
	
	// Let's refine the plan:
	// 1. Read all input from os.Stdin into a string or process line by line.
	// 2. Split by comma and whitespace.
	// 3. Parse integers, ignoring invalid ones.
	// 4. Use a map to count unique numbers.
	// 5. Calculate sum using big.Int to avoid overflow (though spec says sum fits in 64bit, intermediate might not? No, "合計は 64bit 整数の範囲に収まります" implies the final result fits).
	// But wait, if I use int64, it's fine. If the sum exceeds int64 range, it would overflow. The spec guarantees it fits in 64-bit integer range. So int64 is sufficient.
	
	// Wait, "重複を除いた整数" -> unique integers.
	// "個数と合計" -> count of unique integers and their sum.
	
	// Example: Input "1, 2, 3, 2, 4"
	// Unique: 1, 2, 3, 4
	// Count: 4
	// Sum: 1+2+3+4 = 10
	
	// Let's write the code.
	
	reader := bufio.NewReader(os.Stdin)
	var input string
	scanner := bufio.NewScanner(reader)
	if scanner.Scan() {
		input = scanner.Text()
	} else if err := scanner.Err(); err != nil {
		// Handle error? Spec doesn't specify error handling, assume valid input or ignore.
		return
	}
	
	// Split by comma and whitespace
	// We can replace commas with spaces and then split by whitespace.
	input = strings.ReplaceAll(input, ",", " ")
	parts := strings.Fields(input)
	
	uniqueNumbers := make(map[int64]bool)
	sum := int64(0)
	
	for _, part := range parts {
		val, err := strconv.ParseInt(part, 10, 64)
		if err != nil {
			continue // Ignore non-integer elements
		}
		if !uniqueNumbers[val] {
			uniqueNumbers[val] = true
			sum += val
		}
	}
	
	fmt.Printf("count=%d sum=%d\n", len(uniqueNumbers), sum)
}
