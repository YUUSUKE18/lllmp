package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func isValidLine(s string) bool {
	// 空行・空白のみなどの初期チェック
	s = strings.TrimSpace(s)
	if s == "" {
		return false
	}

	// 『数字列とカンマの列の列』の正規表現を定義:
	// ^(\d+,\s*)*$ を使い、その後に末尾カンマを含む形や、数字のみでも良い形としてマッチさせる。
	// 仕様を満たすパターン：
	// 1. [数字][カンマ][数字] ... [カンマ]? (例："1,2" "1," "2") -> regex: ^(\d+[,]+\d+)*$ ? -> no, let's use specific patterns.

	// Valid patterns:
	// a) One or more digits separated by commas (e.g., "1,2", "1,2,3", "1,,2" is invalid if empty between comma but spec says "数字列" implies non-empty?)
	// Let's re-read: "1 個以上の数字列がカンマで区切られて並んでいることです。末尾のカンマは許容します。"
	// Interpretation: A sequence of non-empty digit groups separated by commas, optionally ending with a comma.
	// Example valid: "1", "1,2", "1,", ",," (maybe not), "2,". Invalid: "1 2", "abc", "a,b".
	
	// We use a regex that matches a string which is either empty (handled earlier) or consists of digits separated by commas, with optional trailing comma.
	// Actually, simplest interpretation based on examples often seen in such tasks:
	// Pattern: [0-9]+(?:,[0-9]+)* optionally followed by ,
	// Or strictly: one or more blocks of digits and commas that look like a list.
	
	// Let's refine the regex to match "1,2," or "3" or "1". It must not have any characters other than digits and commas.
	re := regexp.MustCompile(`^[0-9]+(?:,[0-9]+)*[,]*$`)
	
	// Wait, "1,,2" has double comma. Is a blank digit sequence allowed between commas? Usually no unless specified "数字列" (digit sequence) means non-empty. 
	// Let's assume standard list behavior: non-empty digit groups separated by one or more commas? Or just digits and commas only?
	// The prompt says: "末尾のカンマは許容します" (Trailing comma is allowed).
	// If I have "1, 2", spaces are ignored later. So inside the validation we strip spaces?
	// "行の前後の空白は無視します" applies to the line check.
	
	// Revised logic:
	// 1. Trim line. If empty -> invalid.
	// 2. Check if it contains only digits and commas. If not -> invalid.
	// 3. Ensure at least one digit group exists (since "数字列" implies a number).
	
	if !re.MatchString(s) {
		// Additional check for strictly valid comma placement if regex was too loose, 
		// e.g. allowing multiple consecutive commas might be an issue if "数字列" means non-empty token.
		// Let's enforce at least one digit sequence and valid separation.
		re2 := regexp.MustCompile(`^([0-9]+(,[0-9]+)*)|([0-9]+,)?$`) // This covers "1", "1,2", "1,"
		// Wait, regex `^[0-9]+(,[0-9]+)*[,]*$` allows "1,,2" which is technically matching digits and commas.
		// But "数字列" (digit sequence) usually implies a non-empty number.
		// Let's use a pattern that ensures tokens are present.
		// Pattern: One or more digit sequences separated by commas, with optional trailing comma.
		// Regex for strictness: ^(\d+)(?:,\d+)*,?  -> This means "1", "1,2", "1," is NOT matched by this strict one because of the ? at end.
		// Actually "1," matches `(\d+)` then `,`? No, regex above doesn't capture trailing comma explicitly as part of a digit group.
		
		// Let's try: Match digits separated by commas. Optional trailing comma is allowed.
		// Regex: ^\d+(?:,\d+)*[,]*$ ? This matches "1", "1,", "1,," (trailing double comma). 
		// Is "1,," valid? "数字列" implies a sequence of numbers. ",," is not a number.
		// So we need at least one digit, and between digits there are commas. Trailing comma optional. No empty segments allowed between commas.
		// Regex: ^\d+(?:,\d+)*[,]?  -> This forbids trailing comma entirely if using this exact string, unless modified.
		
		// Correct approach for "Trailing comma allowed":
		// Matches a list of numbers where the last one may be omitted with a comma.
		// Let's assume input format: [num1][comma][num2]...[optional_comma]
		// So we can validate:
		// 1. It contains ONLY digits and commas.
		// 2. Split by comma, filter empty strings (remove consecutive commas), check if any digit left.
		
		parts := strings.Split(s, ",")
		for _, part := range parts {
			if len(part) == 0 {
				// Empty part means "1,,2" or start/end with double comma -> Invalid based on "数字列" being a non-empty sequence?
				// Actually, if the user writes "1,,2", is that valid? 
				// Given "末尾のカンマは許容します" (Trailing comma allowed), it implies strictness on other parts.
				// Usually "valid" means standard CSV-like logic where empty fields are bad unless specified.
				// Since "数字列" (digit sequence) is singular/plural, let's assume non-empty digits required.
				return false
			}
			// Check if part consists only of digits
			for _, c := range part {
				if !((c >= '0' && c <= '9')) {
					return false
				}
			}
		}
		
		// Check if there is at least one digit group (non-empty part after split)
		if len(parts) == 0 {
			return false // Already handled by empty line check, but just in case of "..." 
		}
		// Actually, we already looped parts. If any part has digits, it's fine.
		// Wait, if input is ",", parts=["", ""]. Loop finds empty parts -> returns false. Correct.
		// Input "1,,2" -> parts=["1","","2"]. Finds empty string -> returns false. Correct.
		// Input "1,2," -> parts=["1","2",""]. Last part is empty. Returns false? 
		// But spec says "末尾のカンマは許容します". So "1,2," should be valid.
		// My loop above rejects trailing comma because it creates an empty string at the end of split.
		
		// Fix for trailing comma: ignore empty strings that come from a trailing comma OR ensure they don't occur internally?
		// Better regex approach: ^\d+(?:,\d+)*(?:,)?$ | \d+(?:,\d+)*,?$ -> No, simpler:
		// Just check: The string matches the pattern of one or more digit blocks separated by commas, possibly ending with a comma.
		
		// Let's re-evaluate:
		// Valid examples: "1", "1,2", "1,", "1,,2" (maybe?), "2,"
		// Invalid: "1 2", "abc", "", ",,", "1, ,2"
		
		// Regex for "Non-empty digit sequences separated by commas, optional trailing comma":
		reFinal := regexp.MustCompile(`^(\d+(?:,\d+)*)[,]*$`)
		if reFinal.MatchString(s) {
			// Additional check: Ensure no empty segment inside (like 1,,2) if we want strictness.
			// If the requirement implies "数字列" means a number, then ",," is invalid.
			// Let's check for double commas specifically if not handled.
			if strings.Contains(s, ",,") {
				return false
			}
			return true
		}
		
		return false
	}
	
	return true
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0
	
	for sc.Scan() {
		line := sc.Text()
		if isValidLine(line) {
			validCount++
		}
	}
	
	fmt.Printf("valid=%d\n", validCount)
}
