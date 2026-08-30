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
            // 空行は無視
            if (line.trim().isEmpty()) {
                continue;
            }
            
            // 整数として解釈を試みる
            try {
                // 1行目に与えられた個数と、実際に読み取れた個数を比較するのではなく、
                // 読み取れた整数のみを対象とするという仕様に従う。
                // 1行目の値は「続く整数の個数」の目安であり、実際に読み取れたもののみを数える。
                long number = Long.parseLong(line.trim());
                sum += number;
                actualCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
