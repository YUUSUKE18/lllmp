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
		fmt.Printf("count=0 max=" + strconv.FormatInt(0, 10) + "\n")
		return
	}

	count := 0
	maxVal := int64(-^int64(2)) // Initialize to min int64 value (-9223372036854775808)
	first := true

	for _, s := range strings.Split(sc.Text(), ",") {
		s = strings.TrimSpace(s)
		if len(s) == 0 || (len(s) > 1 && !strings.ContainsAny(s, "-")) { // Skip empty or non-numeric tokens starting with + if not handled by Atoi directly but better to check validity
			continue
		}

		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil || len(strings.TrimSpace(s)) == "" {
			continue
		}

		count++
		if first || n > maxVal {
			maxVal = n
			first = false
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
