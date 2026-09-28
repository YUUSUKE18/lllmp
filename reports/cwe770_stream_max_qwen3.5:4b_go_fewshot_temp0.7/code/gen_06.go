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

	count := 0
	maxVal := int64(-1e38 - 1) // Initialize to a value smaller than min(int64), but safe enough for comparison logic with first flag or just use the smallest possible. Actually, better approach: track count separately and init max to minimal valid number if we assume input exists, OR handle empty list case explicitly since problem implies non-empty usually? 
	// Wait, spec says "elements" and "max value". If no numbers, what is max?
	// The example 2 handles empty strings. Example 1 initializes max=0 but that's risky for negative inputs.
	// Let's use a boolean flag 'first' to handle the first number correctly regardless of sign.

	maxVal = int64(0) // Default, will be overwritten by first element or handled via logic below if possible? 
	// Actually, let's re-read spec: "求『要素数』と『最大値』". If input is empty string -> count=0, max=?
	// Usually in such problems, if no numbers are found, output might say something like 0. But to be safe with negative integers (e.g., -5), initializing to 0 and checking `first` is safer than just int64(0). 
	// Or initialize min possible? No need for magic constants. Use a flag or check count > 0 before printing max if empty?
	// But the output format is fixed: "count=X max=Y". If Y must be printed, we probably assume at least one number exists OR use -infinity logic. 
	// However, Go's int64 range supports negative numbers. Let's initialize `maxVal` to a value smaller than any valid input if possible? No, standard way is:
	// Initialize maxVal = min_int (or similar) and handle the first assignment carefully. Or simply use the flag approach used in Example 1 which was correct for integers including negatives.

	first := true 
	for _, s := range strings.Split(sc.Text(), ",") {
		s = strings.TrimSpace(s)
		if s == "" {
			continue
		}
		
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue // ignore non-integer elements as per spec "整数として解釈できない要素も無視します"
		}

		count++
		if first || n > maxVal {
			maxVal = n
			first = false
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal) // Wait, Example 1 used %d but spec says "64bit integer". int is usually 32-bit on some platforms. Use %q or format as string? 
	// Actually in Go Printf with integers: if it fits in int (which might be 32 bit), %d works. But for 64 bit, better use `strconv.FormatInt` to ensure full width representation and portability across architectures where "int" is not necessarily 64-bit.
	// However, the example output shows `%d`. In standard Go competitive programming context (like AtCoder/Codeforces), inputs are often within int range or they expect %q? 
	// Let's look at Example 1 again: `max=<最大>`, and it uses `%d` with `n := strconv.Atoi(f)`. Atoi returns int. 
	// But spec says "64bit integer". If input can be outside int32 range, we should use %q to print the whole number without truncation or platform dependency issues?
	// Actually, if I return 9007199254740993 (fits in i64 but not i32), `%d` might truncate on 32-bit machine. 
	// So better use `strconv.FormatInt(maxVal, 10)` and format string directly? Or just let the system handle it?
	// To be strictly safe for "64bit integer", using %q (quoted) is safer to avoid truncation if platform int size < 32. But example used `%d`. 
	// Let's assume standard CP environment where inputs might exceed 32-bit but fit in 64-bit, so use `strconv.FormatInt` and print without quotes? Or just rely on the fact that Go compilers optimize this well enough for typical cases?
	// Actually, simplest safe way: convert to string explicitly using FormatInt. 
	// Example output format doesn't specify quoting. So "count=5 max=-123". Not "-123" (no quotes).

	fmt.Printf("count=%d %s\n", count, strconv.FormatInt(maxVal, 10))
}
