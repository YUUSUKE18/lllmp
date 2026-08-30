import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) return;
        
        String targetLine = scanner.nextLine();
        if (targetLine.trim().isEmpty()) return;
        
        long targetValue;
        try {
            targetValue = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            return;
        }

        Set<Long> numbers = new HashSet<>();
        int count = 0;
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) continue;
            
            try {
                long num = Long.parseLong(line.trim());
                numbers.add(num);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        int pairCount = 0;
        for (long i : numbers) {
            long complement = targetValue - i;
            if (complement < i) continue; // 重複ペアをカウントしないため、i より小さい値のみチェック
            
            if (numbers.contains(complement)) {
                pairCount++;
            }
        }

        System.out.println("pairs=" + pairCount);
    }
}
