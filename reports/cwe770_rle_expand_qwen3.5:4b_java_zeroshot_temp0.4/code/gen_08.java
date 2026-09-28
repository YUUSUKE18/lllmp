import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long count = 0;
        long sum = 0;
        
        while (scanner.hasNext()) {
            String token = scanner.next();
            if (token.isEmpty()) continue;
            
            int colonIndex = token.indexOf(':');
            if (colonIndex <= 0) continue; // : が最初にあるか、: の前に文字がある場合は無視
            
            try {
                long value = Long.parseLong(token.substring(0, colonIndex));
                long repeat = Long.parseLong(token.substring(colonIndex + 1));
                
                if (repeat < 0) continue; // 回数が負の場合は無視
                
                count += repeat;
                sum += value * repeat;
            } catch (NumberFormatException e) {
                // 数値解析エラーが発生した場合は無視
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
