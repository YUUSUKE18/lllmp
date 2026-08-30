import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (!scanner.hasNextLine()) return;
        
        String line = scanner.nextLine();
        String[] parts = line.split(",");
        
        long count = 0;
        Long maxValue = null; // Using Long to handle potential max value
        
        for (String part : parts) {
            part = part.trim();
            
            if (!part.isEmpty()) {
                try {
                    int parsedValue = Integer.parseInt(part);
                    
                    // Check range constraint: 64-bit integer. 
                    // Since the input is specified as "integer", we assume it fits in long, but parseInt returns int/long depending on context.
                    // The problem says values fit within 64-bit integers. Standard Java Scanner.nextLong() handles this directly without overflow for valid inputs.
                    
                    if (maxValue == null || parsedValue > maxValue) {
                        maxValue = parsedValue; 
                    }
                } catch (NumberFormatException e) {
                    // Ignore non-integer elements as per spec: "整数として解釈できない要素も無視します"
                }
            } else {
                continue; // Skip empty parts from splitting or trimming edge cases if any logic missed, though trim() + isEmpty handles most.
                        // However, split(",") on a string with just spaces might result in an element that is all whitespace? 
                        // Let's re-verify: "空要素・前後の空白は無視し" -> This usually means empty strings or whitespace-only tokens are ignored.
                continue;
            }
            
        }

        if (maxValue == null) {
           count = 0; // If no valid integers found, max is effectively undefined/null but spec asks for output. 
                      // Usually "count" would be the number of elements *if* they exist? Or total lines read?
                      // Spec: "それらの『要素数』と『最大値』を求めます。" -> Implies counting valid integers found, or just reading count from input string length?
                      // Re-reading spec carefully: 
                      // "標準入力から、カンマ区切りの整数列を受け取ります。" + "空要素・前後の空白は無視し".
                      // This implies we are parsing a sequence. So 'count' is the number of valid integers parsed.
           maxValue = null;
        } else {
            count++; // Wait, why did I increment inside? No, my previous logic looped incorrectly or was just placeholder in thought process above. 
                    // Correct Logic: Iterate through all parts found by split. Count how many are *valid* integers. Track max of those valid ones.
        }

        // Let's rewrite the counting and max finding clearly below before outputting.
        
    }
    
    public static void main2(String[] args) { 
       Scanner scanner = new java.util.Scanner(System.in);
       
       if (!scanner.hasNextLine()) return;
       
       String line = scanner.nextLine();
       // Handle potential leading/trailing spaces around the whole string? Spec says "前後の空白は無視し" - likely refers to elements inside, but good practice.
       // But split(",") on " 1 ,2 ," gives empty strings at ends if not trimmed carefully or handled. 
       
       String[] tokens = line.split(",");
       int countValidTokens = 0;
       long maxVal = Long.MIN_VALUE; // Assuming values are >= MIN_LONG? Or just track first valid one.
       boolean hasValue = false;

       for (String token : tokens) {
           if (!token.isEmpty()) { 
               String trimmedToken = token.trim();
               
               try {
                   long value = Long.parseLong(trimmedToken); // Using parseLong to ensure 64-bit safety even though parseInt might suffice, but spec says "integer" usually implies int. But it also says values fit in 64bit integer (long). So use Long.
                   
                   countValidTokens++; 
                   if (!hasValue || value > maxVal) {
                       maxVal = value;
                       hasValue = true;
                   }
               } catch (NumberFormatException e) {
                   // Ignore non-integers
               }
           } else {
               continue;
           }
       }

       System.out.println("count=" + countValidTokens + " max=" + (hasValue ? String.valueOf(maxVal) : 0)); 
    }
}
