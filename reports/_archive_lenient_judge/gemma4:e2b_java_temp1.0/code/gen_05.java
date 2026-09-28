import java.util.Arrays;
import java.util.Set;
import java.util.HashSet;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        try {
            // 標準入力から一行を読み込む
            java.io.BufferedReader br = new java.io.BufferedReader(new java.io.InputStreamReader(System.in));
            String line = br.readLine();

            if (line == null || line.isEmpty()) {
                System.out.println("count=0 sum=0");
                return;
            }

            // カンマで分割し、各要素を処理する
            String[] parts = line.split(",");

            // 重複を除いた整数を格納するためのSetを使用
            Set<Integer> uniqueNumbers = new HashSet<>();
            long sum = 0;

            for (String part : parts) {
                // 前後の空白を除去
                String trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) {
                    continue;
                }

                try {
                    // 整数として解析を試みる
                    int number = Integer.parseInt(trimmedPart);
                    uniqueNumbers.add(number);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                    continue;
                }
            }

            // 重複を除いた整数の個数を計算
            int count = uniqueNumbers.size();

            // 合計を計算
            for (int num : uniqueNumbers) {
                sum += num;
            }

            // 結果を出力
            System.out.println("count=" + count + " sum=" + sum);

        } catch (Exception e) {
            // 予期せぬエラーが発生した場合（例：入力が非常に不正な場合など）は無視するか、適切な処理を行う
            // この問題の制約上、通常は上記のロジックでカバーされるはずだが、念のため
            // System.err.println("An error occurred: " + e.getMessage());
        }
    }
}
