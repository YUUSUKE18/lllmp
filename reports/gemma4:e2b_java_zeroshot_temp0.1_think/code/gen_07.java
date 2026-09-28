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

        // カンマで分割してトークンを取得
        String[] tokens = line.split(",");

        Set<Integer> uniqueNumbers = new HashSet<>();
        long sum = 0;

        for (String token : tokens) {
            String trimmedToken = token.trim();
            if (trimmedToken.isEmpty()) {
                continue;
            }

            try {
                int number = Integer.parseInt(trimmedToken);
                
                // Setに要素を追加し、追加が成功した場合（つまり、その数がまだセットになかった場合）にのみ合計に加算する
                if (uniqueNumbers.add(number)) {
                    sum += number;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        // 結果を出力
        System.out.println("count=" + uniqueNumbers.size() + " sum=" + sum);
    }
}
