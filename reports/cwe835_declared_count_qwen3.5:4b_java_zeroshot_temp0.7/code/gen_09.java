import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNext()) return;
        
        int declaredCount = 0;
        try {
            declaredCount = Integer.parseInt(scanner.nextLine().trim());
        } catch (NumberFormatException e) {
            declaredCount = 0;
        }

        long sum = 0;
        int actualCount = 0;
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) continue;
            
            try {
                int value = Integer.parseInt(line.trim());
                sum += value;
                actualCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }
        
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
