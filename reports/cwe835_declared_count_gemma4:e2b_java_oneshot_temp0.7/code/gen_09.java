import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String countLine = br.readLine();
        if (countLine == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        int actualCount = 0;
        long sum = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            try {
                // 1行目以降のデータは、実際に読み取れた数だけを対象とする
                // 課題の指示に従い、行ごとに整数を読み取る
                StringTokenizer st = new StringTokenizer(line);
                while (st.hasMoreTokens()) {
                    long number = Long.parseLong(st.nextToken());
                    sum += number;
                    actualCount++;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
            }
        }
        
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
