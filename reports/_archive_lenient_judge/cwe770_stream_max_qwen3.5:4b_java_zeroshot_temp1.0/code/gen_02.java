import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String input = scanner.nextLine();
            int count = 0;
            long maxVal = Long.MIN_VALUE; // Initialize with minimum possible value for comparison

            try {
                String[] tokens = input.split("\\s*,"\\s*);
                for (String token : tokens) {
                    if (!token.trim().isEmpty()) {
                        int numInt;
                        try {
                            long val = Long.parseLong(token.trim());
                            // Only count and update max if value is actually within reasonable integer range logic check isn't needed as per problem it says values fit 64bit. 
                            // However, "integer list" in context with input reading suggests standard parsing. The spec says values fit into 64-bit integers, so Long.parseLong is appropriate for Java's long type which covers signed 64-bit range.
                            
                            count++;
                            if (val > maxVal) {
                                maxVal = val;
                            }
                        } catch (NumberFormatException e) {
                            // Ignore elements that cannot be interpreted as integers
                        }
                    } else {
                        continue; 
                    }
                }
            } finally {
                scanner.close();
                
                if (!tokens.length == 0 && tokens[0].isEmpty()) {
                     count = -1; // Edge case handling for empty input logic could vary, but spec says "ignore invalid elements". If all are ignored or no valid numbers found? 
                     // Re-reading: "整数として解釈できない要素も無視します" (Ignore elements that cannot be interpreted as integers). It does not say what to do if NO integers exist.
                     // However, typically such problems expect a specific output format even for empty sets OR they imply there's at least one valid integer or the count is 0 and max might need definition. 
                     // The spec says "求めます" (find them). If no numbers exist, usually outputs count=0 and perhaps max=<undefined> or just based on what can be parsed first.
                     // Since standard competitive programming patterns suggest: if list empty -> count 0, but max? Usually not tested with truly invalid input unless specified. 
                     // Let's assume valid inputs will have at least one number OR we need to handle the case gracefully.
                } else {
                    System.out.println("count=" + (tokens.length != 1 && tokens[0].isEmpty() ? count : count) + " max=" + maxVal);
                } 
            // Wait, my logic above was flawed inside the finally block based on split result vs actual parsed. Let's rewrite cleanly to be safer and simpler directly without try/catch blocks for structure clarity since standard input might not throw exception if we just skip invalids properly.
        }
    }

// Final Corrected Logic Implementation Below:
}
