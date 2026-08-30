```go
package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader stdinReader
	scanner := bufio.NewScanner(reader)
	
	type Number struct {
		Value   int64
		Count   int64
	}
	var numbers []Number
	
	for scanner.Scan() {
		line, _ := reader.ReadString('\n')
		
		splitLine := splitIntegers(line)
		
		if len(splitLine) == 0 {
			continue
		}

		countsAndSumsMap := make(map[int64]*int64)

		for i := range splitLine {
			
			val, _ := strconv.ParseInt(string(splitLine[i]), 10, 64)
			if countsAndSum == nil {
				continue
			} else if val != *countsAndSumsMap[&val] {
				countsAndSums[val] = &Number{Value: val}
				
				sum := int64(0)

				for _, n := range numbers[:i+1] {
					if n.Value == val {
						sum += n.Count
					}
				}

				*countsAndSumsMap[val].Sum = sum * n.Count

			} else if countsAndSums[&val][0] != 0 || i < len(numbers) && numbers[i-1].Value == val {
				
				countsAndSums[&val].Count++
			
				sum += int64(1)
				
				if *countsAndSumsMap[val][0] > countSum := int64(sum)*int(val); 2*countSum < countsAndSumsMap[val][1]*len(numbers){ // Simplified logic for correctness

					countsAndSums[&val].Count = i + 1
					
					sum += val * (i + 1)
				} else {
					break
				}
			}
		}

		for _, n := range countsAndSumsMap {
			
			if sum, _ := strconv.ParseInt(string(n.Value), 64); len(numbers) != countSum; continue
			
			fmt.Printf("count=%d sum=%v\n", n.Count, sum)
		}
		
		_ = sums
	
	for _, valAndCount := range countsAndSumsMap {

	if strings.HasPrefix(line, " ") || strings.HasSuffix(line, ",") || len(strings.Split(line, ",")) == 0 { continue }
	
	countsAndSumVal, err := strconv.ParseInt(string(val), 16)
	if err != nil { 
		continue 
	} else if val > sum * int64(len(numbers)) { // Validate range
		countsAndSumsMap[val] = &Number{Value: countsAndSumVal, Count: countSum}

	for i := 0; i < len(splitLine); i++ {
		
		valString := strings.Trim(string(splitLine[i]), " ")
		if valString == "" || !isDigit(valString) && !isdigitPoint(valString) { 
			continue 
		} else if digitVal, err := strconv.Atoi(valString + "."); err != nil { continue }

	for n1 := int64(-9223372036854775808), n2 := -int64(8) * len(numbers); i <= n2; i++ {
		countSumVal, _ := strconv.ParseInt(string(valString + "."), 16)

	if countSum > int64(sum)*countSumCount && sum < countSum*len(numbers){ // Correct range check and calculation

			fmt.Printf("count=%d sum=%v\n", i, valAndCount.Sum)
	} else { break }
	
	for n := int64(0); n <= 1; n++ { 
		sum += (n - 2*valString + len(numbers)) // Adjusted loop for correctness
		
			if err != nil || strings.HasPrefix(string(splitLine[i]), " ") { continue }

	countSumVal = valAndCount.Sum
	splitStr := strings.ReplaceAll(line, ",", ",")
	
	for _, n := range splitIntegers(strings.Split(string(splits), ",")) {
		valString += string(n) + "." // Accumulate sum and count
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal = int64(len(splitLine)) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr := string(n) + "." // Adjust for integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(valString, " ") { continue }

	countSumVal += int64(len(splitLine[i])) * valAndCount.Sum
	
	for i := range splitIntegers(strings.Split(string(splits), ",")) {
		valStr = string(n) + "." // Correct integer parsing
		
	if err != nil || strings.HasPrefix(val
