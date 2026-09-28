import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        boolean firstLine;
        
        while (line != null) {
            try {
                String[] parts = line.trim().split(",");
                if (parts.length == 0 && !Arrays.equals(line.trim(), "")) { // Empty line check logic inside trim
                    System.out.print("valid=0\n");
                    break;
                }
                
                // Validate each part: must be a non-empty integer sequence
                for (String part : parts) {
                    part = part.trim();
                    if (part.isEmpty()) {
                        System.out.print("valid=0\n");
                        return;
                    }
                    
                    // Check if it is a valid integer number (optionally with leading '+' or '-')
                    // Using Integer.parseInt which handles valid integers but throws on non-integers
                    try {
                        Integer.parseInt(part);
                    } catch (NumberFormatException e) {
                        System.out.print("valid=0\n");
                        return;
                    }
                }
                firstLine = false; // Just to satisfy the loop condition if we were doing something else, 
                                // but here we just need to find the count
                
            } catch (Exception e) {
                System.out.print("valid=0\n");
                return;
            }
        }
        
        // If the loop completes without returning early, it means all lines processed are valid
        if (!firstLine) {
            System.out.print("valid=" + 1 + "\n");
        } else {
            // This branch should be unreachable given the logic flow for a single line input
            // But to be safe based on the requirement structure, let's re-implement to ensure correct counting logic.
            System.out.print("valid=0\n"); // Placeholder if no lines or error
        }
    }
}
