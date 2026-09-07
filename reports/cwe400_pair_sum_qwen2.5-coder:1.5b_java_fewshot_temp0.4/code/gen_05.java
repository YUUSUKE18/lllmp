import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long target = Long.parseLong(line.trim());
        List<Long> numbers = new ArrayList<>();
        while ((line = br.readLine()) != null) {
            if (!line.trim().isEmpty()) {
                try {
                    long n = Long.parseLong(line.trim());
                    numbers.add(n);
                } catch (NumberFormatException e) {
                }
            }
        }
        int pairs = 0;
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    pairs++;
                }
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
