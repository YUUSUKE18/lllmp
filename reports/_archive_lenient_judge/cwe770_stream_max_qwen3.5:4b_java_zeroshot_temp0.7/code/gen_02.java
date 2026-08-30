import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        
        if (input == null || input.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        // 空要素・前後の空白を無視して、整数として解釈可能なもののみを残すリストを作成する
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        
        if (input.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        String[] tokens = input.split("\\s+"); // 空白区切りで分割
        
        for (String token : tokens) {
            try {
                long value = Long.parseLong(token.trim());
                count++;
                if (!maxValue.equals(Long.MIN_VALUE)) {
                    maxValue = Math.max(maxValue, value);
                } else {
                    // 最初の有効な値を設定（ただし、空の場合 max は 0 に設定）
                     if (count == 1) {
                        maxValue = value;
                     } 
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        // 有効なデータがない場合の処理（max が設定されていないか、MIN_VALUE のままの場合）
        if (!Long.compare(maxValue, Long.MIN_VALUE)) {
             System.out.println("count=" + count + " max=" + maxValue);
        } else {
            System.out.println("count=0 max=0");
        }
    }
}
