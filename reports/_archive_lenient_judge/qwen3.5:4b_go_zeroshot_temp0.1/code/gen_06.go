```go
package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately, but we need to handle input properly. 
	// Actually, for standard input in Go without arguments, we should use os.Stdin or similar logic if needed.
	// However, the spec says "standard input", so let's assume it might be empty or have content.
	// Since bufio.NewReader(nil) is not valid for reading from stdin directly like this, 
	// and to strictly follow standard Go practices without extra imports (except fmt),
	// we can use a simple approach that reads until EOF.

	// Re-evaluating: The spec says "standard input". In competitive programming or similar contexts,
	// the input is usually piped in. We need to read from os.Stdin implicitly? 
	// But wait, I cannot import "os" if only standard library is allowed (which includes os).
	// Actually, fmt and bufio are enough for reading lines, but we might not know how many lines or tokens.
	// Let's assume the input is a single line of comma-separated integers as per typical CP problems unless specified otherwise? 
	// The spec says "comma-separated integer list", implying one logical sequence. It doesn't explicitly say multiple lines.
	// However, to be robust against multi-line inputs (common in such specs), we should read all tokens until EOF.

	// Since I cannot import 'os' directly if the constraint implies minimal imports? 
	 // "Standard library only" usually allows os, bufio, fmt etc. Let's use a custom reader or just standard input reading loop.
	// Actually, to keep it simple and robust: read all lines from stdin until EOF.

	// Wait, I need to check if 'os' is allowed. The prompt says "standard library only". 
	 // os is part of the standard library. So importing os is fine. But let's try without explicit imports first?
	 // No, reading from stdin requires a reader. bufio.NewReader(os.Stdin) or just using fmt.Scanf in a loop?
	 // Using fmt.Scanln might be tricky with commas if not handled carefully (it splits by whitespace).
	 // The input is "comma-separated". So we need to handle the comma as delimiter, but also ignore spaces.

	// Let's use bufio.Scanner which reads tokens separated by default delimiters (space, tab, newline), 
	// but our input has commas too. Scanner doesn't split on commas by default unless configured?
	// Actually, Scanner splits by whitespace only. We need to parse manually or configure the delimiter.
	 // But configuring scanner with comma is possible: bufio.NewScanner(os.Stdin).SplitList = ... no such method directly for custom list easily without regex which needs regexp (not std lib simple enough?).

	// Alternative: Read all input as a string, replace commas and spaces with newlines or just parse integers manually.
	 // Or use fmt.Scanf("%d", &v) in a loop? But that stops at non-integer. We need to ignore invalid elements too.
	 // The spec says "ignore elements that cannot be interpreted as integers". 
	 // So we can try parsing each token, and if it fails (e.g., contains letters), skip it.

	// Let's write a robust solution: Read all input into a string buffer or read line by line, then split by comma/space?
	 // Actually, the simplest way to handle "comma-separated" with potential spaces is to replace commas and extra whitespace 
	 // but that might be error-prone if there are multiple numbers.

	// Better approach: Read all input from stdin until EOF into a single string (or process line by line).
	 // Then iterate through the characters, extracting integers when possible. If we hit something not part of an integer sequence, skip? 
	 // But "ignore elements that cannot be interpreted as integers" suggests if there's garbage text like 'abc', it should be ignored entirely.

	// Let's assume the input format is strictly numbers separated by commas and spaces, possibly with some noise?
	 // The spec says: "empty elements · leading/trailing whitespace are ignored". This implies valid structure but maybe extra chars? 
	 // Actually, if there are non-integer characters like 'a', they should be ignored.

	// Implementation plan:
	 // 1. Read all input from stdin into a string (or process byte by byte). Since Go's bufio is good for this.
	 //    We can use `bufio.NewReader(os.Stdin)` but we need to import os? Yes, standard library includes os.
	 //    However, the prompt says "standard library only", which implies all std libs are allowed unless restricted otherwise. 
	 //    Usually it means no external packages (like github.com/...). So 'os' is fine.

	// But wait, maybe I can avoid importing 'os' by using a custom reader that reads from stdin? No, Go doesn't provide direct access to stdin without os or bufio wrapping it.
	 // Actually, `bufio.NewReader` takes an io.Reader. We need to pass something reading from /dev/stdin equivalent. 
	 // In Go programs run with input redirection (e.g., echo "1,2" | go run main.go), the default is os.Stdin.

	// Let's use a simple loop: read lines until EOF using bufio.Scanner? Scanner splits by whitespace only.
	 // We need to handle commas as separators too. 
	 // So we can replace all non-digit and non-minus characters with space, then split by spaces? No, because negative numbers have '-'.

	// Correct logic for parsing integers from a string containing mixed chars:
	 // Iterate through the input string. If char is digit or '-', start building number. Continue until non-digits (except - at start). 
	 // But wait, what if there are multiple '-'? Or 'abc'? We just skip anything that isn't part of an integer sequence.

	// Actually, a simpler way: Replace all commas and spaces with nothing? No, because we need to separate numbers.
	 // Wait, the input is "comma-separated". So it's like "1, 2 ,3" or "1,2,3". 
	 // We can replace ',' with ' ' (space) first, then use Scanner which splits by whitespace. Then parse each token as int64. If parsing fails, ignore.

	// Steps:
	 // 1. Read all input from stdin into a string `s`.
	 //    How to read until EOF? Use bufio.NewReader(os.Stdin).ReadAll() -> returns []byte. Convert to string.
	 //    But we need 'os'. Is it allowed? Yes, standard library.

	// 2. Replace all commas in the string with spaces: `strings.Replace(s, ",", " ", -1)` (need strings package too). 
	 //    Strings is also std lib. So imports: bufio, os, fmt, strings.
	 //    Wait, can I do it without importing 'os'? No, because reading from stdin requires an io.Reader which defaults to os.Stdin in most contexts? 
	 //    Actually, if the program is run with input redirection, `bufio.NewReader(nil)` doesn't work for stdin directly unless wrapped.
	 //    But wait! There's a trick: In some environments (like online judges), you might not have 'os' imported but still need to read from /dev/stdin? 
	 //    No, Go requires explicit import of os or using bufio with an io.Reader that reads from stdin.

	// Let's assume we can use `os`. It is standard library.
	// So:
	 //   var reader = bufio.NewReader(os.Stdin)
	 //   inputBytes := make([]byte, 1024*1024) // buffer large enough? Or just ReadAll() which allocates internally.

	// Actually, `reader.ReadToEOF()` doesn't exist in Go's bufio. We have to use a loop or ReadAll().
	 // reader.ReadAll() is available since Go 1.8? Yes. It reads until EOF and returns the whole content as []byte.

	// So:
	 //   import ( "bufio"; "fmt"; "os" )
	 //   data, _ := bufio.NewReader(os.Stdin).ReadAll()
	 //   s := string(data)
	 //   Replace commas with spaces? Or just replace all non-alphanumeric except '-' and '.'(if decimals allowed)? 
	 //    Spec says integers. So no dots. Only digits and minus sign at start of number.
	 //    But input might have "1,2" or " 3 ,4 ". Replacing ',' with ' ' is safe because Scanner splits by whitespace anyway? 
	 //    Wait, if we replace comma with space, then the string becomes "1 2". Then split by whitespace -> ["1", "2"].
	 //    But what about negative numbers like "-5"? It contains '-'. If we only remove commas and spaces, '-' remains. That's fine because Scanner won't break it unless there are other delimiters? 
	 //    Actually, if the input is "- 5" (with space between - and 5), then replacing comma with nothing might leave " - 5". Splitting by whitespace gives ["-", "5"]. Then parsing "-" fails.
	 //    So we should handle negative numbers correctly: keep '-' only at start of a number sequence? 
	 //    Or better: Replace all characters that are NOT digits and not part of an integer pattern with space, then split?

	// Simpler approach for robustness:
	 //   Iterate through the string. If char is digit or '-', accumulate into buffer if it's part of a potential number (i.e., preceded by start-of-string or non-digit). 
	 //    But this logic is complex to implement quickly in one go without bugs.

	// Alternative: Use fmt.Scanf("%d", &v) inside a loop? No, because we need to skip invalid tokens and commas are not whitespace for Scanner unless configured.
	 // Actually, if we use `bufio.Scanner` with default delimiters (space, tab, newline), it will treat "1,2" as one token "1,2". Then parsing int("1,2") fails -> ignore. 
	 // But then how do we get 1 and 2? We need to split by comma too.

	// Revised plan:
	 //   Read all input into a string `s`.
	 //   Replace every ',' with ' '. Now the string has spaces instead of commas.
	 //   Then use strings.Fields(s) which splits by any whitespace (space, tab, newline). 
	 //   This handles "1 , 2" -> ["1", ",", "2"]? No! If we replace comma with space: "1  2". Fields gives ["1", "2"].
	 //   What about "-5"? It stays as "-5". Good.
	 //   So the algorithm is:
	 //     s := string(data)
	 //     s = strings.ReplaceAll(s, ",", " ") 
	 //     tokens := strings.Fields(s)  // splits by whitespace
	 //     for _, token := range tokens {
	 //         if val, err := strconv.ParseInt(token, 10, 64); err == nil { ... }
	 //    }
	 // Wait! I need to import "strconv" and maybe "os". 
	 // But the spec says "standard library only", which includes os, strings, fmt. Does it include strconv? Yes, standard lib.

	// However, there's a catch: What if the input has something like "1a2"? Replace comma with space -> "1a2". Fields -> ["1a2"]. ParseInt fails -> ignore. Correct.
	 // What about "- 5" (space between minus and digit)? 
	 //   Original: "- 5". After replace commas: same. Fields: ["-", "5"]. 
	 //   ParseInt("-") fails? Yes, because "-" is not a valid integer string alone. So it's ignored. Correct per spec ("ignore elements that cannot be interpreted as integers").
	 // What about "--5"? Same logic -> ignore "-". Then parse "5" -> success. But wait, the original was "--5", which should probably be parsed as -5? 
     // The spec says: "elements that cannot be interpreted as integers are ignored." So if we split by whitespace and get "-", it's not an integer, so ignored.
     // Then we get 5 separately. Is this correct behavior for the input "--5"? Probably yes per strict interpretation of "ignore invalid elements". 
     // But typically in such problems, you'd expect -5 from --5? No, because '-' is a sign and '5' is digit. Without context, they are separate tokens if separated by space.
     // If no space: "--5" -> token "- 5"? No, it's one string "--5". ParseInt("--5") fails (invalid format). So ignored. 
     // But wait! In C/C++, scanf("%d", &x) would read -5 from --5? Actually, in C++ `cin >> x` reads until non-digit or sign mismatch? No, it handles multiple signs by taking the first valid one?
     // Go's strconv.ParseInt("--5") returns error. So we ignore it. Is that correct per spec? 
     // Spec: "ignore elements that cannot be interpreted as integers". Yes, "--5" is not a valid integer representation in standard format (only one sign allowed).

	// But wait! What if the input is "-1,-2"? Replace comma with space -> "- 1 -2"? No.
     // Original: "-1,-2". Replace ',' with ' ': "-1 -2". Fields: ["-1", "-2"]. Both valid. Sum = -3, Count=2. Correct.

	// What if input is "a,b,c"? Replace -> "a b c". Fields: ["a","b","c"]. All invalid? Wait! 
     // ParseInt("a") fails. So ignored. But wait, the spec says "ignore elements that cannot be interpreted as integers".
     // Does it mean ignore the whole element (token) or just skip parsing and move on? Yes, skip token if not int.

	// One edge case: What about empty input? 
     //   data = "" -> tokens = [] -> count=0, sum=0. Correct.

	// Another edge case: "  ,  ". Replace ',' with ' ' -> "    ". Fields -> []. Count=0, Sum=0. Correct.

	// So the plan is solid. Now about imports:
     // We need: bufio, os, strings, fmt (for output), strconv (to parse int). 
     // All are standard library. 

	// Wait! The prompt says "standard library only". Does it mean ONLY std lib packages? Yes. 
     // So we can import all necessary ones from the Go standard library.

	// Final check on constraints:
     //   Sum fits in 64-bit integer -> use int64 for sum and count (count is small, but let's use int or int64). Spec says "sum=<total>", total fits in 64bit. 
     //   Count also should be printed as number. Use int64 for both to be safe? Or just int since max distinct integers won't exceed memory limits usually.
     //   But spec doesn't specify count range, but it's a list of unique integers from input. If input has 10^5 elements, count could be large. 
     //   Use int64 for both to avoid overflow if many duplicates? Actually, distinct count won't exceed total elements which fits in memory (but not specified).
     //   Let's use int64 for sum and count just to match the "sum is 64bit" hint implying we should be careful with sums.

	// Code structure:
     //   import ... 
     //   func main() {
     //       data, err := bufio.NewReader(os.Stdin).ReadAll()
     //       if err != nil && err.Error() == "EOF"? No, ReadAll returns error only on EOF? Actually it returns (nil, nil) at end of stream.
     //          Wait, ReadAll reads until EOF and returns the data. It doesn't return an error unless there's a problem reading. 
     //          But if input is empty, it returns []byte(nil). That's fine.

	//       s := string(data)
	//       s = strings.Replace(s, ",", " ", -1)
	//       tokens := strings.Fields(s)
	//       uniqueInts := make(map[int64]bool) // to track uniqueness? Or just use a set logic: add if not present. 
     //          Wait! We need count of UNIQUE integers and their sum. So we only process each distinct integer once.

	//       var seen map[int64]
     //       Actually, better: Use a slice or map to track what we've added before? No, just iterate tokens, parse int, if not in set, add to set and accumulate count/sum. 
     //          But wait! The spec says "unique integers" -> distinct values. So yes, only process each value once.

	//       However, the order of processing doesn't matter for sum/count of unique elements? Yes.
     //       Wait! What if input is: 1,2,3,1,2,3 
     //          Unique integers are {1,2,3}. Count=3, Sum=6. Correct.

	//       So algorithm:
     //         seen = make(map[int64]bool)
     //         count = 0
     //         sum = 0
     //         for token in tokens:
     //             if val, err := strconv.ParseInt(token, 10,
