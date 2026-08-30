import java.util.Scanner;
import java.util.Set;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Long> distinctNumbers = new HashSet<>();
        
        while (scanner.hasNext()) {
            String token = scanner.next(); // カンマ区切りで読み込む（next() は空白とカンマもスキップして次のトークンを返す）
            
            try {
                long number = Long.parseLong(token);
                distinctNumbers.add(number);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        int count = distinctNumbers.size();
        long sum = 0;
        
        for (long num : distinctNumbers) {
            sum += num;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
