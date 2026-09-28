import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long count = 0;
        long sum = 0;
        
        while (scanner.hasNext()) {
            String line = scanner.next();
            if (line.isEmpty()) continue;
            
            int colonIndex = line.indexOf(':');
            if (colonIndex == -1) continue;
            
            try {
                String valueStr = line.substring(0, colonIndex);
                String countStr = line.substring(colonIndex + 1);
                
                long value = Long.parseLong(valueStr.trim());
                long repeat = Long.parseLong(countStr.trim());
                
                if (repeat < 0) continue;
                
                sum += value * repeat;
                count += repeat;
            } catch (NumberFormatException e) {
                // 数値解析エラーが発生した場合は無視
                continue;
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
