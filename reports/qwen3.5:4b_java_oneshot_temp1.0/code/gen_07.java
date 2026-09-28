import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        String[] parts = line.trim().split(",");
        Set<Long> uniqueSet = new HashSet<>();
        
        for (String part : parts) {
            String trimmed = part.trim();
            if (!trimmed.isEmpty()) {
                try {
                    long n = Long.parseLong(trimmed);
                    uniqueSet.add(n);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        long sum = 0;
        for (Long n : uniqueSet) {
            sum += n;
        }

        System.out.println("count=" + uniqueSet.size() + " sum=" + sum);
    }
}
