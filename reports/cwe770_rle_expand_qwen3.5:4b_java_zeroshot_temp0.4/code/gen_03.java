import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long count = 0;
        long sum = 0;
        
        while (scanner.hasNext()) {
            String input = scanner.next();
            if (input.isEmpty()) continue;
            
            int colonIndex = input.indexOf(':');
            if (colonIndex == -1) continue;
            
            String valueStr = input.substring(0, colonIndex);
            String countStr = input.substring(colonIndex + 1).trim();
            
            try {
                long value = Long.parseLong(valueStr.trim());
                long repeat = Long.parseLong(countStr);
                
                if (repeat < 0) continue;
                
                count += repeat;
                sum += value * repeat;
            } catch (NumberFormatException e) {
                // 解析エラーが発生した場合は無視する
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
