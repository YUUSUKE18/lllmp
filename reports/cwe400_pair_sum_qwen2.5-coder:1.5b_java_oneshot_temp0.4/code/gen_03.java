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
        boolean first = true;
        while (first || line != null) {
            if (line != null) {
                for (String f : line.trim().split("\\s+")) {
                    if (f.isEmpty()) continue;
                    try {
                        int n = Integer.parseInt(f);
                        numbers.add(n);
                    } catch (NumberFormatException e) {
                    }
                }
            }
            first = false;
            line = br.readLine();
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
