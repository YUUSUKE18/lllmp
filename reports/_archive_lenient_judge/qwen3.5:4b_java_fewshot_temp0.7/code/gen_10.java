import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> uniqueSet = new HashSet<>();
        for (String part : line.split(",")) {
            String trimmed = part.trim();
            if (!trimmed.isEmpty()) {
                try {
                    int n = Integer.parseInt(trimmed);
                    uniqueSet.add(n);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }

        long count = uniqueSet.size();
        long sum = 0;
        
        for (int n : uniqueSet) {
            sum += n;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
