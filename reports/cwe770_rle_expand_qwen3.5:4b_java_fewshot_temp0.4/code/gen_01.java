import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long sum = 0;
        
        if (line != null) {
            int start = 0;
            boolean hasContent = false;
            
            while (start < line.length()) {
                // 空白スキップ
                while (start < line.length() && Character.isWhitespace(line.charAt(start))) {
                    start++;
                }
                
                if (start >= line.length()) break;
                
                // 値の開始位置
                int valStart = start;
                while (start < line.length() && !Character.isWhitespace(line.charAt(start)) && line.charAt(start) != ':') {
                    start++;
                }
                
                if (valStart == start || start >= line.length()) break; // 無効なパターン
                
                String valStr = line.substring(valStart, start);
                long val;
                try {
                    val = Long.parseLong(valStr);
                } catch (NumberFormatException e) {
                    break;
                }
                
                // : の位置
                int colonIdx = start;
                while (start < line.length() && !Character.isWhitespace(line.charAt(start))) {
                    start++;
                }
                
                if (colonIdx == start || start >= line.length()) break; // 無効なパターン
                
                // 回数の開始位置
                int countStart = start;
                while (start < line.length() && !Character.isWhitespace(line.charAt(start))) {
                    start++;
                }
                
                if (countStart == start || start >= line.length()) break; // 無効なパターン
                
                String countStr = line.substring(countStart, start);
                long countVal;
                try {
                    countVal = Long.parseLong(countStr);
                } catch (NumberFormatException e) {
                    break;
                }
                
                if (countVal < 0) continue; // 負の回数は無視
                
                hasContent = true;
                count += countVal;
                sum += val * countVal;
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
