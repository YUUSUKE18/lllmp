import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String firstLine = br.readLine();
        if (firstLine == null || firstLine.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        try {
            int countInput = Integer.parseInt(firstLine.trim());
        } catch (NumberFormatException e) {
            // 1 行目に整数が書かれていなかった場合、0 とみなす
            System.out.println("count=0 sum=0");
            return;
        }
        
        long count = 0;
        long sum = 0;
        boolean firstRead = true;
        
        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue; // 空行は無視
            
            try {
                long n = Long.parseLong(line.trim());
                sum += n;
                if (firstRead) {
                    countInput = -1; // 読み取った個数が確定していないと仮定（実際には count の指定は無視）
                    firstRead = false;
                }
                count++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
