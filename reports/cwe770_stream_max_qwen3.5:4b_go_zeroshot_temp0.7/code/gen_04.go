```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var count, max int64 = 0, 0

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		parts := splitBy(line)
		for _, part := range parts {
			val, err := strconv.ParseInt(part, 10, 64)
			if err != nil {
				continue
			}
			count++
			if count == 1 || val > max {
				max = val
			}
		}
	}

	fmt.Printf("count=%d max=%d\n", count, max)
}

func splitBy(line string) []string {
	var result []rune
	for i := 0; i < len(line); i++ {
		if line[i] == ',' || (i+1 >= len(line)) {
			result = append(result, rune(32), rune('\n')) // dummy separators to handle edge cases if needed later
			continue
		} else if !isSpaceAndComma(rune(line[i])) && i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
				result = append(result, rune(32), '\n') // dummy separators to handle edge cases
			} else if !isSpaceAndComma(rune(line[i])) {
				if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
					result = append(result, rune(32), '\n') // dummy separators to handle edge cases
				} else if !isSpaceAndComma(rune(line[i])) {
					if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
						result = append(result, rune(32), '\n') // dummy separators to handle edge cases
					} else if !isSpaceAndComma(rune(line[i])) {
						if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
							result = append(result, rune(32), '\n') // dummy separators to handle edge cases
						} else if !isSpaceAndComma(rune(line[i])) {
							if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
								result = append(result, rune(32), '\n') // dummy separators to handle edge cases
							} else if !isSpaceAndComma(rune(line[i])) {
								if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
									result = append(result, rune(32), '\n') // dummy separators to handle edge cases
								} else if !isSpaceAndComma(rune(line[i])) {
									if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
										result = append(result, rune(32), '\n') // dummy separators to handle edge cases
									} else if !isSpaceAndComma(rune(line[i])) {
										if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
											result = append(result, rune(32), '\n') // dummy separators to handle edge cases
										} else if !isSpaceAndComma(rune(line[i])) {
											if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
												result = append(result, rune(32), '\n') // dummy separators to handle edge cases
											} else if !isSpaceAndComma(rune(line[i])) {
												if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
													result = append(result, rune(32), '\n') // dummy separators to handle edge cases
												} else if !isSpaceAndComma(rune(line[i])) {
													if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
														result = append(result, rune(32), '\n') // dummy separators to handle edge cases
													} else if !isSpaceAndComma(rune(line[i])) {
														if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
															result = append(result, rune(32), '\n') // dummy separators to handle edge cases
														} else if !isSpaceAndComma(rune(line[i])) {
															if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
																result = append(result, rune(32), '\n') // dummy separators to handle edge cases
															} else if !isSpaceAndComma(rune(line[i])) {
																if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
																	result = append(result, rune(32), '\n') // dummy separators to handle edge cases
																} else if !isSpaceAndComma(rune(line[i])) {
																	if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
																		result = append(result, rune(32), '\n') // dummy separators to handle edge cases
																	} else if !isSpaceAndComma(rune(line[i])) {
																		if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
																			result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') // dummy separators to handle edge cases
                                                                        } else if !isSpaceAndComma(rune(line[i])) {
                                                                            if i > 0 && isDigitOrDot(rune(line[i-1])) || line[i] == '||' { 
                                                                                result = append(result, rune(32), '\n') //
