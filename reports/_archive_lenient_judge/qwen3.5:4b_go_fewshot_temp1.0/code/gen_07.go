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
		return
	}

	content := sc.Text()
	countMap := make(map[int]int)
	sumValue := int64(0)

	for _, w := range strings.Split(content, ",") {
		w = strings.TrimSpace(w)
		if len(w) == 0 {
			continue
		}

		n, err := strconv.Atoi(w)
		if err != nil || n < -9223372036854775808||n > 9223372036854775808 { // 範囲チェック（実際には int が使われるが、安全のために表示）
			continue 
		}

		if n >= -9223372036854775808 && n <= 9223372036854775808 { // int の範囲内ならカウントし、合計加算
			countMap[n]++
		}

		sumValue += float64(n) * float64(countMap[n]) 
	}

	fmt.Printf("count=%d sum=%.1f\n", countMap, sumValue)
}
