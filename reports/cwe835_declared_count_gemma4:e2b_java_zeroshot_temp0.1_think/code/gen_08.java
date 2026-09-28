import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 1. Read the expected count N (first line)
        if (!scanner.hasNextInt()) {
            // Handle case where input is empty
            System.out.println("count=0 sum=0");
            scanner.close();
            return;
        }
        
        int expectedCount = scanner.nextInt();
        
        long actualSum = 0;
        int actualCount = 0;

        // 2. Read the remaining integers
        // We read until the end of the input stream
        while (scanner.hasNext()) {
            String line = scanner.nextLine().trim();
            
            // Ignore empty lines
            if (line.isEmpty()) {
                continue;
            }

            try {
                // Attempt to parse the line as an integer
                // Since the numbers fit within 64-bit, we parse them as long 
                // to safely handle potential large sums, although the input numbers themselves 
                // are read as standard integers.
                long number = Long.parseLong(line);
                
                actualSum += number;
                actualCount++;
                
            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
                continue;
            }
        }

        // 3. Output the result in the required format
        System.out.println("count=" + actualCount + " sum=" + actualSum);

        scanner.close();
    }
}
