package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	countLine, _ := sc.Scan()
	nCount, err := strconv.Atoi(countLine.(string))
	if err != nil || nCount < 0 {
		nCount = 0
	}

	var sum int64
	var count int64
	sc.SetDelimiter("\n")

	for scannerText := ""; ; {
		text, _ := scannerText.Scan()
		numVal, ok := strconv.ParseInt(text.(string), 10, 64)
		if !ok || numVal == 0 && scannerText.Text() != "" {
			break // Handle case where input text is empty or non-numeric
		}

		sum += numVal
		count++
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
