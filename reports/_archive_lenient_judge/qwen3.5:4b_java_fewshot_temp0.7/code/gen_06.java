import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> distinctNumbers = new HashSet<>();
        
        for (String token : line.split(",")) {
            String trimmedToken = token.trim();
            if (!trimmedToken.isEmpty()) {
                try {
                    int num = Integer.parseInt(trimmedToken);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }

        long sum = 0;
        for (int n : distinctNumbers) {
            sum += n;
        }

        System.out.println("count=" + distinctNumbers.size() + " sum=" + sum);
    }
}
