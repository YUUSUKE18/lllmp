import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String goalLine = br.readLine();
        int goal = Integer.parseInt(goalLine);
        List<Integer> numbers = new ArrayList<>();
        while (true) {
            String line = br.readLine();
            if (line.isEmpty() || !line.trim().contains(" ")) break;
            String[] nums = line.trim().split("\\s+");
            for (String num : nums) {
                try {
                    int n = Integer.parseInt(num);
                    numbers.add(n);
                } catch (NumberFormatException e) {
                }
            }
        }
        int count = 0;
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == goal) {
                    count++;
                }
            }
        }
        System.out.println("pairs=" + count);
    }
}
