import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String firstLine = br.readLine();
        if (firstLine == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        int n = 0;
        try {
            n = Integer.parseInt(firstLine.trim());
        } catch (NumberFormatException e) {
            // 1 行目が整数でなければ count=0 sum=0 とする
            System.out.println("count=0 sum=0");
            return;
        }
        
        long sum = 0;
        int count = 0;
        
        while (true) {
            String line = br.readLine();
            if (line == null) break;
            
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                // 各行から最初の整数を読み取ります。複数ある場合も最初のみをカウントします。
                StringTokenizer st = new StringTokenizer(line);
                if (st.hasMoreTokens()) {
                    long val = Long.parseLong(st.nextToken());
                    sum += val;
                    count++;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
