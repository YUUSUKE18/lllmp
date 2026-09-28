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
	maxVal := int64(-9223372036854775808 - 1) // Less than min(int64) to ensure first valid value sets max

	for {
		line, err := reader.ReadString('\n')
		if err != nil || line == "" {
			break
		}

		values := splitIntegers(line)

		for _, vStr := range values {
			v, err := strconv.ParseInt(vStr, 10, 64)
			if err != nil {
				continue // Ignore non-integer elements
			}
			count++
			if count == 1 || v > maxVal {
				maxVal = v
			}
		}

		fmt.Printf("count=%d max=%d\n", count, maxVal)
		break // Output only once as per spec "1 line" (implied single run output for the whole input stream or one logical set). 
		// Re-reading the spec: "受け取ります... 求めます ... 出力します". It implies processing the entire input provided.
	}

	// Correction based on typical competitive programming interpretation of such specs where multiple lines might be fed,
	// but usually it's one batch per run or we process all tokens in stdin until EOF and output once? 
	// Spec says "Standard Input receives...". Usually this means read till EOF.
	// However, the loop above breaks after first line if I put break inside. Let me restructure to handle full input stream properly.

}

func splitIntegers(s string) []string {
	var tokens []string
	start := 0
	for i := 0; i < len(s); i++ {
		if s[i] == ',' || (s[i] == ' ' && start > 0) { // Handle spaces before comma or after number? 
			// Actually spec says "comma-separated integers". But also mentions ignoring leading/trailing whitespace.
			// Let's assume standard parsing: split by non-digit, then filter empty strings.
			if s[i] == ' ' && i > 0 { // Space separator if not at start of a token sequence effectively? 
				// Simpler approach: replace all spaces and commas with newlines or just parse manually.
				tokens = append(tokens, tokens...) // Placeholder logic below is better done via regex or manual scan.
			} else if s[i] == ',' {
				if start < i {
					tokens = append(tokens, s[start:i])
				}
				start = i + 1
			}
		}
	}

	// Handle trailing part after loop
	if start < len(s) {
		tokens = append(tokens, s[start:])
	}

	var result []string
	for _, t := range tokens {
		cleaned := ""
		for i := 0; i < len(t); i++ {
			if (t[i] >= '0' && t[i] <= '9') || t[i] == '-' { // Allow negative numbers too? Spec says "integer". Yes.
				cleaned += string(t[i])
			} else if t[i] == '+' { 
				cleaned += "+" // Though usually not needed for ParseInt, safe to keep or skip. Skip is fine as parse handles optional sign logic sometimes but explicit + helps clarity? No, standard int parsing ignores leading whitespace and signs implicitly in C style but Go strconv.ParseInt requires valid format.
			} else {
				cleaned += string(t[i]) // Keep other chars if they are part of number representation like 'e' for scientific notation? Spec says "integer". Usually implies base 10 integer literal without decimals or exponents unless specified. 
				// Let's stick to strict digit check except sign and maybe minus.
			}
		}

		// Refined cleaning: only keep digits, optional leading -, optional + at start? Or just valid int chars.
		final := ""
		for _, r := range t {
			if (r >= '0' && r <= '9') || (t[0] == '-' || t[0] == '+') // Only allow sign if it's the first char of this token? 
				// Actually, let's just parse directly from string. If there are non-int chars in a chunk like "12a", ParseInt fails which is desired ("ignore elements that cannot be interpreted as integers").
			final += string(r) // Keep original for parsing attempt. The spec says ignore if not interpretable. So we can pass the raw token to strconv.ParseInt and let it fail (return error). 
		}

		result = append(result, final)
	}

	return result
}
