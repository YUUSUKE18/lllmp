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

        Set<Integer> uniqueNumbers = new HashSet<>();
        int count = 0;
        
        for (String token : line.split(",")) {
            String trimmedToken = token.trim();
            if (!trimmedToken.isEmpty()) {
                try {
                    Integer number = Integer.parseInt(trimmedToken);
                    // Set の特性上、重複した要素は自動的に除外されるため
                    uniqueNumbers.add(number);
                    count++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            }
        }

        long sum = 0;
        for (int num : uniqueNumbers) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
