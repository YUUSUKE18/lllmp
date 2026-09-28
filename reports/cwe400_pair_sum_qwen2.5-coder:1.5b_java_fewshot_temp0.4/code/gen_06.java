import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line.trim());
        List<Integer> numbers = new ArrayList<>();
        int pairs = 0;
        boolean first = true;
        if (line != null) {
            for (String f : line.trim().split("\\s+")) {
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    if (first) {
                        numbers.add(n);
                        first = false;
                    } else {
                        int sum = numbers.get(0) + n;
                        if (sum == target) pairs++;
                        numbers.set(0, n);
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
