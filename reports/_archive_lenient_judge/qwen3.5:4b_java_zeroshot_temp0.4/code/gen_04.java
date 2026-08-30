import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> uniqueNumbers = new HashSet<>();
        
        while (scanner.hasNext()) {
            String token = scanner.next().trim();
            if (!token.isEmpty() && !token.equals("null") && !" ".equals(token)) { // 空文字や null、空白のみを無視（ただし next() は空白スキップ済みだが安全に）
                try {
                    int num = Integer.parseInt(token);
                    uniqueNumbers.add(num);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            } else if (!scanner.hasNext()) {
                break; 
            }
        }

        long count = uniqueNumbers.size();
        long sum = 0L;
        
        for (int num : uniqueNumbers) {
            sum += num;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
