import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        Set<Integer> distinctNumbers = new HashSet<>();
        long sum = 0L;

        if (line != null) {
            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (!part.isEmpty()) {
                    try {
                        int num = Integer.parseInt(part);
                        distinctNumbers.add(num);
                        sum += num;
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視する
                    }
                }
            }
        }

        System.out.println("count=" + distinctNumbers.size() + " sum=" + sum);
    }
}
