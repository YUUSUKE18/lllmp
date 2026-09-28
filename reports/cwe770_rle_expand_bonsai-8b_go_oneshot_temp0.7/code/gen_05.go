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
	var count, sum int
	first := true
	for _, s := range strings.Fields(sc.Text()) {
		if colonIndex := strings.IndexRune(s, ':'); colonIndex == -1 {
			continue
		}
		valStr, _ := strings.SplitN(s, ':', 2)
		val, _ := strconv.Atoi(valStr)
		_, err := strconv.Atoi(strings.TrimSpace(strings.Join(valStr, ",")))
		if err != nil {
			continue
		}
		count += 1
		sum += val * err
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
