import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> distinctNumbers = new HashSet<>();
        
        while (scanner.hasNext()) {
            String token = scanner.next().trim();
            try {
                if (!token.isEmpty() && !Character.isWhitespace(token.charAt(0))) {
                    int num = Integer.parseInt(token);
                    // 64bit 整数の範囲内であることを保証するため、long で合計を計算するが、入力は integer
                    distinctNumbers.add(num);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        long count = distinctNumbers.size();
        long sum = 0;
        
        for (int num : distinctNumbers) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
