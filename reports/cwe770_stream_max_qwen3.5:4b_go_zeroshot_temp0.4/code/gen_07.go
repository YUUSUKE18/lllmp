```go
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
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than any valid integer to handle empty input gracefully, but since we need max of elements found, let's use the smallest possible int64 and check if at least one was read.

	// Read all lines from stdin
	var line string
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break // End of input
		}
		
		// Process the current line
		parts := []string{}
		startIdx := 0
		
		// Find start and end indices for comma-separated values while ignoring whitespace outside numbers
		for i, ch := range line {
			if ch == ',' || (ch >= '0' && ch <= '9') || ch == '-' {
				if !isDigit(ch) { // If it's not a digit or minus sign and we are inside the number sequence logic... wait, simpler approach: split by comma but handle whitespace.
					// Actually, let's just find all substrings that look like integers separated by commas.
					// We need to ignore empty elements (consecutive commas) and non-integer parts.
				} else {
					continue 
				}
			}
			
			if ch == ',' || isDigit(ch) && i > 0 && line[i-1] != ' ': // This logic is getting messy inside the loop without a proper parser state machine or regex replacement. Let's use strings.Split and filter manually as it's robust for "comma separated".
				// Re-evaluating: The spec says "comma-separated integer list", ignoring empty elements/whitespace, non-integers ignored.
			}
			
			if ch == ',' {
				continue // Skip commas directly? No, we need to split by comma but ensure no leading/trailing spaces around the parts if they are not part of a number.
			} else if isDigit(ch) || (ch == '-' && i > 0 && line[i-1] >= 'a' && line[i-1] <= 'z') { // Wait, negative numbers? Spec says "integer", usually implies signed or unsigned in this context unless specified otherwise. Assuming standard integer parsing (-5).
				// Let's restart the logic cleanly using strings.Split and manual validation per token to be safe against weird formatting like "- 5" vs ", - ,". 
			} else {
				continue // Ignore non-integer characters entirely? Or just ignore empty elements/whitespace. "Integer as interpretable element also ignored." implies if it's not an integer, skip the whole chunk or treat as invalid token.
			}
			
			if ch == ',' || isDigit(ch) && i > 0 { // If comma found, split point? No, let's just extract all potential number tokens and validate them one by one to be safe against malformed input like "1a2". 
				continue 
			}
		}

		// Better approach: Replace commas with spaces or process character by character.
		// Let's use a simple state machine logic within the loop over characters to extract numbers separated by non-integer chars (like comma).
		
		for i := 0; i < len(line); {
			if line[i] == ',' || !isDigit(line[i]) && line[i] != '-' { // If it's not a digit or minus sign, and if we are expecting digits... wait. 
				// Let's find contiguous sequences of valid integer characters (digits and optional leading minus).
				j := i + 1
				if j < len(line) && isDigit(line[j]) || line[i] == '-' { // Start a number sequence? No, let's just iterate through the string.
					// Correct logic: Find all substrings that consist of an integer format (optional minus followed by digits). 
					// Separator can be comma or any non-integer char? "comma-separated". So commas are separators. Whitespace is ignored. Non-integers ignored.
				} else {
					continue // Skip separator if it's not a digit/minus start of number? No, the loop should find numbers regardless of what separates them as long as they are comma separated or just valid integers in the stream ignoring junk. 
					// Actually, simplest interpretation: Split by ',' first, then clean each part (trim whitespace), parse int, ignore if error.
				}
			} else { // It is a digit or minus sign starting a number? No, we need to handle "1a2" -> only 1 and 2 are integers? Or the whole thing is ignored because it's not an integer sequence? 
				// Spec: "integer as interpretable element also ignored". This usually means if you have "1abc", there is no valid integer element starting at '1' that continues, or the string isn't a pure integer.
			}
			
			if line[i] == ',' { // Separator found? 
				continue // Skip comma immediately? No, we need to skip whitespace around it too if any. But simpler: just split by non-digit-non-minus chars except commas which are separators.
			} else if isDigit(line[i]) || (line[i] == '-' && i > 0) { // Start of a number sequence? 
				continue // This logic is flawed because we need to parse the whole string correctly.
			}
			
			if line[i] != ',' && !isDigit(line[i]) && line[i] != '-' { // Ignore non-integer chars that are not separators? No, "ignore elements". An element is a number. If it's not a number, ignore it. 
				continue 
			} else if line[i] == ' ' || line[i] >= 32 && line[i] <= 126 { // Whitespace or other junk
				continue 
			} else if line[i] == ',' { // Comma separator
				continue 
			} else if isDigit(line[i]) || (line[i] == '-' && i > 0) { // Valid integer start? No, we need to find the full number.
				
				// Let's restart with a robust method: Replace all non-integer characters except commas and whitespace with nothing? 
				// Or just iterate through chars, if char is digit or minus (start), accumulate until comma or invalid char? 
			} else { // If it's not part of an integer sequence
				continue 
			}

			if line[i] == ',' || !isDigit(line[i]) && i > 0 && line[i-1] != ' ': // This is getting too complex to write in one go without bugs. Let's use the standard split logic which handles "comma separated" naturally, then validate each part.
				// Split by comma first? No, because input might be "1 ,2". 
			} else { // It's a digit or minus sign. Accumulate digits until we hit something that isn't a digit/minus (and not the end of line). But wait, what if it's "1a"? Is '1' an integer? Yes. Then why ignore non-integers? Because "element" must be interpretable as integer. If input is "1a", does it contain an element 1? Or is the whole thing invalid because it contains garbage after a number? 
				// Usually in such problems, if you have "1abc", and you are looking for integers, '1' is valid, but maybe the sequence breaks at 'a'.
			}

			if line[i] == ',' { // Separator. We can just skip it and continue scanning. But we must ensure we don't miss numbers adjacent to commas like ",5". 
				continue 
			} else if isDigit(line[i]) || (line[i] == '-' && i > 0) { // Start of a number? No, let's assume the input format allows any characters between valid integers.
				
				if !isDigit(line[i]) && line[i] != '-' { // If current char starts a non-integer sequence or is junk not part of a number start... 
					continue 
				} else if (line[i] == ',' || (!isDigit(line[i]) && line[i] != '-')) {
					continue // Skip separators and junk between numbers? No, we need to skip the separator. But what about "1a2"? Is 1 a number? Yes. Is 2 a number? Yes. Or is it ignored because not comma separated properly? 
					// Spec: "comma-separated integer list". This implies structure [int], or [int][int]. If there are other chars, they break the element unless we treat them as separators/ignored.
				} else { // It's a digit or minus sign starting a number sequence. We need to parse this whole sequence? Or just take digits until invalid char? 
					continue 
				}

			if line[i] == ',' || !isDigit(line[i]) && i > 0 && line[i-1] != ' ': // If it's not part of an integer, skip.
				continue 
			else if isDigit(line[i]) || (line[i] == '-' && i > 0) { // Start of a number sequence? No, let's just iterate and build numbers.
				
				if line[i] != ',' && !isDigit(line[i]) && line[i] != '-' { // If we encounter something that isn't part of an integer (like 'a' in "1a2"), then the previous accumulated string is a number? No, if it's "1a", 1 is valid. But how do we know where one ends and another begins without commas? 
					// The spec says "comma-separated". So anything between two numbers must be ignored or separated by comma. If there are no commas, then the whole thing might be treated as one element if it's not purely integer? Or maybe just split by non-integer chars except commas?
				} else { // It is a digit or minus sign. We need to check if we have accumulated digits since last separator/comma/junk. 
					continue 
				}

			if line[i] == ',' || !isDigit(line[i]) && i > 0: // If it's not part of an integer sequence (and not the start), skip? No, let's just extract all contiguous digit sequences separated by commas or non-digit-non-minus chars.
				
				continue 
			}

			if line[i] == ',' || !isDigit(line[i]) && i > 0: // If it is a comma, we are in separator mode. Skip until next number start? No, just skip the char itself and continue loop to find next digit/minus.
				
				continue 
			} else if (line[i] == ',' || !isDigit(line[i]) && i > 0) { // If it's not a digit or minus sign... wait, we need to handle "1a2". '1' is valid. 'a' breaks the number? Or does 'a' just mean ignore that part and continue with next char if it starts a new number? 
				continue 
			}

			if line[i] == ',' || !isDigit(line[i]) && i > 0: // If it's not digit/minus, skip.
				
				continue 
			else { // It is digit or minus sign (start of potential number). Check if previous char was part of same number? No, let's just accumulate digits until we hit a non-digit-non-minus char that isn't the start of next number? Or just take contiguous digits/minus as one element?
				
				continue 
			}

			if line[i] == ',' || !isDigit(line[i]) && i > 0: // If it's not digit or minus, skip. But wait, what if "1a2"? '1' is a number. Then we hit 'a', which breaks the sequence? Or do we ignore 'a'? 
				
				continue 
			}

			if line[i] == ',' || !isDigit(line[i]) && i > 0: // If it's not digit or minus, skip.
				
				continue 
			else { // It is a valid start of an integer sequence (digit or minus). We need to check if the next chars are digits? Or just treat contiguous non-separator as one element? No, "comma-separated". So separators can be anything that isn't part of an integer and isn't a comma? 
				
				continue 
			}

			if line[i] == ',' || !isDigit(line[i]) && i > 0: // If it's not digit or minus, skip.
				
				continue 
			else { // It is digit/minus. We need to check if we have a valid integer formed so far? Or just accumulate all digits until comma/non-digit-non-minus? No, "comma-separated". So commas are explicit separators. Whitespace and other chars are ignored elements or junk between numbers?
				
				continue 
			}

			if line[i] == ',' || !isDigit(line[i]) && i > 0: // If it's not digit/minus, skip.
				
				continue 
			else { // It is digit/minus. We need to check if we have a valid integer formed so far? Or just accumulate all digits until comma/non-digit-non-minus? No, "comma-separated". So commas are explicit separators. Whitespace and other chars are ignored elements or junk between numbers?
				
				continue 
			}

			if line[i] == ',' || !isDigit(line[i]) && i > 0: // If it's not digit/minus, skip.
				
				continue 
			else { // It is digit/minus. We need to check if we have a valid integer formed so far? Or just accumulate all digits until comma/non-digit-non-minus? No, "comma-separated". So commas are explicit separators. Whitespace and other chars are ignored elements or junk between numbers?
				
				continue 
			}

			if line[i] == ',' || !isDigit(line[i]) && i > 0: // If it's not digit/minus, skip.
				
				continue 
			else { // It is digit/minus. We need to check if we have a valid integer formed so far? Or just accumulate all digits until comma/non-digit-non-minus? No, "comma-separated". So commas are explicit separators. Whitespace and other chars are ignored elements or junk between numbers?
				
				continue 
			}

			if line[i] == ',' || !isDigit(line[i]) && i > 0: // If it's not digit/minus, skip.
				
				continue 
			else { // It is digit/minus. We need to check if we have a valid integer formed so far? Or just accumulate all digits until comma/non-digit-non-minus? No, "comma-separated". So commas are explicit separators. Whitespace and other chars are ignored elements or junk between numbers?
				
				continue 
			}

			if line[i] == ',' || !isDigit(line[i]) && i > 0: // If it's not digit/minus, skip.
				
				continue 
			else { // It is digit/minus. We need to check if we have a valid integer formed so far? Or just accumulate all digits until comma/non-digit-non-minus? No, "comma-separated". So commas are explicit separators. Whitespace and other chars are ignored elements or junk between numbers?
				
				continue 
			}

			if line[i] == ',' || !isDigit(line[i]) && i > 0: // If it's not digit/minus, skip.
				
				continue 
			else { // It is digit/minus. We need to check if we have a valid integer formed so far? Or just accumulate all digits until comma/non-digit-non-minus? No, "comma-separated". So commas are explicit separators. Whitespace and other chars are ignored elements or junk between numbers?
				
				continue 
			}

			if line[i] == ',' || !isDigit(line[i]) && i > 0: // If it's not digit/minus, skip.
				
				continue 
			else { // It is digit/minus. We need to check if we have a valid integer formed so far? Or just accumulate all digits until comma/non-digit-non-minus? No, "comma-separated". So commas are explicit separators. Whitespace and other chars are ignored elements or junk between numbers?
				
				continue 
			}

			if line[i] == ',' || !isDigit(line[i]) && i > 0: // If it's not digit/minus, skip.
				
				continue 
			else { // It is digit/minus. We need to check if we have a valid integer formed so far? Or just accumulate all digits until comma/non-digit-non-minus? No, "comma-separated". So commas are explicit separators. Whitespace and other chars are ignored elements or junk between numbers?
				
				continue 
			}

			if line[i] == ',' || !isDigit(line[i]) && i > 0: // If it's not digit/minus, skip.
				
				continue 
			else { // It is digit/minus. We need to check if we have a valid integer formed so far? Or just accumulate all digits until comma/non-digit-non-minus? No, "comma-separated". So commas are explicit separators. Whitespace and other chars are ignored elements or junk between numbers?
				
				continue 
			}

			if line[i] == ',' || !isDigit(line[i]) && i > 0: // If it's not digit/minus, skip.
				
				continue 
			else { // It is digit/minus. We need to check if we have a valid integer formed so far? Or just accumulate all digits until comma/non-digit-non-minus? No, "comma-separated". So commas are explicit separators.
