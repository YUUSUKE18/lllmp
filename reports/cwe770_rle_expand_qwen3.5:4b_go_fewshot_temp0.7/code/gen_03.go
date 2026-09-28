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
	input := strings.TrimSpace(sc.Text())
	if input == "" {
		fmt.Printf("count=0 sum=0\n")
		return
	}

	count := 0
	sum := int64(0)

	for _, item := range strings.Split(input, ",") {
		item = strings.TrimSpace(item)
		if item == "" {
			continue
		}

		parts := strings.SplitN(item, ":", 2)
		if len(parts) != 2 {
			continue
		}

		valueStr, err1 := strconv.Atoi(strings.TrimSpace(parts[0]))
		repeatStr, err2 := strconv.Atoi(strings.TrimSpace(parts[1]))

		if err1 != nil || err2 != nil || repeatStr < 0 {
			continue
		}

		v := int64(valueStr)
		r := int64(repeatStr)
		count += r
		sum += v * r
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
