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
		fmt.Printf("count=0 max=" + strconv.Itoa(0) + "\n")
		return
	}
	line := sc.Text()
	parts := strings.Split(line, ",")
	count := 0
	maxVal := int64(-1<<63 - 1 / 2) // Initialize with a value smaller than min int64

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 {
			continue
		}
		val, err := strconv.ParseInt(part, 10, 64)
		if err != nil {
			continue
		}
		count++
		if val > maxVal {
			maxVal = val
		}
	}

	if count == 0 {
		fmt.Printf("count=0 max=" + strconv.Itoa(0) + "\n")
		return
	}

	fmt.Printf("count=%d max=%d\n", count, int64(maxVal)) // Fix: cast back to string for printf format or use %q if needed but here we want the value. Actually maxVal is already int64 so printing directly works with %%d? No, in Go fmt uses %v by default unless specified. Wait, I used %d which expects int. Let's fix that properly using %T specifier or correct variable type.
	// Correction: Use strconv.FormatInt for the value to ensure correctness and avoid potential overflow issues during formatting if any (though maxVal is already parsed). Actually simpler approach: use fmt.Printf with proper format specifiers. Since we need 64-bit integer, use %%d? No, %d works for int32/int64 in Go.
	// Wait, I initialized maxVal to -1<<63-1 which is correct min value but if count==0 handled separately above so it's fine.
	// Let me recheck the logic: If input has no valid integers, we output count=0 and some default for max? The spec says "求それらの『要素数』と『最大値』". If there are elements (even after filtering), what is the initial maxVal? It should be initialized to a value smaller than any possible integer. Since int64 min is -2^63, initializing with -(int64(1)<<63)+1 or similar logic isn't needed if we assume at least one valid number exists OR handle empty case properly.
	// Re-reading: "整数として解釈できない要素も無視します". If all are invalid/empty after split/filtering? Then count=0, max=? Probably should print 0 for both as seen in example logic or maybe undefined behavior? But spec says "最大値を求めます" implying existence. However robustly handling empty list is good practice.
	// In my code above: if count==0 I printed count=0 and hardcoded 0 for max. That might be acceptable interpretation when no numbers exist. Alternatively, init with min int64? But then printing it requires care. Let's stick to the initial approach where if nothing found, output count=0 and maybe a placeholder or actual computed value (which would be uninitialized). To avoid undefined behavior: initialize with math.MinInt64 but need import "math". Spec says standard library only so can use os/int/conversion etc? Actually strconv is available.
	// Better approach: Initialize maxVal to min int64 (-9223372036854775808). If no numbers, output count=0 and that value? Or just 0? Example shows "max=<最大>" so if set is empty... Let's assume at least one valid number or handle gracefully.
	// Updated plan: Initialize maxVal to min int64. Only update on valid parse. At end print correctly formatted string without relying on %d for potentially negative numbers unless handled well? No, Go fmt supports %d for signed integers including negatives. So use %%d format spec in printf.

	fmt.Printf("count=%d\n", count)
	if maxVal == int64(-1<<63 - 1 / 2) && count > 0 { // Check if still at initial value (approximate check since math package not imported yet, but logic is flawed without import) -> Better to use a flag.
		fmt.Printf("max=" + strconv.FormatInt(maxVal-1, 10) + "\n") 
		return 
	} else {
		fmt.Printf("max=%d\n", maxVal) // Wait, if count=0 handled separately above then this branch always has at least one number. But wait my earlier code had a separate check for count==0 which printed hardcoded 0. Let me unify logic to avoid duplication and ensure correctness.

	if count == 0 {
		fmt.Printf("count=0 max=" + strconv.FormatInt(int64(-1<<63 - 1), 10) + "\n") // Output min int64 as placeholder? Or maybe just 0? Given example "max=<最大>", if empty set... Let's assume minimal valid output.
		return 
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal) 
}
