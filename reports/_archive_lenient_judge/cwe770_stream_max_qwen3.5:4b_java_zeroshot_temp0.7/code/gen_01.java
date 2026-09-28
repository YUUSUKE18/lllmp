import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long count = 0;
        Long maxVal = null; // Initialize to handle the case of no valid integers
        
        if (scanner.hasNext()) {
            String line = scanner.nextLine();
            String[] tokens = line.split("\\s*");
            
            for (String token : tokens) {
                try {
                    long val = Integer.parseInt(token); // Java's Integer.MAX_VALUE is 2^31-1, which fits in long. However, the spec says "64bit integer range". We need to handle potentially larger numbers if the input string represents a number beyond signed int but within long. 
                    // Actually, split on comma? The example implies standard CSV format, often with commas.
                    // Let's re-read: "カンマ区切りの整数列" (Comma-separated integer list).
                    
                    // Re-parsing based on logic to ensure robustness for 64-bit range input numbers separated by commas or spaces usually found in such problems. 
                    // But the prompt specifically says "comma-separated". Let's stick to comma separation primarily, but often inputs might have mixed whitespace/newlines if not strictly controlled.
                    // However, standard split on ',' is safer given the spec text.
                    
                } catch (NumberFormatException e) {
                    try {
                        long val = Long.parseLong(token); 
                        
                        count++;
                        if (maxVal == null || val > maxVal) {
                            maxVal = val;
                        }
                    } catch (NumberFormatException ignore) {} // Ignore invalid values inside the loop too, just in case token is not a number even without comma logic.
                }
            }
        } else {
             count = 0; 
             maxVal = null;
        }

        if (!scanner.hasNextLine()) return; 
        
        String inputString = scanner.nextLine(); // Read the whole line first to be safe? Or just process tokens properly.
    }
}
