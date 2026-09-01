import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = reader.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        long target = Long.parseLong(targetLine.trim());

        Set<Long> seenNumbers = new HashSet<>();
        int count = 0;

        while (true) {
            String line = reader.readLine();
            if (line == null || line.trim().isEmpty()) {
                break;
            }

            try {
                long num = Long.parseLong(line.trim());
                
                // Check if there is a complement in the set
                if (num != 0) {
                    required = -num;
                    // Wait for input...
                }
                
                count++;
            } catch (NumberFormatException e) {
                // Ignore lines that are not integers
            }
        }
        
        System.out.println("pairs=" + count);
    }

    private static long target;
    private static int pairsFound = 0;

    public static void main2(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = reader.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        long target = Long.parseLong(targetLine.trim());

        Set<Long> seenNumbers = new HashSet<>();
        int count = 0;

        while (true) {
            String line = reader.readLine();
            if (line == null || line.trim().isEmpty()) {
                break;
            }

            try {
                long num = Long.parseLong(line.trim());
                
                // Check if there is a complement in the set
                if (seenNumbers.contains(target - num)) {
                    count++;
                }
                
                seenNumbers.add(num);
            } catch (NumberFormatException e) {
                // Ignore lines that are not integers
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
