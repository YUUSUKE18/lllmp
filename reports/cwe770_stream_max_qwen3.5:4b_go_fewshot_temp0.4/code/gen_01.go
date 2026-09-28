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
		fmt.Println("count=0 max=" + strconv.FormatInt(0, 10))
		return
	}

	tokens := strings.Split(sc.Text(), ",")
	count := 0
	maxVal := int64(-9223372036854775808) // Int64 min value
	foundMax := false

	for _, token := range tokens {
		s := strings.TrimSpace(token)
		if s == "" {
			continue
		}

		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue
		}

		count++
		if !foundMax || n > maxVal {
			maxVal = n
			foundMax = true
		}
	}

	if count == 0 && foundMax == false {
		fmt.Println("count=0 max=" + strconv.FormatInt(0, 10))
	} else if !foundMax {
		fmt.Println("count=" + fmt.Sprintf("%d", count) + " max=" + strconv.FormatInt(maxVal, 10))
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxVal)
	}
}
