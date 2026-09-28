import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long count = 0;
        long sum = 0;
        
        while (scanner.hasNextLine()) {
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
                
                try {
                    int colonIndex = part.indexOf(':');
                    if (colonIndex < 0 || colonIndex == 0) {
                        continue;
                    }
                    
                    String valueStr = part.substring(0, colonIndex).trim();
                    String countStr = part.substring(colonIndex + 1).trim();
                    
                    long value = Long.parseLong(valueStr);
                    long repeat = Long.parseLong(countStr);
                    
                    if (value != 0 || repeat > 0) {
                        count += repeat;
                        sum += value * repeat;
                    }
                } catch (NumberFormatException e) {
                    // 数値パースエラーを無視
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
