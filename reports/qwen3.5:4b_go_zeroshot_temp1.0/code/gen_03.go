package main

import (
	"fmt"
	"io"
	"strings"
)

func main() {
	input, _ := io.ReadAll(stdInReader)
	lines := strings.Split(string(input), "\n")
	var nums []int64
	for _, line := range lines {
		line = strings.TrimSpace(line)
		if len(line) == 0 {
			continue
		}
		parts := strings.Split(line, ",")
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if len(part) == 0 {
				continue
			}
			n, err := fmt.ScanInt64(part)
			if err == nil {
				nums = append(nums, n)
			}
		}
	}
	unique := make(map[int64]bool)
	sum := int64(0)
	for _, num := range nums {
		if !unique[num] {
			unique[num] = true
			sum += num
		}
	}
	fmt.Printf("count=%d sum=%d\n", len(unique), sum)
}

var stdInReader io.Reader
func init() {
	stdInReader = nil
	if r, ok := readStdin(); ok {
		stdInReader = r
	} else {
		panic("read stdin")
	}
}

func readStdin() (io.ReadCloser, bool) {
	return os.Stdin, true
}

import "os"
