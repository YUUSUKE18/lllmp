import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long count = 0;
        long maxValue = Long.MIN_VALUE; // 64bit の最小値。ただし、入力がない場合はどうするか？仕様上「整数列」とあるので空でないか想定されるが、安全のために MIN_VALUE から開始し、最初の有効な数で更新するロジックにする。
        
        boolean firstValid = true;

        if (line != null) {
            String[] parts = line.split(","); // カンマ区切り
            
            for (String part : parts) {
                long val;
                try {
                    val = Long.parseLong(part.trim());
                    
                    count++;
                    
                    if (firstValid || val > maxValue) {
                        maxValue = val;
                        firstValid = false;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視（ただし、count は増えず）
                }
            }
        }

        System.out.println("count=" + count + " max=" + maxValue);
    }
}
