import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        // カンマで分割して、重複を除いた整数をセットに格納
        Set<Integer> distinctNumbers = new HashSet<>();
        
        // カンマで区切られた文字列を個々の要素に分割
        String[] parts = line.split(",");

        for (String part : parts) {
            // 前後の空白を削除
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                int number = Integer.parseInt(trimmedPart);
                distinctNumbers.add(number);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        // 個数と合計を計算
        long count = distinctNumbers.size();
        long sum = 0;

        for (int num : distinctNumbers) {
            sum += num;
        }

        // 結果を出力
        System.out.println("count=" + count + " sum=" + sum);
    }
}
