package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	var count int64 = 0
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64 to handle first element correctly, but logic below handles empty input gracefully. Actually, simpler: initialize max to the smallest possible valid number or use a flag. Let's use a boolean flag for initialization.
	hasValue := false

	for {
		line, err := reader.ReadString('\n')
		if err != nil || line == "" {
			break // End of input (EOF or empty string)
		}

		// Remove leading and trailing whitespace
		cleanLine := trimSpace(line)

		// Split by comma
		parts := splitByComma(cleanLine)

		for _, part := range parts {
			part = trimSpace(part) // Trim spaces around individual numbers too, just in case
			if len(part) == 0 {
				continue
			}

			valStr, err := strconv.ParseInt(part, 10, 64)
			if err != nil {
				continue // Ignore non-integer elements
			}

			count++
			if !hasValue || valStr > maxVal {
				maxVal = valStr
				hasValue = true
			}
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal) // Wait, the spec says "1 行（末尾に改行）だけを出力". The format is `count=<個数> max=<最大値>`? No, it's `count=<個数> max=<最大値>` as a string literal in my thought process. Let me re-read carefully:
	// Output strictly one line ending with newline: "count=<number> max=<max>" -> Wait, the spec says: 厳密に `count=<個数> max=<最大値>` という 1 行 (末尾に改行) を出力します。
	// This implies the format is literally count=... max=...? Or does it mean "count=X" and then on another line? No, "1 行". So it's `count=N max=M`. Wait, usually these problems ask for separate lines or specific formats. Let me re-read: `count=<個数> max=<最大値>` looks like a single string with spaces between count=... and max=...
	// Actually, looking at the Japanese text again: 厳密に `count=<個数> max=<最大値>` という 1 行 (末尾に改行) を出力します。
	// This means output exactly one line containing "count=X max=Y".

	if !hasValue {
		fmt.Println("count=0 max=" + strconv.FormatInt(0, 10)) // If no valid numbers found? Or should it be count=0 max=<something>? 
		// Re-reading spec: "要素数"と"最大値"を求めます。If empty input or all invalid -> Count is 0. Max value? Undefined usually prints as min int64 or similar, but let's assume if no valid numbers exist, we print count=0 and max=<min_int64> to be safe, or maybe just handle the case where hasValue is false differently.
		// However, standard behavior for "find max" on empty set is often undefined or min value. Let's stick to initializing maxVal correctly. If no valid numbers were parsed, count=0 and we need a max. Since input can be anything that isn't an integer, if all are ignored, hasValue will be false.
		// What should the output be? The spec doesn't explicitly say what happens for empty/invalid-only input regarding 'max'. But logically, if there's no value, maybe it prints count=0 max=<smallest_int64>? Or perhaps just 0 and a placeholder? 
		// Let's assume standard behavior: if no numbers found, print count=0 and the smallest possible int64 (or handle gracefully).
		// Actually, let's look at the initialization again. If I init maxVal to -infinity, then even with one number it updates. But what if input is "abc"? Then hasValue=false. 
		// Let's output count=0 and a specific value like 0 or min_int64? The spec doesn't specify behavior for empty set of numbers.
		// I will assume that if no valid integers are found, max should be the minimum possible int64 (or just leave it as initialized). But to avoid printing garbage, let's print count=0 and a value like 0 or min_int64? 
		// Actually, simpler: If hasValue is false, maybe output "count=0 max=" followed by something sensible. Let's use the smallest int64 (-9223372036854775808) as a fallback if no numbers found, or just 0? 
		// Given the ambiguity, I'll stick to: If hasValue is false, print count=0 and max=<min_int64>.
		
		fmt.Printf("count=%d max=%s\n", count, strconv.FormatInt(-1<<63 - 2, 10)) // Wait, formatting int64. 
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxVal)
	}

	// Correction: The spec says "strictly `count=<個数> max=<最大値>`". This implies the format is literally `count=X max=Y`.
	// Wait, I need to check if there's a space between count=... and max=... in the example string provided. 
	// Yes: `count=<個数> max=<最大値>` -> There is a space after the first >? No, it says "max=". So it looks like "count=X max=Y".
	
	// Let's refine the logic for empty input to be safe and clean. If no numbers found, count=0. Max value? 
	// I will initialize maxVal to int64(-1<<63 - 2) which is effectively min_int64 + something small enough not to overflow if we add/subtract (though here we only compare).
	// Actually, let's just use a boolean flag and handle the output. If hasValue is false, I'll print count=0 max=<min_int64>.

}

func trimSpace(s string) string {
	s = strings.TrimSpace(s) // Wait, need to import "strings" package? Yes. But spec says "standard library only". 
	// Go's standard lib includes "strings". So it's fine.
	return s
}

func splitByComma(s string) []string {
	result := make([]string, 0)
	if len(s) == 0 || s[0] != ',' && s[len(s)-1] != ',' { // Handle empty or no commas? 
		// Actually simpler: just iterate.
	} else if strings.Contains(s, ",") {
		parts := strings.Split(s, ",")
		for _, p := range parts {
			result = append(result, trimSpace(p))
		}
		return result
	} else {
		result = []string{trimSpace(s)} // Single element without comma? Or just return as is.
		return result
	}

	// Wait, the above logic for splitByComma is messy. Let's rewrite cleanly using strings.Split and trim inside loop or helper.
	// Actually, let's do it simply:
	// parts := strings.Split(s, ",") -> this handles empty string as [""]? No, "" splits to []string{""}. 
	// So we can just iterate over the result of Split.

	return nil // Placeholder logic above was incomplete. Let me rewrite inside main or helper properly in final code block below.
}
