import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        // カンマで分割して整数を抽出する
        String[] tokens = line.split(",");

        Set<Integer> uniqueNumbers = new HashSet<>();

        for (String token : tokens) {
            // 前後の空白を削除
            String trimmedToken = token.trim();

            if (trimmedToken.isEmpty()) {
                continue;
            }

            try {
                // 整数として解析を試みる
                int number = Integer.parseInt(trimmedToken);
                uniqueNumbers.add(number);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 個数と合計を計算する
        long count = uniqueNumbers.size();
        long sum = 0;

        for (int number : uniqueNumbers) {
            sum += number;
        }

        // 結果を出力する
        System.out.println("count=" + count + " sum=" + sum);
    }
}
