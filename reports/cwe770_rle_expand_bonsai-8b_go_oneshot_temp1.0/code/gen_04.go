package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var result strings
	for _, s := range strings.Fields(sc.Text()) {
		parts := strings.SplitN(s, ":")
		if len(parts) < 2 {
			continue
		}
		val, _ := strconv.Atoi(parts[0])
		count, _ := strconv.Atoi(parts[1])
		for i := 0; i < count; i++ {
			result += fmt.Sprintf("%d", val)
			if i < count-1 {
				result += ","
			}
		}
	}
	fmt.Printf("count=%d sum=%d\n", len(result)-1, int64(sumOf(result)))
}

func sumOf(s string) int64 {
	total := 0
	for _, c := range s {
		if c >= '0' && c <= '9' {
			num, _ := strconv.Atoi(string(c))
			total += num
		}
	}
	return total
}
