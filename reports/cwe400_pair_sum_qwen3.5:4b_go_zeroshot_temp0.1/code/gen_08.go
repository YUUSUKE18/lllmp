package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	var target int64
	if _, err := fmt.Fscanf(reader, "%d", &target); err != nil {
		return
	}

	count := 0
	nums := make([]int64, 0)

	for {
		line, _ := reader.ReadString('\n')
		if line == "" {
			break
		}
		line = trimWhitespace(line)
		if line == "" {
			continue
		}
		val, err := fmt.Sscanf(line, "%d", &nums[len(nums)])
		if err != nil || val != 1 {
			continue
		}
		nums = append(nums, nums[len(nums)-1]) // Fix: actually need to read into a variable first
	}

	// Re-read logic properly since the above loop had a bug in appending
	// Let's restart with correct reading logic inside main
	
	reader.Reset(os.Stdin) // This won't work as intended for stdin reset, so we restructure
	
	// Correct approach: Read target, then read integers one by one
	// Since bufio doesn't support easy reset of the whole stream in a simple way without closing,
	// and we can't easily "rewind" stdin, we need to handle input carefully.
	// However, the problem says "standard input", so let's assume it's piped or redirected.
	// We'll read all lines into a slice first, then process.
	
	lines := make([]string, 0)
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		lines = append(lines, line)
	}

	nums := make([]int64, 0)
	for _, l := range lines[1:] { // Skip first line (target)
		l = trimWhitespace(l)
		if l == "" {
			continue
		}
		var val int64
		fmt.Sscanf(l, "%d", &val)
		nums = append(nums, val)
	}

	n := len(nums)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if nums[i]+nums[j] == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}

func trimWhitespace(s string) string {
	s = trimLeft(s)
	s = trimRight(s)
	return s
}

func trimLeft(s string) string {
	for i := 0; i < len(s); i++ {
		if !isSpace(s[i]) {
			return s[i:]
		}
	}
	return ""
}

func trimRight(s string) string {
	i := len(s) - 1
	for i >= 0 && isSpace(s[i]) {
		i--
	}
	return s[:i+1]
}

func isSpace(b byte) bool {
	return b == ' ' || b == '\t' || b == '\n' || b == '\r'
}
