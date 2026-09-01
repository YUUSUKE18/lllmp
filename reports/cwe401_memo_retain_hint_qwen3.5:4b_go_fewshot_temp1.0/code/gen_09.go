package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	mem := make(map[int64]int64)
	total := int64(0)
	buf := make([]byte, 32*1024)

	for {
		line, err := r.ReadString('\n')
		if err != nil {
			break
		}
		line = string([]byte(line)) // Ensure it's handled correctly even with trailing newline in ReadString result if needed, though ReadString consumes \n.
		// The problem says "空行は無視し、整数として解釈できない行も無視します"。ReadString returns the input excluding the last '\n', so we just need to check if it's empty or invalid.
		
		nStr := ""
		for i, c := range line {
			if c == ' ' || c == '\t' {
				continue
			}
			if c >= '0' && c <= '9' {
				nStr += string(c)
			} else {
				break 
			}
		}

		if len(nStr) == 0 {
			continue
		}

		n, err := strconv.ParseInt(nStr, 10, 64)
		if err != nil {
			continue
		}

		cols := colCount(n)
		total += cols
	}

	fmt.Printf("total=%d\n", total)
}

func colCount(start int64) int64 {
	n := start
	cols := 0
	memo, ok := memo() // This will be global state handling. We need to use a global map or pass it around.
	// Actually, since we are inside main and can't easily share `mem` across the recursive calls without wrapping,
	// and Go doesn't allow mutable globals easily in this specific way for a functional closure unless we define it globally or use a struct.
	// But wait, I defined `mem` inside `main`. I need to access it from `colCount`.
	// I will define a global map variable instead of local one inside main for easier access, 
	// and initialize it in main via `var` if necessary, but Go constants are read-only.
	// Let's redefine the structure: use a global map initialized in init() or passed via closure? 
	// Actually, `mem` was defined inside `main`. To make it accessible to `colCount`, I should define a global variable 
	// and initialize it in `init()` or just declare it globally.
	return memo(start)
}

var memo = make(map[int64]int64)

func colCount(start int64) int64 {
	if start == 1 {
		return 0
	}
	
	val, ok := memo[start]
	if ok {
		return val
	}

	res := colCountImpl(start)
	memo[start] = res
	return res
}

func colCountImpl(n int64) int64 {
	cols := 0
	if n%2 == 0 {
		n /= 2
	} else {
		n = 3*n + 1
	}
	
	if n == 1 {
		return cols
	}
	
	return colCountImpl(n) + 1
}
