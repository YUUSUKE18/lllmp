import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long sum = 0;
        Set<Integer> distinctNumbers = new HashSet<>();
        if (line != null) {
            for (String token : line.split(",")) {
                if (!token.trim().isEmpty()) {
                    try {
                        int n = Integer.parseInt(token.trim());
                        distinctNumbers.add(n);
                        sum += n;
                    } catch (NumberFormatException e) {
                    }
                }
            }
        }
        System.out.println("count=" + distinctNumbers.size() + " sum=" + sum);
    }
}
