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
                String countStr = line.substring(colonIndex + 1).trim();
                
                long value = Long.parseLong(valueStr);
                long repeat = Long.parseLong(countStr);
                
                if (repeat < 0) continue;
                
                count += repeat;
                sum += value * repeat;
            } catch (NumberFormatException e) {
                // 解析エラーが発生した場合は無視
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
