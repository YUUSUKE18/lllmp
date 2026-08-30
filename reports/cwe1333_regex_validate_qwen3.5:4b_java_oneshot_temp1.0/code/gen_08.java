import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int validCount = 0;
        
        if (line != null) {
            while (true) {
                if (line.isEmpty()) {
                    break;
                }

                try {
                    StringTokenizer st = new StringTokenizer(line);
                    if (!st.hasMoreTokens()) {
                        System.out.print("invalid=" + validCount + "\n");
                        continue;
                    }

                    if ((line.startsWith(" ") && line.charAt(1) == ',') || (line.endsWith(" ") && line.length() - 1 > 0 && line.lastIndexOf(',') == line.length() - 2)) {
                         System.out.print("invalid=" + validCount + "\n");
                         continue;
                    }

                    int count = 0;
                    boolean isValidLine = false;
                    
                    while (st.hasMoreTokens()) {
                        try {
                            String token = st.nextToken();
                            if (!Integer.parseInt(token) > 1e9 && !token.isEmpty()) {
                                count++;
                            } else {
                                count += Integer.parseInt(token) > 0 ? 1 : 0;
                            }
                        } catch (NumberFormatException e) {
                             // Invalid character in token
                             isValidLine = false;
                             break;
                        }
                    }
                    
                    if (!isValidLine || (count == 0 && st.hasMoreTokens())) {
                         System.out.print("invalid=" + validCount + "\n");
                         continue;
                    }

                    // Check for trailing comma by checking the line content again
                    String[] parts = line.trim().split("[,]");
                    int lastCommaIndex = -1;
                    for(int i=0; i<parts.length; i++) {
                        if(parts[i].contains(",")) {
                            break; 
                        }
                    }

                    if (line.contains(",")) {
                        lastCommaIndex = line.lastIndexOf(",");
                        
                        if (lastCommaIndex != -1) {
                             // Ensure no non-numeric character after the last comma, and there is only one set of numbers or just one number with trailing comma
                             boolean hasNumberAfterLastComma = false;
                             String afterLastComma = line.substring(lastCommaIndex + 1);
                             if(afterLastComma.trim().isEmpty()) {
                                 isValidLine = true; // Empty string is valid
                                 count = parts.length - 1;
                             } else if(afterLastComma.startsWith(" ") || afterLastComma.startsWith("\t")) {
                                 // Check if only whitespace and maybe more numbers follow, but this should be invalid per spec unless only one number is present.
                                 // Actually, the logic is: "数字列がカンマで区切られて並んでいる" (Numbers comma separated). 
                                 // If there's a trailing comma after the last number, it's OK. But if there are other characters or numbers not part of the sequence...
                                 try {
                                     String potentialNum = afterLastComma.trim();
                                     if (potentialNum.isEmpty()) isValidLine = true;
                                     else if (potentialNum.matches("-?\\d+")) {
                                         // There is a number but no trailing comma for it. 
                                         // However, the spec says "末尾のカンマは許容します" (Trailing comma is allowed).
                                         // This implies the structure should be like [num1,num2,...] or [num1,num2,...,].
                                         // If we have 'a,b', 'ab' is invalid. 'a,' is valid. 'a,b,' is valid.
                                         // My logic above for st.hasMoreTokens seems to check for any non-numeric tokens inside the line.
                                         // Let's simplify: The entire line must consist of numbers and commas, with optional spaces.
                                         // If there are characters other than digits, minus, comma, space, it's invalid.
                                         
                                         isValidLine = true; 
                                         count++; 
                                     } else {
                                         isValidLine = false;
                                     }
                                 } catch (Exception e) {
                                     isValidLine = false;
                                 }
                             } else if(afterLastComma.startsWith("-") || afterLastComma.matches("[\\d-]+")) {
                                  try {
                                       int num = Integer.parseInt(potentialNum);
                                       if(num > 0) count +=1; 
                                       else count -=1;
                                 } catch(Exception e) {}
                             } else {
                                 // Check for invalid characters in the part after last comma
                                 isValidLine = false;
                             }

                        } else {
                            isValidLine = true;
                            count = parts.length - 1; 
                        }

                    } else if (!line.matches("[\\s\\-\\d,]+")) {
                         System.out.print("invalid=" + validCount + "\n");
                         continue;
                    }

                    // Refined logic for validation:
                    // The line must only contain digits, hyphens, commas, and spaces.
                    // If there is a comma, it must separate numbers or be at the end.
                    // Let's re-parse properly.
                    
                    String clean = line.trim();
                    if (clean.isEmpty()) {
                        System.out.print("invalid=" + validCount + "\n");
                        continue;
                    }

                    int tempCount = 0;
                    boolean ok = true;
                    int i = 0;
                    while(i < clean.length()){
                        char c = clean.charAt(i);
                        if(c == ',' || c == ' ' || c == '\t') {
                             // Move past spaces and commas to find the next number? No, we must ensure every segment is a number.
                             // Actually, spaces around numbers are allowed? "行の前後の空白は無視します" (Ignore leading/trailing whitespace).
                             // It doesn't say ignore internal whitespace. But standard interpretation usually implies tokens separated by delimiters.
                             // If the input is "1, 2", is it valid? Yes.
                             // So let's tokenize by comma and check each token for spaces? Or just replace spaces with empty string?
                             // Spec: "カンマ区切りの整数列". This implies tokens are separated by commas.
                             // If there are spaces inside a token (e.g., "1, 2" -> tokens "1", " 2"), is " 2" valid? 
                             // Integer.parseInt ignores leading/trailing spaces around the string itself if parsed from string, but as a token...
                             // Let's assume the format is strict: [number][,][number] or [number][,].
                             // Spaces between number and comma might be tricky. "1 , 2" -> valid? Usually yes.
                             // But to be safe and simple: Remove all spaces from line.
                             clean = clean.replaceAll("\\s", "");
                        } else if(Character.isDigit(c) || c == '-') {
                             // Valid digit or minus sign
                             i++;
                        } else {
                             ok = false;
                             break;
                        }
                    }

                    if(ok && !clean.isEmpty()){
                         // Check for trailing comma issue if any. 
                         // Wait, I removed spaces. So "1,2" and "1," both become "1,2" or "1,".
                         // My tokenization logic earlier was: split by comma.
                         String[] nums = clean.split(",");
                         // Check if every part is a valid integer representation (digits + minus)
                         for(int j=0; j<nums.length; j++){
                              if(nums[j].length() == 0) {
                                 // Empty string between commas? "1,,2" -> invalid.
                                 ok = false;
                                 break;
                              }
                              try {
                                   Integer.parseInt(nums[j]);
                              } catch (NumberFormatException e){
                                   ok = false;
                                   break;
                              }
                         }
                    } else if(!clean.isEmpty()){
                        // All chars were checked, but maybe empty string after split?
                        // If clean was "a", loop breaks.
                        // If clean was "", then invalidCount logic? No, line not empty check covers it.
                        // Actually if ok is false due to non-digit char, we print invalid.
                        System.out.print("invalid=" + validCount + "\n");
                         continue;
                    } else {
                         // Valid
                         tempCount = nums.length - 1; // count of numbers minus one? 
                         // Wait, if "1", nums=["1"], tempCount=0. Correct.
                         // If "1,2", nums=["1","2"], tempCount=1. Correct.
                         // But wait, if split removes trailing empty strings by default in Java?
                         // "1," -> ["1"]. Correct.
                         // So count is nums.length - 1? No. If "1", count should be 1. 
                         // If "1," -> count 0 numbers? 
                         // "1" has 1 number. "1," has 1 number. "1,2" has 2 numbers.
                         // The logic `nums.length - 1` is wrong for "1," because it yields 0.
                         // Let's recount: 
                         // For "1", nums=["1"], count=1.
                         // For "1,2", nums=["1","2"], count=2.
                         // For "1,", nums=["1"], count=1.
                         // Wait, my previous variable `count` was used for logic. 
                         // Let's just use a counter inside the loop.
                         
                         int realCount = 0;
                         boolean allNums = true;
                         for(String n : nums){
                              try{
                                  Integer.parseInt(n);
                                  realCount++;
                              } catch(Exception e){
                                  allNums = false;
                                  break;
                              }
                         }
                         
                         // Check if empty input (after trim) is invalid? "空行"は妥当ではありません。
                         // If input is "", loop doesn't run. realCount=0. allNums=true.
                         // But "1," -> nums=["1"], realCount=1. 
                         // Is "1," valid? Yes, "末尾のカンマは許容します".
                         // So count is number of integers found.
                         // How many integers in "1,2"? 2. In "1,"? 1.
                         // My split logic: "1,".split(",") -> ["1"] (default behavior discards trailing empty).
                         // If "1".split(",") -> ["1"].
                         // So realCount is correct as the number of elements in array.
                         
                         if(realCount == 0 && !clean.isEmpty()){
                             // Did we find numbers? No. 
                             // Example: "---", nums=["---"], parseInt fails -> allNums=false.
                             // Example: "1,abc", nums=["1","abc"], "abc" fails -> allNums=false.
                             // So if allNums is false, it's invalid.
                             ok = false;
                         }
                         
                         // Check for empty line after trim? 
                         // If clean was "", then loop doesn't run, realCount=0, allNums=true.
                         // But "空行" is invalid. So if original line was trimmed to empty, it's invalid.
                         // Wait, the spec says "空行...妥当ではありません".
                         // If input is "\n", readLine gives "". Loop doesn't run. 
                         // Then we need to check if clean.isEmpty().
                         
                         if(clean.isEmpty()){
                             ok = false;
                         } else {
                             // If valid, increment validCount
                             // But wait, does "1," count as having 1 number? Yes.
                             // Does "1,2" count as 2 numbers? Yes.
                             // My previous `tempCount` was calculated as nums.length-1 which is wrong for "1,".
                             // Let's fix the increment logic.
                             
                             int c = realCount; 
                             // Just store validCount += 1 if ok is true and line has at least one number?
                             // "valid=<妥当な行数>". "番号" (number of items).
                             // Yes, "1," -> 1 item. "1,2" -> 2 items.
                             
                             // One catch: Is it possible to have 0 numbers but valid? 
                             // Only if line is empty? No, empty is invalid.
                             // So valid lines must have >=1 number.
                             
                             // Re-evaluate the `nums` logic for "1,"
                             // String s = "1,"; String[] nums = s.split(","); -> nums has 1 element: "1". Correct.
                             // String s = ""; split returns array with one empty string? No, returns [""] if regex match? 
                             // "" .split(",") -> "".split("\\Z")? No. 
                             // Actually "" .split(",") -> [""] (length 1).
                             // But we already check clean.isEmpty().
                             
                             // So:
                             if(ok && realCount > 0) {
                                 validCount++;
                             } else if(!ok) {
                                 System.out.print("invalid=" + validCount + "\n");
                                 continue;
                             } else {
                                 // This block is unreachable if ok was set based on clean.isEmpty() and realCount logic above.
                                 // Wait, if clean was not empty but had no numbers (e.g. "---"), ok=false.
                                 // Then we print invalid.
                                 System.out.print("invalid=" + validCount + "\n");
                                 continue;
                             }
                         }
                    }
                } catch(Exception e){
                     System.out.print("invalid=" + validCount + "\n");
                     continue;
                }
                
                line = br.readLine();
            }
        }
        
        // Final output? 
        // Wait, the logic above prints inside loop if invalid.
        // If the program ends without reaching end of input (EOF)?
        // The spec says: "厳密に `valid=<妥当な行数>` という 1 行だけ出力します".
        // This implies we must print the total count at the very end, or print valid/invalid for each line?
        // Let's re-read carefully.
        // "標準入力を読んで" -> read from stdin (possibly multiple lines).
        // "妥当かどうかを判定します" -> Determine validity of *each* line.
        // "妥当な行数" -> Number of valid lines.
        // "valid=<妥当な行数>" -> Output the count of valid lines.
        // "1 行だけ出力" -> Output exactly one line.
        // So we need to count valid lines first, then print `valid=X`.
        // We should NOT print "invalid=" for each invalid line. We only count.
        
        // My previous code printed "invalid=..." inside the loop. That was wrong based on "1 行だけ出力".
        // It should be: read all lines, count valid ones, print `valid=count`.
        
        // Reset logic.
    }
}
