import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        Set<Integer> distinctIntegers = new HashSet<>();
        
        if (line != null && !line.isEmpty()) {
            for (String token : line.split(",")) {
                String trimmedToken = token.trim();
                if (!trimmedToken.isEmpty()) {
                    try {
                        int num = Integer.parseInt(trimmedToken);
                        distinctIntegers.add(num);
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない場合は無視する
                    }
                }
            }
        }
        
        long count = distinctIntegers.size();
        long sum = 0;
        for (int num : distinctIntegers) {
            sum += num;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
