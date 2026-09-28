import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // カンマと空白を区切り文字として設定
        sc.useDelimiter("[,\\s]+"); 
        
        Set<Long> uniqueNumbers = new HashSet<>();
        long sum = 0;
        
        while (sc.hasNext()) {
            String token = sc.next();
            try {
                long num = Long.parseLong(token);
                uniqueNumbers.add(num);
                sum += num;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }
        
        System.out.println("count=" + uniqueNumbers.size() + " sum=" + sum);
    }
}
