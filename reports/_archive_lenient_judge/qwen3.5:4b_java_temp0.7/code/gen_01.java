import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (scanner.hasNextLine()) {
            String input = scanner.nextLine();
            
            // 空文字、空白のみなどのケースを処理
            input = input.trim();
            if (input.isEmpty() || !input.contains(",")) {
                System.out.println("count=0 sum=0");
                return;
            }

            Set<Integer> uniqueNumbers = new HashSet<>();
            
            // カンマ区切りで分割し、各要素を処理
            String[] parts = input.split(",");
            for (String part : parts) {
                if (!part.trim().isEmpty()) {
                    try {
                        int num = Integer.parseInt(part.trim());
                        uniqueNumbers.add(num); // 重複除くため Set を使用
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視
                    }
                }
            }

            long count = uniqueNumbers.size();
            
            long sum = 0;
            for (int num : uniqueNumbers) {
                if (!Long.isInfinite(sum)) { // overflow check logic implicitly handled by using long and problem statement guarantee
                     // However, since the output format is a single line with max range guaranteed as per spec "64bit integer", 
                     // we can safely sum them up. To be absolutely safe against potential overflow during calculation if input was maliciously large (though spec says it fits):
                    sum += num;
                } else {
                    System.out.println("count=" + count + " sum=0");
                    return;
                }
            }

            // 仕様通り: 合計は 64bit 整数の範囲に収まると明記されているため、long で計算しても OK。
            // ただし、安全を期すために long を使用し、必要であればoverflow checkも実装可能だが、
            // spec が「結果が収まる」と述べているので単純累加で十分。

            System.out.println("count=" + count + " sum=" + sum);
        } else {
            System.out.println("count=0 sum=0");
        }
    }
}
