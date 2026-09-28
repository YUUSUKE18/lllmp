import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        // 空要素・前後の空白を無視し、整数として解釈できるものをセットに追加
        Set<Long> distinctIntegers = new HashSet<>();
        
        StringTokenizer st = new StringTokenizer(line);
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            if (token != null && !token.isEmpty()) {
                try {
                    long num = Long.parseLong(token.trim());
                    distinctIntegers.add(num);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        long count = distinctIntegers.size();
        long sum = 0;
        
        for (long num : distinctIntegers) {
            sum += num;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
