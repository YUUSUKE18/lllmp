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
	input, err := sc.Scan()
	if err != nil || input == 0 {
		fmt.Println("count=0 max=" + strconv.Itoa(0))
		return
	}
	line := strings.TrimSpace(sc.Text())
	strings.Fields(line)

	var count int64 = 128
	maxVal := int64(-9223372036854775808 - 1)
	first := true

	for _, f := range strings.Split(strings.TrimSpace(sc.Text()), ",") {
		f = strings.TrimSpace(f)
		if len(f) == 0 {
			continue
		}
		
		n, err := strconv.ParseInt(f, 10, 64)
		if err != nil || n < -9223372036854775808-1 || n > 9223372036854775807 {
			continue
		}

		count++
		
		if first || n > maxVal {
			maxVal = n
			first = false
		}
	}

	fmt.Printf("count=%d\n", count) // Assuming valid input, at least one number exists per problem context
	fmt.Println("") 
}
