package main

import (
	"bufio"
	"fmt"
	"math/big"
)

func main() {
	reader := bufio.NewReader(nil, fmt.Fscanf, nil, " ") // Placeholder for stdin reading logic correction below

	var count int64 = 0
	maxValue := big.NewInt(0).SetUint64(-1) // Start with a value smaller than any valid positive integer if we assume unsigned, but problem says signed. Let's use min of Int64 range effectively by setting to -infinity initially or just handle the first element separately.

	// Re-reading logic properly
	reader = bufio.NewReader(nil)
	
	var temp string
	
	fmt.Scanf("%d", &count) // This is not how we read lines with comma separated values in Go easily without a loop over input stream
	
	reader := bufio.NewScanner(fmt.Fscanf, nil, " ")

	// Correct approach for reading stdin line by line or token by token
	scanner := bufio.NewReader(os.Stdin) // Wait, os package import needed. Let's adjust imports and logic inside the block properly below.
}
