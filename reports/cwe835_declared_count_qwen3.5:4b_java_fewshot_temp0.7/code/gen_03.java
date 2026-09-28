import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null || line1.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        int expectedCount = Integer.parseInt(line1.trim());
        long count = 0;
        long sum = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            
            StringTokenizer st = new StringTokenizer(line);
            int i = 0;
            while (st.hasMoreTokens()) {
                try {
                    long val = Long.parseLong(st.nextToken());
                    sum += val;
                    count++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視 (token は存在しても解析に失敗した場合)
                }
                i++;
                if (i >= expectedCount) break; 
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
