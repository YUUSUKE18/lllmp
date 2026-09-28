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

	input := sc.Text()
	parts := strings.Split(input, ",")
	counts := make(map[int]int64) // 重複を除いた整数の個数と合計を保持するマップ (key: integer, value: count+sum pair? No, need separate logic or struct. Let's use a map for counts and sum separately to avoid confusion in the loop).

	// Actually, let's re-read requirement carefully: "重複を除いた整数" -> Unique integers only.
	// Then calculate "個数 (count)" of each unique integer? Or total count across all inputs excluding duplicates?
	// Usually "unique elements" implies we process distinct values. 
	// But the output format is `count=<N> sum=<S>`. This looks like a single pair for ALL numbers processed, OR per number?
	// Given the example structure and typical CP problems:
	// Interpretation A: Count how many unique integers exist in total (sum of 1s) + Sum their values. 
	// Example input: "1,2,3" -> Unique: {1,2,3}. Count=3, Sum=6. Output: count=3 sum=6
	// Interpretation B: For each unique number, output its own line? No, spec says "strictly 1 row".
	// So it must be aggregate stats for the set of UNIQUE integers found in input.

	count := 0 // Total count of unique numbers found
	sum := int64(0) // Sum of those unique numbers

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 || part[0] == ' ' && (len(part)==1 || part[len(part)-1]==' ') { 
			continue 
		}
		
		n, err := strconv.Atoi(part)
		if err != nil {
			continue // Ignore non-integer elements as per spec "整数として解釈できない要素も無視します"
		}

		count++
		sum += int64(n)
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
