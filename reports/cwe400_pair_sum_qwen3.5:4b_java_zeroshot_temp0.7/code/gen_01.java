import java.util.Scanner;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNext()) return;
        
        String targetLine = scanner.nextLine();
        if (targetLine.trim().isEmpty()) return;
        
        long targetValue;
        try {
            targetValue = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            return;
        }

        HashSet<Long> seenNumbers = new HashSet<>();
        int pairCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) continue;
            
            try {
                long value = Long.parseLong(line.trim());
                long complement = targetValue - value;
                
                if (seenNumbers.contains(complement)) {
                    pairCount++;
                }
                
                seenNumbers.add(value);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("pairs=" + pairCount);
    }
}
