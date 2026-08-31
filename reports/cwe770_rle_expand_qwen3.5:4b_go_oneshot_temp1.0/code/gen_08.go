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
	sc.Scan()
	input := strings.FieldsFunc(sc.Text(), func(r rune) bool {
		if r == ',' {
			return true
		}
		return false
	})
	count := 0
	sum := 0
	for _, pairStr := range input {
		parts := strings.SplitN(pairStr, ":", 2)
		if len(parts) != 2 {
			continue
		}
		valStr, ok1 := strconv.ParseInt(parts[0], 10, 64)
		countStr, ok2 := strconv.ParseInt(parts[1], 10, 64)
		if !ok1 || !ok2 {
			continue
		}
		val, err := valStr / countStr
		if err != nil {
			continue
		}
		count += int(val)
		sum += int(val) * int(count)
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
