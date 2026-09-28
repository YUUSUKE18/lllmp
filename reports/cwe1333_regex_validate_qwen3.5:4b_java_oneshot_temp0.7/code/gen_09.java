```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            if (trim(line).isEmpty()) {
                continue;
            }
            
            String trimmedLine = trim(line);
            StringTokenizer st = new StringTokenizer(trimmedLine, ",");
            
            boolean isValid = false;
            int count = 0;
            
            while (st.hasMoreTokens()) {
                String token = st.nextToken().trim();
                if (token.isEmpty()) {
                    break;
                }
                try {
                    Integer.parseInt(token);
                    count++;
                } catch (NumberFormatException e) {
                    isValid = false;
                    break;
                }
            }
            
            if (count > 0 && !st.hasMoreTokens() && !isValid) {
                validCount++;
            } else if (count > 0) {
                // Check if there are trailing tokens that are not empty after last valid number
                // But wait, the logic above is slightly flawed. Let's re-evaluate based on the tokenizer behavior.
                // If we have "1,2," -> st will have "1", "2", "". The loop breaks on empty string. count=2. isValid remains true? No.
                // We need to ensure no extra non-integer tokens exist and the line is purely comma-separated integers.
                // Actually, StringTokenizer with default delimiters might include trailing empty strings if present in source? 
                // No, by default it doesn't. But we are using custom delimiter ",".
                // Let's re-implement carefully.
                
                // Re-logic:
                // 1. Trim line.
                // 2. Split by comma.
                // 3. If split result length is 0 -> invalid (empty line handled above).
                // 4. Iterate parts. If part is empty -> invalid? Or just ignore leading/trailing?
                // Spec says: "末尾のカンマは許容します" (Trailing comma allowed). 
                // Spec says: "数字とカンマ以外を含む行は妥当ではありません" (Any char except digit and comma makes it invalid).
                // So "1,2," is valid. "1,,2" is invalid? Or maybe not? Usually "1,,2" implies empty string between commas which isn't a number.
                // Let's assume strict parsing: split by comma, each part must be a non-empty integer.
                // Wait, "末尾のカンマは許容します" suggests "1," is valid.
                // What about ",1"? Leading comma? Spec doesn't explicitly forbid but says "数字列がカンマで区切られて並んでいる".
                // Usually implies sequence of numbers separated by commas.
                // Let's stick to: split by comma, trim each part, check if it's an integer. If part is empty -> invalid (unless it's just trailing comma which results in empty last part).
                
                // Better approach: Remove all commas first? No.
                // Approach: Use a loop to find commas and parse numbers between them.
                // Or simply split, then validate each token. But splitting "1,,2" gives ["1", "", "2"]. "" is not integer.
                // Splitting "1," gives ["1", ""]. "" is not integer.
                // So we need to allow empty string only if it's the result of a trailing comma? 
                // Actually, if we split "1,,2" -> ["1", "", "2"]. Middle empty is bad.
                // If we split "1," -> ["1", ""]. Last empty is allowed (trailing comma).
                // What about ",1"? Split gives ["", "1"]. First empty? Is it allowed? 
                // Spec: "数字列がカンマで区切られて並んでいる". Leading comma means no number before first comma. Probably invalid.
                
                // Let's implement robust check:
                // 1. Replace all commas with a marker? No.
                // 2. Iterate chars. If digit -> parse, if comma -> expect next digit or end.
                
                // Simple regex approach for validation: ^[\d]+(?:,[\d]+)*$
                // But we need to handle trailing comma specifically? 
                // If "1," is valid, then regex should allow optional trailing comma? 
                // Regex: ^[\d]+(?:,[\d]+)*(?:,$)? -> This allows trailing comma.
                // Does it allow ",1"? No.
                // Does it allow "1,,2"? No (because after first number, next must be digit or end/comma-end).
                // Wait, regex `^[\d]+(?:,[\d]+)*$` matches "1,"? 
                // 1 matches [\d]+. Then (?:,[\d]+)* matches nothing. Yes.
                // What about "1," with regex `^[\d]+(?:,$)?$` -> No, that's complex.
                
                // Let's use a manual check to be safe and clear.
                boolean hasNonDigitComma = false;
                int start = 0;
                while (true) {
                    int end = trimmedLine.indexOf(',', start);
                    if (end == -1) {
                        // No more comma, rest must be digits
                        int lastEnd = trimmedLine.length();
                        String numStr = trimmedLine.substring(start, lastEnd).trim();
                        try {
                            Integer.parseInt(numStr);
                        } catch (NumberFormatException e) {
                            isValid = false; break;
                        }
                        start = lastEnd + 1;
                    } else {
                        int numEnd = end;
                        // Check if there are non-digits before the comma
                        String numStr = trimmedLine.substring(start, numEnd).trim();
                        try {
                            Integer.parseInt(numStr);
                        } catch (NumberFormatException e) {
                            isValid = false; break;
                        }
                        // Move start to after comma
                        start = numEnd + 1;
                    }
                }
                
                // Now check if there are any extra chars outside the numbers and commas?
                // The loop above checks digits. But what if "1,a"? 
                // First part "1" -> ok. Next is ','? No, next is 'a'.
                // In my logic: start=0, end=-1 (no comma). substring(0, len) = "1,a". parseInt fails. isValid=false. Correct.
                
                // What if ",1"?
                // start=0, end=-1. substring(0, len)=" ,1". trim -> ",1". parseInt fails. Correct.
                
                // What if "1,,2"?
                // 1. start=0. findComma -> index 1. substring(0,1)="1". OK. start=2.
                // 2. start=2. findComma -> index 3. substring(2,3)=""? No, substring(2,3) is empty string. 
                //    trim("") -> "". parseInt("") fails. Correct.
                
                // So logic seems sound for "1,,2" -> invalid.
                // For "1," -> start=0, findComma=1. substring="1". OK. start=2. Loop again. end=-1. 
                // substring(2, 3)=""? No, length is 2. substring(2, 2)="". trim="" -> parseInt fails. 
                // Wait, "1," -> len=2. 
                // Iteration 1: start=0. findComma=1. substring(0,1)="1". OK. start=2.
                // Iteration 2: start=2. findComma=-1. lastEnd=2. substring(2,2)="" -> parseInt fails. 
                // So "1," becomes invalid? But spec says "末尾のカンマは許容します".
                // My logic treats trailing empty string as error.
                
                // Fix: After loop, if start == length, we are at end.
                // If the last part was just a comma (i.e., substring was empty), it's allowed.
                // So check: if (isValid && count > 0) and (last segment was empty due to trailing comma)?
                // How to detect? 
                // In iteration where no comma found, the substring is from start to end.
                // If that substring is empty -> invalid? Unless it's just a trailing comma scenario?
                // Actually, if "1,", after first part "1", remaining is "". 
                // We shouldn't fail on empty remaining if it came from a comma.
                
                // Revised logic:
                // Replace all commas with something? No.
                // Just use split but handle empty strings carefully.
                // String[] parts = trimmedLine.split(",");
                // For "1," -> ["1", ""]. 
                // For ",1" -> ["", "1"].
                // For "1,,2" -> ["1", "", "2"].
                
                // Logic:
                // 1. If parts.length == 0 -> invalid (empty line).
                // 2. Iterate i from 0 to parts.length-1.
                //    String p = parts[i].trim();
                //    if (p.isEmpty()) {
                //       // Empty part found. Is it allowed?
                //       // Only trailing comma is allowed -> corresponds to last element being empty?
                //       // Or leading/trailing whitespace around numbers? We trimmed already.
                //       // If any internal empty -> invalid.
                //       if (i < parts.length - 1) {
                //           isValid = false; break;
                //       } else {
                //           // Last element is empty. Allowed if it's just a trailing comma case.
                //           // But what if multiple trailing commas? "1,,," -> ["1", "", "", ""].
                //           // Spec says "末尾のカンマは許容します" (plural?). Usually implies one or any number of trailing? 
                //           // Likely means "trailing comma" as in "1,". But "1,," might be invalid.
                //           // Let's assume only one trailing comma is acceptable for simplicity unless specified otherwise.
                //           // Actually, if I allow any number of trailing commas, then all empty strings at end are OK.
                //           // But what about leading? i=0 empty -> invalid.
                //       }
                //    } else {
                //       try { Integer.parseInt(p); } catch ... { isValid=false; break; }
                //    }
                
                // Let's refine: 
                // "1," -> ["1", ""]. i=0: "1" OK. i=1: "" -> last element -> OK.
                // ",1" -> ["", "1"]. i=0: "" -> not last -> invalid.
                // "1,,2" -> ["1", "", "2"]. i=1: "" -> not last -> invalid.
                // "1,," -> ["1", "", ""]. i=1: "" -> not last? Wait, length 3. i=1 is middle. i=2 is last.
                // So "1,," -> i=0 OK. i=1 (middle empty) -> invalid. i=2 (last empty) -> OK.
                // This seems consistent with "only trailing comma allowed" (singular or multiple?). 
                // If multiple commas at end, e.g. "1,," -> is it valid? Probably not strict "trailing comma". 
                // But if we interpret as "no internal empty strings", then "1,," has internal empty string at index 1.
                // So my logic holds: only the LAST element can be empty.
                
                // Wait, split behavior: "1,".split(",") -> ["1", ""]. 
                // ",1".split(",") -> ["", "1"]. 
                // "1,,2".split(",") -> ["1", "", "2"]. 
                // "1,,".split(",") -> ["1", "", ""].
                
                // So:
                // Loop i from 0 to len-1.
                // If p is empty:
                //   If i == len-1 -> valid (trailing comma).
                //   Else -> invalid (internal or leading empty).
                // Else try parse int.
                
                // One edge case: " ". trim() -> "". Handled by initial check.
                // " 1 , 2 ". trim() -> "1, 2". Split "," -> ["1", " 2"]. 
                // Wait, split on comma only. "1, 2" -> ["1", " 2"]. 
                // Trim each part? Yes. " 2".trim() -> "2". OK.
                // So spec says "行の前後の空白は無視します" (Ignore whitespace at line start/end).
                // Does it ignore whitespace inside numbers? Like "1 , 2"? 
                // Spec: "数字とカンマ以外を含む行は妥当ではありません". Space is not digit or comma.
                // So "1 , 2" has spaces -> invalid.
                // My split logic: "1 , 2".split(",") -> ["1 ", " 2"]. 
                // Trim parts: "1", "2". Parse OK.
                // BUT spec says "数字とカンマ以外を含む行は妥当ではありません".
                // Space is not digit or comma. So "1 , 2" should be invalid.
                // My current logic would make it valid because I trim the parts.
                // Correction: Do NOT trim the parts before parsing, OR check if part contains non-digit/non-comma chars?
                // Wait, if I trim the part, I am removing spaces. 
                // If original part is " 2", it contains space. Space is not digit/comma.
                // So I should NOT trim the individual tokens unless the spec allows it.
                // Spec: "行の前後の空白は無視します" -> Only line start/end. Not inside numbers/commas.
                // So "1 , 2" has space between '1' and ','? No, "1 , 2". 
                // Characters: '1', ' ', ',', ' ', '2'.
                // Space is not digit or comma. So invalid.
                // Therefore, I should NOT trim the parts obtained from split.
                // Instead, validate each part strictly: must be digits only (no spaces).
                // Exception: trailing empty string? 
                // Part " 2" contains space. Invalid.
                
                // Revised plan:
                // 1. Trim line. If empty -> invalid (or skip if empty line allowed to count as 0 valid?). Spec: "空行...妥当ではありません". So empty lines are invalid. But we skip processing? 
                //    Wait, "空行...妥当ではありません" means it's NOT valid. We should not count it as valid.
                //    My code skips empty lines (continue). That counts them as processed but not valid. Correct.
                // 2. Split by comma.
                // 3. For each part:
                //    If part is empty: only allowed if it's the last part (trailing comma).
                //    Else: check if part contains ONLY digits. If not -> invalid.
                //    Then parse int.
                
                // Example "1 , 2": parts ["1 ", " 2"]. 
                // i=0: "1 " -> contains space -> invalid. Correct.
                // Example "1,2": parts ["1", "2"]. OK.
                // Example "1,": parts ["1", ""]. i=0 OK. i=1 empty -> last -> OK.
                // Example ",1": parts ["", "1"]. i=0 empty -> not last -> invalid. Correct.
                
                // One detail: split might produce empty strings if multiple commas? 
                // "1,,2" -> ["1", "", "2"]. i=1 "" -> not last -> invalid. Correct.
                
                // So logic:
                // String[] parts = trimmedLine.split(",");
                // int count = 0;
                // boolean ok = true;
                // for (int i=0; i
