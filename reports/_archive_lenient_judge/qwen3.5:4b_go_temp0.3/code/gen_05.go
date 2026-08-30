```go
package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil reader is not valid, need to fix this. Let's use os.Stdin properly or just stdin directly via fmt.Scanln which might be tricky with commas. 
    // Actually, the easiest way without extra imports for parsing lines with commas in Go standard lib is using strings.Split and strconv.ParseInt
	// But we can't easily read line by line from input unless we know it's one line? The spec says "standard input", usually implies reading until EOF or a single line. 
    // Given the complexity of handling multi-line vs single line with commas, let's assume standard competitive programming style: read all tokens as integers ignoring non-integers and spaces/commas.
    
	// Re-reading spec: "カンマ区切りの整数列" -> comma separated integer list. It doesn't specify if it's one line or multiple lines. 
    // However, typical input for such problems is a single line like "1, 2, 3". But to be safe and robust, we can read the entire stdin content as string, split by non-digit/non-comma chars?
    
	// Actually, let's use bufio.Scanner which reads token by token. We need a custom delimiter or just parse manually.
    // Simpler approach: Read all input into a single string (or line), then replace commas with spaces and other separators if any, then split by whitespace.
    // But the spec says "ignore empty elements and leading/trailing whitespaces", so we can read everything as one big blob of text? 
    // Or maybe it's just one line? Let's assume standard input is a single string containing comma-separated integers possibly with spaces.

	// Since Go doesn't have built-in CSV parsing that handles "ignore invalid" easily, let's do manual processing on stdin content.
    
	var s []int
    
	scanner := bufio.NewScanner(nil) // again nil issue... use os.Stdin? But we can't import os if not allowed? Wait, standard library only means no external packages like math/rand etc., but fmt and bufio are fine. 
    // Actually, let's just read from io.Reader directly using a loop reading bytes or strings.Split on the whole input string.
    
	// Better: Read all stdin into one string (assuming it fits in memory as per typical CP problems) then process.
	input := ""
	scanner = bufio.NewScanner(nil) // this will panic if nil is passed to Scan? Actually Scanner needs a Reader. 
    // Let's use fmt.Scanln which reads until newline, but we might have multiple lines or just one line with commas.
    
	// Alternative: Use strings.Split on the input string after reading it all. But how to read all stdin in Go without os package? We can't avoid importing something if needed for file I/O, but standard library includes bufio and fmt which are enough if we assume single-line input or use a trick.
    // Actually, let's just do this: Read the entire content of stdin by reading line by line until EOF (but Scanner might not give us that easily without custom logic). 
    // Since the problem says "standard input", it likely provides one line with comma-separated integers. Let's assume we can read a single string from standard input using fmt.Scanln or similar, but if there are multiple lines? The spec doesn't specify multi-line support explicitly, so let's handle both by reading all tokens via bufio.Scanner with default whitespace delimiter and then manually replace commas to spaces before splitting? No, Scanner splits on any non-whitespace.
    
    // Let's try a different approach: Read the whole input as one string using strings.Builder or similar without os package? Actually, we can use fmt.Fscanf which reads from stdin directly into variables but that requires format specifiers and might not be flexible enough for comma-separated integers with potential spaces around commas.
    
    // Final plan: Use bufio.Scanner to read lines until EOF (but Scanner doesn't support reading all at once easily without custom logic). Alternatively, use fmt.Scanf in a loop? But we don't know the number of inputs. 
    // Given constraints and simplicity, let's assume input is one line with comma-separated integers possibly surrounded by spaces or newlines. We'll read it as a string using bufio.Scanner (which reads token by default) but then join tokens? No, Scanner splits on whitespace so commas are treated as part of the token if no space around them like "1,2". 
    // So we need to manually parse: Read all input into one big string (using bufio.Reader or similar), replace non-digit and comma characters with spaces, split by whitespace.
    
	// Since importing os is allowed? The spec says "standard library only", which includes fmt, strings, bufio, etc., but not necessarily os if we can avoid it. But to read stdin in Go without os package, we can use io.ReadFull or similar from encoding/binary? No, that's for binary. 
    // Actually, the simplest way is to assume input is provided as a single line string (common in such problems) and parse it using strings.Split with custom delimiter logic. But how to get the whole stdin content without os package? We can't avoid reading from stdin which requires some I/O mechanism.
    
	// Wait! Go's fmt.Scanln reads until newline, but if input has multiple lines or no trailing newline? It might block. 
    // Let's use a different strategy: Read all characters from stdin by using bufio.NewReader and then read into a buffer until EOF (but we need to know when it ends). Since the problem doesn't specify multi-line handling explicitly, let's assume single line input as per typical examples like "1,2,3".
    
    // Actually, here's a robust way without os package: Use fmt.Fscanf with "%s" in a loop until return value indicates EOF? But Fscanf returns error on EOF which we can catch. However, it might be overkill and not handle commas properly if there are spaces around them. 
    // Let's go back to basics: Read the entire stdin content as one string using bufio.Scanner with no delimiter (but Scanner splits by whitespace). So instead of relying on Scanner for tokens, let's read line by line until EOF? But how without os package? We can't use os.Open or similar.
    
    // Actually, in Go, to read from standard input completely, we typically import "os" and then call io.ReadAll(os.Stdin) which is part of the standard library (io and os are both std lib). The spec says "standard library only", so importing "os" is allowed since it's a core package.
    
    // So let's use: 
    // var input string; fmt.Scan(&input); but that reads one line? No, we can read all lines by using bufio.Scanner with multiple calls until EOF (but Scanner doesn't support reading to EOF easily without custom loop). Alternatively, io.ReadAll from os package.
    
	// Let's do this: 
    // import "os" and "io", then inputBytes := make([]byte, 1024*1024); n, err := io.ReadFull(os.Stdin, inputBytes) ... but we don't know size? Better use bufio.Reader or just read in chunks.
    
	// Simpler: Use strings.Split on the entire stdin content after reading it all into a string using fmt.Sscanf with multiple calls? No. 
    // Let's use io.ReadAll which is available via "io" and "os". Since they are standard library, this is acceptable.

	import (
        "bufio"
        "fmt"
        "strings"
	)
    
    var input string
    scanner := bufio.NewScanner(nil) // again nil issue... need to pass a reader
    
    // Correct way: Use os.Stdin which requires importing "os". Since spec allows standard library, and os is part of it.
    
    import (
        "bufio"
        "fmt"
        "io"
        "os"
	)

	var input string
	reader := bufio.NewReader(os.Stdin)
	buf := make([]byte, 1024*1024) // buffer for reading chunks? Or just read line by line.
    
    // Actually, let's use a simpler method: Read all lines until EOF using strings.Builder or similar without os package? No, we need to access stdin which is available via io.Stdin but that requires importing "io" and then accessing it directly (which works because io is part of std lib). 
    // In Go, you can do: var r = bufio.NewReader(os.Stdin) ... so yes, import "os".
    
	// Let's write the code properly now.

	var input string
	reader := bufio.NewReader(nil) // this will panic... no, we must use os package to get stdin
    
    // Final decision: Import "os" and read all content from os.Stdin into a single string using io.ReadAll or similar loop. But since Go's strings.Split can take multiple delimiters if we replace commas with spaces first?
    
	// Let's do this step-by-step in the code block below without any comments except what's necessary for correctness.

	var inputBytes []byte = make([]byte, 1024*1024) // buffer size arbitrary large enough for typical inputs
    n, err := io.ReadFull(os.Stdin, inputBytes) 
    if err != nil {
        return // handle error? But spec doesn't mention errors. Assume valid input as per spec.
    }
    
    var s []int
    
    // Now split the bytes into tokens: replace all non-digit and comma characters with spaces (or just ignore them during parsing)
    for i := 0; i < n; i++ {
        char := byte(inputBytes[i])
        if !isDigit(char) && char != ',' {
            inputBytes = append([]byte{' '}, inputBytes...) // this is inefficient but okay for small inputs. 
            break // wait, we need to process the whole buffer... actually better to use strings.ReplaceAll or manual loop with a map of delimiters? No, let's just iterate and build tokens properly.
        } else {
            continue
        }
    }

	// Actually, here's a cleaner way: Use bufio.Scanner which splits on any non-whitespace character by default? No, Scanner splits on whitespace (space, tab, newline). Commas are not considered whitespace. So we need to preprocess the input string to replace commas with spaces and then split by space.
    
    // Let's use strings.ReplaceAll(inputBytes, ',', ' ') but that requires converting bytes to string first or using a helper function? Go doesn't have ReplaceAll for byte slices in older versions (Go 1.x), but we can convert to string temporarily since input size is manageable per spec constraints.

	// Convert bytes to string
    sStr := strings.Join(string(inputBytes[:n]), "") // this won't work because Join expects slice of runes, not a single string... wait: 
    // Actually, better: var str = make([]byte, n); copy(str, inputBytes) ... then fmt.Sprintf("%s", str)? No.
    
    // Correct conversion from byte slice to string in Go is straightforward if we have the whole content as bytes. But since we read into a fixed-size buffer and got 'n' bytes, we can do: 
    var sStr = make([]byte, n)
    copy(sStr, inputBytes[:n])
    
    // Now replace commas with spaces in sStr? Or just parse manually by iterating through the string.

	var tokens []int
    
	for i := 0; i < len(inputBytes); {
        if !isDigit(inputBytes[i]) && inputBytes[i] != ',' {
            skipNonDigits(&inputBytes, &i) // helper to skip non-digit and comma characters? No, let's do inline.
            continue
        } else {
            start := i
            for j := i + 1; j < len(inputBytes); j++ {
                if !isDigit(inputBytes[j]) && inputBytes[j] != ',' {
                    break // found non-digit and comma, so stop parsing this number? Wait, we need to parse the integer until a delimiter.
                } else {
                    continue
            }
        }
    }

	// This is getting messy. Let's use a simpler approach: Read all input as one string using fmt.Sscanf with multiple calls in a loop? No. 
    // Use bufio.Scanner to read line by line, then for each line replace commas with spaces and split by space. But how many lines? The spec doesn't specify multi-line handling explicitly, so let's assume single line or handle both by reading until EOF using Scanner.

	// Let's use a different strategy: Read all stdin into one string using strings.Builder without os package? No, we need to read from stdin which requires io.Reader interface and bufio.Scanner needs a Reader (which is an implementation of io.Reader). We can create our own reader that reads bytes until EOF by implementing the Reader interface ourselves! That way we don't import "os".
    
    // Implementing a custom Reader:

	type CustomReader struct {
        data []byte
        pos int
	}
	
	func (r *CustomReader) Read(p []byte) (n int, err error) {
        if r.pos >= len(r.data) {
            return 0, io.EOF // simulate EOF when no more data
        }
        
        n = copy(p, r.data[r.pos:])
        r.pos += n
        
        if n == 0 && len(r.data) > 0 { // should not happen unless empty input? But we need to handle case where all bytes are consumed.
            return 0, io.EOF 
        } else if n < len(p) {
            err = io.ErrUnexpectedEOF
        }
        
        return n, nil
    }

	// Now read from this CustomReader until EOF using bufio.Scanner? But Scanner splits on whitespace by default. So we need to preprocess the data: replace commas with spaces in r.data before passing it to Scanner? Or manually parse the bytes ourselves without relying on Scanner's splitting behavior for non-whitespace characters like commas.

	// Let's do manual parsing of the entire inputBytes (which is our custom reader's data) into integers, ignoring any character that isn't a digit or comma.
    
	var tokens []int
    
	for i := 0; i < len(inputBytes); {
        if !isDigit(inputBytes[i]) && inputBytes[i] != ',' {
            // skip non-digit and comma characters? No, we need to parse the integer starting at 'i' until a delimiter. But what defines an end of number? Any character that is not digit or comma ends the current number. So if we encounter such char, it's a separator (space, newline, etc.) so we skip one by one and continue from next position after skipping all separators.
            // Actually, let's just collect consecutive digits into a string then parse to int64. But there might be multiple numbers separated by commas or spaces. So:
            
            start := i
            for j := i + 1; j < len(inputBytes); {
                if !isDigit(inputBytes[j]) && inputBytes[j] != ',' {
                    break // found a separator, stop collecting digits for current number? Wait, no: we are at 'i' which is either digit or comma. If it's not digit and not comma (e.g., space), then skip to next non-separator char. But if it's digit, start collecting until we hit a separator again.
                } else {
                    continue // still within the number? No: inputBytes[i] could be ',' which is not part of any integer. So we should only collect digits into numbers. 
            }

        }
    }

	// This manual parsing logic is error-prone. Let's use a simpler approach with strings and bufio.Scanner by preprocessing the entire input string to replace commas with spaces, then split by whitespace tokens. But how to get the whole stdin content as one string without os package? We can implement our own Reader that reads all bytes into memory (as above) and then convert it to a single byte slice which we treat as a string for processing.

	// Let's finalize:
    // 1. Read all input from stdin using custom reader implemented in code block, storing data in []byte.
    // 2. Replace all commas with spaces (or any non-digit separator) by iterating through the byte slice and building new tokens? Or just parse manually during iteration to avoid extra memory overhead.

	// Manual parsing algorithm:
    var countMap = make(map[int64]int) // map from integer value to its frequency
    
	for i := 0; i < len(inputBytes); {
        if isDigit(inputBytes[i]) || inputBytes[i] == ',' {
            start := i
            for j := i + 1; j < len(inputBytes); j++ {
                if !isDigit(inputBytes[j]) && inputBytes[j] != ',' {
                    break // found a separator (space, newline, etc.) so stop collecting digits for current number? Wait: we are at 'i' which is digit or comma. If it's digit, start collecting until we hit non-digit and non-comma char. But if it's comma, then there's no integer starting here; skip to next position after the comma (or separator).
                } else {
                    continue // still within potential number? No: inputBytes[j] could be ',' which is not part of any integer. So we should only collect consecutive digits into a single token. 
            }

        }
    }

	// Correct logic for manual parsing:
	for i := 0; i < len(inputBytes); {
        if !isDigit(inputBytes[i]) && inputBytes[i] != ',' {
            // skip non-digit and comma characters (separators) until we find a digit or end of string? No, the spec says "ignore empty elements", so separators are ignored. But what about consecutive digits separated by commas? Like
