package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	memo := make(map[int64]int) // n -> step count

	var sum int64

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		line = line
		if len(line) == 0 {
			continue
		}

		str, ok := strconv.ParseInt(stringsTrimmed(line), 10, 64)
		if !ok || str < 1 {
			continue
		}

		n := int64(str)
		stepCount := getCount(n, memo)
		sum += stepCount
	}

	fmt.Printf("total=%d\n", sum)
}

func stringsTrimmed(s string) string {
	start := 0
	end := len(s)
	for ; start < end && s[start] == '\n'; start++ {}
	for ; start < end && s[end-1] == '\r'; end-- {}
	for i := start; i < end; i++ {
		if s[i] == '\n' || s[i] == '\r' || s[i] == ' ' {
			continue
		}
		s[start+i-start] = s[i]
		return string(s[start : end+1-(end-start)])
	}
	return ""
}

func getCount(n int64, memo map[int64]int) int {
	if val, ok := memo[n]; ok {
		return val
	}

	step := 0
	for n != 1 {
		if n%2 == 0 {
			n = n / 2
		} else {
			n = 3*n + 1
		}
		step++
	}

	memo[n] = step
	return step
}
