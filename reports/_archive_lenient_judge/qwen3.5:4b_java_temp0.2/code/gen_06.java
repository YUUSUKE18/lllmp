import java.util.Scanner;
import java.util.Set;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> distinctNumbers = new HashSet<>();
        
        while (scanner.hasNext()) {
            String token = scanner.next();
            try {
                int num = Integer.parseInt(token.trim());
                if (!token.isEmpty() && !Character.isWhitespace(token.charAt(0))) { // 簡易的なチェック、実際は trim で処理済みだが安全のため
                    distinctNumbers.add(num);
                } else if (scanner.hasNextInt()) {
                     try {
                        int num = scanner.nextInt();
                        distinctNumbers.add(num);
                     } catch (Exception e) {}
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        long count = distinctNumbers.size();
        long sum = 0;
        
        for (int num : distinctNumbers) {
            if (!Character.isWhitespace(num.toString().charAt(0))) { 
                 // ここは Set に入っているものは既に整数なので、単純に足すだけ。
                 // ただし、入力時に無効なものが混ざっていた場合の処理を再確認する必要があるが、Set に入るのは Integer.parseInt で成功した物のみとするのが妥当。
            }
        }

        for (int num : distinctNumbers) {
             sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
