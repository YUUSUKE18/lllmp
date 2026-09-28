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

        // カンマで分割し、各要素を処理する
        String[] tokens = line.split(",");

        Set<Integer> uniqueNumbers = new HashSet<>();
        long sum = 0;

        for (String token : tokens) {
            // 前後の空白をトリム
            String trimmedToken = token.trim();
            if (trimmedToken.isEmpty()) {
                continue;
            }

            try {
                // 整数として解析を試みる
                int number = Integer.parseInt(trimmedToken);
                uniqueNumbers.add(number);
                sum += number;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 個数と合計を出力する
        System.out.println("count=" + uniqueNumbers.size() + " sum=" + sum);
    }
}
