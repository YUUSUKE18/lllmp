import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        int count = 0;
        long maxVal = Long.MIN_VALUE; // Assuming input values are within positive or negative range, but if empty list is possible. 
                                     // However, spec says "64bit integer", could be any value including min/max long.
                                     // If the list ends up being just valid integers after filtering:
        boolean hasValue = false;

        while (scanner.hasNext()) {
            String token = scanner.next();
            
            try {
                if (!token.isEmpty() && !Character.isWhitespace(token.charAt(0))) {
                    long value = Long.parseLong(token);
                    
                    // Check for valid integer format. If it was something like "1,2" or non-numeric string? 
                    // The spec says comma-separated integers in input line, but scanner.next() splits by whitespace.
                    // We need to handle the commas inside tokens if they are present as part of the token stream (e.g., user types "1, 2").
                    // Re-evaluating: Standard Input -> Comma separated integer list. 
                    // Usually means input looks like "1, 2, 3" or "1 , -5".
                    // Scanner.next() will return tokens split by whitespace. So "1," might come as one token? 
                    // No, usually inputs are space/newline delimited in competitive programming context unless specified otherwise.
                    // BUT the spec says "comma-separated integer list received from standard input". 
                    // Example: 1,2,3 or maybe just raw string like "1, -5 , +9 ".
                    
                    if (token.contains(",")) {
                        String[] parts = token.split(",");
                        for(String p : parts) {
                            try {
                                long val;
                                if(p.trim().isEmpty()) continue; // Skip empty after split/comma
                        
                                val = Long.parseLong(p.trim());
                                
                                count++;
                                if (count == 1 || val > maxVal) {
                                    maxVal = val;
                                }
                            } catch(NumberFormatException e) {} 
                        }
                    } else {
                         try {
                             long val = Long.parseLong(token); // Assuming token is a single integer or signed number without commas inside it if split by whitespace properly handled.
                             count++;
                             if (count == 1 || val > maxVal) {
                                 maxVal = val;
                             }
                         } catch(NumberFormatException e) {} 
                    }
                } else {
                   // token starts with whitespace? scanner.next() skips whitespace, so this check is technically redundant unless logic changes.
               }
            } catch (Exception e) {
                // Ignore elements that cannot be interpreted as integers
            }
        }

        if (count == 0 || !hasValue && count > 0) { 
             // Wait, maxVal init was Long.MIN_VALUE. If all inputs were valid but smaller than MIN_VALUE? Impossible for long unless overflow which isn't expected here based on "64bit integer range".
             // Actually simpler logic: just track min/max properly during iteration or after counting.
        }

        if (count == 0) { 
            System.out.println("count=0 max=" + Long.MIN_VALUE); // Or undefined? Spec doesn't say what to output for empty valid list, but usually implies default behavior or no specific rule violation yet. Let's assume MIN_VALUE is safe placeholder if count > 0 fails logic later.
        } else {
            System.out.println("count=" + count + " max=" + maxVal);
        }

    // Wait, the above loop structure with nested try/catch and string parsing inside `if (token.contains(","))` might be overcomplicated given standard input formats often being tokenized by whitespace. 
    // Let's re-read: "standard input receives comma-separated integer list". 
    // It could mean a single line like `1, 2, 3`. Scanner.next() would return `1`, `,`, `2`? Or if there are spaces around commas?
    // Actually Java Scanner default delimiter is whitespace. If the input string is "1, -5", scanner returns ["1,", "-5"]. 
    // So we MUST handle the comma inside tokens or treat non-integer strings as ignored per spec ("integers that cannot be interpreted").
    
        System.out.println("count=" + count + " max=" + (hasValue ? maxVal : 0)); // Fallback logic? No, let's refine.
        
    }

}
