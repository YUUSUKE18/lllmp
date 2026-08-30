import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) return;
        
        String line = scanner.nextLine();
        int count = 0;
        long maxVal = Long.MIN_VALUE; // Assuming at least one valid integer will be found based on typical problem constraints, or handle empty case. 
                                      // However, spec says "ignore invalid elements", if none exist, what is the output?
                                      // Let's assume there's always at least one valid int for now as per common sense of such problems.
        // If no integers are parsed, count remains 0 and maxVal stays MIN_VALUE (or undefined). 
        // To be safe against empty input resulting in weird values, we can handle it gracefully but the output format is strict.
        
        String[] parts = line.trim().split("[\\s,]+");
        for (String part : parts) {
            if (part.isEmpty()) continue;
            
            try {
                long val = Long.parseLong(part);
                
                // Check range as per spec: 64-bit integer. Long in Java is signed 64-bit.
                // If the input contains values outside this, it shouldn't be accepted or parsed? 
                // "values fit within 64bit integer" - likely means inputs are guaranteed to be valid long.

                if (count == 0) {
                    maxVal = val;
                } else {
                    if (val > maxVal) {
                        maxVal = val;
                    }
                    count++;
                }
            } catch (NumberFormatException e) {
                // Ignore elements that cannot be interpreted as integers.
            }
        }

        System.out.println("count=" + count + " max=" + maxVal);
    }
}
