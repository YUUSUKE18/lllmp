import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 標準入力から一行読み込む
        if (!scanner.hasNextLine()) {
            // 入力がない場合は終了
            return;
        }
        String line = scanner.nextLine();
        scanner.close();

        // カンマで分割してトークンを取得
        String[] tokens = line.split(",");

        // 重複を除いた整数を格納するためのSet
        Set<Integer> uniqueNumbers = new HashSet<>();

        // 各トークンを処理
        for (String token : tokens) {
            // 前後の空白を削除
            String trimmedToken = token.trim();

            // 空のトークンは無視
            if (trimmedToken.isEmpty()) {
                continue;
            }

            try {
                // 整数として解析を試みる
                int number = Integer.parseInt(trimmedToken);
                // Setに追加することで重複を自動的に排除
                uniqueNumbers.add(number);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
                // System.err.println("無視された要素: " + trimmedToken); // デバッグ用
            }
        }

        // 結果の計算
        long count = uniqueNumbers.size();
        long sum = 0;

        // 合計を計算
        for (int number : uniqueNumbers) {
            sum += number;
        }

        // 結果を標準出力に出力
        System.out.println("count=" + count + " sum=" + sum);
    }
}
