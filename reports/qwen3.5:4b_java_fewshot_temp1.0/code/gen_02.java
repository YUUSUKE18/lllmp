import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<String> distinctNumbers = new HashSet<>();
        
        for (String part : line.split(",")) {
            String trimmed = part.trim();
            if (!trimmed.isEmpty()) {
                try {
                    distinctNumbers.add(trimmed);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            }
        }

        int count = distinctNumbers.size();
        long sum = 0;
        
        for (String numStr : distinctNumbers) {
            try {
                long n = Long.parseLong(numStr);
                sum += n;
            } catch (NumberFormatException e) {
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
