import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line1 = br.readLine();
        if (line1 == null || line1.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        int countInput = 0;
        try {
            countInput = Integer.parseInt(line1.trim());
        } catch (NumberFormatException e) {
            // 最初の行が整数でない場合は、読み取れる整数の数が 0 とみなす
            System.out.println("count=0 sum=0");
            return;
        }
        
        long sum = 0;
        int countActual = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            
            try {
                long n = Long.parseLong(line.trim());
                sum += n;
                countActual++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("count=" + countActual + " sum=" + sum);
    }
}
