import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long count = 0L;
        long sum = 0L;
        
        while (scanner.hasNext()) {
            String token = scanner.next();
            if (token.isEmpty()) continue;
            
            int colonIndex = token.indexOf(':');
            if (colonIndex == -1) continue;
            
            try {
                String valueStr = token.substring(0, colonIndex).trim();
                String countStr = token.substring(colonIndex + 1).trim();
                
                if (valueStr.isEmpty() || countStr.isEmpty()) continue;
                
                int value = Integer.parseInt(valueStr);
                long n = Long.parseLong(countStr);
                
                if (n < 0) n = 0; // 負の回数は無視（要件：0 以上）
                
                sum += value * n;
                count += n;
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
