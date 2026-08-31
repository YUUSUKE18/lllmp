import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long count = 0;
        long sum = 0;
        
        while (scanner.hasNext()) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) {
                continue;
            }
            
            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) {
                    continue;
                }
                
                int colonIndex = part.indexOf(':');
                if (colonIndex <= 0 || colonIndex >= part.length() - 1) {
                    continue;
                }
                
                String valueStr = part.substring(0, colonIndex).trim();
                String countStr = part.substring(colonIndex + 1).trim();
                
                try {
                    long value = Long.parseLong(valueStr);
                    long repeat = Long.parseLong(countStr);
                    
                    if (repeat < 0) {
                        continue;
                    }
                    
                    sum += value * repeat;
                    count += repeat;
                } catch (NumberFormatException e) {
                    // 数値解析エラーが発生した場合は無視
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
