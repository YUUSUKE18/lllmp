import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> uniqueNumbers = new HashSet<>();
        for (String token : line.trim().split(",")) {
            String trimmedToken = token.trim();
            if (!trimmedToken.isEmpty()) {
                try {
                    int number = Integer.parseInt(trimmedToken);
                    // 重複を除くため、set に挿入するだけで一意の要素のみカウントされる
                    uniqueNumbers.add(number);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            }
        }

        long count = uniqueNumbers.size();
        long sum = 0;
        
        for (int num : uniqueNumbers) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
