import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new InputStreamReader(System.in);
        
        // 1 行目の整数の個数を読み取るが、値は使用しない（消費するのみ）
        String line1 = br.readLine();
        
        long sum = 0;
        int count = 0;

        // 2 行目以降を読み込む
        while ((line1 = br.readLine()) != null) {
            String trimmedLine = line1.trim();
            
            // 空行は無視
            if (trimmedLine.isEmpty()) {
                continue;
            }
            
            try {
                long val = Long.parseLong(trimmedLine);
                sum += val;
                count++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
