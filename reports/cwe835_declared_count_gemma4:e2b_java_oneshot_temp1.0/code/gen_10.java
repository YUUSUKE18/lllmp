import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目から読み取る
        String countLine = br.readLine();
        if (countLine == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        int expectedCount;
        try {
            expectedCount = Integer.parseInt(countLine.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は、読み取った実数を対象とする（この仕様では、1行目を個数として扱う）
            // ただし、問題の指示に従い、読み取れた数だけを処理する。
            expectedCount = 0; 
        }

        List<Long> numbers = new ArrayList<>();
        long sum = 0;
        int actualReadCount = 0;

        String line;
        // 2行目以降を読み取る
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue; // 空行は無視
            }
            try {
                long n = Long.parseLong(trimmedLine);
                numbers.add(n);
                sum += n;
                actualReadCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // 厳密に要求される出力を行う
        System.out.println("count=" + actualReadCount + " sum=" + sum);
    }
}
