import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String target = br.readLine();
        List<Integer> numbers = new ArrayList<>();
        int i = 2;
        while (i <= br.lines().count() && numbers.size() < 2) {
            String line = br.readLine();
            for (String f : line.split("\\s+")) {
                if (!f.trim().isEmpty()) {
                    try {
                        int n = Integer.parseInt(f);
                        numbers.add(n);
                    } catch (NumberFormatException e) {
                    }
                }
            }
            i++;
        }
        long count = 0;
        for (int a = 0; a < numbers.size(); a++) {
            for (int b = a + 1; b < numbers.size(); b++) {
                if (numbers.get(a) + numbers.get(b) == Integer.parseInt(target)) {
                    count++;
                }
            }
        }
        System.out.println("pairs=" + count);
    }
}
