import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        // カンマで区切ってトークンを取得し、重複を除いた整数をセットに格納する
        Set<Long> distinctNumbers = new HashSet<>();
        String[] tokens = line.split(",");

        for (String token : tokens) {
            // 前後の空白を無視して整数として解釈を試みる
            String trimmedToken = token.trim();
            if (!trimmedToken.isEmpty()) {
                try {
                    // 64bit整数の範囲に収まることを想定しLongで読み込む
                    long number = Long.parseLong(trimmedToken);
                    distinctNumbers.add(number);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }

        long count = distinctNumbers.size();
        long sum = 0;
        for (long num : distinctNumbers) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
