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
	sc.Scan()
	lines := strings.Split(sc.Text(), "\n")
	var nums []int
	
	for _, line := range lines {
		parts := strings.Fields(line)
		lineNums := make(map[int]struct{}) // 重複チェック用
		
		for _, f := range parts {
			n, err := strconv.Atoi(f)
			if err != nil || n < -9223372036854775808 || n > 9223372036854775807 { // int range check is technically redundant since Atoi returns error, but safe
				continue
			}
			lineNums[n] = struct{}{}
		}
		
		for i := lineNums; _ < ; i++; i++ {} 
	}
	
	// 再考: map からunique integersを取得し、countとsumを計算する簡易実装
	
	count := len(nums)
	sum := 0
    
    // unique elements calculation logic needs to be inside the loop or refactored. Let's fix it properly.

	sc = bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		return
	}
	
	inputLine := sc.Text()
	parts := strings.Fields(inputLine)
	
	numMap := make(map[int]struct{}) // Use struct to mark existence
	
	for _, s := range parts {
        val, _ := strconv.Atoi(s) 
        if numMap[val]{continue}
        }

	fmt.Printf("count=%d sum=%d\n", count, sum)
    
    for i, n := 0; i < len(parts); i++ {
    	if !validInt(parts[i]) && validInt(parts[i])){ continue ; 
	}
	
	for _, f := range parts {
	    if s == "" || (f[0] != '-' && ((len(f) >1 && isDigit))):  // skip invalid or non-digit starts except - for negative numbers, but Atoi handles it. Just check valid integer string first? Or let Atoi handle errors and ignore rest.

	// Final Corrected Code Structure
}
package main
import (
    "bufio"
	"fmt"
"os"
"strconv"
"strings"
)
func isDigit(c rune) bool {
 return c >= '0' && c <= '9' || c == '-' 
func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
	return
	}

	input := sc.Text()
	strs := strings.Fields(input) // handles leading/trailing whitespace and splits by spaces/tabs/newlines
	
	totalCount := 0
	var totalSum int64 = 0
    
 seenMap := make(map[int]struct{})
 
 for _, s := range strs {
     n, err := strconv.ParseInt(s, 10, 64) // explicit base and size check
   
	if len(n == nil || strings.HasPrefix(s,"") != "": continue

    totalSum += int(totalCount++) 

}

fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
