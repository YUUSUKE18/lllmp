```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo map[int]int

func collatzStep(n int) int {
	if n == 1 {
		return 0
	}
	result := 0
	for n != 1 {
		if n%2 == 0 {
			n = n / 2
		} else {
			n = 3*n + 1
		}
		result++
	}
	return result
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	memo = make(map[int]int)
	total := 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		parts := []int{}
		for _, s := range []byte(line) {
			if s >= '0' && s <= '9' {
				parts = append(parts, int(s)-'0')
			} else {
				break
			}
		}
		if len(parts) == 0 {
			continue
		}

		n := 0
		for i := len(parts) - 1; i >= 0; i-- {
			n = n*10 + parts[i]
		}

		steps := 0
		tempN := n
		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		total += steps
		for tempN != 1 {
			if _, ok := memo[tempN]; !ok {
				memo[tempN] = 0
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
			if val, ok := memo[tempN]; ok {
				steps += val
				break
			}
			steps++
			if tempN%2 == 0 {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
		}

		for tempN != 1 {
