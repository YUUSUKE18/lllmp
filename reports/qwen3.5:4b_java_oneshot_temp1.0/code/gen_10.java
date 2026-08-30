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

        Set<Long> uniqueSet = new HashSet<>();
        String[] parts = line.trim().split(",");
        long currentSum = 0;

        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) {
                continue;
            }
            try {
                long val = Long.parseLong(part);
                uniqueSet.add(val);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        currentSum = 0;
        for (long n : uniqueSet) {
            currentSum += n;
        }

        System.out.println("count=" + uniqueSet.size() + " sum=" + currentSum);
    }
}
