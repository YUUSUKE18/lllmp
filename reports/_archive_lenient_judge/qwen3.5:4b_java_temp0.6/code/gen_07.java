import java.util.Scanner;
import java.util.Set;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 重複を除去するために Set を使用
        Set<Integer> uniqueNumbers = new HashSet<>();
        
        while (scanner.hasNext()) {
            String token = scanner.next().trim();
            
            if (!token.isEmpty() && !Character.isWhitespace(token.charAt(0))) {
                try {
                    // 文字列を整数に変換し、Set に追加（重複は自動的に除外される）
                    int number = Integer.parseInt(token);
                    uniqueNumbers.add(number);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視する
                }
            }
        }
        
        long sum = 0L;
        for (int num : uniqueNumbers) {
            sum += num;
        }
        
        System.out.println("count=" + uniqueNumbers.size() + " sum=" + sum);
    }
}
