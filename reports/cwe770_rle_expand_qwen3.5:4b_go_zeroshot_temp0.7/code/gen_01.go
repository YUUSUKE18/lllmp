package main

import (
	"bufio"
	"fmt"
	"io"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(io.Deref(os.Stdin))
	output, _ := io.ReadAll(reader)
	if output == nil {
		return
	}

	content := strings.TrimSpace(string(output))
	if content == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	var count int64
	var sum int64

	parts := strings.Split(content, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		// 値:回数の形式をチェック
		idx := strings.Index(part, ":")
		if idx <= 0 || idx >= len(part)-1 {
			continue
		}

		valStr := part[:idx]
		countStr := part[idx+1:]

		val, err1 := strconv.ParseInt(valStr, 10, 64)
		countNum, err2 := strconv.Atoi(countStr)

		if err1 != nil || err2 != nil {
			continue
		}

		if countNum < 0 {
			continue
		}

		sum += val * int64(countNum)
		count += int64(countNum)
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
