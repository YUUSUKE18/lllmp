import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long count = 0;
        long sum = 0;
        
        if (scanner.hasNext()) {
            String input = scanner.nextLine();
            String[] parts = input.split(",");
            
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) {
                    continue;
                }
                
                int colonIndex = part.indexOf(':');
                if (colonIndex == -1) {
                    continue;
                }
                
                String valueStr = part.substring(0, colonIndex).trim();
                String countStr = part.substring(colonIndex + 1).trim();
                
                try {
                    long value = Long.parseLong(valueStr);
                    long repetitions = Long.parseLong(countStr);
                    
                    if (repetitions >= 0) {
                        sum += value * repetitions;
                        count += repetitions;
                    }
                } catch (NumberFormatException e) {
                    // 解析エラーが発生した場合は無視
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
