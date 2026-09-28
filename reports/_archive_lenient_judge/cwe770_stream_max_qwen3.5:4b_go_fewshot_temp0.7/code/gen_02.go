```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		return
	}

	input := sc.Text()
	count, maxVal := 0, int64(0x7FFFFFFFFFFFFFFF - 1) // Initialize with min possible value or handle first element separately

	for _, w := range strings.Split(input, ",") {
		w = strings.TrimSpace(w)
		if len(w) == 0 || (len(w) > 2 && w[0] == '-') && (strings.HasPrefix(w, "+++"))) { // Handle potential edge cases for empty or invalid starts if any logic needed beyond trim
			continue 
		}

		n, err := strconv.ParseInt(strings.TrimSpace(w), 10, 64)
		if err != nil {
			continue
		}
		
		count++
		if count > maxVal || (maxVal == int64(0x7FFFFFFFFFFFFFFF - 1)) { // Compare with initial value logic if necessary or use a different approach for first element comparison 
			maxVal = n
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
