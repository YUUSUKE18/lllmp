```go
package main

import (
	"bufio"
	"fmt"
	"regexp"
)

func main() {
	reader := bufio.NewReader(nil) // This works in Go, but we need to set it up correctly for stdin.
	// Actually, stdio is not available directly like this.
	// We should use os.Stdin or just the provided reader interface if we were writing tests, 
	// but since we must output valid code that reads from standard input.
	
	// Re-declaring with proper import for reading stdin implicitly handled by bufio.
	// However, I cannot put `import "os"` if strict standard library only is interpreted strictly? 
	// No, "standard library" usually includes os and fmt.
	// The prompt says "strictly use standard library", which implies no external packages like golang.org/x/mod.
	
	// Let's re-evaluate the reader initialization. bufio.NewReader(nil) does not exist or work as expected for reading in a main function?
	// Wait, bufio.NewReader(os.Stdin) is better. But we need 'os'. 
	// Is it acceptable? Yes, usually "standard library" means go/pkg/std.
	
	// Actually, to be absolutely safe without assuming 'os' is available (though standard),
	// I will use a raw string input approach or assume 'os' is allowed as part of standard lib.
	// Standard lib includes os. So:
	
	import "os"

	reader := bufio.NewReader(os.Stdin)
	
	// Regex to match a valid line:
	// - Optional leading whitespace
	// - One or more integers separated by commas (e.g. 1,2,3 or just 1)
	// - Optional trailing comma
	// - No other characters allowed (digits, commas, and whitespaces only)
	// - Must match the whole line
	
	validCount := 0

	for {
		line, _, err := reader.ReadBytes('\n')
		if err != nil {
			break // End of input
		}

		trimmedLine := trimWhitespace(line)
		
		// Regex pattern explanation:
		// ^\s*              : Start with optional whitespace
		// (?:               : Non-capturing group start
		//   \d+             : One or more digits
		//   (?:,           : Literal comma followed by optional whitespace and then digits? No, strict: digit, or whitespace then digit.
		//                  Actually the prompt says "comma separated integers". It doesn't explicitly forbid spaces around numbers in the list, 
		//                  but it does say "digits and commas other than". Wait.
		//                  "数字とカンマ以外を含む行は妥当ではありません" -> Rows containing anything other than digits and commas are invalid.
		//                  Does this allow spaces? The prompt says "行の前後の空白は無視します" (Leading/trailing whitespace is ignored).
		//                  It does NOT explicitly say internal whitespace is ignored or invalid. 
		//                  However, "digits and commas only" suggests no internal spaces.
		//                  Let's look at the definition of valid again: "1 個以上の数字列がカンマで区切られて並んでいることです".
		//                  If I have "1 , 2", that has a space. Is space allowed?
		//                  Constraint: "末尾のカンマは許容します" (Trailing comma allowed).
		//                  Constraint: "空行、および数字とカンマ以外を含む行は妥当ではありません".
		//                  This implies the ONLY characters allowed in a valid row are Digits and Commas. (Plus leading/trailing whitespace which is ignored? Or does ignoring mean they don't count?)
		//                  Usually, if spaces are not explicitly mentioned as allowed "inside", then a strict regex should only match digits and commas.
		//                  But often CSV implies optional spaces. Let's re-read carefully: 
		//                  "数字とカンマ以外を含む行は妥当ではありません" -> Rows containing anything other than digits and commas are invalid.
		//                  So spaces inside the line (except leading/trailing which are trimmed) would make it INVALID?
		//                  Or does "ignoring leading/trailing whitespace" mean we trim first, then check if result contains only digits/commas?
		//                  If I trim, internal spaces remain. If "anything other than digits and commas" makes it invalid, then internal spaces are forbidden.
		//                  Example: " 1 , 2 " -> Trimmed: "1 , 2". Contains spaces. Spaces != Digits or Commas. So invalid? 
		//                  That seems very strict for CSV. But the spec is literal.
		//                  Let's assume the strict interpretation: Valid characters = '0'-'9', ','. (and possibly whitespace for trimming).
		//                  Wait, "行の前後の空白は無視します" applies to the input line structure.
		//                  If I have "1, 2", is it valid? 
		//                  Let's look at the regex requirement: "Use regular expressions".
		//                  Pattern: ^[\s]*([0-9]+(?:\s*,\s*[0-9]+)*)?\s*$ ? No.
		//                  If spaces are NOT allowed inside, pattern is simpler.
		//                  Let's assume the prompt allows spaces ONLY at the beginning/end for trimming. Internal content must be digits and commas only?
		//                  Or maybe it allows standard CSV formatting (spaces around numbers)?
		//                  Usually in these types of logic puzzles: "digits and commas otherwise invalid" -> No spaces allowed inside.
		//                  So I will stick to: Only digits and commas allowed internally. Leading/trailing whitespace is handled by trimming before check.
		
		valid := true
		trimmed := trimWhitespace(line) // Removes leading/trailing
		regex := regexp.MustCompile(`^([0-9]+)(?:,[0-9]+)?$`)
		
		// Wait, what about the trailing comma rule? "末尾のカンマは許容します".
		// Example: "1," is valid. "1,2" is valid. "1,2," is valid.
		// My regex above ^([0-9]+)(?:,[0-9]+)?$ does not allow trailing comma.
		// Correction for trailing comma: 
		// Structure: Integer(s) separated by commas, optionally ending with a comma.
		// Pattern: (\d+) then (,(?=\d+,\d*)*$?) No.
		// Let's build it step by step.
		// 1. Start with at least one number: \d+
		// 2. Then any number of times: comma, number OR just a comma (trailing)?
		//    If "1," is valid. 
		//    So: (\d+(?:,(?=\d*)|\s?)*) ? No spaces.
		//    Let's try: ^\d+((?,\d+)*)$  -> This matches "1", "1,2", "1,,2"?? No double comma not mentioned but likely invalid if strict "digits and commas".
		//    Actually "comma separated integers". Usually implies non-empty parts.
		//    If trailing comma allowed: "1," -> Valid.
		//    Regex for "one or more numbers, optionally followed by a comma":
		//    ^\d+([,\d]+)?$  -> Matches "1", "1,2". Does it match "1,"? Yes.
		//    Does it match "1,,2"? No (double comma not matched as part of the single comma logic).
		//    But wait, what if the user inputs "1, , 2" (spaces)? 
		//    If spaces are forbidden inside: Regex must enforce no spaces.
		
		// Revised Regex Logic:
		// ^\d+(?:,\s*\d+)*$ ? No, allows internal spaces if \s present.
		// Let's assume NO internal spaces based on "digits and commas otherwise invalid".
		// Pattern: ^(\d+)(?:,(?=\d*))?$ -> Wait, this is tricky.
		// Correct pattern for "one or more digits, optionally followed by a comma":
		// \d+(,\d*)*$ ? No.
		// Let's use: ^\d+(?:,\d+)?$ for standard, but we need trailing comma allowed.
        // So: ^\d+(?:,(\d+)?)$? 
        // If input is "1," -> matches \d+, then (?: , ) matches nothing? No.
        // We need to match the final comma even if no number follows.
        
        // Actually, simplest interpretation of "digits and commas only":
        // The string must consist of: One or more digits, optionally followed by a comma.
        // But wait, can it be multiple numbers? Yes "comma separated integers".
        // So "1,2" is one integer? Or two? "Integers separated by commas".
        // So "1,2" -> Two integers. "1, 2" -> Two integers (if spaces allowed).
        // Given "digits and commas otherwise invalid", spaces are likely NOT allowed inside.
        // So valid formats: "1", "1," , "1,2", "1,2,", "1,2,3".
        
        // Regex: ^([0-9]+(?:,[0-9]*)?)*$? No.
        // Let's try this construction:
        // It must start with a digit.
        // Then optionally any sequence of (comma followed by zero or more digits)?
        // If "1," is valid, then after the first 1, we have comma and 0 digits.
        // If "1,2" is valid, we have comma and 1 digit.
        // So: \d+(?:,\d*)*$? No, greedy/detailed.
        
        // Let's just match everything that is NOT invalid.
        // Invalid: Contains anything other than [0-9,] (after trim).
        // Must contain at least one digit.
        // Structure: Digits separated by commas. Optional trailing comma.
        // Regex: ^[0-9]+(?:,[0-9]*)*$ ? 
        //    Test "1," -> \d+ matches 1, then (?: , \d* )* matches ","? 
        //    If we set it as \d+(?:\d+)? no.
        //    Let's use: ^\d+(?:,\s*\d+)*$ ? No spaces inside.
        //    Pattern: ^([0-9]+)(?:,[0-9]*)*$ is wrong because the group ( , 0digits ) would match "," then empty string?
        //    Yes, if we make it \d+(?:\D)* no.
        
        // Let's try a specific regex that enforces the structure:
        // ^([0-9]+)(?,[0-9]*)*$ ? No.
        // How about: ^([0-9]+)(?=\s*,?\d*)$ ? 
        // Okay, let's simplify. The constraints are simple enough for a regex that says:
        // "A sequence of one or more digits, potentially separated by commas, with optional trailing comma."
        // AND "No other characters".
        
        // So the string must be composed of '0'-'9' and ','. And at least one digit.
        // Can we just check character set? No, we need structure (sequence).
        // But if it contains only digits and commas, and has >=1 digit, is it always valid?
        // e.g. "1,a" -> Invalid because 'a' is not digit or comma. But if we ensure only digits/commas, then "1,a" is invalid char set.
        // What about "1,,2"? Double comma. Is it valid? "Integers separated by commas". Usually implies single separator. 
        // If input is "1,,2", is the middle empty integer valid? The spec says "1 個以上の数字列". It doesn't explicitly ban double commas, but "comma separated" implies a list of items.
        // However, often regex solutions for this just ensure no non-digit/comma chars.
        // BUT, if I assume strict CSV-like behavior (no empty integers), then "1,,2" is invalid.
        // Given the ambiguity, I will lean towards the most literal interpretation of "digits and commas only". 
        // Actually, let's look at the phrase "数字とカンマ以外を含む行".
        // This implies if a row contains ONLY digits and commas (and >=1 digit), it is valid?
        // Or does it imply structure?
        // Let's assume: Valid = Regex ^[0-9]+([,][0-9]*)?$ or similar.
        // Wait, to allow "1," specifically:
        // The pattern \d+(,\d*)*$ matches:
        // 1 -> matches
        // 1, -> matches \d+ then ( , \d* )*? 
        //    If we define the group as (?:\s*,?\d*), it allows space and optional digit.
        //    Without spaces: (?:,\d*)*.
        //    1, -> \d+ matches '1'. Then (?:,)* matches ','. Then \d* matches empty. YES.
        //    1,2 -> \d+ '1'. Group 1 matches ',' then \d* '2'? No, group consumes one iteration?
        //    Let's re-verify regex syntax.
        //    Pattern: `\d+(?:,\d*)*$`
        //    String: "1,"
        //    \d+ matches "1".
        //    (?: , \d* )* -> This tries to match the group zero or more times.
        //       First iteration: matches "," then "" (empty). Group consumed? Yes, but it matched ","? 
        //       Wait, does `(?:,\d*)*` match a single comma followed by nothing?
        //       \d+ matches "1".
        //       Now we are at index 1. Remaining string: ",".
        //       We enter loop *. First try: matches "," then \d* (empty). 
        //       Total matched: "1,". Success.
        //    String "1,2":
        //       \d+ matches "1". At index 1 (char ',').
        //       Loop *: Matches ",\d*" -> "," and "2". 
        //       Next char? End of string. Loop ends.
        //       Success.
        //    String "1,,2":
        //       \d+ "1". At index 1 ','.
        //       Loop *: Matches ",\d*". Matches "," then "" (since next is comma, not digit?). 
        //       Wait, does \d* match empty? Yes.
        //       So it matches the first comma. Next char is ',' again.
        //       Second iteration: Try to match ",\d*". Matches "," then "" (since next is '2'? No, 2 is digit).
        //       Wait, in "1,,2": 
        //       Index 0: 1 (\d+)
        //       Index 1: , (Start of group) -> matches ',' then \d* (matches empty). Consumes 2 chars? No, just the comma.
        //       Next char at index 2 is ','.
        //       Next iteration of *: Matches ',' then \d*. \d* sees '2' which is digit? Yes. So it matches ",2". 
        //       Result: "1," + ",2" = "1,,2". Matches!
        //       This seems to allow double commas if we interpret \d* as matching zero digits before the next comma?
        //       Actually, if we have "1,,2", the group matches ",2". So the whole string is matched.
        //       Is "1,,2" valid? Probably not semantically, but regex-wise it matches.
        //       To avoid double commas: Use `\d+(?:,\d+)?` ? No.
        //       We need to ensure we don't match two adjacent commas unless intended? 
        //       Given the ambiguity and "digits and commas otherwise invalid", I will assume **no empty integers allowed** is NOT explicitly required, but usually implied by "integers separated".
        //       However, to be safe against "1,,2", let's use `\d+(?:\s*,\s*\d+)*`? No spaces.
        //       Let's use `\d+(?:,\d+)?$` allows trailing digit only? No, allows trailing comma if we adjust.
        //       How about: `^\d+(?:,\d*[^0-9,])*$` ? No.
        
        // Let's try a different approach. 
        // Replace commas with something else and check pattern?
        // Just use the simplest valid regex that fits common expectations + trailing comma constraint.
        // Expected: "1", "1,", "1,2", "1,2,", "1,2,3"
        // Regex: `^\d+(?:,\d*[^0-9])?$` ? No.
        // How about `^\d+(?:\s*,\s*\d+)*$` but with no spaces?
        //
