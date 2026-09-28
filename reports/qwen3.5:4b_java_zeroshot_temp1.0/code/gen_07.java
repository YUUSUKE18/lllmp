import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> uniqueNumbers = new HashSet<>();
        try {
            // 空白を区切りのように取り除くが、文字列として処理し、各トークンから整数に変換する
            String[] tokens = line.trim().split("\\s*");
            for (String token : tokens) {
                if (!token.isEmpty()) {
                    // 整数として解析できるかチェック
                    try {
                        long value = Long.parseLong(token);
                        uniqueNumbers.add((int) value);
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視
                    }
                }
            }
        } catch (Exception e) {
            // 読み込みエラーなどの場合、空セット扱いとみなす
        }

        int count = uniqueNumbers.size();
        long sum = 0;
        for (int num : uniqueNumbers) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
