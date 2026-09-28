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
        
        if (line == null || line.trim().isEmpty()) {
            return;
        }
        
        StringTokenizer st = new StringTokenizer(line);
        Set<Long> distinctNumbers = new HashSet<>();
        
        while (st.hasMoreTokens()) {
            try {
                String token = st.nextToken();
                // 文字列が整数として解析できるかチェックし、エラーの場合スキップ
                if (!token.matches("-?[0-9]+")) {
                    continue;
                }
                long num = Long.parseLong(token);
                distinctNumbers.add(num);
            } catch (NumberFormatException e) {
                // 解析不能な要素は無視する
            }
        }
        
        int count = distinctNumbers.size();
        long sum = 0L;
        for (long num : distinctNumbers) {
            sum += num;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
