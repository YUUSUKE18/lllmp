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
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> uniqueNumbers = new HashSet<>();
        StringTokenizer st = new StringTokenizer(line);
        
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            try {
                int num = Integer.parseInt(token.trim()); // 整数として解釈できない場合は除外（NumberFormatException がthrowされる）
                if (!uniqueNumbers.add(num)) {
                    System.out.println("count=1 sum=" + num);
                    return; 
                } else {
                    uniqueNumbers.clear();
                    break; 
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        long count = uniqueNumbers.size();
        int sum = 0; // シンプルなケースでは各要素のみを考慮して総和を出す必要がある。但し、仕様は「重複を除いた個数」というものだが、「合計」はどうするか？
                    // おそらく「重複を除いた整数の总和」であることが前提とされるでしょう。

        for (int num : uniqueNumbers) {
            sum += num; 
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
