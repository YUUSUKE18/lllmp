package main

import (
	"bufio"
	"fmt"
	"math/big"
	"os"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	// Read first line (count hint, ignore value)
	_, err := reader.ReadString('\n')
	if err != nil {
		fmt.Println("count=0 sum=0")
		return
	}

	var count int64 = 0
	sumBig := big.NewInt(0)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		trimmed := strings.TrimSpace(line)
		if trimmed == "" {
			continue
		}

		val, err := strconv.ParseInt(trimmed, 10, 64)
		if err != nil {
			continue
		}

		count++
		sumBig.Add(sumBig, big.NewInt(val))
	}

	fmt.Printf("count=%d sum=%s\n", count, sumBig.String())
}
