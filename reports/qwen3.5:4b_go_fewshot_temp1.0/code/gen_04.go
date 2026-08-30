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
	if content == "" {
		fmt.Printf("count=0 sum=0\n")
		return
	}
	pairs := make(map[int]bool)
	totalSum := int64(0)
	sum := 0
	for _, str := range strings.Split(content, ",") {
		str = strings.TrimSpace(str)
		if str == "" {
			continue
		}
		n, err := strconv.Atoi(str)
		if err != nil {
			continue
		}
		if !pairs[n] {
			pairs[n] = true
			sum++
		} else if n > 0 || (n == 0 && sum > 0) {
			totalSum += int64(n)
		}
	}
	fmt.Printf("count=%d sum=%d\n", sum, totalSum)
}
