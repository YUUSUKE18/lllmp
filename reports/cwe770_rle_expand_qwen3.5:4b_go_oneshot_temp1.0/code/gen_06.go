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
	content := sc.Text()
	tokens := strings.Split(content, ",")
	count := int64(0)
	sum := int64(0)
	for _, token := range tokens {
		token = strings.TrimSpace(token)
		if len(token) == 0 {
			continue
		}
		parts := strings.SplitN(token, ":", 2)
		if len(parts) != 2 {
			continue
		}
		valStr, ok1 := strconv.Atoi(strings.TrimSpace(parts[0]))
		repeatStr, ok2 := strconv.Atoi(strings.TrimSpace(parts[1]))
		if !ok1 || !ok2 || repeatStr < 0 {
			continue
		}
		n := int64(valStr)
		r := int64(repeatStr)
		count += r
		sum += n * r
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
