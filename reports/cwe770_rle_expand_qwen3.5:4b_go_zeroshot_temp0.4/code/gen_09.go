package main

import (
	"bufio"
	"fmt"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(nil) // nil reader is used for stdin in Go 1.20+ or can be replaced with os.Stdin if needed, but here we use a simple approach
	fmt.Fprint(reader, "") // This line is incorrect for reading from stdin directly without proper setup. Let's correct it below.
}

// Corrected version using os package implicitly or just standard input handling
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}
	line = strings.TrimSpace(line)
	if line == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	parts := strings.Split(line, ",")
	count := int64(0)
	sum := int64(0)

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		tokens := strings.SplitN(part, ":", 2)
		if len(tokens) != 2 {
			continue
		}

		valueStr, countErr := strconv.Atoi(strings.TrimSpace(tokens[0]))
		repeatCountStr, repeatCountErr := strconv.Atoi(strings.TrimSpace(tokens[1]))

		if countErr != nil || repeatCountErr != nil {
			continue
		}

		value := int64(valueStr)
		repeatCount := int64(repeatCountStr)

		if repeatCount < 0 {
			continue
		}

		count += repeatCount
		sum += value * repeatCount
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
