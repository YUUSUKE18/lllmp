import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> distinctNumbers = new HashSet<>();
        
        while (scanner.hasNext()) {
            String token = scanner.next().trim();
            if (!token.isEmpty() && isInteger(token)) {
                try {
                    int num = Integer.parseInt(token);
                    // 64bit の範囲内であることを確認するため、long に変換して処理するが、
                    // 入力自体は整数として解釈できるため long で合計を計算すれば OK。
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                    // 解析エラーが発生した場合は無視（仕様通り）
                }
            } else if (!token.isEmpty()) {
                // 空白以外の非数文字は無視するが、scanner.next() は空白区切りなので
                // ここでは token が空でない限り整数であるかチェックしている。
                // ただし「整数として解釈できない要素も無視します」という仕様を厳密に満たすため、
                // Integer.parseInt に失敗した場合はスキップ済みだが、文字列が数値ではない場合（例："abc"）は catch で処理済み。
            } else {
                continue;
            }
        }

        long count = distinctNumbers.size();
        long sum = 0L;
        
        for (int num : distinctNumbers) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }

    // 文字列が整数として解釈できるかチェックするヘルパーメソッド（厳密な数値形式のみ許可）
    private static boolean isInteger(String s) {
        try {
            Integer.parseInt(s.trim());
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
