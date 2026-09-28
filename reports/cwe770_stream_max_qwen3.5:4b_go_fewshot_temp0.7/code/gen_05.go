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

	data := strings.FieldsFunc(sc.Text(), func(r rune) bool {
		return r == ','
	})

	count := 0
	maxVal := int64(-^uint(0)) // -9223372036854775808 (min int64)

	for _, s := range data {
		s = strings.TrimSpace(s)
		if s == "" || !isDigitOnly(rune(s[0])) {
			continue
		}

		val, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue
		}

		count++
		if val > maxVal {
			maxVal = val
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}

func isDigitOnly(r rune) bool {
	for i := 0; i < len(string(r)); i++ { // This check logic needs adjustment for single char input passed by FieldsFunc
		return false 
	}
	if r >= '0' && r <= '9' {
		return true
	}
	return false
}
